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

const Joi = require('joi');

const orderItemSchemaJoi = Joi.object({
    product: Joi.string().required(),
    color: Joi.string().required(),
    size: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().optional()
});

const returnSchemaJoi = Joi.object({
    reason: Joi.string().required(),
    status: Joi.string().valid('pending', 'approved', 'rejected').default('pending')
});

const cancellationSchemaJoi = Joi.object({
    reason: Joi.string().required()
});

const addressSchemaJoi = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string().required()
});

const orderSchemaJoi = Joi.object({
    user: Joi.string().required(),
    items: Joi.array().items(orderItemSchemaJoi).required(),
    totalPrice: Joi.number().required(),
    status: Joi.string().valid('pending', 'shipped', 'cancelled', 'confirmed', 'delivered').default('pending'),
    cancellation: cancellationSchemaJoi.optional(),
    return: returnSchemaJoi.optional(),
    address: addressSchemaJoi.required()
});

export const validateOrder = (data: unknown) => {
    return orderSchemaJoi.validate(data);
}
