import { IModerator } from "@/interfaces/moderator"
import { BaseSchemaType, DocumentType, ModelType, PickModel } from "@/types/mongoose"
import bcrypt from "bcrypt"
import mongoose, { Model, ResolveSchemaOptions } from "mongoose"

export interface IModeratorDoc extends PickModel<IModerator> {
  password: string
}

interface ModeratorInstanceMethods {
  comparePassword(passwordAttempt: string): Promise<boolean>
}

export const ModeratorSchema = new mongoose.Schema<
  IModeratorDoc,
  Model<IModeratorDoc>,
  ModeratorInstanceMethods,
  {},
  {},
  {},
  ResolveSchemaOptions<{ timestamps: true }>
>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  } satisfies BaseSchemaType<IModeratorDoc>,
  {
    timestamps: true,
  }
)

// hash password on save or on password update
ModeratorSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  if (!this.password) return

  this.password = await bcrypt.hash(this.password, 10)
})

// compare hashed password
ModeratorSchema.methods.comparePassword = async function (passwordAttempt) {
  return bcrypt.compare(passwordAttempt, this.password)
}

export const Moderator =
  (mongoose.models.Moderator as ModelType<typeof ModeratorSchema>) || mongoose.model("Moderator", ModeratorSchema)

export class ModeratorResource {
  public static json(doc: DocumentType<typeof ModeratorSchema>): IModerator {
    return {
      id: doc._id!.toString(),
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      createdAt: doc.createdAt.toJSON(),
      updatedAt: doc.updatedAt.toJSON(),
    }
  }
}
