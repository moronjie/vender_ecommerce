import Joi, { required } from "joi";
import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }, 
    role:{
        type: String,
        enum: ['user', 'vendor', 'admin'],
        default: 'user'
    },
    phone: {
        type: String
    },
    isActive:{
        type: Boolean
    },
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
}, {timestamps: true})


export const User = mongoose.model('User', userSchema)

export const validateUserIgnUp = (data: unknown) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required(),
        role: Joi.string(),
        phone: Joi.string().max(20),
        isActive: Joi.boolean(),
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        country: Joi.string(),
        zip: Joi.string()
    })
    return schema.validate(data)
}

export const validateUserLogIn = (data:unknown) => {
    const schema = Joi.object({
        email: Joi.string().email().max(256).required(),
        password: Joi.string().min(8).max(256).required(),
    })
    return schema.validate(data)
}