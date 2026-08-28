import { useParams, Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, FileQuestion, Printer } from "lucide-react";
import ResumePreview from "../components/ResumePreview";
import Skeleton from "../components/Skeleton";
import api from "../configs/api";
import getErrorMessage from "../utils/getErrorMessage";

const Preview = () => {

    const { resumeId } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const loadResume = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            const { data } = await api.get("/api/resumes/public/" + resumeId);
            setResumeData(data?.resume);
            if (data?.resume?.title) document.title = data.resume.title;
        } catch (err) {
            setError(
                err?.response?.status === 404
                    ? "This resume is private or no longer available."
                    : getErrorMessage(err, "Could not load this resume")
            );
        } finally {
            setIsLoading(false);
        }
    }, [resumeId]);

    useEffect(() => {
        loadResume()
    }, [loadResume])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-100">
                <div className="mx-auto max-w-3xl px-4 py-10">
                    <div className="space-y-4 rounded-lg bg-white p-10">
                        <Skeleton className="mx-auto h-8 w-64" />
                        <Skeleton className="mx-auto h-3 w-80" />
                        <Skeleton className="h-px w-full" />
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={i} className="h-3 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
                <FileQuestion className="size-14 text-slate-300" />
                <p className="text-4xl font-medium text-slate-500">Resume not found</p>
                <p className="max-w-md text-sm text-slate-400">{error}</p>
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={loadResume}
                        className="rounded-full border border-slate-300 px-6 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        Try again
                    </button>
                    <Link
                        to="/"
                        className="flex items-center rounded-full bg-blue-500 px-6 py-2 text-sm text-white transition-colors hover:bg-blue-600"
                    >
                        <ArrowLeft className="mr-2 size-4" /> Go to home page
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="mx-auto max-w-3xl px-4 py-10">
                <div className="mb-4 flex items-center justify-between print:hidden">
                    <Link to="/" className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-700">
                        <ArrowLeft className="size-4" /> Home
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs text-slate-600 ring-1 ring-slate-300 transition-colors hover:bg-slate-50"
                    >
                        <Printer className="size-4" /> Print / Save as PDF
                    </button>
                </div>

                <ResumePreview
                    resumeData={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData?.accent_color}
                    classes="py-4 bg-white"
                />
            </div>
        </div>
    )
}

export default Preview;
