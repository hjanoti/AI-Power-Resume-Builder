import express from "express";
import { registerUser, loginUser, getUserById, getUserResumes } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const userRouter = express.Router();

userRouter.post("/register", authLimiter, registerUser)
userRouter.post("/login", authLimiter, loginUser)
userRouter.get("/data",protect, getUserById)
userRouter.get("/resumes",protect, getUserResumes)

export default userRouter;
