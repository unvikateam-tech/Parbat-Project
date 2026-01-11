import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import BenefitCards from "../components/BenefitCards";
import OurWorkSection from "../components/OurWorkSection";
import PricingSection from "../components/PricingSection";
import PortfolioSection from "../components/PortfolioSection";
import TestimonialSection from "../components/TestimonialSection";
import DailyVideosSection from "../components/DailyVideosSection";
import ProcessTimelineSection from "../components/ProcessTimelineSection";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="app" style={{ minHeight: '100vh', width: '100%' }}>
            <Header />
            <HeroSection />
            <AboutSection />
            <BenefitCards />
            <OurWorkSection />
            <PricingSection />
            <PortfolioSection />
            <TestimonialSection />
            <DailyVideosSection />
            <ProcessTimelineSection />
            <FAQSection />
            <Footer />
        </div>
    );
}
