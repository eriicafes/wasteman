import * as mongoose from "mongoose"

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected: ${process.env.MONGO_URI}`)
    const db = mongoose.connection
    db.once("open", (_) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`)
    })
    db.on("error", (err) => {
      console.error("connection error")
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// module.exports = connectDB;
