import { IPoll, IVoter } from "@/interfaces/poll"
import { BaseSchemaType, DocumentType, ModelType, SubDocumentType } from "@/types/mongoose"
import mongoose from "mongoose"
import { Point } from "./Point"

export const VoterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    votedAt: {
      type: Date,
      default: Date.now,
    },
  } satisfies BaseSchemaType<IVoter>,
  {
    _id: false,
  }
)

export const PollSchema = new mongoose.Schema(
  {
    pointId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Point.name,
      required: true,
    },
    voters: {
      type: [VoterSchema],
      default: [],
    },
    closed: {
      type: Boolean,
      default: false,
    },
  } satisfies BaseSchemaType<IPoll>,
  {
    timestamps: true,
  }
)

export const Poll = (mongoose.models.Poll as ModelType<typeof PollSchema>) || mongoose.model("Poll", PollSchema)

export class PollResource {
  public static json(doc: DocumentType<typeof PollSchema>): IPoll {
    return {
      id: doc._id!.toString(),
      pointId: doc.pointId.toString(),
      voters: doc.voters.map(VoteResource.json),
      closed: doc.closed,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString(),
    }
  }
}

export class VoteResource {
  public static json(doc: SubDocumentType<typeof VoterSchema>): IVoter {
    return {
      userId: doc.userId.toString(),
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      votedAt: doc.votedAt.toISOString(),
    }
  }
}
