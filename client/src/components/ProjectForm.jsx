import { Plus, Trash2, FolderOpen } from "lucide-react";

const ProjectForm = ({data, onChange}) => {

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            description: ""
        };
        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updatedProject = data.filter((_, i) => i !== index);
        onChange(updatedProject);
    };

    const updateProject = (index, field, value) => {
        const updatedProject = [...data];
        updatedProject[index] = { ...updatedProject[index], [field]: value };
        onChange(updatedProject);
    };


    return (
        <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">Projects</h3>
                    <p className="text-sm text-gray-500">Add your projects here</p>
                </div>
                <button onClick={addProject} className="flex items-center rounded-lg gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
                    <Plus className="size-4" />
                    Add Project
                </button>
            </div>

             {data?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                   <FolderOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                   <p className="">No projects added yet</p>
                   <p className="text-sm">Click "Add Project" to get started</p>
                </div>
            ) : (
            <div className="space-y-4 mt-6">
                {
                    data.map((project, index)=> (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                    <h4>Project #{index + 1}</h4>
                                    <button onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700 transition-colors">
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>

                                <div className="grid gap-3"> 
                                    <input
                                        type="text"
                                        placeholder="Project Name"
                                        value={project.name || ''}
                                        onChange={(e) => updateProject(index, 'name', e.target.value)}
                                        className="px-3 py-2 text-sm rounded-lg"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Project Type (e.g., Web App, Mobile App)"
                                        value={project.type || ''}
                                        onChange={(e) => updateProject(index, 'type', e.target.value)}
                                        className="px-3 py-2 text-sm rounded-lg"
                                    />

                                    <textarea
                                        rows={4}
                                        placeholder="Describe your project..."
                                        value={project.description || ''}
                                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                                        className="w-full px-3 py-2 text-sm rounded-lg resize-none"
                                    />
                                </div>
                            </div>
                        ))
                    }
            </div>
            )}
        </div>
    );
};

export default ProjectForm;