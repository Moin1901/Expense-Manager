import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import expenseRoutes from "./routes/expense.ts";
import uploadRoutes from "./routes/upload.ts";
import dashboardRoutes from "./routes/dashboard.ts";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/expenses", expenseRoutes);
app.use("/upload", uploadRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});