import mongoose from "mongoose"

const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }
},{
    timestamps: true
})

export const WishList = mongoose.model("WishList", wishListSchema)