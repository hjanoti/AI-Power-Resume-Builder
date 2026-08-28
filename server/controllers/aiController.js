import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";
import { asString, pickResumeFields } from "../utils/validators.js";

// Keeps a single request from sending a huge document to the model.
const MAX_CONTENT_LENGTH = 20000;


// Controller for enhancing a resume's profession summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try{
        const userContent = asString(req.body.userContent).slice(0, MAX_CONTENT_LENGTH);

        if(!userContent){
            return res.status(400).json({ message: "Missing required fields" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. the summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enhancedContent = response.choices[0].message.content;

        return res.status(200).json({enhancedContent});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try{
        const userContent = asString(req.body.userContent).slice(0, MAX_CONTENT_LENGTH);

        if(!userContent){
            return res.status(400).json({ message: "Missing required fields" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. the job description should be only in 1-2 sentences also highlighting key responsibilities, achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enhancedContent = response.choices[0].message.content;

        return res.status(200).json({enhancedContent});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try{
        
        const resumeText = asString(req.body.resumeText).slice(0, MAX_CONTENT_LENGTH);
        const title = asString(req.body.title) || "Untitled Resume";
        const userId = req.userId

        if(!resumeText){
            return res.status(400).json({ message: "Could not read any text from this PDF" });
        }

        const systemPrompt = "You are an expert AI Agent to extract data from resume."
        const userPrompt = `Extract data from this resume: ${resumeText}
        Provide data in the following JSON format with no additional text before or after:
        {
           professional_summary: { type: String, default: "" },
           skills: [ { type: String } ],
           personal_info: {
              image: { type: String, default: "" },
              full_name: { type: String, default: "" },
              profession: { type: String, default: "" },
              email: { type: String, default: "" },
              phone: { type: String, default: "" },
              location: { type: String, default: "" },
              linkedin: { type: String, default: "" },
              website: { type: String, default: "" },
           },
           experience: [
              {
               company: { type: String, default: "" },
               position: { type: String, default: "" },
               start_date: { type: String, default: "" },
               end_date: { type: String, default: "" },
               description: { type: String, default: "" },
               is_current: { type: Boolean, default: false }
              }
            ],
            projects: [
              { 
                name: { type: String, default: "" },
                type: { type: String, default: "" },
                description: { type: String, default: "" }
              }
            ],
            education: [
              {
                institution: { type: String, default: "" },
                degree: { type: String, default: "" },
                field: { type: String, default: "" },
                graduation_date: { type: String, default: "" },
                gpa: { type: String,  default: "" }
              }
            ]
        }`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            response_format: {
                type: "json_object"
            }
        });

        const extractedData = response.choices[0].message.content;

        let parsedData;
        try {
            parsedData = JSON.parse(extractedData);
        } catch {
            return res.status(502).json({ message: "Could not read this resume. Please try again." });
        }

        const newResume = await Resume.create({
            ...pickResumeFields(parsedData),
            userId,
            title,
        });
        return res.json({resumeId: newResume._id});

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}