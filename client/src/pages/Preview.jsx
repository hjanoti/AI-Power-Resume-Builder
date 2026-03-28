import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeft } from "lucide-react";

const Preview = () => {

    const {resumeId} = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    const loadResume = async () => {
        setIsLoading(true);

        const data = await new Promise((resolve) => {
           setTimeout(() => {
               resolve(dummyResumeData.find(resume => resume._id === resumeId));
           }, 500);
        });
        setResumeData(data || null);
        setIsLoading(false);
    };


    console.log("resumeData", resumeData);

    useEffect(()=>{
        loadResume()
    },[]) 

    return resumeData ? (
        <div className="bg-slate-100">
            <div className="max-w-3xl mx-auto py-10"> 
                <ResumePreview 
                    resumeData={resumeData} 
                    template={resumeData.template} 
                    accentColor={resumeData?.accent_color} 
                    classes="py-4 bg-white"
                />
            </div>
        </div>
    ) : (
        <div>
            {isLoading ? <Loader /> : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <p className="text-center text-6xl text-slate-400 font-medium">Resume not found</p>
                    <a 
                        href="/" 
                        className="mt-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-blue-400 flex items-center transition-colors "
                    >
                        <ArrowLeft className="mr-2 size-4" /> Go to home page
                    </a>
                </div>
            )}
        </div>
    )
}

export default Preview;