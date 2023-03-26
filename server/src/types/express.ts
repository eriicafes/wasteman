import { NextFunction, Request, Response } from "express"
import { ApiResponse } from "../interfaces/response"

export type TypedRequest = Request
export type TypedResponse<T = any> = Response<ApiResponse<T>>
export type TypedNextFn = NextFunction
