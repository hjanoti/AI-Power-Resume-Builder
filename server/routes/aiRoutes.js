import express from "express";
import { enhanceProfessionalSummary, enhanceJobDescription, uploadResume } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js";
import { aiLimiter } from "../middlewares/rateLimiter.js";


const aiRouter = express.Router();

aiRouter.post("/enhance-pro-sum", protect , aiLimiter, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-desc", protect , aiLimiter, enhanceJobDescription);
aiRouter.post("/upload-resume", protect , aiLimiter, uploadResume);

export default aiRouter;
