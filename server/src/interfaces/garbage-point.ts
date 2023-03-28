export interface IGarbagePoint {
  id: string
  garbageSiteId: string
  name: string
  latitude: number
  longitude: number
  /**
   * Time of the day in 24 hour format represented as a number
   * 00:00 -> 12am, 06:30 -> 6:30am, 12:45 -> 12:45pm, 16:20 -> 4:20pm
   */
  openTime: string
  /**
   * Time of the day in 24 hour format represented as a number
   * 00:00 -> 12am, 06:30 -> 6:30am, 12:45 -> 12:45pm, 16:20 -> 4:20pm
   *
   * Must be after openTime
   */
  closeTime: string
  createdAt: string
  updatedAt: string
}
