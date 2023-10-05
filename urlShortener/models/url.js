import mongoose from "mongoose";
import { nanoid } from "nanoid";

// => creating a schema 
const urlSchema = mongoose.Schema({
    full: {
        type: String,
        required: true
    },

    short: {
        type: String,
        required: true,
        default: nanoid(10)
    },

    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})


export default mongoose.model("shortUrl", urlSchema)