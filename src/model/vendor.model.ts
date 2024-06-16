import { ref } from "joi";
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    plan: {
        type: String,
        enum: ['basic', 'premium'],
        default: 'basic'
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: false
    },

})


const vendorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    storeDiscription: {
        type: String,
        required: true
    }, 
    storeImg: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }], 
    subscription: subscriptionSchema
}, {
    timestamps: true
})

export const Vendor = mongoose.model('Vendor', vendorSchema)