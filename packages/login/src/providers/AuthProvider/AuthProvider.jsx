import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children, initialUser = null, onLogin, onLogout }) {
  const [user, setUser] = useState(initialUser);

  async function login(credentials) {
    const nextUser = onLogin ? await onLogin(credentials) : credentials;
    setUser(nextUser);
    return nextUser;
  }

  async function logout() {
    await onLogout?.(user);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: Boolean(user), login, logout, setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function useAuthenticated() {
  return useAuth().isAuthenticated;
}
