import { useDimensions } from "@/hooks/use-dimensions"
import { MouseEvent, ReactNode, useCallback, useRef } from "react"
import { MockMapDimensionsContext, MockMapHandlePointContext } from "./context"
import { Coords, positionToCoords, scalePositionFromMap } from "./utils"

type Props = {
  onPoint?: (coords: Coords) => void
  children: ReactNode
}

export function MockMap({ onPoint, children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(wrapperRef)

  const handlePoint = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!wrapperRef.current) return null
      const rect = wrapperRef.current.getBoundingClientRect()

      const x = e.clientX - rect.x
      const y = e.clientY - rect.y

      const scaledPosition = scalePositionFromMap({ x, y }, dimensions)
      const coords = positionToCoords(scaledPosition)
      return coords
    },
    [dimensions]
  )

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!onPoint) return

      const coords = handlePoint(e)
      if (!coords) return

      onPoint(coords)
    },
    [onPoint, handlePoint]
  )

  return (
    <MockMapHandlePointContext.Provider value={handlePoint}>
      <MockMapDimensionsContext.Provider value={dimensions}>
        <div
          ref={wrapperRef}
          onClick={handleClick}
          className="h-full w-full bg-[url('/map-placeholder.jpg')] bg-center"
        >
          {children}
        </div>
      </MockMapDimensionsContext.Provider>
    </MockMapHandlePointContext.Provider>
  )
}
