import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  Trash2,
  UploadCloud,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { dummyResumeData } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const createResume = async(e) => {
    e.preventDefault();
    setShowCreateResume(false);
    navigate("/app/builder/resume123");
  };

  const uploadResume = async(e) => {
    e.preventDefault();
    setShowUploadResume(false);
    navigate("/app/builder/resume123");
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Mobile Welcome */}
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, John Doe
        </p>

        {/* Create / Upload Buttons */}
        <div className="flex gap-5 flex-wrap">

          {/* Create Resume */}
          <button onClick={() => setShowCreateResume(true)} className="w-full sm:max-w-44 h-52 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">

            <PlusIcon className="size-11 p-2.5 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-full group-hover:scale-110 transition" />

            <p className="text-sm group-hover:text-indigo-600 transition">
              Create Resume
            </p>

          </button>

          {/* Upload Resume */}
          <button onClick={() => setShowUploadResume(true)} className="w-full sm:max-w-44 h-52 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">

            <UploadIcon className="size-11 p-2.5 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-full group-hover:scale-110 transition" />

            <p className="text-sm group-hover:text-purple-600 transition">
              Upload Existing
            </p>

          </button>

        </div>

        <hr className="border-slate-300 my-10 sm:w-[370px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <div
                key={index}
                className="relative w-full h-52 flex flex-col items-center justify-center rounded-xl border backdrop-blur-sm group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}15, ${baseColor}35)`,
                  borderColor: baseColor + "40",
                }}
              >

                {/* Resume Icon */}
                <FilePenLineIcon
                  className="size-10 mb-2 group-hover:scale-110 transition"
                  style={{ color: baseColor }}
                />

                {/* Resume Title */}
                <p
                  className="text-sm font-semibold text-center px-3"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                {/* Updated Date */}
                <p className="absolute bottom-3 text-[11px] text-slate-500 text-center px-2">
                  Updated on{" "}
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">

                  <button className="p-1.5 bg-white/80 backdrop-blur border border-red-300 rounded-md hover:bg-red-50 transition">
                    <Trash2 className="size-4 text-red-500" />
                  </button>

                  <button className="p-1.5 bg-white/80 backdrop-blur border border-blue-300 rounded-md hover:bg-blue-50 transition">
                    <PencilIcon className="size-4 text-blue-500" />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {
          showCreateResume && (
            <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)} className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
              <div onClick={(e)=> e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg p-6 w-full max-w-sm p-6">
                <h2 className="text-xl font-bold mb-4">Create New Resume</h2>
                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title}  placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required />

                <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Create Resume</button>
                <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" 
                onClick={() => 
                {
                  setShowCreateResume(false); 
                  setTitle(""); 
                }} />
              </div>
            </form>
          )
        }

        {
          showUploadResume && (
            <form onSubmit={uploadResume} onClick={()=> setShowUploadResume(false)} className="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
              <div onClick={(e)=> e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg p-6 w-full max-w-sm p-6">
                <h2 className="text-xl font-bold mb-4">Uplaod Resume</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required />
                <div>
                  <label htmlFor="resume-input" className="block text-sm text-slate-700 ">
                    Select Resume File
                    <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                      {resume ? (
                        <p className="text-green-700">{resume.name}</p>
                      ) : (
                        <>
                          <UploadCloud className="size-14 stroke-1"/>
                          <p>Upload Resume</p>
                        </>
                      )}
                    </div>
                  </label>
                  <input type="file" id="resume-input" accept=".pdf" className="hidden" onChange={(e) => setResume(e.target.files[0])} />
                  
                </div>
                <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Upload Resume</button>
                <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" 
                onClick={() => 
                {
                  setShowUploadResume(false); 
                  setTitle(""); 
                  setResume(null);
                }} />
              </div>
            </form>
          )
            
        }

      </div>
    </div>
  );
};

export default Dashboard;