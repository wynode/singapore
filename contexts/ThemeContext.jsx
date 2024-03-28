// contexts/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // 从本地存储获取主题或使用系统偏好
    setTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light");
    console.log("nihao, qingkan");
  }, []);

  useEffect(() => {
    // 当主题变化时，更新本地存储和 html 类名
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
