import mongoose from 'mongoose'
import { Vendor } from './vendor.model'
import Joi from 'joi'

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    VendorReply: {
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    }

}, {
    timestamps: true
})

export const Review = mongoose.model('Review', reviewSchema)

export const validateReview = (data:unknown) => {
    const schema = Joi.object({
        product: Joi.string().required(),
        user: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
        VendorReply: Joi.object({
            comment: Joi.string().required()
        })
    })

    return schema.validate(data)
}