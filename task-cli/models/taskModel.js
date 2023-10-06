import mongoose from "mongoose";
import { nanoid } from "nanoid";

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    detail: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        required: true,
        enum: ["completed", 'pending'],
        default: "pending",
        trim: true,
    },

    code: {
        type: String,
        required: true,
        default: 'code',
        trim: true
    }

}, { timestamp: true })

// before saving the database
TaskSchema.pre("save", function (next) {
    this.code = nanoid(10);
    next();
})

export default mongoose.model("TaskModel", TaskSchema)