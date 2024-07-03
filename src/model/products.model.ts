import Joi, { number, ref, required } from "joi";
import mongoose from "mongoose";

const Productvariation = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    quantity: {
        type: Number,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    }
},{
    _id: false
})

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    vendor: {
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
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    image: [{type: String, required: true}],
    variation: [Productvariation],
    Averagerating:{
        type: Number
    },
    rating: {
        type: Number
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
},{
    timestamps: true
})

export const Products = mongoose.model('Products', productsSchema)


const productVariationSchema = Joi.object({
    size: Joi.string().required(),
    color: Joi.string(),
    quantity: Joi.number().min(0),
    price: Joi.number().required().default(0)
})

const productsSchemaVal = Joi.object({
    name: Joi.string().required(),
    discription: Joi.string().required(),
    vendor: Joi.string().required(),
    category: Joi.string().required(),
    subcategory: Joi.string(),
    brand: Joi.string(),
    image: Joi.array().items(Joi.string().required()).required(),
    variation: Joi.array().items(productVariationSchema),
    Averagerating: Joi.number(),
    rating: Joi.number(),
    reviews: Joi.array().items(Joi.string())
})

export const validateProduct = (data: unknown) => {
    return productsSchemaVal.validate(data)
}