import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";
import { asString, isValidEmail, MIN_PASSWORD_LENGTH } from "../utils/validators.js";

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
}


// Controller for user registration and login
// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        // Coerce to strings first: an object here would reach the query as an operator.
        const name = asString(req.body.name);
        const email = asString(req.body.email).toLowerCase();
        const password = asString(req.body.password);

        // Check if required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            return res.status(400).json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
        }

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        // Return success message
        const token = generateToken(newUser._id);

        return res.status(201).json({
            message: "User registered successfully",
            user: { _id: newUser._id, name: newUser.name, email: newUser.email },
            token,
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const email = asString(req.body.email).toLowerCase();
        const password = asString(req.body.password);

        // Check if required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        // Same message for unknown email and wrong password, so the response
        // cannot be used to discover which emails are registered.
        if (!user || !user.comparePassword(password)) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Return success message
        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Login successful",
            user: { _id: user._id, name: user.name, email: user.email },
            token,
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


// Controller for getting user by ID
// GET: /api/users/data
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        //Check if user exists
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


//Controller for getting user resumes
// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId;

        //Return user resumes, newest first
        const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

        return res.status(200).json({ resumes });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
