import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Name, email, and password are required");
        }

        const existing = await User.findOne({ email });
        if (existing) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({ name, email, password });
        const token = signToken(user._id);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400);
            throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401);
            throw new Error("Invalid credentials");
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401);
            throw new Error("Invalid credentials");
        }

        const token = signToken(user._id);

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const me = async (req, res) => {
    res.json({ user: req.user });
};

export const updateProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;
        if (req.body.avatarUrl) user.avatarUrl = req.body.avatarUrl;

        if (req.body.notificationPrefs) {
            user.notificationPrefs = { ...user.notificationPrefs, ...req.body.notificationPrefs };
        }

        if (req.body.paymentMethods) {
            user.paymentMethods = req.body.paymentMethods;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            address: updatedUser.address,
            avatarUrl: updatedUser.avatarUrl,
            paymentMethods: updatedUser.paymentMethods,
            notificationPrefs: updatedUser.notificationPrefs,
        });
    } catch (error) {
        next(error);
    }
};
