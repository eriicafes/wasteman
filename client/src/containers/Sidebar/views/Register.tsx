import { queries } from "@/api/queries"
import { auth } from "@/api/services"
import { getError } from "@/utils/error"
import { setToken } from "@/utils/token"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useSidebarStore } from "../store"

export function Register() {
  const goto = useSidebarStore((s) => s.goto)
  const toggle = useSidebarStore((s) => s.toggle)

  const form = useForm<auth.SignupData>()
  const qc = useQueryClient()
  const signup = useMutation(auth.signup)

  const handleSubmit = form.handleSubmit((data) => {
    signup.mutate(
      { data },
      {
        async onSuccess(res) {
          setToken(res.data.token)
          await qc.invalidateQueries(queries.auth.profile)
          toggle()
          goto("home", false)
        },
      }
    )
  })

  const error = getError(signup.error)

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      <div className="px-4">
        <h4 className="mb-3 px-2 text-xl font-semibold">Create an account</h4>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            {...form.register("email")}
            type="email"
            placeholder="Email address"
            className="w-full border bg-transparent py-3 px-3"
          />

          <div className="flex gap-x-4">
            <input
              {...form.register("firstName")}
              type="text"
              placeholder="First name"
              className="w-full border bg-transparent py-3 px-3"
            />
            <input
              {...form.register("lastName")}
              type="text"
              placeholder="Last name"
              className="w-full border bg-transparent py-3 px-3"
            />
          </div>

          <input
            {...form.register("password")}
            type="password"
            placeholder="Password"
            className="w-full border bg-transparent py-3 px-3"
          />

          {error && <p className="text-sm text-red-500">{error.message}</p>}

          <div className="flex items-center justify-between">
            <p className="text-sm">
              Already have an account?{" "}
              <button type="button" onClick={() => goto("login")} className="text-blue-600">
                Login
              </button>
            </p>
            <button className="bg-blue-600 px-4 py-3 text-sm font-medium text-white">Create account</button>
          </div>
        </form>
      </div>
    </div>
  )
}
