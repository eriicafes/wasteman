import { EyeIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { motion } from "framer-motion"
import { usePointBoxStore } from "./store"
import { Membership } from "./views/Membership"
import { RecentVotes } from "./views/RecentVotes"
import { Vote } from "./views/Vote"

type Props = {
  onClose: () => void
}

export function PointBox({ onClose }: Props) {
  const view = usePointBoxStore((s) => s.view)
  const goto = usePointBoxStore((s) => s.goto)

  return (
    <motion.div className="absolute inset-0 m-auto max-h-max max-w-md -translate-y-[48px] rounded-3xl p-2">
      <div className="space-y-2">
        <div className="flex">
          <button
            onClick={onClose}
            className="rounded-full bg-gray-300/70 p-0.5 text-gray-800 transition-colors hover:bg-gray-400/40"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-md">
          <div className="flex gap-2 rounded-2xl border border-gray-100/60 bg-white p-2">
            <div className="flex h-40 w-7/12 flex-col justify-between rounded-xl bg-blue-600 px-3 py-4 text-white">
              <p className="max-w-[80%] text-base font-medium">Osasuma Dump Site</p>

              <p className="text-sm opacity-80">updated 2 hours ago</p>

              <button
                onClick={() => goto("vote")}
                className="flex items-center gap-1 self-start rounded-2xl py-0.5 px-2 text-sm opacity-70 hover:bg-blue-50/20"
              >
                <EyeIcon className="h-4 w-4" />
                <span>153</span>
              </button>
            </div>

            <div className="flex w-5/12 flex-col gap-2">
              <div className="flex flex-1 flex-col justify-center rounded-xl bg-stone-500 p-2">
                <button
                  onClick={() => goto("recent-votes")}
                  className="text-left text-xs text-white underline-offset-4 hover:underline"
                >
                  View poll results
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-center rounded-xl bg-stone-700 p-2">
                <button
                  onClick={() => goto("membership")}
                  className="text-left text-xs text-white underline-offset-4 hover:underline"
                >
                  Manage membership
                </button>
              </div>
            </div>
          </div>
        </div>

        {view === "vote" && <Vote />}
        {view === "recent-votes" && <RecentVotes />}
        {view === "membership" && <Membership />}
      </div>
    </motion.div>
  )
}
