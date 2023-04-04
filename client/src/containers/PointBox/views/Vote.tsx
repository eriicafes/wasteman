import { queries } from "@/api/queries"
import { points } from "@/api/services"
import { IPoint } from "@/api/types"
import { useUser } from "@/middlewares/UseAuth"
import { getError } from "@/utils/error"
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

type Props = {
  point: IPoint
}

export function Vote({ point }: Props) {
  const user = useUser()
  const qc = useQueryClient()

  const poll = useQuery(
    queries.points.getOpenPoll({
      params: { id: point.id },
    })
  )
  const votePoint = useMutation(points.votePoint, {
    onSuccess() {
      return qc.invalidateQueries(queries.points.getOpenPoll({ params: { id: point.id } }))
    },
  })
  const unvotePoint = useMutation(points.unvotePoint, {
    onSuccess() {
      return qc.invalidateQueries(queries.points.getOpenPoll({ params: { id: point.id } }))
    },
  })

  const vote = () =>
    votePoint.mutate({
      params: { id: point.id },
    })

  const unvote = () =>
    unvotePoint.mutate({
      params: { id: point.id },
    })

  const voted = !!poll.data?.data.voters.find((voter) => voter.userId === user.id)

  const error = getError(votePoint.error) ?? getError(unvotePoint.error)

  return (
    <div className="rounded-2xl bg-white shadow-md">
      {error ? (
        <h4 className="fontmed] py-2 text-center text-lg font-light text-red-400">{error.message}</h4>
      ) : (
        <h4 className="fontmed] py-2 text-center text-lg font-light">Is this trash point ready for collection?</h4>
      )}

      <div className="flex items-center justify-evenly py-4">
        <div className="flex flex-col items-center gap-2">
          <button
            disabled={!voted}
            onClick={unvote}
            className="peer rounded-full bg-red-400/20 p-1 text-red-500 transition-colors hover:bg-red-400/40 disabled:bg-gray-400/40 disabled:text-gray-500"
          >
            <XMarkIcon className="h-12 w-12" />
          </button>
          <p className="text-xs font-medium text-red-400  peer-disabled:text-gray-500">Unvote</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            disabled={voted}
            onClick={vote}
            className="peer rounded-full bg-green-400/20 p-1 text-green-500 transition-colors hover:bg-green-400/40 disabled:bg-gray-400/40 disabled:text-gray-500"
          >
            <CheckIcon className="h-12 w-12" />
          </button>
          <p className="text-xs font-medium text-green-400 peer-disabled:text-gray-500">Vote</p>
        </div>
      </div>
    </div>
  )
}
