import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        urgency: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium",
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["open", "in_progress", "resolved"],
            default: "open",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);
