import mongoose from "mongoose";

import dotenv from "dotenv"
import Color from "colors";
import connectDb from "./config/db.js"
import User from "./models/usersModel.js"
import Order from "./models/orderModel.js"
import Products from "./models/productsModel.js"
import products from "./data/products.js";

import users from "./data/Users.js";


dotenv.config()

connectDb()


const importData = async () => {
    try {
      await  Order.deleteMany()
      await  Products.deleteMany()
      await  User.deleteMany()

        const createUser = await User.insertMany(users)
        const adminUser = createUser[0]._id
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })
        await Products.insertMany(sampleProducts)

        console.log("data imported!!!".bgGreen.bold);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}
const destroyData = async () => {
    try {
       await Order.deleteMany()
       await Products.deleteMany()
       await User.deleteMany()
       


        console.log("data destroyed!!!".red.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}
if (process.argv[2] === '_d') {
    destroyData()
}
else {
    importData()
}

