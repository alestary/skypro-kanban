import { Outlet } from "react-router-dom";
import Main from "../components/Main-file";
import Header from "../components/Header";
import TasksProvider from "../context/TasksProvider";

export default function MainPage() {
  return <TasksProvider><Header /><Main /><Outlet /></TasksProvider>;
}
