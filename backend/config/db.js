import mongoose from "mongoose"
import color from 'colors'

const connectDb = async () => {
    try {
        const dbConnect = await new mongoose.connect(`${process.env.DATABASE}`)

        console.log(`database connect in ${dbConnect.connection.host} `.blue.bold);
    } catch (error) {
        console.error(`error ${error.message}` .red.bold)
    }
}
export default connectDb;