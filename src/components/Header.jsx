import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  HeaderWrapper,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderNewButton,
  HeaderUserArea,
  HeaderUserButton,
} from "./Header.styled";
import PopUser from "./popups/PopUser";

function Header() {
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const user = {
    name: localStorage.getItem("userName") || "Пользователь",
    email: localStorage.getItem("userLogin") || "",
  };

  function toggleUserPopup() {
    setIsUserPopupOpen((previous) => !previous);
  }

  function handleLogout() {
    setIsUserPopupOpen(false);
     navigate("/exit");
  }

  function handleThemeChange(checked) {
    setIsDarkTheme(checked);
  }
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderBlock>
        <HeaderLogo>
          <a href="/">
            <img src="/logo.png" alt="Канбан" />
          </a>
        </HeaderLogo>

        <HeaderNav>
          <HeaderNewButton
            type="button"
            onClick={() => navigate("/add-card")}
          >
            Создать новую задачу
          </HeaderNewButton>

          <HeaderUserArea>
            <HeaderUserButton
              type="button"
              aria-expanded={isUserPopupOpen}
              aria-haspopup="dialog"
              onClick={toggleUserPopup}
            >
              {user.name}
            </HeaderUserButton>

            {isUserPopupOpen && (
              <PopUser
                user={user}
                onLogout={handleLogout}
                isDarkTheme={isDarkTheme}
                onThemeChange={handleThemeChange}
                onClose={toggleUserPopup}
              />
            )}
          </HeaderUserArea>
        </HeaderNav>
      </HeaderBlock>
    </HeaderWrapper>
  );
}

export default Header;