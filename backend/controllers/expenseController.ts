import type { Request, Response } from "express";
import { getCategory } from "../utils/categorizer.ts";
import { checkAnomaly } from "../utils/anomaly.ts";
import pool from "../db/db.ts"

export const addExpense = async (req: Request, res: Response) => {
  try {
    const { date, amount, vendor, description } = req.body || {};

    if (!date || !amount || !vendor || !description) {
      return res.status(400).json({ error: "Invalid request body. Missing required fields." });
    }

    const category = await getCategory(vendor);
    const anomaly = await checkAnomaly(category, amount);

    const result = await pool.query(
      `INSERT INTO expenses(date, amount, vendor, description, category, is_anomaly)
       VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [date, amount, vendor, description, category, anomaly]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMonthlySummary = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT category, SUM(amount) as sum FROM expenses GROUP BY category`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching monthly summary:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTopVendors = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT vendor, SUM(amount) as total FROM expenses GROUP BY vendor ORDER BY total DESC LIMIT 5`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching top vendors:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAnomalies = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM expenses WHERE is_anomaly = true`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching anomalies:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};