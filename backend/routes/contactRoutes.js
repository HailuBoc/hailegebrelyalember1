// routes/contactRoutes.js
import express from "express";
import { submitMessage } from "../controllers/contactControllers.js";

const router = express.Router();

router.post("/", submitMessage);

export default router;
