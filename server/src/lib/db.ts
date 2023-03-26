import mongoose from "mongoose"

let connected = false

export async function connectDB(uri: string) {
  if (connected) {
    console.log("Reusing existing DB connection")
    return Promise.resolve()
  }

  mongoose
    .connect(uri)
    .then(() => console.log("DB connected"))
    .catch((err) => {
      console.log("DB connection failed")
      throw err
    })
}
