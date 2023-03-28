import { IPoll } from "@/interfaces/poll"
import { BaseSchemaType, DocumentType, ModelType } from "@/types/mongoose"
import mongoose from "mongoose"
import { Point } from "./Point"

export const PollSchema = new mongoose.Schema({
  pointId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Point.name,
    required: true,
  },
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "",
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
} satisfies BaseSchemaType<IPoll>)

export const Poll = (mongoose.models.Poll as ModelType<typeof PollSchema>) || mongoose.model("Poll", PollSchema)

export class PollResource {
  public static json(doc: DocumentType<typeof PollSchema>): IPoll {
    return {
      id: doc._id!.toString(),
      pointId: doc.pointId.toString(),
      siteId: doc.siteId.toString(),
      votes: doc.votes,
    }
  }
}
