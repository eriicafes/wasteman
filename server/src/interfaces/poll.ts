export interface IPoll {
  id: string
  pointId: string
  voters: IVoter[]
  closed: boolean
  createdAt: string
  updatedAt: string
}

export interface IVoter {
  userId: string
  email: string
  firstName: string
  lastName: string
  votedAt: string
}
