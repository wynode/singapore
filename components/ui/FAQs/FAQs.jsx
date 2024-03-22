import LayoutEffect from "@/components/LayoutEffect";
import SectionWrapper from "@/components/SectionWrapper";

// const faqsList = [
//   {
//     q: "我们是谁？",
//     a: "星辉出入境服务（河南）有限公司是一家小微企业，该公司成立于2023年09月11日，位于河南自贸试验区郑州片区（郑东）祥盛街39号祥盛小区2号楼2单元12层108号，目前处于开业状态，经营范围包括一般项目：因私出入境中介服务；会议及展览服务；组织文化艺术交流活动；票务代理服务；旅客票务代理等。",
//   },
//   {
//     q: "我们的实力怎么样",
//     a: "综合全网数据暂时还未掌握到星辉出入境服务（河南）有限公司拥有知识产权信息，推测该企业在一般项目：因私出入境中介服务；会议及展览服务；组织文化艺术交流活动等方面还有很大的创新能力提升空间。",
//   },
//   {
//     q: "我们有多少人?",
//     a: "星辉出入境服务（河南）有限公司法定代表人为康迎伟，康迎伟担任财务负责人，执行董事兼总经理，姚家乐担任监事。",
//   },
// ];

const FAQs = ({ info }) => {
  const faqsList =
    info && info.intro
      ? info.intro.map((item) => {
          return {
            q: item.title,
            a: item.desc,
          };
        })
      : [];
  return (
    <SectionWrapper id="faqs">
      <div className="custom-screen text-gray-300 py-40">
        <div className="max-w-xl text-center xl:mx-auto">
          <h2 className="text-gray-50 text-3xl font-extrabold sm:text-4xl">
            您想知道的都在这里
          </h2>
          {/* <p className="mt-3">
                    Here are the most questions people always ask about.
                </p> */}
        </div>
        <div className="mt-12">
          <LayoutEffect
            className="duration-1000 delay-300"
            isInviewState={{
              trueState: "opacity-1",
              falseState: "opacity-0 translate-y-12",
            }}
          >
            <ul className="space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3">
              {faqsList.map((item, idx) => (
                <li key={idx} className="space-y-3">
                  <summary className="flex items-center justify-between font-semibold text-gray-100">
                    {item.q}
                  </summary>
                  <p
                    dangerouslySetInnerHTML={{ __html: item.a }}
                    className="leading-relaxed"
                  ></p>
                </li>
              ))}
            </ul>
          </LayoutEffect>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQs;
