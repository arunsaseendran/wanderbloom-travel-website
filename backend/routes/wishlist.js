import express from "express";
import { getWishlist, toggleWishlist } from "../controllers/wishlistController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getWishlist);
router.post("/toggle", auth, toggleWishlist);

export default router;
