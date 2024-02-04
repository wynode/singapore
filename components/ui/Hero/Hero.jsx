import GradientWrapper from "@/components/GradientWrapper";
import Image from "next/image";
import NavLink from "../NavLink";
import HeroImg from "@/public/images/singapore_light.jpg";
import LayoutEffect from "@/components/LayoutEffect";
import Singapore from "./Singapore.jsx";

const Hero = () => (
  <section className="pt-24" id="application">
    <Singapore></Singapore>
    <div className="custom-screen">
      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
        <div>
          <div className="space-y-5 max-w-3xl mx-auto text-center z-20 relative pt-36 pb-52">
            <h1
              className="text-4xl bg-clip-text text-transparent bg-gradient-to-r font-extrabold mx-auto sm:text-6xl p-4"
              style={{
                backgroundImage:
                  "linear-gradient(179.1deg, #FFFFFF 0.77%, rgba(255, 255, 255, 0) 182.09%)",
              }}
            >
              开启您的新加坡留学之旅
            </h1>
            <p className="max-w-xl mx-auto text-gray-300">
              星辉提供全程陪护，让我们带您领略世界级教育的魅力
            </p>
            <div
              className="flex justify-center font-medium text-sm"
              style={{ marginTop: "60px" }}
            >
              <NavLink
                href="/#pricing"
                className="flex items-center text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700 "
                style={{ padding: "10px 16px 10px 20px" }}
              >
                立即申请
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </NavLink>
            </div>
          </div>
          <GradientWrapper
            // className="mt-16 sm:mt-28"
            wrapperClassName="max-w-3xl h-[250px] top-12 inset-0 sm:h-[300px] lg:h-[650px]"
          >
            <Image
              src={HeroImg}
              className="shadow-lg rounded-2xl"
              alt="Mailgo"
            />
          </GradientWrapper>
        </div>
      </LayoutEffect>
    </div>
  </section>
);

export default Hero;
