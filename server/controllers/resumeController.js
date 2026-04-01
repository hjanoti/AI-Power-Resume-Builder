import Resume from "../models/Resume.js";
import imageKit from "../configs/imageKit.js";
import fs from "fs";


//Controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.userId;
        
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
        
        //Delete resume
        await Resume.findOneAndDelete({ userId, _id: resumeId });
        
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
        
        //Get resume
        const resume = await Resume.findOne({ userId, _id: resumeId });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        
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
        const {resumeId, resumeData, removeBackground} = req.body;
        const image = req.file;

        let resumeDataCopy;
        if(typeof resumeData === 'string'){
            resumeDataCopy = await JSON.parse(resumeData);
        } else {
            resumeDataCopy = structuredClone(resumeData);
        }

        if(image){

            const imageBufferData = fs.createReadStream(image.path)

            const response = await imageKit.files.upload({
              file: imageBufferData,
              fileName: "resume.png",
              folder: "user-resumes",
              transformation: {
                  pre: "w-300,h-300,fo-face,z-0.75" + (removeBackground ? ",e-bgremove" : "")
              }
            });

            resumeDataCopy.personal_info.image = response.url;
        }

        //Update resume
        const resume = await Resume.findByIdAndUpdate({userId, _id: resumeId}, resumeDataCopy, {new: true});
        
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        
        //Return success message
        return res.status(200).json({ message: "Saved successfully", resume });
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
