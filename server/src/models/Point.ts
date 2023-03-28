import { IPoint } from "@/interfaces/garbage-point"
import { BaseSchemaType, DocumentType, ModelType } from "@/types/mongoose"
import mongoose from "mongoose"
import { Site } from "./Site"

export const PointSchema = new mongoose.Schema(
  {
    siteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Site.name,
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
  } satisfies BaseSchemaType<IPoint>,
  {
    timestamps: true,
  }
)

export const Point =
  (mongoose.models.Point as ModelType<typeof PointSchema>) ||
  mongoose.model("Point", PointSchema)

export class PointResource {
  public static json(doc: DocumentType<typeof PointSchema>): IPoint {
    return {
      id: doc._id!.toString(),
      siteId: doc.siteId.toString(),
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
