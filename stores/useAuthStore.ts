"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { AuthUser } from "@/types/auth";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  // Actions
  setToken: (token: string) => void;
  logout: () => void;
}

// Helper to decode token and extract claims
const decodeUser = (token: string): AuthUser | null => {
  try {
    const decoded = jwtDecode<{
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
      IsClient: string;
      IsFreelancer: string;
    }>(token);

    return {
      id: decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
      isClient: decoded.IsClient === "True",
      isFreelancer: decoded.IsFreelancer === "True",
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setToken: (token: string) => {
        const user = decodeUser(token);
        set({
          token,
          user,
          isAuthenticated: !!user,
        });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
