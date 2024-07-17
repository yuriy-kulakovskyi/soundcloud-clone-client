import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  page: 'login' | 'register';
  onOpen: (page: 'login' | 'register') => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  page: 'login',
  onOpen: (page) => set({ isOpen: true, page }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;