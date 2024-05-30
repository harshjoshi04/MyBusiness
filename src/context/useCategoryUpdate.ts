import { Category } from "@/lib/type";
import { create } from "zustand";

interface useCategoryUpdateProp {
  isOpen: boolean;
  item: Category | null;
  setItem: (data: Category) => void;
  onClose: () => void;
}

const useCategoryUpdate = create<useCategoryUpdateProp>()((set) => ({
  isOpen: false,
  item: null,
  setItem: (data) => set((state) => ({ item: data, isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false })),
}));

export default useCategoryUpdate;
