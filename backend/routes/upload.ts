import express from "express";
import { uploadCsv } from "../controllers/uploadController.ts";

const router = express.Router();

router.post("/", uploadCsv);

export default router;