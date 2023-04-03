import Image from "next/image"
import Link from "next/link"

export default function Polls() {
  return (
    <main className="flex flex-row">
      <div className="h-screen w-[35%] max-w-[500px] bg-gray-50 p-2">
        <div className="relative flex items-center justify-center py-4 text-center font-semibold">
          <Link href="/community" className="absolute left-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer rounded-full text-gray-600 transition-colors hover:text-slate-800"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l-7.5 7.5 7.5 7.5" />
            </svg>
          </Link>
          <h3 className="text-[1.15rem] tracking-wide">Active Polls</h3>
        </div>

        <div id="polls" className="flex space-x-2 rounded-xl bg-white shadow-sm">
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

        <div id="recent-polls" className="flex items-center justify-between pt-5 pb-2 font-medium">
          <h2>Results</h2>
          <p className="cursor-pointer text-xs">See All</p>
        </div>

        <div className="rounded-[12px] bg-white p-2 shadow-md">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              <Image src="/avatars/avatar1.svg" alt="" width={40} height={40} className="rounded-full" />
              <p className="font-medium">Zhogran Ardhyan</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13px]">Voted</p>
              <Image src="/avatars/avatar1.svg" alt="" width={30} height={30} className="rounded-full" />
            </div>
          </div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              <Image src="/avatars/avatar2.svg" alt="" width={40} height={40} className="rounded-full" />
              <p className="font-medium">Zhogran Ardhyan</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13px]">Voted</p>
              <Image src="/avatars/avatar2.svg" alt="" width={30} height={30} className="rounded-full" />
            </div>
          </div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              <Image src="/avatars/avatar3.svg" alt="" width={40} height={40} className="rounded-full" />
              <p className="font-medium">Zhogran Ardhyan</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13px]">Voted</p>
              <Image src="/avatars/avatar3.svg" alt="" width={30} height={30} className="rounded-full" />
            </div>
          </div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              <Image src="/avatars/avatar4.svg" alt="" width={40} height={40} className="rounded-full" />
              <p className="font-medium">Zhogran Ardhyan</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13px]">Voted</p>
              <Image src="/avatars/avatar4.svg" alt="" width={30} height={30} className="rounded-full" />
            </div>
          </div>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              <Image src="/avatars/avatar5.svg" alt="" width={40} height={40} className="rounded-full" />
              <p className="font-medium">Zhogran Ardhyan</p>
            </div>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[13px]">Voted</p>
              <Image src="/avatars/avatar5.svg" alt="" width={30} height={30} className="rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[url('/map-placeholder.jpg')]"></div>
    </main>
  )
}
