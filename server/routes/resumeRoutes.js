import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { createResume, updateResume, getResumeById, deleteResume, getPublicResumeById} from "../controllers/resumeController.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
// protect runs first so an unauthenticated request is rejected before its upload is parsed
resumeRouter.put("/update", protect, upload.single("image"), updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);



export default resumeRouter;
