import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NavHeader from "../NavHeader";
import NavLink from "../NavLink";
import { useRouter } from "next/router";

import { Tooltip, Button } from "@nextui-org/react";

import { Listbox, ListboxItem } from "@nextui-org/react";

const Navbar = () => {
  const [state, setState] = useState(false);
  const router = useRouter();
  const menuBtnEl = useRef();

  const [name, setName] = useState("");

  const [navigation, setNavigation] = useState([
    { name: "留学申请", href: "/#application" },
    { name: "新加坡服务", href: "/#singapore" },
    { name: "游学服务", href: "/#studytour" },
    { name: "公司简介", href: "/#faqs" },
    { name: "课程学习", href: "/course" },
  ]);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!menuBtnEl.current.contains(target)) setState(false);
    };
    const username = localStorage.getItem("username");
    if (username) {
      setName(username);
    }
    const handleRouteChange = () => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setName(storedUsername);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <header className="fixed z-50 bg-lime-900 w-full" style={{ zIndex: 10000 }}>
      <div className="custom-screen md:hidden">
        <NavHeader
          menuBtnEl={menuBtnEl}
          state={state}
          onClick={() => setState(!state)}
        />
      </div>
      <nav
        className={`md:text-sm md:static md:block ${
          state
            ? "bg-lime-900 absolute z-20 top-0 inset-x-0 rounded-b-2xl shadow-xl md:bg-lime-900"
            : "hidden"
        }`}
      >
        <div className="custom-screen items-center md:flex">
          <NavHeader state={state} onClick={() => setState(!state)} />
          <div
            className={`flex-1 items-center mt-8 text-gray-300 md:font-medium md:mt-0 md:flex ${
              state ? "block" : "hidden"
            } `}
          >
            <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className="hover:text-gray-50">
                    <Link href={item.href} className="block">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
              {/* <Link href="/login" className="block hover:text-gray-50">
                                Sign in
                            </Link> */}
              {name ? (
                <Tooltip
                  showArrow
                  placement="bottom"
                  content={
                    <div className="w-full max-w-[260px]">
                      <Listbox
                        aria-label="Actions"
                        onAction={(key) => {
                          localStorage.setItem("username", "");
                          localStorage.setItem("access", "");
                          setName("");
                          router.push("/login");
                        }}
                      >
                        <ListboxItem key="new">退出登录</ListboxItem>
                      </Listbox>
                    </div>
                  }
                >
                  <span className="cursor-pointer">{name}</span>
                </Tooltip>
              ) : (
                <NavLink
                  href="/login"
                  className="flex items-center justify-center gap-x-1 text-sm text-white font-medium custom-btn-bg border border-gray-500 active:bg-lime-900 md:inline-flex"
                >
                  登录
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
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
