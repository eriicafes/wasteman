import { create } from "zustand"

interface State {
  open: boolean
  view: "vote" | "recent-votes" | "membership"
}

interface Actions {
  goto(view: State["view"]): void
}

export const usePointBoxStore = create<State & Actions>()((set) => ({
  open: false,
  view: "vote",
  goto: (view) => set({ view }),
}))
