# 🎯 Complete Analytics & Tracking Setup Guide

This guide will help you implement Google Analytics 4, Hotjar, Facebook Pixel, and Google Ads tracking on your website.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Step 1: Get Your Tracking IDs](#step-1-get-your-tracking-ids)
3. [Step 2: Configure Environment Variables](#step-2-configure-environment-variables)
4. [Step 3: Verify Installation](#step-3-verify-installation)
5. [Step 4: Test Event Tracking](#step-4-test-event-tracking)
6. [Step 5: Monitor Your Data](#step-5-monitor-your-data)
7. [Advanced Features](#advanced-features)

---

## Prerequisites

✅ All tracking code has been automatically installed in:
- `/src/components/Analytics.tsx` - Main tracking component
- `/src/lib/analytics.ts` - Event tracking utilities
- `/src/app/layout.tsx` - Integrated into app layout

---

## Step 1: Get Your Tracking IDs

### 🔵 Google Analytics 4 (GA4)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Under **Property**, click **Data Streams**
4. Click your website stream or create a new one
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 🟠 Hotjar

1. Sign up at [Hotjar](https://www.hotjar.com/)
2. Create a new **Site**
3. Copy your **Site ID** (a number like `1234567`)

### 🔵 Facebook Pixel

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager/)
2. Click **Connect Data Sources** → **Web** → **Facebook Pixel**
3. Name your pixel and create it
4. Copy your **Pixel ID** (number format like `123456789012345`)

### 🟢 Google Ads

1. Go to [Google Ads](https://ads.google.com/)
2. Click **Tools & Settings** → **Measurement** → **Conversions**
3. Create a conversion action
4. Copy your **Conversion ID** (format: `AW-XXXXXXXXXX`)

---

## Step 2: Configure Environment Variables

### Create/Update .env.local file

In your project root (`c:\Users\LENOVO\Downloads\unvika-project\`), create or update `.env.local`:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Hotjar
NEXT_PUBLIC_HOTJAR_ID=1234567

# Facebook Pixel
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
```

**Replace the X's with your actual IDs from Step 1.**

### Why .env.local?
- `.env` is tracked by git (don't put sensitive data there)
- `.env.local` is gitignored and safe for API keys
- `NEXT_PUBLIC_` prefix makes variables accessible in the browser

---

## Step 3: Verify Installation

### A. Restart Development Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart:
npm run dev
```

### B. Check Browser Console

1. Open your site: `http://localhost:3000`
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. You should NOT see any errors related to gtag, fbq, or hj

### C. Verify Scripts Are Loading

In **Developer Tools**:

1. Go to **Network** tab
2. Refresh the page
3. Filter by "JS"
4. Look for:
   - `gtag/js?id=G-` (Google Analytics)
   - `hotjar` (Hotjar)
   - `fbevents.js` (Facebook Pixel)

### D. Use Browser Extensions

Install these Chrome/Edge extensions to verify:

- **Google Analytics Debugger** - Shows GA hits in console
- **Facebook Pixel Helper** - Shows pixel events in real-time
- **Tag Assistant** (by Google) - Validates GA4 setup

---

## Step 4: Test Event Tracking

### Automatic Events (Already Working)
✅ **Page Views** - Tracked automatically on every page
✅ **Route Changes** - Tracked when navigating between pages

### Manual Event Testing

The tracking code is ready. To implement events on your buttons/forms, here's how:

#### Example 1: Track Button Clicks

```typescript
import { trackButtonClick, trackCTAClick } from '@/lib/analytics';

// In your component:
<button onClick={() => trackCTAClick('Get Funnel Audit', '/contact')}>
  Get Funnel Audit
</button>
```

#### Example 2: Track Form Submissions

```typescript
import { trackFormSubmission } from '@/lib/analytics';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Track the event
  trackFormSubmission('Contact Form', {
    name: formData.name,
    company: formData.company
  });
  
  // Then submit your form
  // ... your existing code
};
```

#### Example 3: Track Newsletter Signup

```typescript
import { trackNewsletterSubscription } from '@/lib/analytics';

// After successful subscription:
trackNewsletterSubscription(email);
```

---

## Step 5: Monitor Your Data

### 📊 Google Analytics 4

**Real-Time Reports:**
1. Go to [GA4](https://analytics.google.com/)
2. Click **Reports** → **Realtime**
3. Open your website
4. You should see yourself as an active user

**Setup Conversions:**
1. Go to **Admin** → **Events**
2. Mark key events as conversions:
   - `form_submit`
   - `cta_click`
   - `newsletter_subscribe`
   - `purchase`

**Create Funnels:**
1. Go to **Explore** → **Funnel Exploration**
2. Add steps:
   - Step 1: Page view (`/`)
   - Step 2: CTA click (`cta_click`)
   - Step 3: Form start (`/contact`)
   - Step 4: Form submit (`form_submit`)

### 🔥 Hotjar

**View Heatmaps:**
1. Go to [Hotjar Dashboard](https://insights.hotjar.com/)
2. Select your site
3. Click **Heatmaps** → **New Heatmap**
4. Select pages to track
5. Wait 24-48 hours for data

**Watch Recordings:**
1. Go to **Recordings**
2. You'll see user sessions automatically recorded
3. Filter by:
   - Device type
   - Country
   - Page visited

### 📘 Facebook Pixel

**Test Events:**
1. Open [Facebook Events Manager](https://business.facebook.com/events_manager/)
2. Select your Pixel
3. Click **Test Events**
4. Enter your website URL
5. Interact with your site - events appear in real-time

**View Analytics:**
1. Go to **Overview** to see:
   - Page Views
   - Leads (form submissions)
   - Purchases
2. Check **Custom Conversions** for specific goals

### 🎯 Google Ads

**Setup Conversion Goals:**
1. Go to **Tools** → **Conversions**
2. Click the conversion you created
3. Verify it's receiving data
4. Link it to your ad campaigns

---

## Advanced Features

### Scroll Depth Tracking

Add this to your homepage component:

```typescript
import { trackScrollDepth } from '@/lib/analytics';
import { useEffect } from 'react';

useEffect(() => {
  let tracked25 = false, tracked50 = false, tracked75 = false, tracked100 = false;
  
  const handleScroll = () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    if (scrolled >= 25 && !tracked25) {
      trackScrollDepth(25);
      tracked25 = true;
    }
    if (scrolled >= 50 && !tracked50) {
      trackScrollDepth(50);
      tracked50 = true;
    }
    if (scrolled >= 75 && !tracked75) {
      trackScrollDepth(75);
      tracked75 = true;
    }
    if (scrolled >= 100 && !tracked100) {
      trackScrollDepth(100);
      tracked100 = true;
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Video Tracking

```typescript
import { trackVideoPlay } from '@/lib/analytics';

// When video plays:
<iframe
  onLoad={() => trackVideoPlay('Hero Video', 0)}
  // ... other props
/>
```

### Chat Tracking

Already implemented in your ChatBot component if you add:

```typescript
import { trackChatEvent } from '@/lib/analytics';

// When chat opens:
const toggleOpen = () => {
  if (!isOpen) {
    trackChatEvent('open', 'Chat opened by user');
  } else {
    trackChatEvent('close', 'Chat closed by user');
  }
  setIsOpen(!isOpen);
};
```

---

## 🚀 Quick Implementation Checklist

### Must-Do (Before Launch):
- [ ] Add all 4 tracking IDs to `.env.local`
- [ ] Restart dev server to load environment variables
- [ ] Test in browser with developer tools open
- [ ] Verify at least 1 pageview in GA4 Real-time
- [ ] Install browser extensions for verification

### Should-Do (First Week):
- [ ] Add event tracking to CTA buttons
- [ ] Add event tracking to contact form
- [ ] Add event tracking to newsletter form
- [ ] Setup GA4 conversion events
- [ ] Create GA4 funnels
- [ ] Enable Hotjar recordings

### Nice-to-Have (First Month):
- [ ] Add scroll depth tracking
- [ ] Add video interaction tracking
- [ ] Create custom GA4 reports
- [ ] Setup Facebook Custom Conversions
- [ ] Create Hotjar heatmaps for key pages
- [ ] Link Google Ads to GA4

---

## 🔍 Troubleshooting

### Issue: GA4 not showing data
**Solution:**
1. Check `.env.local` has correct `NEXT_PUBLIC_GA_ID`
2. Verify ID starts with `G-` not `UA-`
3. Clear browser cache
4. Use Incognito mode to test
5. Check Console for errors

### Issue: Hotjar not recording
**Solution:**
1. Verify `NEXT_PUBLIC_HOTJAR_ID` is just numbers (no quotes needed)
2. Check you have the **free plan activated**
3. Recordings take 1-2 minutes to appear
4. Some ad blockers block Hotjar

### Issue: Facebook Pixel not firing
**Solution:**
1. Install "Facebook Pixel Helper" extension
2. Check Console for `fbq is not defined` errors
3. Verify Pixel ID is correct
4. Disable ad blockers for testing

---

## 📞 Support

If you encounter issues:
1. Check browser Console for errors (F12)
2. Verify all IDs are correct in `.env.local`
3. Ensure dev server was restarted after adding env vars
4. Test in Incognito mode (no extensions interfering)

---

## 🎉 You're All Set!

Once configured, your analytics will automatically track:
- ✅ Page views across all pages
- ✅ User navigation patterns
- ✅ Form submissions (when you add tracking calls)
- ✅ Button clicks (when you add tracking calls)
- ✅ Video interactions (when you add tracking calls)
- ✅ Chat interactions (when you add tracking calls)
- ✅ Purchases/Conversions (when you add tracking calls)

**Remember:** Tracking happens automatically for page views. For specific events (forms, buttons, etc.), you need to add the tracking function calls as shown in Step 4.
