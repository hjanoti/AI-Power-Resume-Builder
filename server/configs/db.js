import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database connected successfully");
        });

        let mongodbURI = process.env.MONGODB_URL;
        const projectName = "resume-builder";
        
        if(!mongodbURI) {
            throw new Error("MongoDB URI environment variable is not defined");
        }

        if(mongodbURI.endsWith("/")) {
            mongodbURI = mongodbURI.slice(0, -1);
        }
        
        await mongoose.connect(`${mongodbURI}/${projectName}`);
    } catch (error) {
        console.error("Database connection error", error);
        process.exit(1);
    }
};

export default connectDB;
