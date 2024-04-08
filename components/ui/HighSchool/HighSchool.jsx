import SectionWrapper from "@/components/SectionWrapper";
import GradientWrapper from "@/components/GradientWrapper";
import { useTheme } from "@/contexts/ThemeContext";
import { Tooltip, Link } from "@nextui-org/react";
import Image from "next/image";
import LayoutEffect from "@/components/LayoutEffect";

const Testimonial = ({ info }) => {
  const { theme } = useTheme();
  const schoolList = info && info.highSchool ? info.highSchool : [];
  // const testimonials = [
  //     {
  //         avatar: user1,
  //         name: "Mark Zuckerberg",
  //         title: "Founder of meta",
  //         quote: "we've been using Mailgo for almost a year now and have nothing but great things to say. It's super easy to set up campaigns and its reporting features are incredibly detailed."
  //     },

  // ]

  return (
    <SectionWrapper>
      <div
        id="testimonials"
        className={`custom-screen ${
          theme === "dark" ? "text-gray-300" : "text-gray-800"
        }`}
      >
        <div className="max-w-2xl text-center md:mx-auto">
          <h2
            className={` text-3xl font-semibold sm:text-4xl ${
              theme === "dark" ? "text-gray-50" : "text-gray-800"
            }`}
          >
            高等教育热门学校
          </h2>
        </div>
        <GradientWrapper
          wrapperClassName="max-w-sm h-40 top-12 inset-x-0"
          className="mt-20"
        >
          <LayoutEffect
            className="duration-1000 delay-300"
            isInviewState={{
              trueState: "opacity-1",
              falseState: "opacity-0 translate-y-12",
            }}
          >
            <ul className="grid gap-16 duration-1000 delay-300 ease-in-out sm:grid-cols-2 lg:grid-cols-3">
              {schoolList.map((item, idx) => (
                <li key={idx} className="p-4">
                  <figure className="flex flex-col justify-between items-center gap-y-6 h-full">
                    <Image
                      width={400}
                      height={400}
                      src={item.images[0]}
                      alt={item.title}
                      className="h-32 object-contain"
                    />
                    <Tooltip
                      className="capitalize"
                      content={<div className="max-w-[340px] p-4">{item.desc}</div>}
                    >
                      <Link href={item.href} target="_blank" underline="hover">
                        <span
                          className={` block text-center font-semibold ${
                            theme === "dark" ? "text-gray-50" : "text-gray-800"
                          }`}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        ></span>
                      </Link>
                    </Tooltip>
                  </figure>
                </li>
              ))}
            </ul>
          </LayoutEffect>
        </GradientWrapper>
      </div>
    </SectionWrapper>
  );
};

export default Testimonial;
