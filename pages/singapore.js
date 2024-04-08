import Singapore from "@/components/ui/Singapore";
import LowSchool from "@/components/ui/LowSchool";
import HighSchool from "@/components/ui/HighSchool";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

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
      <Singapore info={info}></Singapore>
      <LowSchool info={info}></LowSchool>
      <HighSchool info={info}></HighSchool>
    </div>
  );
}
