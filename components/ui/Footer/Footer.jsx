import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`pt-20 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="custom-screen">
        <div
          className={`mt-10 py-8 border-t items-center justify-between sm:flex ${
            theme === "dark"
              ? "border-gray-800 text-gray-400"
              : "border-gray-800 text-gray-800"
          }`}
        >
          <p className={`text-center ${theme === "dark" ? "" : " "}`}>
            © 2024 Copyright. 新光出入境版权所有 ｜
            <Link href="https://beian.miit.gov.cn/" target="_blank">
              豫ICP备2024054303号
            </Link>
          </p>
          <div className="flex items-center justify-center gap-x-6  mt-6 sm:mt-0">
            {/* <a href="/" target="_blank" aria-label="social media">
              <svg
                className="w-6 h-6 hover:text-gray-200 duration-150"
                fill="none"
                viewBox="0 0 48 48"
              >
                <g clip-path="url(#a)">
                  <path
                    fill="currentColor"
                    d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.75V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.978 48 24z"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="currentColor" d="M0 0h48v48H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a href="/" target="_blank" aria-label="social media">
              <svg
                className="w-6 h-6 hover:text-gray-200 duration-150"
                fill="none"
                viewBox="0 0 48 48"
              >
                <g clip-path="url(#clip0_17_80)">
                  <path
                    fill="currentColor"
                    d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_80">
                    <path fill="currentColor" d="M0 0h48v48H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a> */}
            {/* <a href="/" target="_blank" aria-label="social media">
              <svg
                className=" w-6 h-6  duration-150"
                t="1707055108966"
                viewBox="0 0 1049 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4235"
                width="40"
                height="40"
              >
                <path
                  d="M2.778359 0zM763.377135 502.533926q-15.744776-3.155041-20.445007-9.433743t-1.57752-11.548515l3.15504-5.237482q1.04027-1.04027 2.114772-3.155041t4.197212-8.929773 4.733512-13.630005 2.61779-16.785046-0.5363-18.900768-6.311983-19.404738-13.126986-18.900768q-14.703556-14.703556-38.305506-18.900768t-47.202949-0.5363-44.582307 9.433744-34.612263 11.012215l-13.630005 6.311983q-10.507294 3.155041-17.323247 4.197213t-10.507294-0.5363-5.774733-3.155041-1.57752-7.352253 1.040269-9.970044 2.61779-13.126986 3.155041-14.167256q0-12.588784-1.57752-23.600048t-6.815003-24.641269-15.208476-22.023478-25.17947-13.630005-39.346727-3.155041-54.554251 12.588784q-36.727034 12.588784-74.494339 37.231004t-65.564564 51.397309-50.89429 51.935511-35.686765 40.924246l-11.548515 16.785046q-34.612263 45.120508-51.397309 90.240066t-15.744776 68.185207v22.023479q6.311984 50.357039 30.952302 90.240065t58.750513 64.524295 80.269071 41.964516 88.662545 25.179471 89.703765 11.012215q77.651281 6.311984 161.042112-12.052485t155.269281-63.484025T849.383855 693.395834q17.826266-36.727034 18.364468-69.258758t-11.012215-52.97578-29.912032-36.190734-34.612263-23.09703-28.83753-9.433743zM443.405781 828.816314q-113.303814 5.237482-192.500285-44.079288t-79.19457-124.852328q0-74.494338 78.691551-128.51229t193.036585-59.287764 193.036585 37.767304 78.69155 117.500075q0 75.53651-80.269071 135.864543t-191.459064 65.564565zM412.99073 538.186459q-30.415051 3.155041-54.554252 14.167256t-37.767304 25.17947-23.097029 30.415051-13.126986 31.993522-4.733512 28.837531-1.04027 20.445007l1.04027 8.393474v4.197212q0 3.155041 2.114771 12.588784t5.774733 17.323248 12.052484 17.323247 19.941989 15.744777q69.258758 33.571993 129.04859 20.445007t96.517817-60.327083q14.703556-17.826266 19.404737-44.079287t-2.114771-52.975781-23.600048-48.779518-49.820739-34.109245-76.073761-6.815002z m-37.769206 198.308299q-6.311984 1.04027-12.052484 0.5363t-10.507294-2.114771-9.433744-3.65806-7.855272-5.774733-5.774733-7.352253-4.197212-8.393474-1.577521-9.970043q0-11.548515 6.311984-22.559779t17.323248-18.900768 24.641268-8.929774q9.433743-1.04027 18.364468 0.5363t15.208477 5.237482 11.012215 8.393474 6.815002 11.012215 2.114771 13.630005q0 11.548515-6.815002 22.023479t-18.364468 17.826266-25.179471 8.393474z m89.166515-75.53651q-7.352253 5.237482-15.208476 4.733513t-11.012215-6.815003l-2.114771-4.197212q-1.04027-2.114771-1.04027-4.197213v-4.197212q0-3.155041 1.04027-5.237482l2.114771-4.197212q1.04027-2.114771 3.155041-3.155041l3.155041-4.197213q8.393474-6.311984 16.248746-5.237482t11.012214 8.393474q3.155041 4.197212 2.617791 9.433744t-3.155041 9.970043-6.815003 8.929774z m372.443165-219.289606q6.311984 0 11.548515-3.155041t8.393474-7.855272 4.197212-9.970043q1.04027-1.04027 1.04027-3.155041 12.588784-119.615797-83.929984-136.400843-28.334511-5.237482-52.471811-1.04027-7.352253 0-12.588784 3.65806t-8.929774 9.433743-3.658059 12.052485q0 10.507294 7.352253 17.826266t17.826266 7.352253q81.847542-18.900768 88.125294 52.471811 2.114771 17.826266-2.114771 33.571993 0 10.507294 7.352253 17.826267t17.826267 7.352253z m-17.826266-295.833104q-46.160778-10.507294-123.812059 4.197212-1.04027 0-2.114771 1.04027l-1.04027 2.114771-1.04027 1.040269q-11.548515 3.155041-18.900768 13.126986t-7.352253 21.518559q0 15.744776 10.507294 26.21974t25.179471 10.507294h3.155041q1.04027 0 4.733512-1.04027t7.855272-1.57752 8.929774-2.114771 8.393474-3.155041 14.167255-1.577521 25.715771 1.577521 33.571993 7.855272 36.727034 15.744776 36.727035 26.21974 31.993522 38.808525q27.294242 61.906505 10.507294 119.615797 0 1.04027-0.5363 2.114771t-1.57752 5.237482-2.114772 7.855272-2.114771 9.433744-1.04027 9.970043q0 9.433743 5.237482 15.744776t13.126987 8.929774 18.364468 2.61779q29.375732 0 34.612263-35.686765 12.588784-40.924247 14.167255-78.15525t-5.237482-65.564565-20.445007-52.97578-31.489552-41.964517-39.883026-31.489552-42.501768-22.559778-42.501767-13.630005z"
                  p-id="4236"
                  fill="#bfbfbf"
                ></path>
              </svg>
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
