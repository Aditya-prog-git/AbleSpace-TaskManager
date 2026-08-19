import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const {
    loginAsGuest,
    loginWithGoogle
  } = useAuth();

  async function handleGuestLogin() {
    try {
      loginAsGuest();

      // Send the user to the main application
      navigate("/tasks");
    } catch (error) {
      console.error("Guest login failed:", error);
    }
  }

  async function handleGoogleSuccess(response) {
    try {
      await loginWithGoogle(response.credential);

      // Google authentication succeeded
      // Now leave the login page.
      navigate("/tasks");
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    }
  }

  function handleGoogleError() {
    console.error("Google Login Failed");
    alert("Google login failed. Please try again.");
  }

  return (
    <main className="login-page">
      <div className="login-card">

        <div className="login-logo">
          A
        </div>

        <div className="login-brand">
          AbleSpace
        </div>

        <h1>
          Let's get back on track
        </h1>

        <p className="login-description">
          Organize your tasks, projects and work in one simple space.
        </p>

        <button
          className="guest-btn"
          onClick={handleGuestLogin}
        >
          Continue as Guest
        </button>

        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_black"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="400"
          />
        </div>

        <small>
          Sign in with Google to use your own account.
        </small>

      </div>
    </main>
  );
}