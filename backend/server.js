import path from 'path'
import express from 'express'
const app = express()
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import products from '../backend/data/products.js'
import cors from 'cors'
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoutes.js'
import colors from 'colors'
import { errorhandler, notFound } from './middleware/errorMiddleware.js'
import orderRouter from '../backend/routes/orderRoutes.js'
import uploadRouters from "../backend/routes/uploadRoutes.js"

app.use(cors())
dotenv.config()
app.use(express.json())

connectDb()

app.get('/', (req, res) => res.send('Hello World! 2'))



app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/order', orderRouter)
app.use('/api/upload', uploadRouters)

const PORT = process.env.PORT || 5000

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))



app.use(notFound)

app.use(errorhandler)

app.listen(PORT, () => console.log(`Example app listening on ${process.env.NODE_ENV} port ${PORT}!`.bgGreen.bold))