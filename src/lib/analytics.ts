// Analytics Event Tracking Utilities

export type EventCategory =
    | 'engagement'
    | 'conversion'
    | 'navigation'
    | 'form_submission'
    | 'button_click'
    | 'video_interaction'
    | 'chat'
    | 'purchase';

export interface TrackEventParams {
    action: string;
    category: EventCategory;
    label?: string;
    value?: number;
    customParams?: Record<string, any>;
}

/**
 * Track custom events to GA4
 */
export const trackEvent = ({ action, category, label, value, customParams }: TrackEventParams) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
            ...customParams,
        });
    }
};

/**
 * Track Facebook Pixel custom events
 */
export const trackFBEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, params);
    }
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
    trackEvent({
        action: 'form_submit',
        category: 'form_submission',
        label: formName,
    });

    trackFBEvent('Lead', {
        content_name: formName,
        ...formData,
    });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent({
        action: 'click',
        category: 'button_click',
        label: buttonName,
        customParams: { button_location: location },
    });
};

/**
 * Track CTA clicks specifically
 */
export const trackCTAClick = (ctaName: string, destination?: string) => {
    trackEvent({
        action: 'cta_click',
        category: 'conversion',
        label: ctaName,
        customParams: { destination },
    });

    trackFBEvent('InitiateCheckout', {
        content_name: ctaName,
    });
};

/**
 * Track video interactions
 */
export const trackVideoPlay = (videoName: string, progress?: number) => {
    trackEvent({
        action: 'play',
        category: 'video_interaction',
        label: videoName,
        value: progress,
    });
};

/**
 * Track chat interactions
 */
export const trackChatEvent = (action: 'open' | 'message_sent' | 'close', details?: string) => {
    trackEvent({
        action,
        category: 'chat',
        label: details,
    });
};

/**
 * Track newsletter subscriptions
 */
export const trackNewsletterSubscription = (email?: string) => {
    trackEvent({
        action: 'newsletter_subscribe',
        category: 'conversion',
        label: 'newsletter_form',
    });

    trackFBEvent('Subscribe', {
        value: 1,
        currency: 'USD',
    });
};

/**
 * Track purchases/conversions
 */
export const trackPurchase = (value: number, currency: string = 'NPR', orderId?: string) => {
    trackEvent({
        action: 'purchase',
        category: 'purchase',
        value,
        customParams: {
            currency,
            transaction_id: orderId,
        },
    });

    trackFBEvent('Purchase', {
        value,
        currency,
    });
};

/**
 * Track page scroll depth
 */
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100) => {
    trackEvent({
        action: 'scroll',
        category: 'engagement',
        label: `${depth}%`,
        value: depth,
    });
};

/**
 * Track review submissions
 */
export const trackReviewSubmission = (rating: number) => {
    trackEvent({
        action: 'review_submit',
        category: 'engagement',
        label: `Rating: ${rating} stars`,
        value: rating,
    });
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (url: string, linkText?: string) => {
    trackEvent({
        action: 'outbound_click',
        category: 'navigation',
        label: linkText || url,
        customParams: { url },
    });
};

// TypeScript declarations
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        fbq: (...args: any[]) => void;
    }
}
