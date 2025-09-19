import express from "express";
import { filterTours } from "../controllers/filterController.js";

const router = express.Router();
router.get("/", filterTours);
export default router;
