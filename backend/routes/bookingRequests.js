import express from "express";
import { createRequest, listRequests, decideRequest } from "../controllers/bookingRequestController.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/", verifyUser, listRequests);
router.post("/", verifyUser, createRequest);
router.post("/:id/decision", verifyAdmin, decideRequest);
export default router;
