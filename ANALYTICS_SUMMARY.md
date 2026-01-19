# 📊 Analytics Tracking Summary

## ✅ What Has Been Installed

### 1. Core Tracking Components
- **Analytics.tsx** - Main tracking component with GA4, Hotjar, FB Pixel, and Google Ads
- **analytics.ts** - Event tracking utility functions
- **layout.tsx** - Integrated analytics into app-wide layout

### 2. Location of Code

```
unvika-project/
├── src/
│   ├── components/
│   │   └── Analytics.tsx          ← Main tracking component
│   ├── lib/
│   │   └── analytics.ts            ← Event tracking functions
│   └── app/
│       └── layout.tsx              ← Analytics integrated here
│
├── .env.analytics.template         ← Copy to .env.local
├── ANALYTICS_SETUP_GUIDE.md       ← Complete setup instructions
└── TRACKING_IMPLEMENTATION_GUIDE.md ← Where to add event tracking
```

---

## 🎯 What Gets Tracked Automatically

### ✅ Already Working (No Code Changes Needed):
1. **Page Views** - Every page load
2. **Route Changes** - Navigation between pages
3. **User Sessions** - Hotjar records user sessions
4. **Heatmaps** - Hotjar generates click/scroll heatmaps

### 🔧 Needs Implementation (Add Tracking Calls):
1. Button clicks (CTAs)
2. Form submissions
3. Newsletter signups
4. Review submissions
5. Chat interactions
6. Video plays
7. Outbound links

---

## 📝 Next Steps (In Order)

### Step 1: Get Your Tracking IDs (15 minutes)
- [ ] Sign up for Google Analytics 4
- [ ] Sign up for Hotjar
- [ ] Sign up for Facebook Business
- [ ] Sign up for Google Ads (optional)

### Step 2: Configure Environment (5 minutes)
- [ ] Copy `.env.analytics.template` to `.env.local`
- [ ] Fill in your tracking IDs
- [ ] Restart dev server: `npm run dev`

### Step 3: Verify Installation (10 minutes)
- [ ] Open website in browser
- [ ] Press F12 → Network tab
- [ ] Look for `gtag/js`, `hotjar`, `fbevents.js`
- [ ] Install browser extensions for testing

### Step 4: Add Event Tracking (30-60 minutes)
- [ ] Start with Hero CTA button (highest priority)
- [ ] Add Contact Form tracking
- [ ] Add Newsletter tracking
- [ ] Add other events as needed

### Step 5: Monitor & Optimize (Ongoing)
- [ ] Check GA4 Real-time reports daily
- [ ] Review Hotjar heatmaps weekly
- [ ] Create conversion funnels in GA4
- [ ] Optimize based on data

---

## 🛠️ Files You Need to Edit

For basic tracking implementation, edit these files:

### Priority 1 (Must Have):
1. **src/components/HeroSection.tsx** - Track main CTA clicks
2. **src/app/contact/page.tsx** - Track form submissions
3. **src/app/api/newsletter/subscribe/route.ts** - Track subscriptions

### Priority 2 (Should Have):
4. **src/components/ChatBot.tsx** - Track chat interactions
5. **src/components/TestimonialSection.tsx** - Track review submissions
6. **src/components/PricingSection.tsx** - Track pricing CTA clicks

### Priority 3 (Nice to Have):
7. **src/components/Footer.tsx** - Track social link clicks
8. **src/components/FAQSection.tsx** - Track FAQ interactions

---

## 📊 How to Monitor Your Tracking

### Google Analytics 4
**URL:** https://analytics.google.com/
- **Realtime Reports:** See current visitors and events
- **Engagement Reports:** Most viewed pages, events
- **Conversion Reports:** Track goal completions
- **Exploration:** Build custom funnels and reports

### Hotjar
**URL:** https://insights.hotjar.com/
- **Heatmaps:** See where users click and scroll
- **Recordings:** Watch actual user sessions
- **Feedback:** Collect user feedback via polls

### Facebook Events Manager
**URL:** https://business.facebook.com/events_manager/
- **Overview:** Total events and conversions
- **Test Events:** Real-time event debugging
- **Custom Conversions:** Setup conversion goals

### Google Ads
**URL:** https://ads.google.com/
- **Conversions:** Track form fills, purchases
- **Attribution:** See which ads drive conversions

---

## 🔍 Testing Checklist

Before going live, verify:

- [ ] **Page Views Work**
  - Open site, check GA4 Real-time
  - Should see 1 active user (you)

- [ ] **Route Changes Work**
  - Navigate between pages
  - Each navigation should log a pageview

- [ ] **Hotjar Loads**
  - Open F12 → Console
  - Type `hj` and press Enter
  - Should see a function (not "undefined")

- [ ] **Facebook Pixel Loads**
  - Install Facebook Pixel Helper extension
  - Visit site, extension should show green checkmark

- [ ] **No Console Errors**
  - Check Console tab for errors
  - Fix any red error messages

---

## 💡 Pro Tips

### For Best Results:
1. **Start Simple:** Get pageviews working first, then add events
2. **Test Locally:** Use `http://localhost:3000` for testing
3. **Use Incognito:** Prevents browser extensions from interfering
4. **Check Real-Time:** GA4 Real-time shows data within seconds
5. **Be Patient:** Hotjar recordings take 1-2 mins to appear

### Common Mistakes to Avoid:
❌ Forgetting to restart dev server after changing .env.local
❌ Using old UA-XXXXXXX IDs instead of new G-XXXXXXX
❌ Adding tracking IDs to .env instead of .env.local
❌ Not installing browser extensions for debugging
❌ Testing with ad blockers enabled

---

## 📞 Quick Support

**Issue:** No data in GA4
- Check `.env.local` has correct ID
- Verify ID starts with `G-` not `UA-`
- Clear browser cache
- Check Console for errors

**Issue:** Hotjar not recording
- Verify ID is just numbers
- Disable ad blocker
- Wait 2-3 minutes for recordings

**Issue:** Facebook Pixel not firing
- Install Pixel Helper extension
- Check Pixel ID is correct
- View Console for `fbq` errors

---

## 🎉 Success Metrics

Once fully configured, you'll be able to answer:

- 📈 **Traffic:** How many visitors per day?
- 🎯 **Engagement:** What pages do they visit most?
- 💰 **Conversions:** How many form submissions?
- 📧 **Email:** How many newsletter signups?
- ⭐ **Reviews:** How many reviews submitted?
- 💬 **Chat:** How many chat conversations?
- 🎥 **Video:** How many video plays?
- 📱 **Device:** Mobile vs Desktop usage?
- 🌍 **Location:** Where are visitors from?
- ⏱️ **Time:** When do most visitors come?

---

## 📚 Additional Resources

- **GA4 Setup:** https://support.google.com/analytics/answer/9304153
- **Hotjar Setup:** https://help.hotjar.com/hc/en-us/articles/115009336727
- **Facebook Pixel:** https://www.facebook.com/business/help/952192354843755
- **Google Ads:** https://support.google.com/google-ads/answer/1722022

---

**Last Updated:** 2026-01-12
**Version:** 1.0
