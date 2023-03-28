export interface ISite {
  id: string
  name: string
  // TODO: prevent admins from creating garbage points that are too far away from the center of the garbage site
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
}
