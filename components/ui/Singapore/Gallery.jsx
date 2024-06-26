import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useDisclosure } from "@nextui-org/react";
import ApplicationDialog from "../ApplicationDialog.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "@/contexts/ThemeContext";
import { notMobile } from "@/lib/utils";
import "react-toastify/dist/ReactToastify.css";

const Gallery = ({ info }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const handleSubmit = (formData) => {
    setIsLoading(true);
    fetch("https://api.luminoussg.com/study_abroad_application/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        current_region: `${formData.province}${formData.city}${formData.district}`,
      }),
    })
      .then((res) => {
        res.json().then((json) => {
          if (res.status === 400 || res.status === 401) {
            if (notMobile) {
              toast.error(JSON.stringify(json));
            }
            return;
          }
          if (json) {
            if (notMobile) {
              toast.success("提交申请成功！感谢您的信任！");
            }
            onClose(false);
          }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const singapore = info && info.singapore ? info.singapore[0] : { images: [] };
  return (
    <section className="w-full px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-24 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          {/* 更多一些 */}
        </span>
        <h3
          className={`text-4xl md:text-6xl font-semibold ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          }`}
        >
          {/* 启程新加坡，发现学习与探索的完美融合 */}
          {singapore.title}
        </h3>
        <p
          className={`text-base md:text-lg  my-4 md:my-6 ${
            theme === "dark" ? "text-slate-600" : "text-gray-800"
          }`}
        >
          {/* 新加坡游学服务致力于打造一个集教育、文化和冒险于一体的独特体验。在这里，我们不仅仅提供课堂学习，更开辟了一条发现新加坡独特魅力的新路径。我们的定制游学项目让学生们在新加坡这个多元文化的交汇点上，通过亲身体验来学习语言和文化，拓展国际视野，同时激发出对知识的渴望。 */}
          {singapore.desc}
        </p>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("nihao");
            onOpen();
          }}
          className={` text-white font-medium py-2 px-4 rounded transition-all  active:scale-95 ${
            theme === "dark"
              ? "bg-indigo-500 hover:bg-indigo-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          立即申请
        </button>

        <ApplicationDialog
          isLoading={isLoading}
          isOpen={isOpen}
          onOpenChange={onClose}
          onSubmit={handleSubmit}
        />
        {/* <ToastContainer style={{ zIndex: 10000 }} /> */}
      </div>
      <ShuffleGrid singapore={singapore} />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = (squareData) => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

let images = [];

const ShuffleGrid = ({ singapore }) => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    if (singapore && singapore.images.length) {
      images = singapore.images.map((item, index) => {
        return {
          id: index + 1,
          src: item,
        };
      });
      shuffleSquares();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [singapore]);

  const shuffleSquares = () => {
    setSquares(generateSquares(images));
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  const getClassName = () => {
    if (singapore.images.length < 5) {
      return "grid-cols-2 grid-rows-2";
    }
    if (singapore.images.length < 10) {
      return "grid-cols-3 grid-rows-3";
    }
    return "grid-cols-4 grid-rows-4";
  };

  return (
    <div
      className={cn(
        "grid grid-cols-4 grid-rows-4 h-[450px] gap-1",
        getClassName()
      )}
    >
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Gallery;
