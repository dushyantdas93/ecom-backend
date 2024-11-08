import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to mongodb database  `)
    } catch (error) {
        console.log(error)
    }
}

export default connectDB