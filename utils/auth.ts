import { jwtDecode } from "jwt-decode";

// Helper to get current user info from token
export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;
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
      isFreelancer: decoded.IsFreelancer === "True",
      isClient: decoded.IsClient === "True",
    };
  } catch {
    return null;
  }
}
