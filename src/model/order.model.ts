import { required, string } from "joi"
import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proucts'
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    price:{
        type: Number
    },
},{
    _id: false
})

const returnSchema = new mongoose.Schema({
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
},{
    _id: false
})

const cancellation = new mongoose.Schema({
    reason: {
        type: String,
        required: true
    }
},{
    _id: false
})


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number
    },
    status: {
        type: string,
        enum: ['pending', 'shipped', 'cancelled', 'confirmed', 'delivered'],
        default: 'pending'
    },
    cancellation: cancellation,
    return: returnSchema,
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        zip: {
            type: String
        }
    }
},{
    timestamps: true
})

export const Order = mongoose.model("Order", orderSchema)