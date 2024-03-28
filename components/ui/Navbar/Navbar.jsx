import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NavHeader from "../NavHeader";
import NavLink from "../NavLink";
import { useRouter } from "next/router";
import { Tooltip, Button } from "@nextui-org/react";
import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import { useTheme } from "../../../contexts/ThemeContext";
import { cn } from "@/lib/utils";

import { Listbox, ListboxItem } from "@nextui-org/react";

const Navbar = ({ isCourse }) => {
  const [state, setState] = useState(false);
  const router = useRouter();
  const menuBtnEl = useRef();
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark"; // 判断当前主题是否为深色
  console.log(isDarkMode);
  // 自定义开关属性
  const switchProps = {
    isSelected: isDarkMode,
    checked: isDarkMode, // 将当前主题状态传递给开关
    onChange: () => setTheme(isDarkMode ? "light" : "dark"), // 当开关改变时切换主题
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(switchProps);

  console.log(isSelected, "xxx");

  const [name, setName] = useState("");

  const [navigation, setNavigation] = useState([
    { name: "留学申请", href: "/application" },
    { name: "新加坡服务", href: "/singapore" },
    { name: "游学服务", href: "/studytour" },
    { name: "公司简介", href: "/faqs" },
    { name: "课程学习", href: "/course" },
  ]);

  // useEffect(() => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // }, [isSelected]);

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
    <header
      className={cn(
        "fixed z-40  w-full",
        isSelected ? "bg-gray-900" : "bg-white"
      )}
      style={{ zIndex: 10000 }}
    >
      <div className="custom-screen md:hidden">
        <NavHeader
          menuBtnEl={menuBtnEl}
          state={state}
          onClick={() => setState(!state)}
        />
      </div>
      <nav
        className={`md:text-sm md:static md:block 
        ${theme === "dark" ? "bg-gray-900" : "bg-white"}
        ${
          state
            ? "absolute z-40 top-0 inset-x-0 rounded-b-2xl shadow-xl"
            : "hidden"
        }`}
      >
        <div className="custom-screen items-center md:flex">
          <NavHeader state={state} onClick={() => setState(!state)} />
          <div
            className={`flex-1 items-center mt-8 ${
              isSelected ? "text-gray-300" : "text-gray-800"
            } md:font-medium md:mt-0 md:flex ${state ? "block" : "hidden"} `}
          >
            {isCourse ? (
              <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                {" "}
              </ul>
            ) : (
              <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                {navigation.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className={`${
                        isSelected
                          ? "hover:text-gray-50"
                          : "hover:text-gray-700"
                      }`}
                    >
                      <Link
                        href={item.href}
                        target="_blank"
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.href.includes("course")) {
                            const url = item.href;
                            const windowName = "NewWindow";
                            const windowFeatures = "popup";

                            window.open(url, windowName, windowFeatures);
                            // window.open(item.href);
                          } else {
                            window.open(item.href);
                          }
                        }}
                        className="block"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
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
                <span></span>
              )}
              <div className="flex flex-col gap-2 text-gray-700">
                <Component {...getBaseProps()}>
                  <VisuallyHidden>
                    <input {...getInputProps()} />
                  </VisuallyHidden>
                  <div
                    {...getWrapperProps()}
                    className={slots.wrapper({
                      class: [
                        "w-8 h-8",
                        "flex items-center justify-center",
                        "rounded-lg bg-default-100 hover:bg-default-200",
                      ],
                    })}
                  >
                    {isSelected ? <SunIcon /> : <MoonIcon />}
                  </div>
                </Component>
                {/* <p className="text-default-500 select-none">
                  Lights: {isSelected ? "on" : "off"}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
