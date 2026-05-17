import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { User } from "./models/User.js";
import { Campaign } from "./models/Campaign.js";

dotenv.config();

const runSeed = async () => {
    try {
        await connectDB();

        const email = process.env.ADMIN_EMAIL || "admin@charity.com";
        let admin = await User.findOne({ email });

        if (!admin) {
            admin = await User.create({
                name: process.env.ADMIN_NAME || "Admin",
                email,
                password: process.env.ADMIN_PASSWORD || "admin123",
                role: "admin",
            });
            console.log("Admin created successfully");
        } else {
            console.log("Admin already exists");
        }

        const existingCampaigns = await Campaign.countDocuments();
        if (existingCampaigns === 0) {
            console.log("Seeding interactive mock campaigns...");
            const mockCampaigns = [
                {
                    title: "Emergency Medical Relief Fund",
                    description: "Provide immediate medical assistance and supplies to under-resourced hospitals in developing nations. Your donation helps purchase life-saving equipment, medicines, and funds emergency surgeries for those who cannot afford them.",
                    goalAmount: 50000,
                    raisedAmount: 32500,
                    category: "Medical",
                    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                    createdBy: admin._id,
                    status: "active"
                },
                {
                    title: "Tech Education for Underprivileged Youth",
                    description: "Empower the next generation by providing laptops, internet access, and coding bootcamps to students from low-income families. Education is the key to breaking the cycle of poverty.",
                    goalAmount: 25000,
                    raisedAmount: 8400,
                    category: "Education",
                    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                    createdBy: admin._id,
                    status: "active"
                },
                {
                    title: "Global Hunger Eradication Project",
                    description: "Join us in our mission to provide nutritious meals to families facing food insecurity. We partner with local farmers and food banks to distribute fresh produce and staple foods to communities in crisis.",
                    goalAmount: 100000,
                    raisedAmount: 76000,
                    category: "Food",
                    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                    createdBy: admin._id,
                    status: "active"
                },
                {
                    title: "Earthquake Disaster Relief Operations",
                    description: "Immediate disaster relief for regions struck by recent devastating earthquakes. Funds will go directly towards temporary housing, clean water, blankets, and essential survival kits.",
                    goalAmount: 200000,
                    raisedAmount: 145000,
                    category: "Disaster",
                    imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                    createdBy: admin._id,
                    status: "active"
                }
            ];
            await Campaign.insertMany(mockCampaigns);
            console.log("Successfully seeded interactive campaigns.");
        } else {
            console.log("Campaigns already exist in the database.");
        }

        process.exit(0);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

runSeed();
