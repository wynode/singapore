import Head from "next/head";
import Footer from "./ui/Footer";
import Navbar from "./ui/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [isCourse, setIsCourse] = useState(false);

  useEffect(() => {
    console.log(router);
    if (
      router.pathname &&
      (router.pathname.includes("login") ||
        router.pathname.includes("register"))
    ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    if (router.pathname.includes("course")) {
      setIsCourse(true);
    } else {
      setIsCourse(false);
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>新光出入境服务</title>
        <meta
          name="description"
          content="Gain control of your business's growth with Mailgo's comprehensive marketing, automation, and email marketing platform."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLogin ? "" : <Navbar isCourse={isCourse} />}

      <ToastContainer style={{ zIndex: 10000, position: "absolute" }} />
      <main>{children}</main>
      {isLogin ? "" : <Footer />}
    </>
  );
};

export default Layout;
