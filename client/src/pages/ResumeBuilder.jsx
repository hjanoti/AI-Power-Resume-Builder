import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeftIcon, User, FileText, Briefcase, FolderIcon, Sparkles, GraduationCap, ChevronLeft, ChevronRight, Share2Icon, EyeIcon, EyeOffIcon, DownloadIcon} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

const ResumeBuilder = () => {

    const {resumeId} = useParams();

    const [resumeData, setResumeData] = useState({
        _id: "",
        title: "",
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false,
    });

    const loadingExistingResume = async() => {
        const resume = dummyResumeData.find(resume => resume._id === resumeId);
        
        if (resume) {
            setResumeData(resume);
            document.title = resume.title;
        }
    };

    console.log("resume", resumeData);

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

    const changeResumeVisibility = () => {
        setResumeData({
            ...resumeData,
            public: !resumeData.public
        });
    };

    const handleShare = () => {
        const frontendUrl = window.location.href.split('/app')[0];
        const resumeUrl = frontendUrl + `/view/` + resumeId;

        if(navigator.share){
            navigator.share({
                title: "My Resume",
                url: resumeUrl
            });
        } else {
            alert("Share not supported on this browser");
        }
    };

    const downloadResume = () => {
        window.print();
    };

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
                    <div className="relative lg:col-span-5 rounded-lg">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                            {/* Progress bar using activeSectionIndex */}
                            <hr className="absolute top-0 left-0 right-0 biorder-2 border-gray-200"/>
                            <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000"
                            style={{width: `${activeSectionIndex * 100 / (sections.length-1)}%`}}/>

                            {/* Section Nevigation */}
                            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-2">
                                <div className="flex items-center gap-2">
                                    <TemplateSelector 
                                        selectedTemplate={resumeData.template} 
                                        onChange={(template) => setResumeData({...resumeData, template})} 
                                    />
                                    <ColorPicker 
                                        selectedColor={resumeData.accent_color} 
                                        onChange={(color) => setResumeData({...resumeData, accent_color: color})} 
                                    />
                                </div>
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
                                    <PersonalInfoForm data={resumeData?.personal_info} onChange={(data) => setResumeData(prev => ({...prev, personal_info: data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                                )}

                                {activeSection.id === "summary" && (
                                    <ProfessionalSummary data={resumeData?.professional_summary} onChange={(data) => setResumeData(prev => ({...prev, professional_summary: data}))} setResumeData={setResumeData}/>
                                )}

                                {activeSection.id === "experience" && (
                                    <ExperienceForm data={resumeData?.experience} onChange={(data) => setResumeData(prev => ({...prev, experience: data}))} />
                                )}

                                {activeSection.id === "education" && (
                                    <EducationForm data={resumeData?.education} onChange={(data) => setResumeData(prev => ({...prev, education: data}))} />
                                )}

                                {activeSection.id === "projects" && (
                                    <ProjectForm data={resumeData?.project} onChange={(data) => setResumeData(prev => ({...prev, project: data}))} />
                                )}

                                {activeSection.id === "skills" && (
                                    <SkillsForm data={resumeData?.skills} onChange={(data) => setResumeData(prev => ({...prev, skills: data}))} />
                                )}
                            </div>

                            <button className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 px-6 py-2 mt-6 text-sm rounded-md">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="lg:col-span-7 max-lg:mt-6">
                        <div className="relative w-full">
                            {/* ---- Buttons ---- */}
                            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                                {resumeData?.public && (
                                    <button 
                                        onClick={handleShare}
                                        className="flex items-center gap-2 p-2 px-4 text-xs bg-gradient-to-br from-blue-100 to-blue-200 ring-blue-300 text-blue-600 hover:ring transition-colors rounded-lg">
                                        <Share2Icon className="size-4"/>
                                        Share
                                    </button>
                                )}

                                <button 
                                    onClick={changeResumeVisibility}
                                    className="flex items-center gap-2 p-2 px-4 text-xs bg-gradient-to-br from-purple-100 to-purple-200 ring-purple-300 text-purple-600 hover:ring transition-colors rounded-lg">
                                    {
                                        resumeData?.public ? (
                                            <EyeIcon className="size-4"/>
                                        ) : (
                                            <EyeOffIcon className="size-4"/>
                                        )
                                    }

                                    {resumeData?.public ? "Private" : "Public"}
                                </button>

                                <button 
                                   onClick={downloadResume}
                                 className="flex items-center gap-2 p-2 px-4 text-xs bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 hover:ring transition-colors rounded-lg">
                                    <DownloadIcon className="size-4"/>
                                    Download
                                </button>
                            </div>
                        </div>
                    
                        {/* ---- Resume Preview ---- */}
                        <ResumePreview 
                            resumeData={resumeData} 
                            template={resumeData?.template} 
                            accentColor={resumeData?.accent_color} 
                        />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ResumeBuilder;
