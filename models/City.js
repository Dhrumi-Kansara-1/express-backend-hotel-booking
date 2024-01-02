import mongoose from "mongoose"

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    featured: {
      type: String,
      required: true,
    }, 
  },
  { timestamps: true }
)

const Hotel = mongoose.model("Hotel", citySchema)

export default Hotel
