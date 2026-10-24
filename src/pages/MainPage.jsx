import { Outlet } from "react-router-dom";
import Main from "../components/Main-file";
import Header from "../components/Header";

export default function MainPage() {
  return (
    <>
      <Header />
      <Main />
      <Outlet />
    </>
  );
}
