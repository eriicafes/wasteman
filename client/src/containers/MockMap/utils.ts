import { Dimensions } from "@/hooks/use-dimensions"
import { Coord, Position } from "./Map"

/**
 * Convert coordinates from degrees to decimal.
 */
export function coordToPosition(coord: Coord): Position {
  return {
    x: 180 + coord.long,
    y: 90 - coord.lat,
  }
}

/**
 * Convert coordinates from decimal to degrees.
 */
export function positionToCoord(position: Position): Coord {
  return {
    long: -180 + position.x,
    lat: 90 - position.y,
  }
}

/**
 * Scale decimal coordinates to position on map.
 */
export function scalePositionToMap(position: Position, dimensions: Dimensions): Position {
  return {
    x: (position.x / 360) * dimensions.width,
    y: (position.y / 180) * dimensions.height,
  }
}

/**
 * Scale position on map to decimal coordinates.
 */
export function scalePositionFromMap(position: Position, dimensions: Dimensions): Position {
  return {
    x: (position.x / dimensions.width) * 360,
    y: (position.y / dimensions.height) * 180,
  }
}
