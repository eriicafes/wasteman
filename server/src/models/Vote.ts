import { IVote } from "@/interfaces/vote"
import { BaseSchemaType, DocumentType, ModelType } from "@/types/mongoose"
import mongoose from "mongoose"
import { GarbagePoint } from "./GarbagePoint"
import { GarbageSite } from "./GarbageSite"
import { Poll } from "./Poll"
import { User } from "./User"

export const VoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User.name,
      required: true,
    },
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Poll.name,
      required: true,
    },
    garbagePointId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: GarbagePoint.name,
      required: true,
    },
    garbageSiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: GarbageSite.name,
      required: true,
    },
  } satisfies BaseSchemaType<IVote>,
  {
    timestamps: true,
  }
)

export const Vote = (mongoose.models.Vote as ModelType<typeof VoteSchema>) || mongoose.model("Vote", VoteSchema)

export class VoteResource {
  public static json(doc: DocumentType<typeof VoteSchema>): IVote {
    return {
      id: doc._id!.toString(),
      userId: doc.userId.toString(),
      pollId: doc.pollId.toString(),
      garbagePointId: doc.garbagePointId.toString(),
      garbageSiteId: doc.garbageSiteId.toString(),
      createdAt: doc.createdAt.toJSON(),
    }
  }
}
