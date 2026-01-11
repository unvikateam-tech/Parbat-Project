"use client";
import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

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

    const [viewMode, setViewMode] = useState<'home' | 'chat'>('home');

    // Initial load
    useEffect(() => {
        const savedHistory = localStorage.getItem('unvika_chat_history');
        const savedMemory = localStorage.getItem('unvika_chat_memory');
        const savedName = localStorage.getItem('unvika_user_name');

        if (savedHistory) {
            setMessages(JSON.parse(savedHistory));
        } else {
            const greeting = savedName
                ? `Hi ${savedName}! I'm Parbat, your personalized assistant. Ready to scale today?`
                : "Hi! I'm Parbat, your AI assistant. What's your name so I can personalize your experience?";
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
    }, [messages, isTyping, viewMode]);

    const toggleOpen = () => {
        if (!isOpen) {
            setViewMode('home');
        }
        setIsOpen(!isOpen);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Use a more compatible mime type
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
                            // Auto-send the message for a "Voice Assistant" feel
                            setTimeout(() => handleSendMessage(), 500);
                        }
                    } else {
                        const errData = await res.json();
                        console.error("AssemblyAI failed:", errData.details || "Unknown error");
                        runLocalSTTFallback();
                    }
                } catch (err) {
                    console.error("Transcription error:", err);
                } finally {
                    setIsTranscribing(false);
                    // Stop all tracks to release microphone
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
            return;
        }

        // Try AssemblyAI first (High Quality)
        // If the service-guard or API fails, we could potentially have a local fallback
        startRecording();
    };

    // LOCAL FALLBACK for Speech-to-Text if API key is missing or fails
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

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputText.trim() || isTyping) return;

        const userMsg: Message = { role: 'user', content: inputText };
        const newMessages = [...messages, userMsg];

        setMessages(newMessages);
        setInputText('');
        setIsTyping(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages,
                    sessionMemory: memory,
                    userId: userId
                })
            });

            if (res.ok) {
                const data = await res.json();

                // If the bot identifies a name, save it
                if (data.updatedMemory?.user_name && !userName) {
                    setUserName(data.updatedMemory.user_name);
                    localStorage.setItem('unvika_user_name', data.updatedMemory.user_name);
                }

                const assistantMsg: Message = {
                    role: 'assistant',
                    content: data.reply || "I'm sorry, I couldn't process that. Could you rephrase?"
                };
                const updatedHistory = [...newMessages, assistantMsg];

                setMessages(updatedHistory);
                setMemory(data.updatedMemory || {});

                // Save to local storage
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
                            src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Leo"
                            alt="Parbat Assistant"
                            className="bot-avatar-img"
                        />
                    </div>
                )}
                {!isOpen && (
                    <div className="welcome-bubble" onClick={(e) => { e.stopPropagation(); toggleOpen(); }}>
                        <div className="welcome-bubble-content">
                            <strong>Welcome! 👋</strong>
                            <span>Try Parbat Assistant!</span>
                        </div>
                        <div className="welcome-bubble-arrow"></div>
                    </div>
                )}
            </button>

            {/* Chat Window */}
            <div className="chatbot-window">
                <div className="chatbot-header">
                    <div className="header-info">
                        <div className="bot-avatar-container">
                            <img
                                src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Leo"
                                alt="Parbat Assistant"
                                className="header-avatar-img"
                            />
                            <div className="online-indicator"></div>
                        </div>
                        <div>
                            <h4>Parbat {userName ? `for ${userName}` : ''}</h4>
                            <span>AI Assistant</span>
                        </div>
                    </div>
                    {viewMode === 'chat' && (
                        <button className="tts-toggle" onClick={() => setViewMode('home')} title="Back to Menu">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        </button>
                    )}
                </div>

                {viewMode === 'home' ? (
                    <div className="selection-container">
                        <h3 className="selection-title">How can we help?</h3>
                        <p className="selection-subtitle">Choose your preferred way to connect</p>

                        <a
                            href="https://wa.me/98888888"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="selection-button whatsapp"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Chat on WhatsApp
                        </a>

                        <button className="selection-button unvika" onClick={() => setViewMode('chat')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                <path d="M12 3a9 9 0 1 1-6.18 15.54" />
                            </svg>
                            Chat with Parbat
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="chatbot-messages" ref={scrollRef}>
                            {messages.map((m, i) => (
                                <div key={i} className={`message-wrapper ${m.role}`}>
                                    {m.role === 'assistant' && (
                                        <div className="message-avatar">
                                            <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Leo" alt="Leo" />
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
                                        <img src="https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Leo" alt="Leo" />
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
                            <button type="submit" disabled={!inputText.trim() || isTyping}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                            </button>
                        </form>
                    </>
                )}

                <div className="chatbot-footer">
                    Built by Parbat
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
