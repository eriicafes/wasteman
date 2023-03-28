import { ISite } from "@/interfaces/garbage-site"
import { BaseSchemaType, DocumentType, ModelType } from "@/types/mongoose"
import mongoose from "mongoose"

export const SiteSchema = new mongoose.Schema(
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
  } satisfies BaseSchemaType<ISite>,
  {
    timestamps: true,
  }
)

export const Site =
  (mongoose.models.Site as ModelType<typeof SiteSchema>) ||
  mongoose.model("Site", SiteSchema)

export class SiteResource {
  public static json(doc: DocumentType<typeof SiteSchema>): ISite {
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
