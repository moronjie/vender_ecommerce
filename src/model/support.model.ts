import Joi from "joi";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    message: {
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
}, {
    _id: false,
    timestamps: true
})

const supportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    subject: {
        type: String,
        required: true
    },
    message: [messageSchema],
    status: {
        type: String,
        enum: ['open', 'closed', 'in progress'],
        default: 'open'
    },
    priority: {
        type: String,
        enum: ['low','medium', 'high'],
        default:'medium'
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

export const Support = mongoose.model("Support", supportSchema);


const messageSchemaJoi = Joi.object({
    user: Joi.string().required(), 
    message: Joi.string().required(),
    createdAt: Joi.date().default(Date.now),
    updatedAt: Joi.date().default(Date.now)
});

const supportSchemaJoi = Joi.object({
    user: Joi.string().required(),
    products: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.array().items(messageSchemaJoi).required(),
    status: Joi.string().valid('open', 'closed', 'in progress').default('open'),
    priority: Joi.string().valid('low', 'medium', 'high').default('medium'),
    assignedBy: Joi.string().required(),
    assignedTo: Joi.string().required()
});

export const validateSupport = (data: unknown) => {
    return supportSchemaJoi.validate(data);
}