import Image from "next/image";

const Brand = ({ ...props }) => (
  <a className="flex items-center">
    <Image
      src="/logo.svg"
      alt="Mailgo logo"
      {...props}
      width={44}
      height={44}
      priority
    />
    <span className="text-slate-100 fz-20 text-xl ml-4">星辉</span>
  </a>
);
export default Brand;
