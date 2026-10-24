import { useNavigate } from "react-router-dom";
import { exitStyles as styles } from "./ExitPage.styled";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ExitPage() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleExit() {
        logout();
        navigate("/login", { replace: true });
    }

    function handleCancel() {
        navigate("/", { replace: true });
    }

  return (
    <div style={styles.overlay}>
      <div
        style={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-title"
      >
        <h2 id="exit-title" style={styles.title}>
          Выйти из аккаунта?
        </h2>

        <div style={styles.buttons}>
          <button
            type="button"
            style={styles.confirmButton}
            onClick={handleExit}
          >
            Да, выйти
          </button>

          <button
            type="button"
            style={styles.cancelButton}
            onClick={handleCancel}
          >
            Нет, остаться
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitPage;