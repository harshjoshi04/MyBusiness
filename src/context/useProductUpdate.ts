import { Product } from "@/lib/type";
import { create } from "zustand";

interface useProductUpdateType {
  isOpen: boolean;
  item: Product | null;
  setItem: (data: Product) => void;
  onClose: () => void;
}

const useProductUpdate = create<useProductUpdateType>()((set) => ({
  isOpen: false,
  item: null,
  setItem: (data) => set((state) => ({ item: data, isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false, item: null })),
}));

export default useProductUpdate;
