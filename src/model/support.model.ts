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

const Support = mongoose.model("Support", supportSchema);