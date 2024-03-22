// import CTA from "@/components/ui/CTA";
import FAQs from "@/components/ui/FAQs";
// import Features from "@/components/ui/Features";
// import Pricing from "@/components/ui/Pricing";
// import Testimonial from "@/components/ui/Testimonial";
// import VisualFeatures from "@/components/ui/VisualFeatures";
import Hero from "@/components/ui/Hero";
import Singapore from "@/components/ui/Singapore";
import StudyTour from "@/components/ui/StudyTour";
import { useEffect, useState } from "react";

export default function Home() {
  const [info, setInfo] = useState({
    home: [
      {
        title: "",
        desc: "",
        images: [],
      },
    ],
    singapore: [
      {
        title: "",
        desc: "",
        images: [],
      },
    ],
    tour: [
      {
        title: "",
        desc: "",
        images: [],
      },
    ],
    intro: [
      {
        title: "",
        desc: "",
        images: [],
      },
    ],
  });
  useEffect(() => {
    fetch("https://api.luminouscn.com/official_website/1/").then((res) => {
      res.json().then((json) => {
        setInfo(json.extra_info);
        localStorage.setItem("extraInfo", JSON.stringify(json.extra_info));
      });
    });
  }, []);
  return (
    <>
      <Hero info={info} />
      <Singapore info={info}></Singapore>
      <StudyTour info={info}></StudyTour>
      {/* <VisualFeatures />
      <Features />
      <CTA />
      <Testimonial />
      <Pricing /> */}
      <FAQs info={info} />
    </>
  );
}
