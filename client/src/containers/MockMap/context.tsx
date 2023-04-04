import { Dimensions } from "@/hooks/use-dimensions"
import { createContext, ReactNode, useContext } from "react"

const MockMapDimensionsContext = createContext<Dimensions | null>(null)

export function MockMapDimensionsProvider(props: { children: ReactNode; dimensions: Dimensions }) {
  return (
    <MockMapDimensionsContext.Provider value={props.dimensions}>{props.children}</MockMapDimensionsContext.Provider>
  )
}

export function useMockMapDimensionsContext() {
  const dimensions = useContext(MockMapDimensionsContext)
  if (!dimensions) throw new Error("Component must be a child of MockMap")
  return dimensions
}
