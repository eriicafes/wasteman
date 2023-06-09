import { queries } from "@/api/queries"
import { IPoint } from "@/api/types"
import { Coords, MockMap, MockMarker } from "@/containers/MockMap"
import { PointBox } from "@/containers/PointBox"
import { Sidebar, useSidebarStore } from "@/containers/Sidebar"
import { WelcomeBox } from "@/containers/WelcomeBox"
import { Bars3Icon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"
import Head from "next/head"
import { useState } from "react"

export default function Home() {
  const toggle = useSidebarStore((s) => s.toggle)
  const goto = useSidebarStore((s) => s.goto)
  const setCoords = useSidebarStore((s) => s.setCoords)

  const moderator = useQuery({ ...queries.moderators.profile, retry: false })

  const points = useQuery(
    queries.points.all({
      data: {
        lat: 0,
        long: 0,
        distance: 5000,
      },
    })
  )
  const [point, setPoint] = useState<IPoint>()

  const addPoint = (coords: Coords) => {
    if (!moderator.data) return

    setCoords(coords)
    goto("add-point")
  }

  return (
    <>
      <Head>
        <title>Wasteman | Waste Management System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="fixed inset-0 h-screen w-screen">
        <MockMap onPoint={addPoint}>
          {points.data?.data.map((point) => (
            <MockMarker key={point.name} location={point.location} onPoint={() => setPoint(point)}>
              <div className="group cursor-pointer rounded-full bg-blue-500/70 p-2 text-white transition-transform hover:scale-110">
                <div className="h-4 w-4 rounded-full bg-white"></div>
              </div>
            </MockMarker>
          ))}
        </MockMap>

        <Sidebar />

        {point && <PointBox pointId={point.id} onClose={() => setPoint(undefined)} />}

        <WelcomeBox />

        {/* controls */}
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <button onClick={() => toggle()} className="rounded-full bg-white p-2">
            <Bars3Icon className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </main>
    </>
  )
}
