import { useState } from "react";
import { PlusIcon, Sparkles, X } from "lucide-react";

const SkillsForm = ({data, onChange}) => {

    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if (newSkill.trim() && !data.includes(newSkill.trim())) {
            onChange([...data, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Skills</h3>
                <p className="text-sm text-gray-500">Add skills that showcase your expertise and align with the job requirements.</p>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter a skill (e.g., React, JavaScript)"
                    className="flex px-3 py-2 text-sm w-full"
                />
                <button
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <PlusIcon className="size-4" />
                    Add
                </button>
            </div>

            {data.length > 0 ? (
               <div className="flex flex-wrap gap-2">
                {data.map((skill, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                        {skill}
                        <button
                            onClick={() => removeSkill(index)}
                            className="ml-1 hover:text-blue-800 p-0.5 transition-colors cursor-pointer"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
               </div>
            ) : (
                 <div className="text-center py-8 text-gray-500">
                    <Sparkles className="h-10 w-10 text-gray-300 mb-2 mx-auto" />
                    <p className="">No skills added yet</p>
                    <p className="text-sm">Add skills to showcase your expertise</p>
                </div>
            )}

            <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800"><strong>Tip:</strong> Add 6-10 relevant skills that match the job description. Including both technical and soft skills.</p>
            </div>
        </div>
    );
};

export default SkillsForm;