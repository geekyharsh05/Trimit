import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/LandingPage/HeroSection";
import FeaturesSection from "@/components/LandingPage/FeaturesSection";
import FAQSection from "@/components/LandingPage/FAQSection";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };

  return (
    <>
      <div className="mt-[-20px] md:mt-[-60px] lg:mt-[-80px]">
        <HeroSection
          handleShorten={handleShorten}
          longUrl={longUrl}
          setLongUrl={setLongUrl}
        />
        <FeaturesSection />
        <FAQSection />
      </div>
    </>
  );
};

export default LandingPage;
