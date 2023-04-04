import { queries } from "@/api/queries"
import { points } from "@/api/services"
import { IPoint } from "@/api/types"
import { useUser } from "@/middlewares/UseAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Props = {
  point: IPoint
}

export function Membership({ point }: Props) {
  const user = useUser()
  const qc = useQueryClient()

  const requestMembership = useMutation(points.requestMembership, {
    onSuccess() {
      return qc.invalidateQueries(queries.points.get({ params: { id: point.id } }))
    },
  })
  const cancelMembership = useMutation(points.cancelMembership, {
    onSuccess() {
      return qc.invalidateQueries(queries.points.get({ params: { id: point.id } }))
    },
  })

  const request = () =>
    requestMembership.mutate({
      params: { id: point.id },
    })

  const cancel = () =>
    cancelMembership.mutate({
      params: { id: point.id },
    })

  const member = point.members.find((member) => member.userId === user.id)

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <h4 className="fontmed] py-2 text-center text-lg font-light">
        {member
          ? member.approved
            ? "You are a member"
            : "Your membership is awaiting approval"
          : "You are not a member yet"}
      </h4>
      <div className="flex items-center justify-evenly bg-opacity-20 px-4 pt-4 pb-10">
        {member ? (
          <button
            onClick={cancel}
            className="bg-blue-50 px-4 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-100"
          >
            Cancel membership
          </button>
        ) : (
          <button
            onClick={request}
            className="bg-blue-50 px-4 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-100"
          >
            Apply for membership
          </button>
        )}
      </div>
    </div>
  )
}
