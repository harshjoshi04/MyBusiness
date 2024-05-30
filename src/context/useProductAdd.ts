import { create } from "zustand";

interface useProductAddType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProductAdd = create<useProductAddType>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProductAdd;
