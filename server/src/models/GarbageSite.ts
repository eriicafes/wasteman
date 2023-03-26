import { IGarbageSite } from "@/interfaces/garbage-site"
import { BaseSchemaType, DocumentType, ModelType } from "@/types/mongoose"
import mongoose from "mongoose"

export const GarbageSiteSchema = new mongoose.Schema(
  {
    name: {
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
  } satisfies BaseSchemaType<IGarbageSite>,
  {
    timestamps: true,
  }
)

export const GarbageSite =
  (mongoose.models.GarbageSite as ModelType<typeof GarbageSiteSchema>) ||
  mongoose.model("GarbageSite", GarbageSiteSchema)

export class GarbageSiteResource {
  public static json(doc: DocumentType<typeof GarbageSiteSchema>): IGarbageSite {
    return {
      id: doc._id!.toString(),
      name: doc.name,
      latitude: doc.latitude,
      longitude: doc.longitude,
      createdAt: doc.createdAt.toJSON(),
      updatedAt: doc.updatedAt.toJSON(),
    }
  }
}
