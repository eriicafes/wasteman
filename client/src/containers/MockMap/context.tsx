import { Dimensions } from "@/hooks/use-dimensions"
import { createContext, MouseEvent, useContext } from "react"
import { Coords } from "./utils"

export const MockMapDimensionsContext = createContext<Dimensions | null>(null)
export const MockMapHandlePointContext = createContext<((e: MouseEvent<any>) => Coords | null) | null>(null)

export function useMockMapDimensionsContext() {
  const dimensions = useContext(MockMapDimensionsContext)
  if (!dimensions) throw new Error("Component must be a child of MockMap")
  return dimensions
}

export function useMockMapHandlePointContext() {
  const handlePoint = useContext(MockMapHandlePointContext)
  if (!handlePoint) throw new Error("Component must be a child of MockMap")
  return handlePoint
}
