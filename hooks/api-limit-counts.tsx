import { create } from "zustand";
interface apiLimitStore {
  apiLimitCounts: number;
  setApiLimitCount: (count: number) => void;
}
export const useApiLimit = create<apiLimitStore>((set) => ({
  apiLimitCounts: 0,
  setApiLimitCount: (count) => set({ apiLimitCounts: count }),
}));
