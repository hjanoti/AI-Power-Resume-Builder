import { Sparkles, Undo2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../configs/api";
import Spinner from "./Spinner";
import getErrorMessage from "../utils/getErrorMessage";

const MIN_LENGTH_FOR_AI = 20;
const MAX_LENGTH = 1000;

const ProfessionalSummary = ({ data, onChange }) => {

    const [isGenerating, setIsGenerating] = useState(false);
    // Holds the text the AI replaced, so a bad result can be undone.
    const [previousText, setPreviousText] = useState(null);

    const summary = data || "";

    const generateSummary = async () => {
        // Enhancing an empty box just returns "[Key Skill 1]" style filler.
        if (summary.trim().length < MIN_LENGTH_FOR_AI) {
            toast.error("Write a line or two about yourself first, then let AI polish it.");
            return;
        }

        setIsGenerating(true);
        try {
            const prompt = `enhance my professional summary "${summary.trim()}"`;
            const { data: response } = await api.post("/api/ai/enhance-pro-sum", { userContent: prompt });

            setPreviousText(summary);
            onChange(response.enhancedContent);
            toast.success("Summary enhanced");
        } catch (error) {
            toast.error(getErrorMessage(error, "Could not enhance the summary"));
        } finally {
            setIsGenerating(false);
        }
    };

    const undoEnhance = () => {
        onChange(previousText);
        setPreviousText(null);
        toast.success("Reverted to your original text");
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Professional Summary</h3>
                    <p className="text-sm text-gray-500">Add summary for your resume here</p>
                </div>

                <div className="flex items-center gap-2">
                    {previousText !== null && !isGenerating && (
                        <button
                            type="button"
                            onClick={undoEnhance}
                            title="Undo AI enhancement"
                            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                        >
                            <Undo2 className="size-4" />
                            Undo
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={generateSummary}
                        disabled={isGenerating}
                        className="flex items-center rounded-md gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors disabled:opacity-50">
                        {isGenerating ? <Spinner /> : <Sparkles className="size-4" />}
                        {isGenerating ? "Enhancing..." : "AI Enhance"}
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <textarea
                    value={summary}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isGenerating}
                    rows={7}
                    maxLength={MAX_LENGTH}
                    className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none disabled:bg-slate-50"
                    placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                />
                <div className="flex items-start justify-between gap-4">
                    <p className="text-xs text-gray-500">Tip: Keep it concise (3-4 sentences) and focused on your most relevant achievements and skills.</p>
                    <p className={`shrink-0 text-xs ${summary.length >= MAX_LENGTH ? "text-red-500" : "text-gray-400"}`}>
                        {summary.length}/{MAX_LENGTH}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalSummary;
