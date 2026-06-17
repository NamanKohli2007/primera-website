"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// NOTE: This is a front-end-only simulation. "Passwords" are stored in
// localStorage in plain text purely so the demo flow works — this will be
// replaced by a real backend (hashed credentials, sessions) later.
const AuthContext = createContext(null);
const USERS_KEY = "primera_users";
const SESSION_KEY = "primera_session";
const SEQ_KEY = "primera_order_seq";

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [sessionEmail, setSessionEmail] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted users + session once
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      if (Array.isArray(u)) setUsers(u);
      const s = localStorage.getItem(SESSION_KEY);
      if (s) setSessionEmail(s);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist users
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch {
      /* ignore */
    }
  }, [users, hydrated]);

  // Persist session
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (sessionEmail) localStorage.setItem(SESSION_KEY, sessionEmail);
      else localStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }, [sessionEmail, hydrated]);

  const user = useMemo(
    () => users.find((u) => u.email === sessionEmail) || null,
    [users, sessionEmail]
  );

  const signup = useCallback(
    ({ firstName, lastName, email, password }) => {
      const e = String(email).trim().toLowerCase();
      if (users.some((u) => u.email === e)) {
        return { ok: false, error: "An account with this email already exists." };
      }
      const newUser = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: e,
        password,
        phone: "",
        address: { line1: "", line2: "", city: "", postcode: "" },
        orders: [],
      };
      setUsers((prev) => [...prev, newUser]);
      setSessionEmail(e);
      return { ok: true };
    },
    [users]
  );

  const login = useCallback(
    ({ email, password }) => {
      const e = String(email).trim().toLowerCase();
      const found = users.find((u) => u.email === e);
      if (!found || found.password !== password) {
        return { ok: false, error: "Incorrect email or password" };
      }
      setSessionEmail(e);
      return { ok: true };
    },
    [users]
  );

  const logout = useCallback(() => setSessionEmail(null), []);

  const updateDetails = useCallback(
    (partial) => {
      setUsers((prev) =>
        prev.map((u) => (u.email === sessionEmail ? { ...u, ...partial } : u))
      );
    },
    [sessionEmail]
  );

  const changePassword = useCallback(
    (current, next) => {
      const found = users.find((u) => u.email === sessionEmail);
      if (!found) return { ok: false, error: "You are not signed in." };
      if (found.password !== current) {
        return { ok: false, error: "Current password is incorrect." };
      }
      setUsers((prev) =>
        prev.map((u) =>
          u.email === sessionEmail ? { ...u, password: next } : u
        )
      );
      return { ok: true };
    },
    [users, sessionEmail]
  );

  // Append an order to the signed-in user. Returns the saved order.
  const addOrder = useCallback(
    (order) => {
      let seq = 0;
      try {
        seq = parseInt(localStorage.getItem(SEQ_KEY) || "0", 10) + 1;
        localStorage.setItem(SEQ_KEY, String(seq));
      } catch {
        seq = Date.now();
      }
      const full = {
        ...order,
        number: `#PRI-${String(seq).padStart(4, "0")}`,
        date: new Date().toISOString(),
        status: "Processing",
      };
      setUsers((prev) =>
        prev.map((u) =>
          u.email === sessionEmail
            ? { ...u, orders: [full, ...(u.orders || [])] }
            : u
        )
      );
      return full;
    },
    [sessionEmail]
  );

  const value = useMemo(
    () => ({
      user,
      hydrated,
      signup,
      login,
      logout,
      updateDetails,
      changePassword,
      addOrder,
    }),
    [
      user,
      hydrated,
      signup,
      login,
      logout,
      updateDetails,
      changePassword,
      addOrder,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
