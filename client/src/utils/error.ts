import { ApiErrorResponse } from "@/api/types"
import { isAxiosError } from "axios"

export function getError(err: unknown) {
  if (!isAxiosError(err)) return null
  if (err.response?.data.success === undefined) return null
  return err.response?.data as ApiErrorResponse
}
