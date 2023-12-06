import mongoose from 'mongoose'

const TestSchema = new mongoose.Schema(
  {
    test: {
        type: Number
    }
  },
  { timestamps: true },
)

export default mongoose.model('Test', TestSchema)