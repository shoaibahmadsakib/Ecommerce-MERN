import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },

}, {
    timestamps: true
})

const productSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true,
        unique: true
    },
    brand: {
        type: String,
        require: true
    },
    catagory: {
        type: String,
        require: true,

    },
    description: {
        type: String,
        require: true,

    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        require: true,

    },
    numReviews: {
        type: Number,
        require: true,
        default: 0
    },
    price: {
        type: Number,
        require: true,

    },
    countInStock: {
        type: Number,
        require: true,
        default: 0

    },
}, {
    timestamps: true

})

const Products = mongoose.model('products', productSchema)

export default Products;