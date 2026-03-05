import express from "express";
import type { Request, Response } from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import { getCategory } from "../utils/categorizer.ts";
import { checkAnomaly } from "../utils/anomaly.ts";
import pool from "../db/db.ts";

const upload = multer({ dest: "uploads/" });

export const uploadCsv = [
  upload.single("file"),
  (req: Request, res: Response) => {
    const results: any[] = [];

    fs.createReadStream(req.file!.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (const row of results) {
            const category = await getCategory(row.vendor);
            const anomaly = await checkAnomaly(category, row.amount);

            await pool.query(
              `INSERT INTO expenses(date, amount, vendor, description, category, is_anomaly)
               VALUES($1, $2, $3, $4, $5, $6)`,
              [row.date, row.amount, row.vendor, row.description, category, anomaly]
            );
          }

          res.json({ message: "CSV Uploaded Successfully" });
        } catch (err) {
          console.error("Error processing CSV:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
  },
];