import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "@/contexts/ThemeContext";
import { notMobile } from "@/lib/utils";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmitLogin();
    }
  };
  const handleSubmitLogin = () => {
    setIsLoading(true);
    fetch("https://api.luminouscn.com/register/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_repeat: passwordRepeat,
        name,
      }),
    })
      .then((res) => {
        res.json().then((json) => {
          if (res.status === 400 || res.status === 401) {
            if (notMobile()) {
              toast.error(JSON.stringify(json));
            }

            return;
          }
          if (json) {
            if (notMobile()) {
              toast.success("注册成功，请登录");
            }
            router.push("/login");
            // window.location.replace("/login");
          }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Head>
        <title>注册 - 新光出入境服务</title>
      </Head>
      <main
        className="w-full h-screen flex flex-col items-center justify-center px-4"
        style={{
          background: `url('/images/login_bg.jpg') no-repeat center center fixed`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* <ToastContainer style={{ zIndex: 10000 }} /> */}
        <div
          className={`bg-white max-w-md w-full ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          }`}
          style={{
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <div className="text-center">
            {/* <Brand className='' /> */}
            <div className="mt-5 space-y-2">
              <h1 className="text-2xl font-bold sm:text-3xl">注册账号</h1>
              <p className="">
                已经有账号？{" "}
                <Link
                  href="/login"
                  className={`font-medium  duration-150 ${
                    theme === "dark"
                      ? "text-purple-500 hover:text-purple-600"
                      : "text-gray-800 hover:text-gray-500"
                  }`}
                >
                  立即登录
                </Link>
              </p>
            </div>
          </div>
          <form className="mt-8 space-y-5">
            <div>
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                size="lg"
                label="姓名"
                placeholder="请使用护照名字"
              />
            </div>
            <div>
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                size="lg"
                label="邮箱"
                placeholder=""
              />
            </div>
            <div>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                size="lg"
                type="password"
                label="密码"
                placeholder=""
              />
            </div>
            <div>
              <Input
                onChange={(e) => {
                  setPasswordRepeat(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                size="lg"
                type="password"
                label="重复密码"
                placeholder=""
              />
            </div>
            <Button
              isLoading={isLoading}
              onClick={handleSubmitLogin}
              size="lg"
              style={{ marginTop: "30px" }}
              className="w-full text-gray-800 bg-gray-100 hover:bg-gray-200 ring-offset-2 focus:ring rounded-lg"
            >
              注 册
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
