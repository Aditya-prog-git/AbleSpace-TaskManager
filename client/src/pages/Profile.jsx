import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="profile-wrap">
      <div className="profile-card">
        <div className="profile-hero">
          <div className="profile-avatar">{user?.avatar || "GU"}</div>
          <div><h2>{user?.name}</h2><p>{user?.email}</p></div>
        </div>

        <div className="profile-section">
          <h3>Profile</h3>
          <div className="profile-row"><span>Full name</span><strong>{user?.name}</strong></div>
          <div className="profile-row"><span>Email</span><strong>{user?.email}</strong></div>
          <div className="profile-row"><span>Workspace</span><strong>Personal workspace</strong></div>
        </div>

        <div className="profile-section">
          <h3>Appearance</h3>
          <div className="profile-row">
            <div><strong>Theme</strong><small>Switch between light and dark mode.</small></div>
            <button className="theme-switch" onClick={toggleTheme}>{theme === "light" ? "Light" : "Dark"}</button>
          </div>
        </div>

        <div className="profile-section">
          <h3>Session</h3>
          <button className="logout-btn" onClick={logout}>Log out</button>
        </div>
      </div>
    </div>
  );
}
