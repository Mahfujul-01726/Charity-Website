import { Router } from "express";
import { createDonation, myDonations } from "../controllers/donationController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/", protect, createDonation);
router.get("/mine", protect, myDonations);

export default router;
