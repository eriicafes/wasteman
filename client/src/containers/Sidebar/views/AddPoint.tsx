import { queries } from "@/api/queries"
import { points } from "@/api/services"
import { getError } from "@/utils/error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useSidebarStore } from "../store"

export function AddPoint() {
  const form = useForm<points.CreatePointData>()
  const qc = useQueryClient()
  const createPoint = useMutation(points.createPoint)

  const coords = useSidebarStore((s) => s.coords)

  const handleSubmit = form.handleSubmit((data) => {
    if (coords) data = { ...data, lat: coords.lat, long: coords.long }

    createPoint.mutate(
      { data },
      {
        onSuccess() {
          form.reset()
          return qc.invalidateQueries(queries.points.all._def)
        },
      }
    )
  })

  const error = getError(createPoint.error)

  return (
    <div className="h-full space-y-6 overflow-y-scroll pb-4">
      <div className="px-4">
        <h4 className="mb-3 px-2 text-xl font-semibold">Add new point</h4>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            {...form.register("name")}
            type="text"
            placeholder="Name"
            className="w-full border bg-transparent py-3 px-3"
          />

          {!coords && (
            <div className="flex gap-x-4">
              <input
                {...form.register("long", { valueAsNumber: true })}
                type="number"
                min={-180}
                max={180}
                placeholder="Longitude"
                className="w-full border bg-transparent py-3 px-3"
              />
              <input
                {...form.register("lat", { valueAsNumber: true })}
                type="number"
                min={-90}
                max={90}
                placeholder="Latitude"
                className="w-full border bg-transparent py-3 px-3"
              />
            </div>
          )}

          <div className="flex gap-x-4">
            <input
              {...form.register("openTime")}
              type="text"
              placeholder="Open time"
              className="w-full border bg-transparent py-3 px-3"
            />
            <input
              {...form.register("closeTime")}
              type="text"
              placeholder="Close time"
              className="w-full border bg-transparent py-3 px-3"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error.message}</p>}
          {createPoint.isSuccess && <p className="text-sm text-green-500">Point added successfully</p>}

          <div className="flex items-center justify-end">
            <button className="bg-blue-600 px-4 py-3 text-sm font-medium text-white">Add point</button>
          </div>
        </form>
      </div>
    </div>
  )
}
