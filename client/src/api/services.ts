import { z } from "zod"
import { http, Input, InputWithParams } from "./http"
import {
  ApiSuccessResponse,
  AuthSchema,
  IModerator,
  IPoint,
  IPoll,
  IUser,
  ModeratorsSchema,
  PointsSchema,
  TokenPayload,
} from "./types"

export namespace auth {
  export async function getProfile() {
    const { data } = await http.get<ApiSuccessResponse<IUser>>("/auth/profile")
    return data
  }

  export type SigninData = z.infer<typeof AuthSchema.signin>

  export async function signin(input: Input<SigninData>) {
    const { data } = await http.post<ApiSuccessResponse<TokenPayload>>("/auth/signin", input.data)
    return data
  }

  export type SignupData = z.infer<typeof AuthSchema.signup>

  export async function signup(input: Input<SignupData>) {
    const { data } = await http.post<ApiSuccessResponse<TokenPayload>>("/auth/signup", input.data)
    return data
  }
}

export namespace points {
  // points CRUD
  export type PointData = z.infer<typeof PointsSchema.point>

  export async function getPoints(input: Input<PointData>) {
    const params = new URLSearchParams()
    params.set("lat", input.data.lat.toString())
    params.set("long", input.data.long.toString())
    params.set("distance", input.data.distance.toString())

    const { data } = await http.get<ApiSuccessResponse<IPoint[]>>(`/points?${params}`)
    return data
  }

  export async function getPoint(input: InputWithParams<"id">) {
    const { data } = await http.get<ApiSuccessResponse<IPoint>>(`/points/${input.params.id}`)
    return data
  }

  export type CreatePointData = z.infer<typeof PointsSchema.create>

  export async function createPoint(input: Input<CreatePointData>) {
    const { data } = await http.post<ApiSuccessResponse<IPoint>>("/points", input.data)
    return data
  }

  export type UpdatePointData = z.infer<typeof PointsSchema.update>

  export async function updatePoint(input: InputWithParams<"id", UpdatePointData>) {
    const { data } = await http.put<ApiSuccessResponse<IPoint>>(`/points/${input.params.id}`, input.data)
    return data
  }

  export async function deletePoint(input: InputWithParams<"id">) {
    const { data } = await http.delete<ApiSuccessResponse<null>>(`/points/${input.params.id}`)
    return data
  }

  // point polls
  export async function getOpenPoll(input: InputWithParams<"id">) {
    const { data } = await http.get<ApiSuccessResponse<IPoll>>(`/points/${input.params.id}/poll`)
    return data
  }

  export async function getPointPolls(input: InputWithParams<"id">) {
    const { data } = await http.get<ApiSuccessResponse<IPoll[]>>(`/points/${input.params.id}/polls`)
    return data
  }

  export async function votePoint(input: InputWithParams<"id">) {
    const { data } = await http.post<ApiSuccessResponse<IPoll>>(`/points/${input.params.id}/vote`)
    return data
  }

  export async function unvotePoint(input: InputWithParams<"id">) {
    const { data } = await http.delete<ApiSuccessResponse<IPoll>>(`/points/${input.params.id}/vote`)
    return data
  }

  export async function closeVotePoint(input: InputWithParams<"id">) {
    const { data } = await http.post<ApiSuccessResponse<IPoll>>(`/points/${input.params.id}/vote/close`)
    return data
  }

  // point membership
  export async function requestMembership(input: InputWithParams<"id">) {
    const { data } = await http.post<ApiSuccessResponse<IPoint>>(`/points/${input.params.id}/membership`)
    return data
  }

  export async function cancelMembership(input: InputWithParams<"id">) {
    const { data } = await http.delete<ApiSuccessResponse<IPoint>>(`/points/${input.params.id}/membership`)
    return data
  }

  export async function approveMembership(input: InputWithParams<"id" | "userId">) {
    const { data } = await http.post<ApiSuccessResponse<IPoint>>(
      `/points/${input.params.id}/membership/${input.params.userId}`
    )
    return data
  }

  export async function revokeMembership(input: InputWithParams<"id" | "userId">) {
    const { data } = await http.delete<ApiSuccessResponse<IPoint>>(
      `/points/${input.params.id}/membership/${input.params.userId}`
    )
    return data
  }
}

export namespace polls {
  export async function getUserPolls() {
    const { data } = await http.get<ApiSuccessResponse<IPoll[]>>("/polls")
    return data
  }
}

export namespace moderators {
  export async function getProfile() {
    const { data } = await http.get<ApiSuccessResponse<IModerator>>("/moderators/auth/profile")
    return data
  }

  export type SigninData = z.infer<typeof ModeratorsSchema.signin>

  export async function signin(input: Input<SigninData>) {
    const { data } = await http.post<ApiSuccessResponse<TokenPayload>>("/moderators/auth/signin", input.data)
    return data
  }

  export type CreateModeratorData = z.infer<typeof ModeratorsSchema.create>

  export async function createModerator(input: Input<CreateModeratorData>) {
    const { data } = await http.post<ApiSuccessResponse<IModerator>>("/moderators", input.data)
    return data
  }

  export async function getModerators() {
    const { data } = await http.get<ApiSuccessResponse<IModerator[]>>("/moderators")
    return data
  }

  export async function getModerator(input: InputWithParams<"id">) {
    const { data } = await http.get<ApiSuccessResponse<IModerator>>(`/moderators/${input.params.id}`)
    return data
  }
}
