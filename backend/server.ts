import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import expenseRoutes from "./routes/expense.ts";
import uploadRoutes from "./routes/upload.ts";
import dashboardRoutes from "./routes/dashboard.ts";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/expenses", expenseRoutes);
app.use("/upload", uploadRoutes);
app.use("/dashboard", dashboardRoutes);

// Health Check
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running");
});

// Global Error Handler
app.use((err: unknown, req: Request, res: Response, next: () => void) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});