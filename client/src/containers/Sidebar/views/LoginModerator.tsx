import { useSidebarStore } from "../store"

export function LoginModerator() {
  const goto = useSidebarStore((s) => s.goto)

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      <div className="px-4">
        <h4 className="mb-3 px-2 text-xl font-semibold">Login as moderator</h4>

        <form className="mt-6 space-y-5">
          <input type="email" placeholder="Email address" className="w-full border bg-transparent py-3 px-3" />

          <input type="password" placeholder="Password" className="w-full border bg-transparent py-3 px-3" />

          <div className="flex items-center justify-end">
            <button className="bg-blue-600 px-4 py-3 text-sm font-medium text-white">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
