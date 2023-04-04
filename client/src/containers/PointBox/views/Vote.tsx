import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid"

export function Vote() {
  return (
    <div className="rounded-2xl bg-white shadow-md">
      <h4 className="fontmed] py-2 text-center text-lg font-light">Is this trash point ready for collection?</h4>
      <div className="flex items-center justify-evenly py-4">
        <div className="flex flex-col items-center gap-2">
          <button
            disabled
            className="peer rounded-full bg-red-400/20 p-1 text-red-500 transition-colors hover:bg-red-400/40 disabled:bg-gray-400/40 disabled:text-gray-500"
          >
            <XMarkIcon className="h-12 w-12" />
          </button>
          <p className="text-xs font-medium text-red-400  peer-disabled:text-gray-500">Unvote</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button className="rounded-full bg-green-400/20 p-1 text-green-500 transition-colors hover:bg-green-400/40">
            <CheckIcon className="h-12 w-12" />
          </button>
          <p className="text-xs font-medium text-green-400">Vote</p>
        </div>
      </div>
    </div>
  )
}
