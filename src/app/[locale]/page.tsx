import { BrandIntro } from "@/components/sections/home/BrandIntro";
import { Certifications } from "@/components/sections/home/Certifications";
import { DeliveryAreas } from "@/components/sections/home/DeliveryAreas";
import { FarmGallery } from "@/components/sections/home/FarmGallery";
import { FeaturedProducts } from "@/components/sections/home/FeaturedProducts";
import { FreeSampleBanner } from "@/components/sections/home/FreeSampleBanner";
import { HeroCarousel } from "@/components/sections/home/HeroCarousel";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { OurEthos } from "@/components/sections/home/OurEthos";
import { OurPromise } from "@/components/sections/home/OurPromise";
import { Stats } from "@/components/sections/home/Stats";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { KolamDivider } from "@/components/ui/KolamDivider";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BrandIntro />
      <OurPromise />
      <OurEthos />
      <FeaturedProducts />
      <HowItWorks />
      <Stats />
      <FarmGallery />
      <Testimonials />
      <Certifications />
      <DeliveryAreas />
      <KolamDivider className="bg-cream rich:bg-sage-50" />
      <FreeSampleBanner />
    </>
  );
}
