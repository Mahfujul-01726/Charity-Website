import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
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
        goalAmount: {
            type: Number,
            required: true,
            min: 1,
        },
        raisedAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
        category: {
            type: String,
            default: "General",
            trim: true,
        },
        imageUrl: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["active", "closed"],
            default: "active",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Campaign = mongoose.model("Campaign", campaignSchema);
