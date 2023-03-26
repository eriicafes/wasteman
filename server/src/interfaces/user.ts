export interface IUser {
  id: string
  email: string
  auth: "password" | "google"
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}
