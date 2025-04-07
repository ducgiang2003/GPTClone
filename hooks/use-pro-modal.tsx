import { create } from "zustand";
interface usePrommodalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
/// This is a Zustand store for managing the state of a modal component.
/// It provides methods to open and close the modal, as well as a boolean state to check if the modal is open or closed.
export const usePromodal = create<usePrommodalProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
