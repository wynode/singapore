// import CTA from "@/components/ui/CTA";
import FAQs from "@/components/ui/FAQs";
// import Features from "@/components/ui/Features";
// import Pricing from "@/components/ui/Pricing";
// import Testimonial from "@/components/ui/Testimonial";
// import VisualFeatures from "@/components/ui/VisualFeatures";
import Hero from "@/components/ui/Hero";
import Singapore from "@/components/ui/Singapore";
import StudyTour from "@/components/ui/StudyTour";

export default function Home() {
  return (
    <>
      <Hero />
      <Singapore></Singapore>
      <StudyTour></StudyTour>
      {/* <VisualFeatures />
      <Features />
      <CTA />
      <Testimonial />
      <Pricing /> */}
      <FAQs />
    </>
  );
}
