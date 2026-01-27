// app/page.jsx

import FeaturedCollections from "./components/FeaturedCollections";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <WhyChooseUs />
    </>
  );
}