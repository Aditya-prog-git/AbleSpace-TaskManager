import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/tasks", icon: "▦", label: "Tasks" },
  { to: "/projects", icon: "◫", label: "Projects" },
  { to: "/profile", icon: "◉", label: "Profile" }
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
    setShowWorkspaceMenu(false);
    onClose?.();
  }

  function goToProfile() {
    navigate("/profile");
    onClose?.();
  }

  function goToTasks() {
    navigate("/tasks");
    onClose?.();
  }

  return (
    <>
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        {/* BRAND */}
        <button
          className="brand"
          onClick={goToTasks}
          type="button"
        >
          <div className="brand-mark">A</div>

          <div>
            <strong>AbleSpace</strong>
            <span>Workspace</span>
          </div>
        </button>

        {/* WORKSPACE */}
        <div className="workspace-wrapper">
          <div className="workspace">
            <button
              className="workspace-main"
              onClick={goToProfile}
              type="button"
            >
              <div className="avatar">
                {user?.avatar || "GU"}
              </div>

              <div className="workspace-user">
                <strong>{user?.name || "Guest User"}</strong>
                <span>Personal workspace</span>
              </div>
            </button>

            <button
              className="dots"
              onClick={() =>
                setShowWorkspaceMenu((current) => !current)
              }
              type="button"
              aria-label="Workspace menu"
            >
              •••
            </button>
          </div>

          {showWorkspaceMenu && (
            <div className="workspace-menu">
              <button
                type="button"
                onClick={goToProfile}
              >
                Profile
              </button>

              <button
                type="button"
                onClick={goToTasks}
              >
                Workspace
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="workspace-logout"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <nav>
          <span className="nav-label">Workspace</span>

          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
            >
              <span className="nav-icon">
                {link.icon}
              </span>

              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* HELP */}
        <button
          className="sidebar-bottom help-button"
          onClick={() => setShowHelp(true)}
          type="button"
        >
          <span className="mini-help">?</span>
          <span>Help & support</span>
        </button>
      </aside>

      {/* HELP MODAL */}
      {showHelp && (
        <div
          className="help-overlay"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="help-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="help-modal-header">
              <div>
                <h2>Help & support</h2>
                <p>
                  Need help using AbleSpace?
                </p>
              </div>

              <button
                type="button"
                className="help-close"
                onClick={() => setShowHelp(false)}
              >
                ×
              </button>
            </div>

            <div className="help-options">
              <button
                type="button"
                onClick={() => setShowHelp(false)}
              >
                <strong>Getting started</strong>
                <span>
                  Learn the basics of AbleSpace
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowHelp(false)}
              >
                <strong>Managing tasks</strong>
                <span>
                  Create, edit and organize tasks
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowHelp(false)}
              >
                <strong>Managing projects</strong>
                <span>
                  Organize your work into projects
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShowHelp(false)}
              >
                <strong>Contact support</strong>
                <span>
                  Get assistance with your workspace
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}