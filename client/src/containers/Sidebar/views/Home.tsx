import { ChevronRightIcon, PlusIcon } from "@heroicons/react/20/solid"
import { useSidebarStore } from "../store"

export function Home() {
  const goto = useSidebarStore((s) => s.goto)

  if (!"true") {
    return (
      <div className="h-full space-y-6 overflow-y-scroll pb-4">
        {/* overview */}
        <div className="flex h-80 items-center justify-evenly bg-opacity-20 px-4 pt-4 pb-10">
          <button
            onClick={() => goto("login")}
            className="bg-blue-100 px-4 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-200"
          >
            Please sign in
          </button>
        </div>
      </div>
    )
  }

  if (!"true") {
    return (
      <div className="h-full space-y-6 overflow-y-scroll pb-4">
        {/* name and avatar */}
        <div className="flex items-center justify-between px-4">
          <h3 className="text-xl leading-tight text-gray-800 md:text-2xl">
            Hello <span className="font-semibold text-gray-800">Mochi</span>,
          </h3>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-medium uppercase text-white">
            MD
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

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      {/* name and avatar */}
      <div className="flex items-center justify-between px-4">
        <h3 className="text-xl leading-tight text-gray-800 md:text-2xl">
          Hello <span className="font-semibold text-gray-800">Mochi</span>,
        </h3>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-medium uppercase text-white">
          MD
        </button>
      </div>

      {/* overview */}
      <div className="px-4">
        <div className="flex items-center rounded-3xl bg-slate-800 px-5 py-6 text-gray-200">
          <div className="flex-1 space-y-2.5">
            <h5 className="font-medium tracking-wide">12 Active polls</h5>
            <p className="text-sm">Show details</p>
          </div>

          <button className="rounded-full bg-neutral-700/40 p-1">
            <ChevronRightIcon className="h-7 w-7 text-gray-300/80" />
          </button>
        </div>
      </div>

      {/* recent polls */}
      <div className="px-4">
        <h4 className="mb-3 px-2 text-lg font-semibold">Recent Polls</h4>

        <div className="flex flex-col gap-3.5 rounded-2xl border border-gray-100/60 bg-white px-3 py-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-800/80 font-medium text-white">
                AM
              </div>
              <div className="flex flex-1 items-center justify-between">
                <p className="text-sm font-medium">Abdul Morgan</p>
                <p className="text-xs text-gray-600">Voted</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
