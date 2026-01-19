# 📝 Analytics Quick Reference Card

## 🚀 5-Minute Setup

```bash
# 1. Create environment file
cp .env.analytics.template .env.local

# 2. Add your tracking IDs
# Edit .env.local with your IDs

# 3. Restart server
npm run dev

# 4. Test
# Open http://localhost:3000
# Check GA4 Realtime
```

---

## 🔑 Where to Get Tracking IDs

| Service | URL | ID Format |
|---------|-----|-----------|
| **GA4** | https://analytics.google.com/ | `G-ABC123DEF4` |
| **Hotjar** | https://www.hotjar.com/ | `3456789` |
| **Facebook** | https://business.facebook.com/events_manager/ | `123456789012345` |
| **Google Ads** | https://ads.google.com/ | `AW-987654321` |

---

## 📊 Tracking Functions

### Import
```typescript
import { 
  trackCTAClick,
  trackFormSubmission,
  trackNewsletterSubscription,
  trackChatEvent,
  trackVideoPlay,
  trackButtonClick,
  trackReviewSubmission,
  trackPurchase,
  trackOutboundLink
} from '@/lib/analytics';
```

### Usage Examples

**Button Click:**
```typescript
onClick={() => trackCTAClick('Button Name', '/destination')}
```

**Form Submit:**
```typescript
trackFormSubmission('Form Name', { field1: value1 });
```

**Newsletter:**
```typescript
trackNewsletterSubscription(email);
```

**Chat:**
```typescript
trackChatEvent('open', 'Chat opened');
```

**Video:**
```typescript
trackVideoPlay('Video Name', 0);
```

**Review:**
```typescript
trackReviewSubmission(rating); // 1-5
```

**Purchase:**
```typescript
trackPurchase(5000, 'NPR', 'ORDER_123');
```

**Link:**
```typescript
trackOutboundLink(url, 'Link Text');
```

---

## 🧪 Testing Checklist

- [ ] No errors in Console (F12)
- [ ] Scripts loaded in Network tab
- [ ] Saw myself in GA4 Realtime
- [ ] Browser extensions installed
- [ ] Events firing correctly

---

## 📍 File Locations

**Core Files:**
- `src/components/Analytics.tsx` - Main tracking
- `src/lib/analytics.ts` - Event functions
- `src/app/layout.tsx` - Integration point

**Docs:**
- `START_HERE_ANALYTICS.md` - Overview
- `README_ANALYTICS.md` - Master guide
- `ANALYTICS_SETUP_GUIDE.md` - Detailed setup
- `TRACKING_IMPLEMENTATION_GUIDE.md` - Code examples

---

## 🔍 Quick Troubleshooting

**No data in GA4?**
- Check `.env.local` has correct ID
- ID starts with `G-` not `UA-`
- Restart dev server
- Clear browser cache

**Hotjar not recording?**
- ID is numbers only (no quotes)
- Wait 2-3 minutes
- Disable ad blocker

**Facebook Pixel not working?**
- Install Pixel Helper extension
- Check Pixel ID is correct
- Disable ad blocker

---

## 📊 Where to View Data

**GA4 Realtime:** https://analytics.google.com/ → Reports → Realtime  
**Hotjar Recordings:** https://insights.hotjar.com/ → Recordings  
**Facebook Events:** https://business.facebook.com/events_manager/

---

## ✅ Implementation Status

- [x] Page views (automatic)
- [x] Hero CTA click
- [x] Video play
- [ ] Contact form
- [ ] Newsletter
- [ ] Chat events
- [ ] Reviews
- [ ] Pricing CTAs

---

## 🎯 Priority Order

1. ✅ Hero CTA (done)
2. ✅ Video (done)
3. ⬜ Contact form
4. ⬜ Newsletter
5. ⬜ Chat
6. ⬜ Reviews
7. ⬜ Social links

---

## 🔧 Environment Variables

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=1234567
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
```

---

## 🌐 URLs for Setup

**Google Analytics:** https://analytics.google.com/  
**Hotjar:** https://www.hotjar.com/  
**Facebook Business:** https://business.facebook.com/  
**Google Ads:** https://ads.google.com/

---

## 📞 Help & Support

1. Check browser Console (F12)
2. Read `ANALYTICS_SETUP_GUIDE.md`
3. Test in Incognito mode
4. Use browser extensions for debugging

---

**Print this card and keep it handy!**
