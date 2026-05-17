import { Request } from "../models/Request.js";

export const createRequest = async (req, res, next) => {
    try {
        const { title, description, category, urgency, address } = req.body;

        if (!title || !description || !category || !address) {
            res.status(400);
            throw new Error("Title, description, category, and address are required");
        }

        const request = await Request.create({
            title,
            description,
            category,
            urgency,
            address,
            createdBy: req.user._id,
        });

        res.status(201).json(request);
    } catch (error) {
        next(error);
    }
};

export const listRequests = async (req, res, next) => {
    try {
        const requests = await Request.find({ status: "open" })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (error) {
        next(error);
    }
};

export const myRequests = async (req, res, next) => {
    try {
        const requests = await Request.find({ createdBy: req.user._id }).sort({
            createdAt: -1,
        });

        res.json(requests);
    } catch (error) {
        next(error);
    }
};
