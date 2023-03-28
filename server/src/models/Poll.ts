import { IPoll } from "@/interfaces/poll"
import { BaseSchemaType, DocumentType, ModelType } from "@/types/mongoose"
import mongoose from "mongoose"
import { GarbagePoint } from "./GarbagePoint"

export const PollSchema = new mongoose.Schema({
  garbagePointId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: GarbagePoint.name,
    required: true,
  },
  garbageSiteId: {
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
      garbagePointId: doc.garbagePointId.toString(),
      garbageSiteId: doc.garbageSiteId.toString(),
      votes: doc.votes,
    }
  }
}
