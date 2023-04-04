import { getToken } from "@/utils/token"
import axios from "axios"

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:5000",
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`
  }

  return config
})

export type Input<Data extends Record<string, any>> = Partial<Data> extends Data ? { data?: Data } : { data: Data }

// export type InputWithParams<
//   Params extends string,
//   Data extends Record<string, any> | undefined = undefined
// > = Data extends undefined
//   ? { params: { [k in Params]: string } }
//   : Partial<Data> extends Data
//   ? { params: { [k in Params]: string }; data?: Data }
//   : { params: { [k in Params]: string }; data: Data }

export type InputWithParams<Params extends string> = { params: { [k in Params]: string } }

export type InputWithParamsData<
  Params extends string,
  Data extends Record<string, any> | undefined = undefined
> = { params: { [k in Params]: string }; data: Data }

export type InferInput<T extends (input: Record<"params" | "data", any>) => Promise<any>> = Parameters<T>[0]
