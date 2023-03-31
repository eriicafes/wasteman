import { IMember, IPoint, IPointLocation } from "@/interfaces/point"
import { BaseSchemaType, DocumentType, ModelType, SubDocumentType } from "@/types/mongoose"
import mongoose from "mongoose"

const PointLocationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})

const MemberSchema = new mongoose.Schema({
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
  approved: {
    type: Boolean,
    default: false,
  },
})

export const PointSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: PointLocationSchema,
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
    members: {
      type: [MemberSchema],
      default: [],
    },
  } satisfies BaseSchemaType<IPoint>,
  {
    timestamps: true,
  }
)

PointSchema.index({ location: "2dsphere" })

export const Point = (mongoose.models.Point as ModelType<typeof PointSchema>) || mongoose.model("Point", PointSchema)

export class PointResource {
  public static json(doc: DocumentType<typeof PointSchema>): IPoint {
    doc.members
    return {
      id: doc._id!.toString(),
      name: doc.name,
      location: PointLocationResource.json(doc.location as SubDocumentType<typeof PointLocationSchema>),
      members: doc.members.map(MemberResource.json),
      openTime: doc.openTime,
      closeTime: doc.closeTime,
      createdAt: doc.createdAt.toJSON(),
      updatedAt: doc.updatedAt.toJSON(),
    }
  }
}

export class PointLocationResource {
  public static json(doc: SubDocumentType<typeof PointLocationSchema>): IPointLocation {
    return {
      type: doc.type,
      coordinates: [doc.coordinates[0], doc.coordinates[1]],
    }
  }
}

export class MemberResource {
  public static json(doc: SubDocumentType<typeof MemberSchema>): IMember {
    return {
      userId: doc.userId.toString(),
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      approved: doc.approved,
    }
  }
}
