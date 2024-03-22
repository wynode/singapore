import SectionWrapper from "@/components/SectionWrapper";
import GradientWrapper from "@/components/GradientWrapper";
import LayoutEffect from "@/components/LayoutEffect";
import Gallery from "./Gallery";

const Singapore = ({ info }) => {
  return (
    <SectionWrapper>
      <div id="studytour" className="custom-screen text-gray-300 pt-28 pb-8">
        <GradientWrapper
          wrapperClassName="max-w-sm h-40 top-12 inset-x-0"
          className="mt-12"
        >
          <LayoutEffect
            className="duration-1000 delay-300"
            isInviewState={{
              trueState: "opacity-1",
              falseState: "opacity-0 translate-y-12",
            }}
          >
            <Gallery info={info}></Gallery>
          </LayoutEffect>
        </GradientWrapper>
      </div>
    </SectionWrapper>
  );
};

export default Singapore;
