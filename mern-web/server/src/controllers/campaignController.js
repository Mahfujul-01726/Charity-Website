import { Campaign } from "../models/Campaign.js";

export const listCampaigns = async (req, res, next) => {
    try {
        const campaigns = await Campaign.find({ status: "active" })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.json(campaigns);
    } catch (error) {
        next(error);
    }
};

export const getCampaignById = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.params.id).populate(
            "createdBy",
            "name email"
        );

        if (!campaign) {
            res.status(404);
            throw new Error("Campaign not found");
        }

        res.json(campaign);
    } catch (error) {
        next(error);
    }
};

export const createCampaign = async (req, res, next) => {
    try {
        const { title, description, goalAmount, category, imageUrl } = req.body;

        if (!title || !description || !goalAmount) {
            res.status(400);
            throw new Error("Title, description, and goal amount are required");
        }

        const campaign = await Campaign.create({
            title,
            description,
            goalAmount,
            category,
            imageUrl,
            createdBy: req.user._id,
        });

        res.status(201).json(campaign);
    } catch (error) {
        next(error);
    }
};

export const updateCampaign = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            res.status(404);
            throw new Error("Campaign not found");
        }

        const isOwner = campaign.createdBy.toString() === req.user._id.toString();
        if (!isOwner && req.user.role !== "admin") {
            res.status(403);
            throw new Error("Not allowed to update this campaign");
        }

        const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.json(updated);
    } catch (error) {
        next(error);
    }
};

export const deleteCampaign = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            res.status(404);
            throw new Error("Campaign not found");
        }

        const isOwner = campaign.createdBy.toString() === req.user._id.toString();
        if (!isOwner && req.user.role !== "admin") {
            res.status(403);
            throw new Error("Not allowed to delete this campaign");
        }

        await campaign.deleteOne();
        res.json({ message: "Campaign deleted" });
    } catch (error) {
        next(error);
    }
};
