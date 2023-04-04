export function CreateModerator() {
  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      <div className="px-4">
        <h4 className="mb-3 px-2 text-xl font-semibold">Create moderator</h4>

        <form className="mt-6 space-y-5">
          <input type="email" placeholder="Email address" className="w-full border bg-transparent py-3 px-3" />

          <div className="flex gap-x-4">
            <input type="text" placeholder="First name" className="w-full border bg-transparent py-3 px-3" />
            <input type="text" placeholder="Last name" className="w-full border bg-transparent py-3 px-3" />
          </div>

          <input type="password" placeholder="Password" className="w-full border bg-transparent py-3 px-3" />

          <div className="flex items-center justify-end">
            <button className="bg-blue-600 px-4 py-3 text-sm font-medium text-white">Create moderator</button>
          </div>
        </form>
      </div>
    </div>
  )
}
