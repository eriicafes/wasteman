import Image from "next/image"
import Link from "next/link"

const Community = () => {
  const remainingWidth = 100 - 20
  return (
    <main className="flex flex-row">
      <div className="h-screen w-[35%] max-w-[500px] bg-gray-50">
        {/* user profile and active polls container */}
        <div className="flex w-full flex-col space-y-5 px-3 pt-5 pb-2">
          {/* container for user profile */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-xl font-medium">
              <span>Good Morning,</span>
              <span className="font-bold">Eric!</span>
            </div>
            <Image src="/avatars/avatar4.svg" width={40} height={40} alt="" className="rounded-full" />
          </div>
          {/* container for active polls */}
          <div className="flex w-full items-center justify-between rounded-[20px] bg-slate-800 py-6 px-4 text-white">
            <div className="flex flex-col space-y-2 text-base">
              <span>12 Active polls</span>
              <span className="text-xs">Show Details</span>
            </div>
            {/* user's avatar */}
            <Link href="/community/polls">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer rounded-full text-gray-400 hover:text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </div>
        {/* recent polls, update and last viewed container */}
        <div className="flex w-full flex-col space-y-7 px-3 pt-5 pb-2">
          {/* recent poll and see all container */}
          <div id="recent-polls" className="flex items-center justify-between font-medium">
            <h2>Recent Polls</h2>
            <p className="cursor-pointer text-xs">See All</p>
          </div>
          {/* update container */}
          <div id="polls" className="flex space-x-2 rounded-xl bg-white p-2 shadow-sm">
            <div className="flex flex-col space-y-4 rounded-xl bg-blue-600 pt-5 pb-3 pl-3 pr-7 font-medium">
              <p className="w-32 text-white">Find poll closest to you?</p>
              <span className="flex flex-col space-y-9 text-xs text-gray-300">
                <p>updated 3 days ago</p>
                <p className="space-x-5 text-[10px]">
                  <span className="">130 view</span> <span>90 use</span>
                </p>
              </span>
            </div>
            <div className="flex w-full flex-col space-y-2">
              <span className="h-20 w-full rounded-xl bg-gradient-to-r from-slate-100 to-slate-300"></span>
              <span className="h-20 w-full rounded-xl bg-gradient-to-r from-green-300 to-green-100"></span>
            </div>
          </div>
          {/* last viewed container */}
          <div id="last-viewed" className="flex w-full flex-col space-y-3 py-3">
            <p className="font-medium">Last Viewed</p>
            <div className="flex justify-between p-3">
              <Image src="/avatars/avatar2.svg" alt="" width={45} height={45} className="rounded-full" />
              <Image src="/avatars/avatar1.svg" alt="" width={45} height={45} className="rounded-full" />
              <Image src="/avatars/avatar5.svg" alt="" width={45} height={45} className="rounded-full" />
              <Image src="/avatars/avatar4.svg" alt="" width={45} height={45} className="rounded-full" />
              <Image src="/avatars/avatar3.svg" alt="" width={45} height={45} className="rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[url('/map-placeholder.jpg')]"></div>
    </main>
  )
}

export default Community
