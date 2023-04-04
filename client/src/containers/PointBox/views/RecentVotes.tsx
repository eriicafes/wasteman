export function RecentVotes() {
  return (
    <div className="rounded-2xl bg-white shadow-md">
      <div className="flex justify-between px-3 pt-2.5">
        <h4 className="font-medium">Recent votes</h4>
        <p className="text-xs font-medium text-gray-500">View all</p>
      </div>

      <div className="flex h-80 flex-col gap-3.5 overflow-y-scroll rounded-2xl bg-white px-3 py-3">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-800/80 font-medium text-white">
              AM
            </div>
            <div className="flex flex-1 items-center justify-between">
              <p className="text-sm font-medium">Abdul Morgan {i + 1}</p>
              <p className="text-xs text-gray-600">Voted</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
