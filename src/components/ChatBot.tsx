"use client";
import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { trackChatEvent } from '../lib/analytics';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [memory, setMemory] = useState<any>({});
    const [userId, setUserId] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [isListening, setIsListening] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // Initial load
    useEffect(() => {
        const savedHistory = localStorage.getItem('unvika_chat_history');
        const savedMemory = localStorage.getItem('unvika_chat_memory');
        const savedName = localStorage.getItem('unvika_user_name');

        if (savedHistory) {
            setMessages(JSON.parse(savedHistory));
        } else {
            const greeting = savedName
                ? `Hi ${savedName}! I'm Parbat Raj Paudel, your Sales Funnel Specialist. Ready to scale today?`
                : "Hi! I'm Parbat Raj Paudel, your AI Sales Funnel Specialist. What's your name so I can personalize your experience?";
            setMessages([{ role: 'assistant', content: greeting }]);
        }

        if (savedMemory) setMemory(JSON.parse(savedMemory));
        if (savedName) setUserName(savedName);

        // Get unified userId
        const token = localStorage.getItem('unvika_review_token') || 'anon-' + Math.random().toString(36).substr(2, 9);
        setUserId(token);
    }, []);

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Prevent background scroll when chat is open on mobile
    useEffect(() => {
        if (isOpen && window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const toggleOpen = () => {
        if (!isOpen) {
            trackChatEvent('open', 'Chat opened by user');
        } else {
            trackChatEvent('close', 'Chat closed by user');
        }
        setIsOpen(!isOpen);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const options = { mimeType: 'audio/webm;codecs=opus' };
            const recorder = MediaRecorder.isTypeSupported(options.mimeType)
                ? new MediaRecorder(stream, options)
                : new MediaRecorder(stream);

            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            recorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                setIsTranscribing(true);

                try {
                    const formData = new FormData();
                    formData.append('audio', audioBlob);

                    const res = await fetch('/api/transcribe', {
                        method: 'POST',
                        body: formData
                    });

                    if (res.ok) {
                        const data = await res.json();
                        if (data.text && data.text.trim().length > 0) {
                            const newText = data.text.trim();
                            setInputText(newText);
                            setTimeout(() => handleSendMessageDirectly(newText), 500);
                        }
                    } else {
                        runLocalSTTFallback();
                    }
                } catch (err) {
                    console.error("Transcription error:", err);
                } finally {
                    setIsTranscribing(false);
                    stream.getTracks().forEach(track => track.stop());
                }
            };

            recorder.start();
            setIsListening(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }
        setIsListening(false);
    };

    const toggleVoice = () => {
        if (isListening) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const runLocalSTTFallback = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Voice transcription is not supported in your browser.");
            return;
        }
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (e: any) => {
            const text = e.results[0][0].transcript;
            setInputText(prev => (prev + ' ' + text).trim());
        };
        recognition.start();
    };

    const handleSendMessageDirectly = async (text: string) => {
        if (!text.trim() || isTyping) return;

        trackChatEvent('message_sent', text.substring(0, 50));
        const userMsg: Message = { role: 'user', content: text };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInputText('');
        setIsTyping(true);
        await callChatApi(newMessages);
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const textToSubmit = inputText;
        if (!textToSubmit.trim() || isTyping) return;

        trackChatEvent('message_sent', textToSubmit.substring(0, 50));
        const userMsg: Message = { role: 'user', content: textToSubmit };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInputText('');
        setIsTyping(true);
        await callChatApi(newMessages);
    };

    const callChatApi = async (history: Message[]) => {
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: history,
                    sessionMemory: memory,
                    userId: userId
                })
            });

            if (res.ok) {
                const data = await res.json();
                if (data.updatedMemory?.user_name && !userName) {
                    setUserName(data.updatedMemory.user_name);
                    localStorage.setItem('unvika_user_name', data.updatedMemory.user_name);
                }
                const assistantMsg: Message = {
                    role: 'assistant',
                    content: data.reply || "I'm sorry, I couldn't process that. Could you rephrase?"
                };
                const updatedHistory = [...history, assistantMsg];
                setMessages(updatedHistory);
                setMemory(data.updatedMemory || {});
                localStorage.setItem('unvika_chat_history', JSON.stringify(updatedHistory));
                localStorage.setItem('unvika_chat_memory', JSON.stringify(data.updatedMemory || {}));
            } else {
                throw new Error("Chat failed");
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Can you try again?" }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
            {/* Trigger Button */}
            <button className="chatbot-trigger" onClick={toggleOpen}>
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                ) : (
                    <div className="trigger-pulse-wrapper">
                        <div className="pulse-ring"></div>
                        <img
                            src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jude"
                            alt="Parbat AI Assistant"
                            className="bot-avatar-img"
                        />
                    </div>
                )}
                {!isOpen && (
                    <div className="bot-name-label">
                        Hope
                    </div>
                )}
            </button>

            {/* Chat Window */}
            <div className="chatbot-window">
                <div className="chatbot-header">
                    <div className="header-info">
                        <div className="bot-avatar-container">
                            <img
                                src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jude"
                                alt="Parbat AI Assistant"
                                className="header-avatar-img"
                            />
                            <div className="online-indicator"></div>
                        </div>
                        <div>
                            <h4>Parbat AI {userName ? `for ${userName}` : ''}</h4>
                            <span>AI Assistant</span>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="close-btn-header" onClick={toggleOpen} title="Close Chat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>

                <div className="chatbot-messages" ref={scrollRef}>
                    {messages.map((m, i) => (
                        <div key={i} className={`message-wrapper ${m.role}`}>
                            {m.role === 'assistant' && (
                                <div className="message-avatar">
                                    <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jude" alt="Parbat" />
                                </div>
                            )}
                            <div className="message-bubble">
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message-wrapper assistant">
                            <div className="message-avatar">
                                <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Jude" alt="Parbat" />
                            </div>
                            <div className="message-bubble typing">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                </div>

                <form className="chatbot-input" onSubmit={handleSendMessage}>
                    <button
                        type="button"
                        className={`voice-btn ${isListening ? 'listening' : ''} ${isTranscribing ? 'transcribing' : ''}`}
                        onClick={toggleVoice}
                        disabled={isTranscribing}
                        title={isTranscribing ? "Transcribing..." : "Speech to Text"}
                    >
                        {isTranscribing ? (
                            <div className="voice-loader"></div>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                        )}
                    </button>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button className="send-btn" type="submit" disabled={!inputText.trim() || isTyping}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                    </button>
                </form>

                <div className="chatbot-footer">
                    Built by Parbat
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
