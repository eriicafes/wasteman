import mongoose from "mongoose"

let connected = false

export async function connectDB(uri: string) {
  if (connected) {
    return Promise.resolve()
  }

  mongoose.connect(uri)
}
