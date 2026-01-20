import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import VideoOverviewSection from "../components/VideoOverviewSection";
import RealitySection from "../components/RealitySection";
import ServicesShowcase from "../components/ServicesShowcase";
import TestimonialSection from "../components/TestimonialSection";
import DailyVideosSection from "../components/DailyVideosSection";

export default function Home() {
    return (
        <main>
            <Header />
            <HeroSection />
            <VideoOverviewSection />
            <RealitySection />
            <ServicesShowcase />
            <TestimonialSection />
            <DailyVideosSection />
        </main>
    );
}
