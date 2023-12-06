import mongoose from 'mongoose'


export const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("Connected to DB!");
    })
    .catch((err) => {
      throw err;
    });
}