"use client";

import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// Utility to verify if the token is present and valid
const checkTokenValidity = () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // JWT exp is in seconds, Date.now() is in milliseconds
    const isExpired = decoded.exp && decoded.exp * 1000 < Date.now();
    return !isExpired;
  } catch (error) {
    // If the token is malformed
    return false;
  }
};

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    checkTokenValidity(),
  );
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login"); // Optional: Navigate user to login automatically
  }, [router]);

  useEffect(() => {
    setIsMounted(true);

    const verifyAuth = () => {
      const isValid = checkTokenValidity();
      setIsAuthenticated(isValid);

      // Auto-logout if token exists but is invalid/expired
      if (localStorage.getItem("token") && !isValid) {
        logout();
      }
    };

    // Initial check on mount
    verifyAuth();

    // Check periodically since token might expire while user is chilling on the page
    const interval = setInterval(verifyAuth, 60000); // Check every minute

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        verifyAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [logout]);

  return { isAuthenticated, isMounted, logout };
}
