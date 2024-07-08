import Joi, { required } from "joi"
import mongoose from "mongoose"

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    logo: {
        type: String
    }
}, {
    timestamps: true
})

export const Brand = mongoose.model("Brand", brandSchema)

export const validateBrand = (data: unknown) => {
    const schema = Joi.object({
        name: required(),
        description: required(),
        logo: required()
    })

    return schema.validate(data)
}