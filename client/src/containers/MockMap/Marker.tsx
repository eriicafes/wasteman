import { IPointLocation } from "@/api/types"
import { MouseEvent, ReactNode } from "react"
import { useMockMapDimensionsContext, useMockMapHandlePointContext } from "./context"
import { Coords, coordsToPosition, scalePositionToMap } from "./utils"

type Props = {
  location: IPointLocation
  children: ReactNode
  onPoint?: (coords: Coords, location: IPointLocation) => void
  propagate?: boolean
}

export function MockMarker(props: Props) {
  const dimensions = useMockMapDimensionsContext()
  const handlePoint = useMockMapHandlePointContext()

  const { x, y } = scalePositionToMap(
    coordsToPosition({
      long: props.location.coordinates[0],
      lat: props.location.coordinates[1],
    }),
    dimensions
  )

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!props.propagate) e.stopPropagation()

    const coords = handlePoint(e)
    if (!coords) return

    props.onPoint?.(coords, props.location)
  }

  return (
    <div onClick={handleClick} style={{ top: y, left: x }} className="absolute -translate-y-1/2 -translate-x-1/2">
      {props.children}
    </div>
  )
}
