import { Order } from "@/lib/type";
import { create } from "zustand";

interface useOrderUpdateType {
  isOpen: boolean;
  item: Order | null;
  setItem: (item: Order) => void;
  onClose: () => void;
}

const useOrderUpdate = create<useOrderUpdateType>()((set) => ({
  isOpen: false,
  item: null,
  setItem: (item) => set((state) => ({ item: item, isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false, item: null })),
}));

export default useOrderUpdate;
