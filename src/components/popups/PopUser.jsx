import { useState } from "react";

import {
  PopUserWrapper,
  PopUserName,
  PopUserEmail,
  PopUserTheme,
  PopUserThemeLabel,
  PopUserThemeCheckbox,
  PopUserExit,
} from "./PopUser.styled";

function PopUser({
  user,
  onLogout,
  isDarkTheme = false,
  onThemeChange,
  onClose,
}) {
  const [themeEnabled, setThemeEnabled] = useState(isDarkTheme);

  const handleThemeChange = (event) => {
    const checked = event.target.checked;

    setThemeEnabled(checked);

    if (onThemeChange) {
      onThemeChange(checked);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <PopUserWrapper>
      <PopUserName>
        {user?.name || "Пользователь"}
      </PopUserName>

      <PopUserEmail>
        {user?.email || ""}
      </PopUserEmail>

      <PopUserTheme>
        <span>Темная тема</span>

        <PopUserThemeLabel>
          <PopUserThemeCheckbox
            type="checkbox"
            checked={themeEnabled}
            onChange={handleThemeChange}
            aria-label="Переключить темную тему"
          />
        </PopUserThemeLabel>
      </PopUserTheme>

      <PopUserExit type="button" onClick={handleLogout}>
        Выйти из аккаунта
      </PopUserExit>
    </PopUserWrapper>
  );
}

export default PopUser;