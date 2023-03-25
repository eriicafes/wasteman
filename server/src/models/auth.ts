import bcrypt from "bcrypt"
import mongoose from "mongoose"

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password:string
  authType: string
  googleAuth: Boolean
}

export const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: {type: String, required: true},
  password: { type: String, required: true },
  authType: {type: String},
  googleAuth: {type: Boolean}
})


 
UserSchema.pre("save", function(next){
  const user = this;
  if (!user.isModified("password")) return next();
  if(user.isModified("password")) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      // Hashing the passwords
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })
  }
})

UserSchema

const UserModel = mongoose.model<IUser>("User", UserSchema)
export default UserModel
