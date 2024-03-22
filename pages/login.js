import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
// import Brand from "@/components/ui/Brand";
// import Button from "@/components/ui/Button";
// import Input from "@/components/ui/Input";
// import { GoogleIcon } from "@/components/Icons";
import { Button, Input } from "@nextui-org/react";
// import {} from "@nextui-org/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // 回车键被按下
      handleSubmitLogin();
    }
  };
  const handleSubmitLogin = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api.luminouscn.com/api/token/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ username, password }), // body data type must match "Content-Type" header
      });
      const json = await res.json();
      if (res.status === 400 || res.status === 401) {
        toast.error(JSON.stringify(json));
        return;
      }
      if (json && json.access) {
        toast.success("登录成功");
        localStorage.setItem("access", json.access);
        const user = await fetch("https://api.luminouscn.com/student/self/", {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        const userJson = await user.json();
        localStorage.setItem("username", userJson.name);
        localStorage.setItem('student_id', userJson.student_id);
        router.push('/course');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>登录 - 星辉出入境服务</title>
      </Head>
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
        {/* <ToastContainer style={{ zIndex: 10000 }} /> */}
        <div className="max-w-sm w-full text-gray-300">
          <div className="text-center">
            {/* <Brand className='' /> */}
            <div className="mt-5 space-y-2">
              <h1 className="text-white text-2xl font-bold sm:text-3xl">
                使用账号登录
              </h1>
              <p className="">
                没有账号？{" "}
                <Link
                  href="/register"
                  className="font-medium text-purple-500 hover:text-purple-600 duration-150"
                >
                  立即注册
                </Link>
              </p>
            </div>
          </div>
          <form className="mt-8 space-y-5">
            <div>
              {/* <label className="font-medium">邮箱</label> */}
              {/* <Input
                type="email"
                required
                className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
              /> */}
              <Input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                size="lg"
                type="email"
                label="邮箱/账号"
                variant="bordered"
                placeholder=""
              />
            </div>
            <div>
              {/* <label className="font-medium">密码</label> */}
              {/* <Input
                type="password"
                required
                className="w-full mt-2 text-gray-300 bg-gray-800 focus:bg-gray-900 focus:border-gray-800"
              /> */}
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                size="lg"
                type="password"
                label="密码"
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
              登 录
            </Button>
          </form>
        </div>
      </main>
    </>
  );
}
