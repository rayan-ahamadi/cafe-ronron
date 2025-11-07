import { create } from "zustand";

interface AnimationStore {
  loadingHasAnimated: boolean;
  setLoadingHasAnimated: (value: boolean) => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  loadingHasAnimated: false,
  setLoadingHasAnimated: (value: boolean) =>
    set(() => ({ loadingHasAnimated: value })),
}));
