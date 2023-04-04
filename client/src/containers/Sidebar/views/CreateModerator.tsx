import { moderators } from "@/api/services"
import { getError } from "@/utils/error"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export function CreateModerator() {
  const form = useForm<moderators.CreateModeratorData>()
  const createModerator = useMutation(moderators.createModerator)

  const handleSubmit = form.handleSubmit((data) => {
    createModerator.mutate({ data })
  })

  const error = getError(createModerator.error)

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      <div className="px-4">
        <h4 className="mb-3 px-2 text-xl font-semibold">Create moderator</h4>

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
          {createModerator.isSuccess && <p className="text-sm text-green-500">Moderator created successfully</p>}

          <div className="flex items-center justify-end">
            <button className="bg-blue-600 px-4 py-3 text-sm font-medium text-white">Create moderator</button>
          </div>
        </form>
      </div>
    </div>
  )
}
