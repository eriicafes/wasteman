import { queries } from "@/api/queries"
import { points } from "@/api/services"
import { IPoint } from "@/api/types"
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Props = {
  point: IPoint
}

export function Members({ point }: Props) {
  const qc = useQueryClient()

  const approveMembership = useMutation(points.approveMembership, {
    onSuccess() {
      return qc.invalidateQueries(queries.points.get({ params: { id: point.id } }))
    },
  })
  const revokeMembership = useMutation(points.revokeMembership, {
    onSuccess() {
      return qc.invalidateQueries(queries.points.get({ params: { id: point.id } }))
    },
  })

  const approve = (userId: string) =>
    approveMembership.mutate({
      params: { id: point.id, userId },
    })

  const revoke = (userId: string) =>
    revokeMembership.mutate({
      params: { id: point.id, userId },
    })

  return (
    <div className="rounded-2xl bg-white shadow-md">
      <div className="flex justify-between px-3 pt-2.5">
        <h4 className="font-medium">{point.name}</h4>
        <p className="text-xs font-medium text-gray-500">Manage members</p>
      </div>

      <div className="flex max-h-80 flex-col overflow-y-scroll rounded-2xl bg-white px-3 py-3">
        {point.members.map((member) => (
          <div key={member.userId} className="flex items-center gap-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-800/80 font-medium uppercase text-white">
              {member.firstName[0] + member.lastName[0]}
            </div>
            <div className="flex flex-1 items-center justify-between">
              <p className="text-sm font-medium">
                {member.firstName} {member.lastName}{" "}
                {member.approved && <span className="text-sm font-normal text-gray-600">(approved)</span>}
              </p>

              <div className="flex items-center justify-evenly gap-x-3">
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => revoke(member.userId)}
                    className="peer rounded-full bg-red-400/20 p-1 text-red-500 transition-colors hover:bg-red-400/40 disabled:bg-gray-400/40 disabled:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => approve(member.userId)}
                    className="peer rounded-full bg-green-400/20 p-1 text-green-500 transition-colors hover:bg-green-400/40 disabled:bg-gray-400/40 disabled:text-gray-500"
                  >
                    <CheckIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
