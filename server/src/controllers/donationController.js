import { Campaign } from "../models/Campaign.js";
import { Donation } from "../models/Donation.js";

export const createDonation = async (req, res, next) => {
    try {
        const { campaignId, amount, message, transactionId } = req.body;

        if (!campaignId || !amount) {
            res.status(400);
            throw new Error("Campaign and amount are required");
        }

        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            res.status(404);
            throw new Error("Campaign not found");
        }

        const donation = await Donation.create({
            campaign: campaign._id,
            donor: req.user._id,
            amount,
            message,
            transactionId: transactionId || `TXN-${Date.now()}`,
            status: "success",
        });

        campaign.raisedAmount += Number(amount);
        await campaign.save();

        res.status(201).json(donation);
    } catch (error) {
        next(error);
    }
};

export const myDonations = async (req, res, next) => {
    try {
        const donations = await Donation.find({ donor: req.user._id })
            .populate("campaign", "title category")
            .sort({ createdAt: -1 });

        res.json(donations);
    } catch (error) {
        next(error);
    }
};
