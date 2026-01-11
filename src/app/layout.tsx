import type { Metadata } from "next";
import { Inter, Barlow } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
    display: 'swap',
});

const barlow = Barlow({
    subsets: ["latin"],
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-barlow',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: "Unvika | Premium AI Automation & Marketing for Nepali SMEs",
        template: "%s | Unvika"
    },
    description: "Scale your local business in Nepal for just 5,000 NPR/month. Functional working websites, Google optimization, lead automation, and 24/7 AI support for Nepali SMEs.",
    keywords: ["AI Automation Nepal", "SME Marketing Nepal", "Lead Generation Nepal", "Nepali Business Growth", "Affordable Web Design Nepal", "Google Business Optimization Nepal", "Best AI Agency Nepal", "Digital Transformation Nepal"],
    authors: [{ name: "Unvika Team" }],
    creator: "Unvika",
    publisher: "Unvika",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Unvika | Premium AI Automation & Marketing for Nepali SMEs",
        description: "Join 70+ local businesses growing with Unvika's 5,000 NPR/month growth package. AI-powered websites, lead automation, and 24/7 support.",
        url: 'https://unvika.com',
        siteName: 'Unvika',
        locale: 'en_NP',
        type: 'website',
        images: [
            {
                url: '/og-image.png', // Ensure this image exists in public folder
                width: 1200,
                height: 630,
                alt: 'Unvika - Empowering Nepali SMEs',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Unvika | Scale Your Nepali SME',
        description: "Scale your local business in Nepal for just 5,000 NPR/month with Unvika's AI-powered growth tools.",
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

import ChatBot from "../components/ChatBot";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Unvika",
        "url": "https://unvika.com",
        "logo": "https://unvika.com/unvika-logo.png",
        "description": "Premium AI Automation & Marketing for Nepali SMEs. Affordable growth engines for just 5,000 NPR/month.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "NP"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "areaServed": "NP",
            "availableLanguage": ["English", "Nepali"]
        },
        "offers": {
            "@type": "Offer",
            "name": "SME Growth Plan",
            "price": "5000",
            "priceCurrency": "NPR",
            "description": "Includes functional website, Google Business optimization, lead automation, and 24/7 AI support."
        }
    };

    return (
        <html lang="en">
            <head>
                <Script
                    id="json-ld"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.variable} ${barlow.variable}`}>
                <div className="bg-grid"></div>
                {/* Background Spotlights */}
                <div className="bg-spotlight bg-spotlight-1"></div>
                <div className="bg-spotlight bg-spotlight-2"></div>
                <div className="bg-spotlight bg-spotlight-3"></div>
                <div className="bg-spotlight bg-spotlight-4"></div>
                {children}
                <ChatBot />
            </body>
        </html>
    );
}
