import mongoose from "mongoose";

export interface ITrash extends mongoose.Document {
  name: string,
  poll: Boolean,
  location:string,
  password: string,
  authType:string
}

export const TrashSchema = new mongoose.Schema({
  name: { type: String, required: true},
  password: { type: String, required: true},
  location: { type: String},
  authType: { type: String},
  poll: { type: Boolean},
});

const Trash = mongoose.model<ITrash>("Trash", TrashSchema);
export default Trash;