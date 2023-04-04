import { ReactNode } from "react"
import { useMockMapDimensionsContext } from "./context"
import { Coord } from "./Map"
import { coordToPosition, scalePositionToMap } from "./utils"

type Props = {
  location: Coord
  children: ReactNode
}

export function Marker(props: Props) {
  const dimensions = useMockMapDimensionsContext()
  const { x, y } = scalePositionToMap(coordToPosition(props.location), dimensions)

  return (
    <div style={{ top: y, left: x }} className="absolute -translate-y-1/2 -translate-x-1/2">
      {props.children}
    </div>
  )
}
