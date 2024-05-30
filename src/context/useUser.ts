import { User } from "@/lib/type";
import { create } from "zustand";

interface useUserType {
  isLoad: boolean;
  userData: User | null;
  setUserData: (item: User) => void;
}

const useUser = create<useUserType>()((set) => ({
  isLoad: false,
  userData: null,
  setUserData: (item) => set((state) => ({ userData: item, isLoad: true })),
}));

export default useUser;
