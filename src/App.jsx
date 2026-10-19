import { useState, useEffect } from "react";
import "./App.css";
import GlobalStyle from "./GlobalStyle";
import AppRoutes from "./AppRoutes";

export default function App() {
  const [isAuth, setIsAuth] = useState(() => Boolean(localStorage.getItem("token")));
  useEffect(() => {
    function expire() {
      ["token", "userName", "userLogin"].forEach((key) => localStorage.removeItem(key));
      setIsAuth(false);
    }
    window.addEventListener("auth-expired", expire);
    return () => window.removeEventListener("auth-expired", expire);
  }, []);
  return <div className="wrapper"><GlobalStyle /><AppRoutes isAuth={isAuth} setIsAuth={setIsAuth} /></div>;
}
