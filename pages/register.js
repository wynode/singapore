import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/router';
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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
            toast.error(JSON.stringify(json));
            return;
          }
          if (json) {
            toast.success("注册成功，请登录");
            router.push('/login');
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
        <title>注册 - 星辉出入境服务</title>
      </Head>
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
        {/* <ToastContainer style={{ zIndex: 10000 }} /> */}
        <div className="max-w-sm w-full text-gray-300">
          <div className="text-center">
            {/* <Brand className='' /> */}
            <div className="mt-5 space-y-2">
              <h1 className="text-white text-2xl font-bold sm:text-3xl">
                注册账号
              </h1>
              <p className="">
                已经有账号？{" "}
                <Link
                  href="/login"
                  className="font-medium text-purple-500 hover:text-purple-600 duration-150"
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
                variant="bordered"
                placeholder=""
              />
            </div>
            <div>
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                size="lg"
                label="邮箱/账号"
                variant="bordered"
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
                variant="bordered"
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
                variant="bordered"
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
