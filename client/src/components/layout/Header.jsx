import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const titles = {
  "/tasks": ["Tasks", "Manage and organize your work"],
  "/projects": ["Projects", "Keep your projects moving"],
  "/profile": ["Profile", "Manage your workspace profile"]
};

export default function Header({ onMenu }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const current =
    titles[location.pathname] || ["AbleSpace", ""];

  function handleProfileClick() {
    navigate("/profile");
  }

  function handleSearchClick() {
    navigate("/tasks");
  }

  return (
    <header className="header">
      {/* MOBILE MENU */}
      <button
        className="mobile-menu icon-btn"
        onClick={onMenu}
        type="button"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* PAGE TITLE */}
      <div>
        <h1>{current[0]}</h1>
        <p>{current[1]}</p>
      </div>

      {/* HEADER ACTIONS */}
      <div className="header-actions">
        {/* THEME */}
        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={
            theme === "light"
              ? "Switch to dark mode"
              : "Switch to light mode"
          }
          type="button"
        >
          {theme === "light" ? "☾" : "☀"}
        </button>

        {/* SEARCH */}
        {/* <button
          className="icon-btn"
          onClick={handleSearchClick}
          title="Search tasks"
          type="button"
        >
          ⌕
        </button> */}

        {/* USER */}
        <button
          className="header-avatar"
          onClick={handleProfileClick}
          title="Open profile"
          type="button"
        >
          {user?.avatar || "GU"}
        </button>
      </div>
    </header>
  );
}