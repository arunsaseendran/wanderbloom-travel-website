import express from "express";
import { createBooking, getUserBookings } from "../controllers/bookingController.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Create a booking (user must be logged in)
router.post("/", verifyUser, createBooking);

// Get bookings of logged-in user
router.get("/", verifyToken, getUserBookings);

export default router;
