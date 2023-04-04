import { useDimensions } from "@/hooks/use-dimensions"
import { MouseEvent, ReactNode, useRef } from "react"
import { MockMapDimensionsProvider } from "./context"
import { positionToCoord, scalePositionFromMap } from "./utils"

export type Position = { x: number; y: number }
export type Coord = { long: number; lat: number }

type Props = {
  onPoint?: (coord: Coord) => void
  children: ReactNode
}

export function MockMap(props: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(wrapperRef)

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!props.onPoint) return
    const rect = wrapperRef.current?.getBoundingClientRect()

    const x = e.clientX + (rect?.x ?? 0)
    const y = e.clientY + (rect?.y ?? 0)

    const scaledPosition = scalePositionFromMap({ x, y }, dimensions)
    const coord = positionToCoord(scaledPosition)
    props.onPoint(coord)
  }

  return (
    <MockMapDimensionsProvider dimensions={dimensions}>
      <div ref={wrapperRef} onClick={handleClick} className="h-full w-full bg-[url('/map-placeholder.jpg')] bg-center">
        {props.children}
      </div>
    </MockMapDimensionsProvider>
  )
}
