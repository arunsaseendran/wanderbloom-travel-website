import express from "express";
import { createPayment, redirectPayment } from "../controllers/paymentController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
router.post("/create", verifyUser, createPayment);
router.get("/redirect/:ref", redirectPayment);
export default router;
