// import CTA from "@/components/ui/CTA";
import FAQs from "@/components/ui/FAQs";
// import Features from "@/components/ui/Features";
// import Pricing from "@/components/ui/Pricing";
import Journey from "@/components/ui/Journey";
// import VisualFeatures from "@/components/ui/VisualFeatures";
import Hero from "@/components/ui/Hero";
import Singapore from "@/components/ui/Singapore";
import StudyTour from "@/components/ui/StudyTour";
import PromoteHeader from "@/components/ui/PromoteHeader";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Promote from "@/components/ui/Promote";

export default function Home() {
  const { theme } = useTheme();
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
    fetch("https://api.luminoussg.com/official_website/1/").then((res) => {
      res.json().then((json) => {
        setInfo(json.extra_info);
        localStorage.setItem("extraInfo", JSON.stringify(json.extra_info));
      });
    });
  }, []);
  return (
    <div className={theme === "dark" ? "bg-gray-900" : "bg-white"}>
      <Hero info={info} />
      <Singapore info={info}></Singapore>
      <StudyTour info={info}></StudyTour>
      <Journey info={info} />
      {/* <VisualFeatures />
      <Features />
      <CTA />
      <Testimonial />
      <Pricing /> */}
      <PromoteHeader info={info} />
      <Promote info={info} />
      <FAQs info={info} />
    </div>
  );
}
