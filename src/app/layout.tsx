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
        default: "Parbat Raj Paudel | Tech Sales Funnel Expert & Strategist",
        template: "%s | Parbat Raj Paudel"
    },
    description: "I help businesses build and optimize high-converting sales funnels. From first touchpoint to final payment, I ensure your system maximizes revenue.",
    keywords: ["Parbat Raj Paudel", "Tech Sales Funnel Expert", "Sales Funnel Strategist", "Funnel Audit Nepal", "Lead Generation Expert", "Conversion Rate Optimization", "Sales Funnel Engineering"],
    authors: [{ name: "Parbat Raj Paudel" }],
    creator: "Parbat Raj Paudel",
    publisher: "Unvika",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Parbat Raj Paudel | Tech Sales Funnel Expert",
        description: "Build and optimize high-converting sales funnels with Parbat Raj Paudel. From first touchpoint to final payment, I ensure your system maximizes revenue.",
        url: 'https://unvika.com',
        siteName: 'Parbat Raj Paudel',
        locale: 'en_NP',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Parbat Raj Paudel - Sales Funnel Specialist',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Parbat Raj Paudel | Tech Sales Funnel Expert',
        description: "Build a predictable revenue engine with tech-driven sales funnels engineered by Parbat Raj Paudel.",
        images: ['/og-image.png'],
    },
    // ... robots remains the same
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
import Analytics from "../components/Analytics";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Unvika",
        "alternateName": "Parbat Raj Paudel",
        "url": "https://unvika.com",
        "logo": "https://unvika.com/unvika-logo.png",
        "description": "Tech-driven sales funnel engineering and conversion optimization led by specialist Parbat Raj Paudel.",
        "founder": {
            "@type": "Person",
            "name": "Parbat Raj Paudel",
            "jobTitle": "Tech Sales Funnel Expert",
            "url": "https://unvika.com/about"
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "NP"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "areaServed": "NP",
            "availableLanguage": ["English", "Nepali"]
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
                <Analytics />
                <ChatBot />
            </body>
        </html>
    );
}
