import { number, ref, required } from "joi";
import mongoose from "mongoose";
import { Vendor } from "./vendor.model";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    Vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    }, 
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    }, 
    price: {
        type: number,
        required: true,
        default: 0
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    image: [{type: String, required: true}],
    variation: [],
    Averagerating:{
        type: number
    },
    rating: {
        type: number
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
},{
    timestamps: true
})

export const Products = mongoose.model('Products', productsSchema)