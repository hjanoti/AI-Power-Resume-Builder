import mongoose from "mongoose";
import Resume from "../models/Resume.js";
import imageKit from "../configs/imageKit.js";
import { pickResumeFields, asString } from "../utils/validators.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

//Controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const title = asString(req.body.title);
        const userId = req.userId;

        if (!title) {
            return res.status(400).json({ message: "Resume title is required" });
        }

        //Create new resume
        const newResume = await Resume.create({ userId, title });

        //Return success message
        return res.status(201).json({ message: "Resume created successfully", resume: newResume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//Controller for deleting a resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        if (!isValidId(resumeId)) {
            return res.status(400).json({ message: "Invalid resume id" });
        }

        //Delete resume owned by this user
        const deleted = await Resume.findOneAndDelete({ userId, _id: resumeId });

        if (!deleted) {
            return res.status(404).json({ message: "Resume not found" });
        }

        //Return success message
        return res.status(200).json({ message: "Resume deleted successfully" });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


//Controller for getting resume by id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        if (!isValidId(resumeId)) {
            return res.status(400).json({ message: "Invalid resume id" });
        }

        //Get resume
        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        //Return success message
        return res.status(200).json({ message: "Resume fetched successfully", resume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//Controller for getting resume by public id
// GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;

        if (!isValidId(resumeId)) {
            return res.status(400).json({ message: "Invalid resume id" });
        }

        //Get resume
        const resume = await Resume.findOne({ public: true, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        //Return success message
        return res.status(200).json({ message: "Resume fetched successfully", resume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//Controller for updating resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        if (!isValidId(resumeId)) {
            return res.status(400).json({ message: "Invalid resume id" });
        }

        let parsedData;
        if (typeof resumeData === 'string') {
            try {
                parsedData = JSON.parse(resumeData);
            } catch {
                return res.status(400).json({ message: "Invalid resume data" });
            }
        } else {
            parsedData = resumeData;
        }

        // Only keep fields a client is allowed to change, so the request cannot
        // reassign userId or overwrite _id / timestamps.
        const resumeDataCopy = pickResumeFields(parsedData);

        // Confirm ownership before spending an ImageKit upload on the request.
        const existing = await Resume.findOne({ userId, _id: resumeId });

        if (!existing) {
            return res.status(404).json({ message: "Resume not found" });
        }

        if (image) {
            try {
                const transformation = removeBackground === "yes" ? "w-300,h-300,fo-face,z-0.75,e-bgremove" : "w-300,h-300,fo-face,z-0.75";

                const base64Image = image.buffer.toString('base64');

                const response = await imageKit.files.upload({
                  file: base64Image,
                  fileName: "resume.png",
                  folder: "user-resumes",
                  transformation: {
                      pre: transformation
                  }
                });

                resumeDataCopy.personal_info = {
                    ...(resumeDataCopy.personal_info || {}),
                    image: response.url,
                };
            } catch (imageKitError) {
                console.error("ImageKit error:", imageKitError.message);
                return res.status(502).json({ message: "Image upload failed. Please try again." });
            }
        }

        //Update resume, scoped to the owner
        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            resumeDataCopy,
            { new: true, runValidators: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        //Return success message
        return res.status(200).json({ message: "Saved successfully", resume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
