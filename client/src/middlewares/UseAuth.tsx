import { queries } from "@/api/queries"
import { useQuery } from "@tanstack/react-query"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

export function UseUserMiddleware({ children, fallback = null }: Props) {
  const user = useQuery(queries.auth.profile)

  if (!user.data) return <>{fallback}</>

  return <>{children}</>
}

export function useUser() {
  const user = useQuery(queries.auth.profile)

  if (!user.data) throw new Error("Hook must be called within `UseUserMiddleware` middleware")

  return user.data.data
}

export function UseModeratorMiddleware({ children, fallback = null }: Props) {
  const moderator = useQuery(queries.moderators.profile)

  if (!moderator.data) return <>{fallback}</>

  return <>{children}</>
}

export function useModerator() {
  const moderator = useQuery(queries.moderators.profile)

  if (!moderator.data) throw new Error("Hook must be called within `UseModeratorMiddleware` middleware")

  return moderator.data.data
}
