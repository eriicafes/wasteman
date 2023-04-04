import { queries } from "@/api/queries"
import { moderators } from "@/api/services"
import { getError } from "@/utils/error"
import { setToken } from "@/utils/token"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useSidebarStore } from "../store"

export function LoginModerator() {
  const goto = useSidebarStore((s) => s.goto)
  const toggle = useSidebarStore((s) => s.toggle)

  const form = useForm<moderators.SigninData>()
  const qc = useQueryClient()
  const signin = useMutation(moderators.signin)

  const handleSubmit = form.handleSubmit((data) => {
    signin.mutate(
      { data },
      {
        async onSuccess(res) {
          setToken(res.data.token)
          await qc.invalidateQueries(queries.moderators.profile)
          toggle()
          goto("home", false)
        },
      }
    )
  })

  const error = getError(signin.error)

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      <div className="px-4">
        <h4 className="mb-3 px-2 text-xl font-semibold">Login as moderator</h4>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            {...form.register("email")}
            type="email"
            placeholder="Email address"
            className="w-full border bg-transparent py-3 px-3"
          />

          <input
            {...form.register("password")}
            type="password"
            placeholder="Password"
            className="w-full border bg-transparent py-3 px-3"
          />

          {error && <p className="text-sm text-red-500">{error.message}</p>}

          <div className="flex items-center justify-end">
            <button className="bg-blue-600 px-4 py-3 text-sm font-medium text-white">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
