import { NextFunction, Request, Response } from "express"
import { ApiResponse } from "../interfaces/response"

export type TypedRequest<P = Record<string, string>> = Request<P>
export type TypedResponse<T> = Response<ApiResponse<T>>
export type TypedNextFn = NextFunction

export type Params<P extends string> = Record<P, string>
