import express from "express";
import { addExpense, getMonthlySummary } from "../controllers/expenseController.ts";

const router = express.Router();

router.post("/add", addExpense);

export default router;
