import { queries } from "@/api/queries"
import { IModerator, IUser } from "@/api/types"
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"
import { useSidebarStore } from "../store"

export function Home() {
  const goto = useSidebarStore((s) => s.goto)

  const user = useQuery({ ...queries.auth.profile, retry: false })
  const moderator = useQuery({ ...queries.moderators.profile, retry: false })

  if (user.data) return <UserOverview user={user.data.data} />
  if (moderator.data) return <ModeratorOverview moderator={moderator.data.data} />

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      {/* overview */}
      <div className="flex flex-col items-center justify-evenly gap-y-6 bg-opacity-20 px-4 py-8">
        <button
          disabled
          onClick={() => goto("login")}
          className="w-full rounded-full bg-gray-100 px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed"
        >
          Sign In with Google
        </button>
        <button
          onClick={() => goto("login")}
          className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Sign In
        </button>
        <button
          onClick={() => goto("login-moderator")}
          className="w-full rounded-full bg-blue-100 px-4 py-3 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-200"
        >
          Sign In as Moderator
        </button>
      </div>
    </div>
  )
}

function UserOverview({ user }: { user: IUser }) {
  const polls = useQuery(queries.polls.allForUser)

  const activePolls = polls.data?.data.filter((poll) => !poll.closed).length ?? 0

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      {/* name and avatar */}
      <div className="flex items-center justify-between px-4">
        <h3 className="text-xl leading-tight text-gray-800 md:text-2xl">
          Hello <span className="font-semibold text-gray-800">{user.firstName}</span>,
        </h3>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-medium uppercase text-white">
          {user.firstName[0] + user.lastName[0]}
        </button>
      </div>

      {/* overview */}
      <div className="px-4">
        <div className="flex items-center rounded-3xl bg-slate-800 px-5 py-6 text-gray-200">
          <div className="flex-1 space-y-2.5">
            <h5 className="font-medium tracking-wide">{activePolls} Active polls</h5>
            <p className="text-sm">Show details</p>
          </div>

          <button className="rounded-full bg-neutral-700/40 p-1">
            <ChevronRightIcon className="h-7 w-7 text-gray-300/80" />
          </button>
        </div>
      </div>

      {/* recent polls */}
      <div className="hidden px-4">
        <h4 className="mb-3 px-2 text-lg font-semibold">Recent Polls</h4>

        <div className="flex flex-col gap-3.5 rounded-2xl border border-gray-100/60 bg-white px-3 py-3">
          {polls.data?.data.map((poll) => (
            <div key={poll.id} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-800/80 font-medium text-white">
                {poll.voters.length}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <p className="text-sm font-medium">{poll.id}</p>
                <p className="text-xs text-gray-600">{poll.closed ? "Closed" : "Open"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ModeratorOverview({ moderator }: { moderator: IModerator }) {
  const goto = useSidebarStore((s) => s.goto)

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      {/* name and avatar */}
      <div className="flex items-center justify-between px-4">
        <h3 className="text-xl leading-tight text-gray-800 md:text-2xl">
          Hello <span className="font-semibold text-gray-800">{moderator.firstName}</span>,
        </h3>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-medium uppercase text-white">
          {moderator.firstName[1] + moderator.lastName[0]}
        </button>
      </div>

      {/* moderator links */}
      <div className="px-4">
        <div className="flex flex-col divide-y divide-gray-300 rounded-2xl bg-gray-200">
          <button
            onClick={() => goto("add-point")}
            className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <span>Add point</span>
            <PlusIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => goto("create-moderator")}
            className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <span>Create moderator</span>
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
