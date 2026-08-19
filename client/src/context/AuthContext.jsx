import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("ablespace-user");
    return saved ? JSON.parse(saved) : null;
  });

  function saveUser(userData) {
    localStorage.setItem(
      "ablespace-user",
      JSON.stringify(userData)
    );

    setUser(userData);
  }

  function loginAsGuest() {
    const guest = {
      id: "guest",
      name: "Guest User",
      email: "guest@ablespace.local",
      avatar: "GU",
      provider: "guest"
    };

    saveUser(guest);
  }

  async function loginWithGoogle(credential) {
    const response = await fetch(
      `${API_URL}/auth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          credential
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Google login failed"
      );
    }

    saveUser(data.user);
  }

  function logout() {
    localStorage.removeItem("ablespace-user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loginAsGuest,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}