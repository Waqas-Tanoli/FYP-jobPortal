import HeroSection from "@/components/HeroSection";
import MembersHired from "@/components/MembersHired";
import Ratings from "@/components/ReviewSection/Ratings";
import ReviewCards from "@/components/ReviewSection/ReviewCards";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Ratings />
      <ReviewCards />
      <MembersHired />
    </div>
  );
}
