import Joi, { ref } from "joi";
import mongoose from "mongoose";

const subscriptionSchema = {
    plan: {
        type: String,
        enum: ['basic', 'premium'],
        default: 'basic'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: false
    },

}


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
    // product: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product',
    //     required: true
    // }], 
    subscription: subscriptionSchema
}, {
    timestamps: true
})

export const Vendor = mongoose.model('Vendor', vendorSchema)

const validateSubscriptionSchema = Joi.object({
    plan: Joi.string().valid('basic', 'premium').default('basic'),
    startDate: Joi.date(),
    endDate: Joi.date(),
    isActive: Joi.boolean().default(false)
});

const validateVendorSchema = Joi.object({
    user: Joi.string().required(),
    storeName: Joi.string().required(),
    storeDiscription: Joi.string().required(),
    storeImg: Joi.string().uri(),
    isVerified: Joi.boolean().default(false),
    // product: Joi.array().items(Joi.string().required()),
    subscription: validateSubscriptionSchema
});

export const validateVendor = (data: unknown) => {
    return validateVendorSchema.validate(data);
};