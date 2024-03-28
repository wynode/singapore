import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

const Brand = ({ ...props }) => {
  const { theme } = useTheme();
  return (
    <Link className="flex items-center" href="/">
      <Image
        src={`${theme === "dark" ? "/logo.svg" : "/images/logo.png"}`}
        alt="Mailgo logo"
        {...props}
        width={44}
        height={44}
        priority
      />
      <span
        className={`${
          theme === "dark" ? "text-white" : "text-black"
        } fz-20 text-xl ml-4`}
      >
        星辉
      </span>
    </Link>
  );
};
export default Brand;
