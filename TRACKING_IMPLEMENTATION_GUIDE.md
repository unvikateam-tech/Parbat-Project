# Quick Event Tracking Implementation Guide

## Where to Add Tracking Calls

### 1. Hero Section CTA Button
**File:** `src/components/HeroSection.tsx`
**Line:** 139-143

```typescript
import { trackCTAClick } from '@/lib/analytics';

// Replace the existing Link/button with:
<Link href="/contact">
  <button 
    className="hero-btn primary-btn"
    onClick={() => trackCTAClick('Hero - Get Funnel Audit', '/contact')}
  >
    Get a Funnel Audit
  </button>
</Link>
```

---

### 2. Contact Form Submission
**File:** `src/app/contact/page.tsx`
**Line:** 30-58 (in handleSubmit function)

```typescript
import { trackFormSubmission } from '@/lib/analytics';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (currentStep < totalSteps) {
    setCurrentStep(currentStep + 1);
  } else {
    setIsSubmitting(true);
    
    // ADD THIS: Track form submission
    trackFormSubmission('Contact Form', {
      package: formData.package_choice,
      company: formData.company,
      company_size: formData.size
    });
    
    try {
      const res = await fetch('/api/contact_submit', {
        // ... existing code
      });
      // ... rest of existing code
    }
  }
};
```

---

### 3. Newsletter Subscription
**File:** `src/app/api/newsletter/subscribe/route.ts`
**Line:** After successful database insert (around line 145)

```typescript
import { trackNewsletterSubscription } from '@/lib/analytics';

// After the SQL INSERT is successful, add:
trackNewsletterSubscription(email);
```

---

### 4. Review Submission
**File:** `src/components/TestimonialSection.tsx`
**Line:** 367-403 (in handleFinalSubmit function)

```typescript
import { trackReviewSubmission } from '@/lib/analytics';

const handleFinalSubmit = async (formData: FormData) => {
  formData.append('token', userToken || '');
  
  // ADD THIS: Extract rating from formData
  const rating = parseInt(formData.get('rating') as string);
  
  setHasReviewed(true);
  localStorage.setItem('unvika_device_reviewed', 'true');
  
  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      console.error('Background submission failed');
      return false;
    }

    const result = await res.json();
    
    // ADD THIS: Track the review submission
    trackReviewSubmission(rating);
    
    // ... rest of existing code
  }
};
```

---

### 5. Chat Interactions
**File:** `src/components/ChatBot.tsx`
**Line:** 56-61 (toggleOpen function)

```typescript
import { trackChatEvent } from '@/lib/analytics';

const toggleOpen = () => {
  if (!isOpen) {
    setViewMode('home');
    trackChatEvent('open', 'User opened chatbot');
  } else {
    trackChatEvent('close', 'User closed chatbot');
  }
  setIsOpen(!isOpen);
};
```

**Also add after line 157 (handleSendMessage function):**

```typescript
const handleSendMessage = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();
  if (!inputText.trim() || isTyping) return;

  // ADD THIS: Track chat message sent
  trackChatEvent('message_sent', inputText.substring(0, 50));
  
  // ... rest of existing code
};
```

---

### 6. WhatsApp Button Click (Chat Widget)
**File:** `src/components/ChatBot.tsx`
**Line:** 267-277

```typescript
import { trackOutboundLink } from '@/lib/analytics';

<a
  href="https://wa.me/9779761014195"
  target="_blank"
  rel="noopener noreferrer"
  className="selection-button whatsapp"
  onClick={() => trackOutboundLink('https://wa.me/9779761014195', 'WhatsApp Chat from Widget')}
>
  {/* SVG and text */}
</a>
```

---

### 7. Social Media Links (Footer)
**File:** `src/components/Footer.tsx`
**Line:** 39-53

```typescript
import { trackOutboundLink } from '@/lib/analytics';

// For each social link, add onClick handler:

<a 
  href="https://www.facebook.com/..." 
  target="_blank" 
  rel="noopener noreferrer" 
  className="social-icon fb"
  onClick={() => trackOutboundLink('https://www.facebook.com/...', 'Facebook Icon')}
>
  {/* SVG */}
</a>

// Repeat for YouTube, Instagram, LinkedIn, WhatsApp
```

---

### 8. Video Play Tracking
**File:** `src/components/HeroSection.tsx`
**Line:** 12-17 (handlePlay function)

```typescript
import { trackVideoPlay } from '@/lib/analytics';

const handlePlay = () => {
  setIsPlaying(true);
  
  // ADD THIS: Track video play
  trackVideoPlay('Hero Section Vimeo Video', 0);
  
  if (iframeRef.current && iframeRef.current.contentWindow) {
    iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
  }
};
```

---

### 9. Pricing Package Selection
**File:** `src/components/PricingSection.tsx`
**Find the buttons/links for each pricing tier**

```typescript
import { trackCTAClick } from '@/lib/analytics';

// For each "Get Started" or "Book Audit" button:
<button 
  onClick={() => trackCTAClick('Pricing - Bespoke Solution Selected', '/contact?package=bespoke')}
>
  Get Started
</button>
```

---

### 10. FAQ Interactions
**File:** `src/components/FAQSection.tsx`

```typescript
import { trackEvent } from '@/lib/analytics';

// When FAQ is clicked/expanded:
const handleFAQClick = (question: string) => {
  trackEvent({
    action: 'faq_click',
    category: 'engagement',
    label: question.substring(0, 50)
  });
};
```

---

## Testing Your Implementation

### 1. Open Browser Console
Press **F12** → **Console** tab

### 2. Check for GA4 Events
After each action, you should see:
```
[gtag] event: form_submit
[gtag] event: cta_click
```

### 3. Use Real-Time Reports
- **GA4:** Go to Reports → Realtime → Events
- **Facebook:** Go to Events Manager → Test Events

### 4. Install Extensions
- **Google Analytics Debugger** - Shows all GA hits
- **Facebook Pixel Helper** - Shows all FB events

---

## Priority Implementation Order

### 🔥 High Priority (Implement First):
1. Contact Form Submission
2. Hero CTA Button
3. Newsletter Subscription
4. Pricing CTAs

### 🟠 Medium Priority (Week 1):
5. Chat Open/Close
6. Review Submissions
7. Video Play
8. WhatsApp Clicks

### 🟢 Low Priority (Nice to Have):
9. Social Media Clicks
10. FAQ Interactions
11. Scroll Depth
12. Navigation Tracking

---

## Copy-Paste Template

For any new button/link you want to track:

```typescript
import { trackCTAClick } from '@/lib/analytics';

<button onClick={() => trackCTAClick('Button Name Here', '/destination-url')}>
  Click Me
</button>
```

For any form submission:

```typescript
import { trackFormSubmission } from '@/lib/analytics';

const handleSubmit = async (e) => {
  e.preventDefault();
  trackFormSubmission('Form Name Here', { 
    field1: value1,
    field2: value2 
  });
  // ... rest of your code
};
```

---

## 🎯 Quick Win: Add Tracking to Hero CTA

This is the most important conversion point. Add it first:

1. Open `src/components/HeroSection.tsx`
2. Add import at top: `import { trackCTAClick } from '@/lib/analytics';`
3. Find line 139-143 (the Link/button for "Get a Funnel Audit")
4. Add onClick handler:
   ```typescript
   <button 
     className="hero-btn primary-btn"
     onClick={() => trackCTAClick('Hero CTA - Get Funnel Audit', '/contact')}
   >
     Get a Funnel Audit
   </button>
   ```
5. Save and test!

---

That's it! Each implementation takes 30 seconds to add.
