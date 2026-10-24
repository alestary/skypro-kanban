import "./App.css";
import GlobalStyle from "./GlobalStyle";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import TasksProvider from "./context/TasksProvider";

export default function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <div className="wrapper">
          <GlobalStyle />
          <AppRoutes />
        </div>
      </TasksProvider>
    </AuthProvider>
  );
}