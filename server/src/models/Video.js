import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
    likedUsers: {
      type: Array,
      required: true,
    }
  },
  { timestamps: true }
)

export default mongoose.model('Video', VideoSchema)