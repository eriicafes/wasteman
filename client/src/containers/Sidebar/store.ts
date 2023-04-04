import { create } from "zustand"
import { Coords } from "../MockMap"

interface State {
  open: boolean
  view: "home" | "login" | "register" | "login-moderator" | "create-moderator" | "add-point"
  coords: Coords | undefined
}

interface Actions {
  toggle(open?: boolean): void
  goto(view: State["view"], open?: boolean): void
  setCoords(coords: Coords): void
}

export const useSidebarStore = create<State & Actions>()((set) => ({
  open: false,
  view: "home",
  coords: undefined,
  toggle: (open) => set((state) => ({ open: open ?? !state.open })),
  goto: (view, open = true) => set({ open, view }),
  setCoords: (coords: Coords) => set({ coords }),
}))
