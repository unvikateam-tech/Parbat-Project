# 🎯 Analytics & Tracking - Complete Implementation

## 📦 What's Included

Your website now has a comprehensive analytics and tracking system with:

✅ **Google Analytics 4 (GA4)** - Traffic and conversion tracking  
✅ **Hotjar** - Heatmaps and session recordings  
✅ **Facebook Pixel** - Ad attribution and conversion tracking  
✅ **Google Ads** - Conversion tracking for paid campaigns  

---

## 🚀 Quick Start (5 Minutes)

### 1. Get Your Tracking IDs

| Service | Sign Up URL | What You Need |
|---------|-------------|---------------|
| **Google Analytics 4** | https://analytics.google.com/ | Measurement ID (G-XXXXXXXXXX) |
| **Hotjar** | https://www.hotjar.com/ | Site ID (numbers only) |
| **Facebook Pixel** | https://business.facebook.com/events_manager/ | Pixel ID (15-16 digits) |
| **Google Ads** | https://ads.google.com/ | Conversion ID (AW-XXXXXXXXXX) |

### 2. Configure Environment Variables

Create `.env.local` in your project root:

```bash
# Copy the template
cp .env.analytics.template .env.local

# Then edit .env.local with your actual IDs:
NEXT_PUBLIC_GA_ID=G-ABC123DEF4
NEXT_PUBLIC_HOTJAR_ID=3456789
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-987654321
```

### 3. Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 4. Verify It's Working

**Open your site** → Press **F12** → **Console** tab

You should see:
- No errors related to `gtag`, `fbq`, or `hj`
- Page view events being logged

**Check Network tab:**
- Filter by "JS"
- Look for: `gtag/js`, `hotjar`, `fbevents.js`

---

## 📊 What Gets Tracked Automatically

### ✅ Page Views
Every time someone visits a page, GA4 tracks:
- Page URL
- Page title
- Referrer source
- Device type
- Location

### ✅ Navigation
When users navigate between pages:
- Route changes tracked
- Time on page calculated
- Bounce rate measured

### ✅ Session Recording (Hotjar)
Starts recording automatically:
- Mouse movements
- Clicks
- Scrolling
- Form interactions

### ✅ Heatmaps (Hotjar)
Collects data for:
- Click maps
- Scroll maps
- Move maps

---

## 🎯 Custom Events Already Implemented

### 1. Hero CTA Click ✅
**Where:** Main homepage button  
**Event:** `cta_click`  
**Label:** `Hero - Get Funnel Audit`

### 2. Video Play ✅
**Where:** Hero section video  
**Event:** `play`  
**Category:** `video_interaction`

---

## 📝 Events Ready to Implement

Use these pre-built tracking functions anywhere in your code:

### Form Submissions
```typescript
import { trackFormSubmission } from '@/lib/analytics';

trackFormSubmission('Contact Form', {
  package: formData.package_choice,
  company: formData.company
});
```

### Button Clicks
```typescript
import { trackButtonClick } from '@/lib/analytics';

trackButtonClick('Pricing CTA', 'Pricing Section');
```

### Newsletter Signups
```typescript
import { trackNewsletterSubscription } from '@/lib/analytics';

trackNewsletterSubscription(email);
```

### Chat Interactions
```typescript
import { trackChatEvent } from '@/lib/analytics';

trackChatEvent('open', 'User opened chatbot');
trackChatEvent('message_sent', 'First message');
trackChatEvent('close', 'User closed chatbot');
```

### Review Submissions
```typescript
import { trackReviewSubmission } from '@/lib/analytics';

trackReviewSubmission(rating); // 1-5
```

### Purchases/Conversions
```typescript
import { trackPurchase } from '@/lib/analytics';

trackPurchase(5000, 'NPR', 'ORDER_123');
```

### Outbound Links
```typescript
import { trackOutboundLink } from '@/lib/analytics';

trackOutboundLink('https://wa.me/...', 'WhatsApp Chat');
```

---

## 🗂️ File Structure

```
unvika-project/
│
├── src/
│   ├── components/
│   │   ├── Analytics.tsx              ← Main tracking component
│   │   ├── HeroSection.tsx            ← ✅ Events added
│   │   ├── ChatBot.tsx                ← Add chat tracking
│   │   └── TestimonialSection.tsx     ← Add review tracking
│   │
│   ├── lib/
│   │   └── analytics.ts               ← Event tracking utilities
│   │
│   ├── app/
│   │   ├── layout.tsx                 ← ✅ Analytics integrated
│   │   ├── contact/
│   │   │   └── page.tsx               ← Add form tracking
│   │   └── api/
│   │       └── newsletter/
│   │           └── subscribe/
│   │               └── route.ts       ← Add newsletter tracking
│   │
│   └── .env.local                     ← Add your tracking IDs
│
├── ANALYTICS_SUMMARY.md               ← Overview (start here)
├── ANALYTICS_SETUP_GUIDE.md           ← Detailed setup instructions
└── TRACKING_IMPLEMENTATION_GUIDE.md   ← Code examples
```

---

## 📖 Documentation

### 📄 ANALYTICS_SUMMARY.md
**Quick overview** of what's installed and next steps

### 📄 ANALYTICS_SETUP_GUIDE.md
**Step-by-step guide** for:
- Getting tracking IDs
- Configuring environment variables
- Verifying installation
- Testing events
- Monitoring data

### 📄 TRACKING_IMPLEMENTATION_GUIDE.md
**Code snippets** for adding tracking to:
- Forms
- Buttons
- Chat
- Video
- Social links
- Reviews

