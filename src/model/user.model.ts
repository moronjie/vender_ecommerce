import Joi, { required } from "joi";
import mongoose, { Document, CallbackWithoutResultAndOptionalError } from 'mongoose';
import bcrypt from "bcrypt"
import { customError } from "../middleware/errorHandler";

interface userInterface extends Document {
    name: string,
    email: string,
    password: string,
    role: string,
    phone: string,
    isActive: boolean,
    address: {
        street: string,
        city: string,
        state: string,
        country: string,
        zip: string
    }
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema<userInterface>({
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

userSchema.pre("save", async function (this: userInterface, next: CallbackWithoutResultAndOptionalError): Promise<void> {
    try {
        if (!this.isModified("password")) return next()

        const salt = await bcrypt.genSalt(10)
        
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (err: any) {
        next(customError(err.message, 500))
    }
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean | undefined> {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (err: any) {
        customError(err.message, 401)
    }
}


export const User = mongoose.model('User', userSchema)

export const validateUserSignUp = (data: unknown) => {
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

export const validateUserForgotPassword = (data:unknown) => {
    const schema = Joi.object({
        email: Joi.string().email().max(256).required(),
    })
    return schema.validate(data)
}

export const validateUserResetPassword = (data:unknown) => {
    const schema = Joi.object({
        password: Joi.string().min(8).max(256).required(),
        confirmPassword: Joi.string().min(8).max(256).required().valid(Joi.ref('password')),
    })
    return schema.validate(data)
}