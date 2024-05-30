import { create } from "zustand";

interface useCategoryAddProp {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCategoryAdd = create<useCategoryAddProp>()((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false })),
}));

export default useCategoryAdd;