---

## 🧪 Testing Your Setup

### Test 1: Real-Time Page Views

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Reports** → **Realtime** → **Overview**
3. Open your website
4. You should see yourself as an active user within 10 seconds

### Test 2: Event Tracking

1. Click your Hero CTA button
2. In GA4 Realtime, go to **Events**
3. Look for `cta_click` event
4. Should appear within 30 seconds

### Test 3: Hotjar Recording

1. Go to [Hotjar Dashboard](https://insights.hotjar.com/)
2. Navigate your site for 30 seconds
3. Go to **Recordings**
4. Your session should appear within 2-3 minutes

### Test 4: Facebook Pixel

1. Install **Facebook Pixel Helper** browser extension
2. Visit your website
3. Extension icon should show green checkmark
4. Click it to see active events

---

## 🔍 Troubleshooting

### Issue: "No data in GA4"

**Check:**
- [ ] `.env.local` exists and has `NEXT_PUBLIC_GA_ID=G-...`
- [ ] Dev server was restarted after creating `.env.local`
- [ ] ID starts with `G-` not `UA-`
- [ ] Browser console shows no errors

**Fix:**
```bash
# Verify environment variable is loaded
echo $NEXT_PUBLIC_GA_ID  # Should show your GA4 ID

# If empty, restart dev server
npm run dev
```

### Issue: "Hotjar not recording"

**Check:**
- [ ] `NEXT_PUBLIC_HOTJAR_ID` is just numbers (no quotes)
- [ ] Hotjar free plan is activated
- [ ] Ad blocker is disabled
- [ ] Waited 2-3 minutes for recordings to appear

### Issue: "Facebook Pixel not firing"

**Check:**
- [ ] Pixel ID is correct (15-16 digits)
- [ ] No ad blockers enabled
- [ ] Facebook Pixel Helper extension installed
- [ ] Console shows `fbq` function exists

**Test in console:**
```javascript
// Run in browser console
typeof fbq === 'function' // Should return true
typeof gtag === 'function' // Should return true
typeof hj === 'function' // Should return true
```

---

## 📊 Data Collection Timeline

| Service | When Data Appears |
|---------|-------------------|
| **GA4 Realtime** | 10-30 seconds |
| **GA4 Standard Reports** | 24-48 hours |
| **Hotjar Recordings** | 2-3 minutes |
| **Hotjar Heatmaps** | 24 hours (min 30 pageviews) |
| **Facebook Pixel** | Instant (in Test Events) |
| **Facebook Insights** | 24 hours |

---

## 🎯 Recommended Implementation Order

### Week 1: Core Tracking
- [x] Page views (automatic)
- [x] Hero CTA click
- [x] Video play
- [ ] Contact form submission
- [ ] Newsletter signup

### Week 2: Engagement
- [ ] Chat interactions
- [ ] Review submissions  
- [ ] Pricing CTA clicks
- [ ] Social link clicks

### Week 3: Advanced
- [ ] Scroll depth tracking
- [ ] FAQ interactions
- [ ] Custom funnels in GA4
- [ ] Conversion goals setup

---

## 🚀 Going Live (Production Deployment)

When deploying to Vercel/Netlify:

### 1. Add Environment Variables

In your hosting dashboard:

**Vercel:**
- Settings → Environment Variables
- Add all `NEXT_PUBLIC_*` variables

**Netlify:**
- Site Settings → Environment Variables  
- Add all `NEXT_PUBLIC_*` variables

### 2. Update Tracking Filters

In GA4:
- Admin → Data Filters
- Exclude internal traffic (your IP)

In Hotjar:
- Settings → Privacy
- Exclude pages if needed

### 3. Verify Production Tracking

After deployment:
- Visit your live site
- Check GA4 Realtime (different from localhost)
- Verify events are firing

---

## 📈 Advanced Features

### Custom Funnels (GA4)

1. Go to **Explore** → **Funnel exploration**
2. Add steps:
   - Homepage visit
   - CTA click
   - Contact page view
   - Form submission
3. Analyze drop-off rates

### Conversion Goals

1. Go to **Admin** → **Events**
2. Mark these as conversions:
   - `form_submit`
   - `cta_click`
   - `newsletter_subscribe`
   - `purchase`

### Custom Audiences (Facebook)

1. Events Manager → Audiences
2. Create custom audience:
   - Website visitors (last 30 days)
   - Form submitters
   - Video watchers

---

## 🎓 Learning Resources

- **GA4 Academy:** https://analytics.google.com/analytics/academy/
- **Hotjar Academy:** https://learn.hotjar.com/
- **Facebook Blueprint:** https://www.facebook.com/business/learn

---

## ✅ Success Checklist

Before marking as complete:

- [ ] All tracking IDs added to `.env.local`
- [ ] Dev server restarted
- [ ] Saw yourself in GA4 Realtime
- [ ] Hero CTA tracking verified
- [ ] Video play tracking verified
- [ ] Contact form tracking added
- [ ] Newsletter tracking added
- [ ] No console errors
- [ ] Browser extensions installed for testing
- [ ] Production environment variables configured

---

## 📞 Need Help?

1. **Check Console First** - Most issues show errors in browser console (F12)
2. **Review Guides** - Read ANALYTICS_SETUP_GUIDE.md for detailed instructions
3. **Test in Incognito** - Eliminates browser extension interference
4. **Use Extensions** - Install GA Debugger, Pixel Helper for real-time feedback

---

**Version:** 1.0  
**Last Updated:** 2026-01-12  
**Status:** ✅ Core tracking installed, ready for configuration
