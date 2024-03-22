import Image from "next/image";
import Link from "next/link";

const Brand = ({ ...props }) => (
  <Link className="flex items-center" href="/">
    <Image
      src="/logo.svg"
      alt="Mailgo logo"
      {...props}
      width={44}
      height={44}
      priority
    />
    <span className="text-slate-100 fz-20 text-xl ml-4">星辉</span>
  </Link>
);
export default Brand;
