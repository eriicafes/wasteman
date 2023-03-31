export interface IPoint {
  id: string
  name: string
  /**
   * GeoJSON Point location.
   */
  location: IPointLocation
  members: IMember[]
  /**
   * Time of the day in 24 hour format represented as a number
   * 00:00 -> 12am, 06:30 -> 6:30am, 12:45 -> 12:45pm, 16:20 -> 4:20pm.
   */
  openTime: string
  /**
   * Time of the day in 24 hour format represented as a number
   * 00:00 -> 12am, 06:30 -> 6:30am, 12:45 -> 12:45pm, 16:20 -> 4:20pm.
   *
   * Must be after openTime.
   */
  closeTime: string
  createdAt: string
  updatedAt: string
}

export interface IPointLocation {
  type: "Point"
  coordinates: [number, number]
}

export interface IMember {
  userId: string
  email: string
  firstName: string
  lastName: string
  approved: boolean
}
