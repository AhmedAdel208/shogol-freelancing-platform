"use client";

import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check authentication during initial state initialization
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("token");
    }
    return false;
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state using setTimeout to avoid synchronous setState
    const timer = setTimeout(() => setIsMounted(true), 0);

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { isAuthenticated, isMounted };
}
