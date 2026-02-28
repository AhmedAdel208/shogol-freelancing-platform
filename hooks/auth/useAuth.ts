import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export function useAuth() {
  const { isAuthenticated, logout: storeLogout, user } = useAuthStore();
  const router = useRouter();

  const logout = useCallback(() => {
    storeLogout();
    router.push("/login");
  }, [router, storeLogout]);

  return { isAuthenticated, user, isMounted: true, logout };
}
