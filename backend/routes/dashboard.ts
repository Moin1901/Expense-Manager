import express from "express";
import { getMonthlySummary, getTopVendors, getAnomalies } from "../controllers/expenseController.ts";

const router = express.Router();

router.get("/monthly", getMonthlySummary);
router.get("/vendors", getTopVendors);
router.get("/anomalies", getAnomalies);

export default router;