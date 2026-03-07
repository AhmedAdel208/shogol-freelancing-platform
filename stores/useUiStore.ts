import { create } from "zustand";

interface UiState {
  heroAnimationPlayed: boolean;
  setHeroAnimationPlayed: (played: boolean) => void;
  servicesAnimationPlayed: boolean;
  setServicesAnimationPlayed: (played: boolean) => void;
  contactAnimationPlayed: boolean;
  setContactAnimationPlayed: (played: boolean) => void;
  processAnimationPlayed: boolean;
  setProcessAnimationPlayed: (played: boolean) => void;
  footerAnimationPlayed: boolean;
  setFooterAnimationPlayed: (played: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  heroAnimationPlayed: false,
  setHeroAnimationPlayed: (played) => set({ heroAnimationPlayed: played }),
  servicesAnimationPlayed: false,
  setServicesAnimationPlayed: (played) => set({ servicesAnimationPlayed: played }),
  contactAnimationPlayed: false,
  setContactAnimationPlayed: (played) => set({ contactAnimationPlayed: played }),
  processAnimationPlayed: false,
  setProcessAnimationPlayed: (played) => set({ processAnimationPlayed: played }),
  footerAnimationPlayed: false,
  setFooterAnimationPlayed: (played) => set({ footerAnimationPlayed: played }),
}));
