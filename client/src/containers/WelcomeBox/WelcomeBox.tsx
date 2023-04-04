import { queries } from "@/api/queries"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useState } from "react"
import { useSidebarStore } from "../Sidebar"

export function WelcomeBox() {
  const goto = useSidebarStore((s) => s.goto)
  const [expanded, setExpanded] = useState(false)

  const user = useQuery({ ...queries.auth.profile, retry: false })
  const moderator = useQuery({ ...queries.moderators.profile, retry: false })

  return (
    <motion.div
      initial={{ opacity: 0, y: 500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-x-0 bottom-0 mx-auto max-w-max rounded-[30px] p-2"
    >
      {!user.isSuccess && !moderator.isSuccess && (
        <>
          {expanded ? (
            <div className="relative flex w-screen max-w-sm flex-col items-center gap-y-2 overflow-hidden rounded-[30px] bg-slate-800 p-2 md:gap-y-5">
              <button
                onClick={() => setExpanded(false)}
                className="absolute right-4 top-4 rounded-full bg-slate-100/40"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>

              <div className="py-2 px-3">
                <h1 className="text-center text-lg font-normal text-gray-50 md:text-xl">Sign in</h1>
              </div>

              <button
                disabled
                className="w-full rounded-full bg-white p-2 text-sm font-medium hover:bg-gray-100 disabled:cursor-not-allowed md:p-3 md:text-base"
              >
                Continue with Google
              </button>
              <button
                onClick={() => goto("login")}
                className="w-full rounded-full bg-blue-600 p-2 text-sm font-medium text-gray-50 hover:bg-blue-700 md:p-3 md:text-base"
              >
                Continue with email/password
              </button>
              <button
                onClick={() => goto("login-moderator")}
                className="w-full rounded-full bg-blue-200 p-2 text-sm font-medium text-blue-600 hover:bg-blue-100 md:p-3 md:text-base"
              >
                Continue as moderator
              </button>
            </div>
          ) : (
            <div className="flex w-screen max-w-sm flex-col items-center gap-y-4 overflow-hidden rounded-[30px] bg-slate-800 p-2 md:gap-y-5">
              <div className="py-4 px-3">
                <h1 className="text-center text-xl font-normal text-gray-50 md:text-2xl">Waste Management System</h1>
                <p className="mt-4 text-center text-xs text-gray-400 md:text-sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et consequatur sunt aspernatur quas, nulla.
                </p>
              </div>

              <button
                onClick={() => setExpanded(true)}
                className="w-full rounded-full bg-blue-600 p-3 text-sm font-medium text-gray-50 hover:bg-blue-700 md:p-4 md:text-base"
              >
                Get Started
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}
