import { Router } from "express";
import {
    createRequest,
    listRequests,
    myRequests,
} from "../controllers/requestController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.get("/", listRequests);
router.get("/mine", protect, myRequests);
router.post("/", protect, createRequest);

export default router;
