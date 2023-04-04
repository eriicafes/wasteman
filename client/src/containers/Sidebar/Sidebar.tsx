import { queries } from "@/api/queries"
import { removeToken } from "@/utils/token"
import { ArrowLeftOnRectangleIcon, ChevronLeftIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useSidebarStore } from "./store"
import { AddPoint } from "./views/AddPoint"
import { CreateModerator } from "./views/CreateModerator"
import { Home } from "./views/Home"
import { Login } from "./views/Login"
import { LoginModerator } from "./views/LoginModerator"
import { Register } from "./views/Register"

export function Sidebar() {
  const open = useSidebarStore((s) => s.open)
  const view = useSidebarStore((s) => s.view)
  const toggle = useSidebarStore((s) => s.toggle)
  const goto = useSidebarStore((s) => s.goto)

  const user = useQuery(queries.auth.profile)
  const moderator = useQuery(queries.moderators.profile)
  const qc = useQueryClient()

  useEffect(() => {
    if (!open) return

    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggle(false)
    }

    document.addEventListener("keyup", listener)

    return () => document.removeEventListener("keyup", listener)
  }, [open, toggle])

  const signout = useMutation(async () => removeToken(), {
    async onSuccess() {
      await qc.invalidateQueries()
      toggle()
    },
  })

  return (
    <motion.nav
      className="absolute inset-y-0 right-0 z-10 flex w-full flex-col bg-white shadow-xl sm:w-1/4 sm:min-w-[380px]"
      initial={{
        x: open ? 0 : "100%",
      }}
      animate={{
        x: open ? 0 : "100%",
      }}
      transition={{
        type: "tween",
      }}
    >
      {/* sidebar header */}
      <div className="flex items-center justify-between py-2 px-4">
        <button className={view === "home" ? "invisible" : "visible"} onClick={() => goto("home")}>
          <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
        </button>

        <button onClick={() => toggle(false)}>
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {view === "home" && <Home />}
        {view === "login" && <Login />}
        {view === "register" && <Register />}
        {view === "login-moderator" && <LoginModerator />}
        {view === "create-moderator" && <CreateModerator />}
        {view === "add-point" && <AddPoint />}
      </div>

      <div className="flex justify-end py-2 px-4">
        {(user.data || moderator.data) && (
          <div className="group flex items-center gap-2">
            <span className="text-sm">Sign out</span>
            <button
              onClick={() => signout.mutate()}
              className="rounded-full p-1.5 transition-colors group-hover:bg-red-50"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 text-red-400" />
            </button>
          </div>
        )}
      </div>
    </motion.nav>
  )
}
