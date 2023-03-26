import { IUser } from "@/interfaces/user"
import { BaseSchemaType, DocumentType, ModelType, PickModel } from "@/types/mongoose"
import bcrypt from "bcrypt"
import mongoose, { Model, ResolveSchemaOptions } from "mongoose"

export const authTypes = ["password", "google"] as const
export type AuthType = (typeof authTypes)[number]

export interface IUserDoc extends PickModel<IUser> {
  password: string | undefined
}

interface UserInstanceMethods {
  comparePassword(passwordAttempt: string): Promise<boolean>
}

export const UserSchema = new mongoose.Schema<
  IUserDoc,
  Model<IUserDoc>,
  UserInstanceMethods,
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
    auth: {
      type: String,
      enum: authTypes,
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
  } satisfies BaseSchemaType<IUserDoc>,
  {
    timestamps: true,
  }
)

// hash password on save or on password update
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  if (!this.password) return

  this.password = await bcrypt.hash(this.password, 10)
})

// compare hashed password
UserSchema.methods.comparePassword = async function (passwordAttempt) {
  return bcrypt.compare(passwordAttempt, this.password)
}

export const User = (mongoose.models.User as ModelType<typeof UserSchema>) || mongoose.model("User", UserSchema)

export class UserResource {
  public static json(doc: DocumentType<typeof UserSchema>): IUser {
    return {
      id: doc._id!.toString(),
      email: doc.email,
      auth: doc.auth,
      firstName: doc.firstName,
      lastName: doc.lastName,
      createdAt: doc.createdAt.toJSON(),
      updatedAt: doc.updatedAt.toJSON(),
    }
  }
}
