import Joi, { required } from "joi";
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
})

export const Category = mongoose.model("Category", categorySchema)

export const validateCategory = (data: unknown) => {
    const schema = Joi.object({
        name: required(),
        description: required()
    })

    return schema.validate(data)
}