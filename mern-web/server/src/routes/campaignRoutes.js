import { Router } from "express";
import {
    createCampaign,
    deleteCampaign,
    getCampaignById,
    listCampaigns,
    updateCampaign,
} from "../controllers/campaignController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", listCampaigns);
router.get("/:id", getCampaignById);
router.post("/", protect, createCampaign);
router.put("/:id", protect, updateCampaign);
router.delete("/:id", protect, deleteCampaign);

export default router;
