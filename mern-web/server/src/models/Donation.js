import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
    {
        campaign: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Campaign",
            required: true,
        },
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 1,
        },
        message: {
            type: String,
            default: "",
            trim: true,
        },
        transactionId: {
            type: String,
            default: "manual",
            trim: true,
        },
        status: {
            type: String,
            enum: ["success", "pending", "failed"],
            default: "success",
        },
    },
    { timestamps: true }
);

export const Donation = mongoose.model("Donation", donationSchema);
