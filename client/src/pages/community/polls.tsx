import { faAngleLeft, faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default function Polls() {
  return (
    <>
      <div className="p-4 text-black">
        <div className="relative flex items-center justify-center py-4 text-center font-semibold">
          <Link href="/" className="absolute left-0 ">
            <FontAwesomeIcon icon={faAngleLeft} className="h-5 w-5 rounded-[50%] bg-[rgb(255,247,247)] p-2" />
          </Link>
          <h3 className="text-[1.15rem] tracking-wide">Active Polls</h3>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-2xl p-2 text-white shadow-lg">
          <div className="row-span-2 rounded-xl bg-blue-900 px-4 pt-5 pb-4">
            <p>Are you in the right poll?</p>
            <p>Updated 3 days ago</p>
            <FontAwesomeIcon icon={faEye} />
            <p className="ml-2 inline-block">120</p>
          </div>
          <div className="rounded-xl">
            <img src="../next.svg" alt="user-img" />
          </div>
          <div className="rounded-xl">
            <img src="../next.svg" alt="user-img" />
          </div>
        </div>

        <div className="text-[1.15rem]">
          <div className="my-4 flex items-center justify-between font-semibold">
            <h4>Result Polls</h4>
            <button>See All</button>
          </div>

          <div className="rounded-2xl shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-2">
                  <img src="../vercel.svg" alt="user-img" className="w-[50px]" />
                  <p className="text-[1.05rem] font-medium">Abdul Momon</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[0.85rem]">Voted</p>
                  <img src="../vercel.svg" alt="poll-img" className="w-[30px]" />
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-2">
                  <img src="../vercel.svg" alt="user-img" className="w-[50px]" />
                  <p className="text-[1.05rem] font-medium">Zhogran Ardhyan</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[0.85rem]">Voted</p>
                  <img src="../vercel.svg" alt="poll-img" className="w-[30px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
