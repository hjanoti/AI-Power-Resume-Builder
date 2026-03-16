import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeftIcon, User, FileText, Briefcase, FolderIcon, Sparkles, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";

const ResumeBuilder = () => {

    const {resumeId} = useParams();

    const [resumeData, setResumeData] = useState({
        _id: "",
        title: "",
        professional_info: "",
        professional_summary: "",
        experience: [],
        education: [],
        projects: [],
        skills: [],
        templates: "classic",
        accent_color: "#3B82F6",
        public: false,
        // createdAt: "",
        // updatedAt: ""
    });

    const loadingExistingResume = async() => {
        // TODO: Load existing resume
        const resume = dummyResumeData.find(resume => resume._id === resumeId);
        if (resume) {
            setResumeData(resume);
            document.title = resume.title;
        }
    };

    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [removeBackground, setRemoveBackground] = useState(false);

    const sections = [
        {id: "personal", name: "Personal Info", icon: User},
        {id: "summary", name: "Summary", icon: FileText},
        {id: "experience", name: "Experience", icon: Briefcase},
        {id: "education", name: "Education", icon: GraduationCap},
        {id: "projects", name: "Projects", icon: FolderIcon},
        {id: "skills", name: "Skills", icon: Sparkles},
    ]

    const activeSection = sections[activeSectionIndex];

    useEffect(() => {
        loadingExistingResume();
    }, []);

    return(
        <div>

            <div className="max-w-7xl mx-auto px-4 py-6 ">
                <Link to="/app" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all">
                <ArrowLeftIcon className="size-4" /> Back to Dashboard
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Panel - Form */}
                    <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                            {/* Progress bar using activeSectionIndex */}
                            <hr className="absolute top-0 left-0 right-0 biorder-2 border-gray-200"/>
                            <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                            style={{width: `${activeSectionIndex * 100 / (sections.length-1)}%`}}/>

                            {/* Section Nevigation */}
                            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                                <div></div>
                                <div className="flex items-center gap-2">
                                    {activeSectionIndex !== 0 && (
                                        <button
                                            onClick={() => setActiveSectionIndex(activeSectionIndex - 1)}
                                            className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                                            disabled={activeSectionIndex === 0}
                                        >
                                            <ChevronLeft className="size-4" />
                                            Previous
                                        </button>
                                    )}
                                    {activeSectionIndex !== sections.length - 1 && (
                                        <button
                                            onClick={() => setActiveSectionIndex(activeSectionIndex + 1)}
                                            className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                                                activeSectionIndex === sections.length - 1 && "opacity-50 cursor-not-allowed"
                                            }`}
                                            disabled={activeSectionIndex === sections.length - 1}
                                        >
                                            Next
                                            <ChevronRight className="size-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Form Content */}
                            <div className="space-y-6">
                                {activeSection.id === "personal" && (
                                    <PersonalInfoForm data={resumeData?.personal_info || {}} onChange={(data) => setResumeData(prev => ({...prev, personal_info: data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                                )}
                                {activeSection.id === "experience" && (
                                    <ExperienceForm />
                                )}
                                {activeSection.id === "education" && (
                                    <EducationForm />
                                )}
                                {activeSection.id === "skills" && (
                                    <SkillsForm />
                                )}
                                {activeSection.id === "summary" && (
                                    <SummaryForm />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="relative bg-white rounded-2xl shadow-lg p-6 lg:col-span-8">
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ResumeBuilder;