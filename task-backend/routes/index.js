import express from "express";
import { router as route } from "./api/index.js";

const router = express.Router();

router.use("/api/v1/", route);

export { router };
