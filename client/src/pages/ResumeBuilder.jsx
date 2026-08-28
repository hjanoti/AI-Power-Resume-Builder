import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeftIcon, User, FileText, Briefcase, FolderIcon, Sparkles, GraduationCap,
    ChevronLeft, ChevronRight, Share2Icon, EyeIcon, EyeOffIcon, DownloadIcon, CheckIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import { BuilderSkeleton } from "../components/Skeleton";
import api from "../configs/api.js";
import getErrorMessage from "../utils/getErrorMessage.js";
import useUnsavedChanges from "../hooks/useUnsavedChanges.js";

const EMPTY_RESUME = {
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
};

const ResumeBuilder = () => {

    const { resumeId } = useParams();
    const navigate = useNavigate();

    const [resumeData, setResumeData] = useState(EMPTY_RESUME);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [removeBackground, setRemoveBackground] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isTogglingVisibility, setIsTogglingVisibility] = useState(false);
    const [justSaved, setJustSaved] = useState(false);
    const [pendingExit, setPendingExit] = useState(false);

    // Snapshot of the last persisted state, used to detect unsaved edits.
    const savedSnapshot = useRef(JSON.stringify(EMPTY_RESUME));

    const sections = [
        { id: "personal", name: "Personal Info", icon: User },
        { id: "summary", name: "Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "projects", name: "Projects", icon: FolderIcon },
        { id: "skills", name: "Skills", icon: Sparkles },
    ]

    const activeSection = sections[activeSectionIndex];

    const isDirty = useMemo(
        () => !isLoading && savedSnapshot.current !== JSON.stringify(resumeData),
        [resumeData, isLoading]
    );

    useUnsavedChanges(isDirty);

    const loadExistingResume = useCallback(async () => {
        setIsLoading(true);
        setLoadError("");
        try {
            const { data } = await api.get("/api/resumes/get/" + resumeId);
            if (data?.resume) {
                const loaded = { ...EMPTY_RESUME, ...data.resume };
                setResumeData(loaded);
                savedSnapshot.current = JSON.stringify(loaded);
                document.title = data.resume.title;
            }
        } catch (error) {
            setLoadError(getErrorMessage(error, "Could not load this resume"));
        } finally {
            setIsLoading(false);
        }
    }, [resumeId]);

    useEffect(() => {
        loadExistingResume();
    }, [loadExistingResume]);

    // Reset the page title when leaving the builder.
    useEffect(() => () => { document.title = "Resume Builder"; }, []);

    const changeResumeVisibility = async () => {
        if (isTogglingVisibility) return;

        const nextValue = !resumeData.public;
        setIsTogglingVisibility(true);
        try {
            const { data } = await api.put("/api/resumes/update", {
                resumeId,
                resumeData: { public: nextValue },
            });
            setResumeData((prev) => {
                const next = { ...prev, public: data.resume.public };
                // Keep the snapshot in sync so a visibility flip alone is not "unsaved".
                savedSnapshot.current = JSON.stringify({
                    ...JSON.parse(savedSnapshot.current),
                    public: data.resume.public,
                });
                return next;
            });
            toast.success(nextValue ? "Resume is now public" : "Resume is now private");
        } catch (error) {
            toast.error(getErrorMessage(error, "Could not change visibility"));
        } finally {
            setIsTogglingVisibility(false);
        }
    };

    const handleShare = async () => {
        const resumeUrl = `${window.location.origin}/view/${resumeId}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: resumeData.title || "My Resume", url: resumeUrl });
                return;
            } catch (error) {
                // The user dismissing the share sheet is not an error worth reporting.
                if (error?.name === "AbortError") return;
            }
        }

        // Fall back to the clipboard where the Web Share API is unavailable.
        try {
            await navigator.clipboard.writeText(resumeUrl);
            toast.success("Share link copied to clipboard");
        } catch {
            toast.error("Could not copy the link. Please copy it from the address bar.");
        }
    };

    const downloadResume = () => {
        window.print();
    };

    const saveResume = async () => {
        if (isSaving) return;

        setIsSaving(true);
        try {
            // Save image reference BEFORE cloning (structuredClone destroys File objects)
            const imageFile = resumeData.personal_info?.image;

            const updatedResumeData = structuredClone({
                ...resumeData,
                personal_info: { ...resumeData.personal_info, image: undefined },
            });

            // Remove image from JSON data
            delete updatedResumeData.personal_info.image;

            const formData = new FormData();
            formData.append("resumeId", resumeId);
            formData.append("resumeData", JSON.stringify(updatedResumeData));
            removeBackground && formData.append("removeBackground", "yes");

            if (imageFile instanceof File) {
                formData.append("image", imageFile);
            }

            const { data } = await api.put("/api/resumes/update", formData);

            const saved = { ...EMPTY_RESUME, ...data.resume };
            setResumeData(saved);
            savedSnapshot.current = JSON.stringify(saved);
            setRemoveBackground(false);

            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2500);

            return data.message;
        } catch (error) {
            const message = getErrorMessage(error, "Could not save your changes");
            toast.error(message);
            throw new Error(message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveClick = () => {
        toast.promise(saveResume(), {
            loading: "Saving...",
            success: (message) => message || "Saved successfully",
            // saveResume already surfaced the failure, so keep this quiet.
            error: null,
        });
    };

    const goToDashboard = () => navigate("/app");

    const handleBackClick = (event) => {
        event.preventDefault();
        if (isDirty) {
            setPendingExit(true);
            return;
        }
        goToDashboard();
    };

    const saveThenExit = async () => {
        try {
            await saveResume();
            setPendingExit(false);
            goToDashboard();
        } catch {
            setPendingExit(false);
        }
    };

    const actionsDisabled = isSaving || isTogglingVisibility;

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-6 h-5 w-40 animate-pulse rounded bg-slate-200" />
                <BuilderSkeleton />
            </div>
        );
    }

    if (loadError) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 px-4 py-24 text-center">
                <FileText className="size-12 text-slate-300" />
                <p className="text-lg font-medium text-slate-700">{loadError}</p>
                <div className="flex gap-3">
                    <button
                        onClick={loadExistingResume}
                        className="rounded-lg bg-slate-900 px-5 py-2 text-sm text-white transition-opacity hover:opacity-90"
                    >
                        Try again
                    </button>
                    <button
                        onClick={goToDashboard}
                        className="rounded-lg border border-slate-300 px-5 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>

            <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
                <a
                    href="/app"
                    onClick={handleBackClick}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-all"
                >
                    <ArrowLeftIcon className="size-4" /> Back to Dashboard
                </a>

                {/* Save state is easy to lose track of in a long form, so name it. */}
                <p className="text-xs text-slate-500" aria-live="polite">
                    {isSaving ? (
                        <span className="flex items-center gap-1.5"><Spinner className="size-3" /> Saving...</span>
                    ) : isDirty ? (
                        <span className="flex items-center gap-1.5 text-amber-600">
                            <span className="size-1.5 rounded-full bg-amber-500" /> Unsaved changes
                        </span>
                    ) : justSaved ? (
                        <span className="flex items-center gap-1.5 text-green-600"><CheckIcon className="size-3" /> Saved</span>
                    ) : (
                        <span className="text-slate-400">All changes saved</span>
                    )}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Panel - Form */}
                    <div className="relative lg:col-span-5 rounded-lg">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                            {/* Progress bar using activeSectionIndex */}
                            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200"/>
                            <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
                            style={{width: `${activeSectionIndex * 100 / (sections.length-1)}%`}}/>

                            {/* Section Navigation */}
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
                                        >
                                            <ChevronLeft className="size-4" />
                                            Previous
                                        </button>
                                    )}
                                    {activeSectionIndex !== sections.length - 1 && (
                                        <button
                                            onClick={() => setActiveSectionIndex(activeSectionIndex + 1)}
                                            className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                                        >
                                            Next
                                            <ChevronRight className="size-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Step indicator */}
                            <p className="mb-4 text-xs font-medium uppercase tracking-wide text-slate-400">
                                Step {activeSectionIndex + 1} of {sections.length} &middot; {activeSection.name}
                            </p>

                            {/* Form Content */}
                            <div className="space-y-6">
                                {activeSection.id === "personal" && (
                                    <PersonalInfoForm data={resumeData?.personal_info} onChange={(data) => setResumeData(prev => ({...prev, personal_info: data}))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground}/>
                                )}

                                {activeSection.id === "summary" && (
                                    <ProfessionalSummary data={resumeData?.professional_summary} onChange={(data) => setResumeData(prev => ({...prev, professional_summary: data}))} />
                                )}

                                {activeSection.id === "experience" && (
                                    <ExperienceForm data={resumeData?.experience} onChange={(data) => setResumeData(prev => ({...prev, experience: data}))} />
                                )}

                                {activeSection.id === "education" && (
                                    <EducationForm data={resumeData?.education} onChange={(data) => setResumeData(prev => ({...prev, education: data}))} />
                                )}

                                {activeSection.id === "projects" && (
                                    <ProjectForm data={resumeData?.projects} onChange={(data) => setResumeData(prev => ({...prev, projects: data}))} />
                                )}

                                {activeSection.id === "skills" && (
                                    <SkillsForm data={resumeData?.skills} onChange={(data) => setResumeData(prev => ({...prev, skills: data}))} />
                                )}
                            </div>

                            <button
                            onClick={handleSaveClick}
                            disabled={isSaving}
                            className={`flex items-center gap-2 bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 px-6 py-2 mt-6 text-sm rounded-md transition-all ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {isSaving && <Spinner />}
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="lg:col-span-7 max-lg:mt-6">
                        {/* These used to be absolutely positioned, which floated them up
                            over the header row and hid the save-state indicator. */}
                        <div className="mb-3 w-full">
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                {resumeData?.public && (
                                    <button
                                        onClick={handleShare}
                                        disabled={actionsDisabled}
                                        className={`flex items-center gap-2 p-2 px-4 text-xs bg-gradient-to-br from-blue-100 to-blue-200 ring-blue-300 text-blue-600 hover:ring transition-colors rounded-lg ${actionsDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                        <Share2Icon className="size-4"/>
                                        Share
                                    </button>
                                )}

                                <button
                                    onClick={changeResumeVisibility}
                                    disabled={actionsDisabled}
                                    title={resumeData?.public ? "Make this resume private" : "Make this resume public and shareable"}
                                    className={`flex items-center gap-2 p-2 px-4 text-xs bg-gradient-to-br from-purple-100 to-purple-200 ring-purple-300 text-purple-600 hover:ring transition-colors rounded-lg ${actionsDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {isTogglingVisibility ? (
                                        <Spinner />
                                    ) : resumeData?.public ? (
                                        <EyeIcon className="size-4"/>
                                    ) : (
                                        <EyeOffIcon className="size-4"/>
                                    )}

                                    {isTogglingVisibility ? "Updating..." : resumeData?.public ? "Public" : "Private"}
                                </button>

                                <button
                                   onClick={downloadResume}
                                   disabled={actionsDisabled}
                                   className={`flex items-center gap-2 p-2 px-4 text-xs bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 hover:ring transition-colors rounded-lg ${actionsDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
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

            {/* Leaving with unsaved edits used to discard them silently. */}
            <Modal
                open={pendingExit}
                onClose={() => setPendingExit(false)}
                title="You have unsaved changes"
                busy={isSaving}
            >
                <p className="text-sm text-slate-600">
                    Your latest edits have not been saved yet. What would you like to do?
                </p>

                <div className="mt-6 space-y-2">
                    <button
                        onClick={saveThenExit}
                        disabled={isSaving}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                    >
                        {isSaving && <Spinner />}
                        {isSaving ? "Saving..." : "Save and leave"}
                    </button>
                    <button
                        onClick={goToDashboard}
                        disabled={isSaving}
                        className="w-full rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
                    >
                        Leave without saving
                    </button>
                    <button
                        onClick={() => setPendingExit(false)}
                        disabled={isSaving}
                        className="w-full py-2 text-sm text-slate-500 transition-colors hover:text-slate-700 disabled:opacity-50"
                    >
                        Keep editing
                    </button>
                </div>
            </Modal>

        </div>
    )
}

export default ResumeBuilder;
