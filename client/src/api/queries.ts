import { createQueryKeyStore } from "@lukemorales/query-key-factory"
import { InferInput } from "./http"
import { auth, moderators, points, polls } from "./services"

export const queries = createQueryKeyStore({
  auth: {
    profile: {
      queryKey: null,
      queryFn: () => auth.getProfile(),
    },
  },

  points: {
    all: ({ data }: InferInput<typeof points.getPoints>) => ({
      queryKey: [data],
      queryFn: () => points.getPoints({ data }),
    }),

    get: ({ params }: InferInput<typeof points.getPoint>) => ({
      queryKey: [params.id],
      queryFn: () => points.getPoint({ params }),
    }),

    getOpenPoll: ({ params }: InferInput<typeof points.getOpenPoll>) => ({
      queryKey: [params.id],
      queryFn: () => points.getOpenPoll({ params }),
    }),

    getAllPolls: ({ params }: InferInput<typeof points.getPointPolls>) => ({
      queryKey: [params.id],
      queryFn: () => points.getPointPolls({ params }),
    }),
  },

  polls: {
    allForUser: {
      queryKey: null,
      queryFn: () => polls.getUserPolls(),
    },
  },

  moderators: {
    profile: {
      queryKey: null,
      queryFn: () => moderators.getProfile(),
    },

    all: {
      queryKey: null,
      queryFn: () => moderators.getModerators(),
    },

    get: ({ params }: InferInput<typeof moderators.getModerator>) => ({
      queryKey: [params.id],
      queryFn: () => moderators.getModerator({ params }),
    }),
  },
})
