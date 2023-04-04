import { useSidebarStore } from "../store"

export function Register() {
  const goto = useSidebarStore((s) => s.goto)

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      <div className="px-4">
        <h4 className="mb-3 px-2 text-xl font-semibold">Create an account</h4>

        <form className="mt-6 space-y-5">
          <input type="email" placeholder="Email address" className="w-full border bg-transparent py-3 px-3" />

          <div className="flex gap-x-4">
            <input type="text" placeholder="First name" className="w-full border bg-transparent py-3 px-3" />
            <input type="text" placeholder="Last name" className="w-full border bg-transparent py-3 px-3" />
          </div>

          <input type="password" placeholder="Password" className="w-full border bg-transparent py-3 px-3" />

          <div className="flex items-center justify-between">
            <p className="text-sm">
              Already have an account?{" "}
              <button onClick={() => goto("login")} className="text-blue-600">
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
