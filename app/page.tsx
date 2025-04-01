import HeroSection from "@/components/home/HeroSection";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import RecentReviews from "@/components/home/RecentReviews";

export default function Home() {
  return (
    <div className="h-full overflow-y-auto snap-y snap-mandatory">
      <div className="snap-start h-screen">
        <HeroSection />
      </div>
      <div className="snap-start h-screen">
        <FeaturedBooks />
      </div>
      <div className="snap-start h-screen">
        <RecentReviews />
      </div>
    </div>
  );
}
