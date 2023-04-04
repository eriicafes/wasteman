import { create } from "zustand";

interface State {
  open: boolean
  view: "home" | "login" | "register" | "login-moderator" | "create-moderator" | "add-point"
}

interface Actions {
  toggle(open?: boolean): void
  goto(view: State["view"]): void
}

export const useSidebarStore = create<State & Actions>()((set) => ({
  open: false,
  view: "home",
  toggle: (open) => set((state) => ({ open: open ?? !state.open })),
  goto: (view) => set({ open: true, view }),
}))
