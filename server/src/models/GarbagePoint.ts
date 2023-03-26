import { IGarbagePoint } from "@/interfaces/garbage-point"
import { BaseSchemaType, DocumentType, ModelType } from "@/types/mongoose"
import mongoose from "mongoose"
import { GarbageSite } from "./GarbageSite"

export const GarbagePointSchema = new mongoose.Schema(
  {
    garbageSiteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: GarbageSite.name,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    openTime: {
      type: String,
      required: true,
    },
    closeTime: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  } satisfies BaseSchemaType<IGarbagePoint>,
  {
    timestamps: true,
  }
)

export const GarbagePoint =
  (mongoose.models.GarbagePoint as ModelType<typeof GarbagePointSchema>) ||
  mongoose.model("GarbagePoint", GarbagePointSchema)

export class GarbagePointResource {
  public static json(doc: DocumentType<typeof GarbagePointSchema>): IGarbagePoint {
    return {
      id: doc._id!.toString(),
      garbageSiteId: doc.garbageSiteId.toString(),
      name: doc.name,
      openTime: doc.openTime,
      closeTime: doc.closeTime,
      latitude: doc.latitude,
      longitude: doc.longitude,
      createdAt: doc.createdAt.toJSON(),
      updatedAt: doc.updatedAt.toJSON(),
    }
  }
}
