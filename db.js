import mongoose from "mongoose"
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONO_DB_URL) 
  } catch (error) {
    console.log(error)
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected")
})

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected")
})

export { connectDB }
