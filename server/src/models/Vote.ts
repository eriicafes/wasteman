import { IVote } from "@/interfaces/vote"
import { BaseSchemaType, DocumentType, ModelType } from "@/types/mongoose"
import mongoose from "mongoose"
import { Point } from "./Point"
import { Poll } from "./Poll"
import { Site } from "./Site"
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
    pointId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Point.name,
      required: true,
    },
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Site.name,
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
      pointId: doc.pointId.toString(),
      siteId: doc.siteId.toString(),
      createdAt: doc.createdAt.toJSON(),
    }
  }
}
