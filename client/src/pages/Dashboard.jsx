import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  Trash2,
  UploadIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { dummyResumeData } from "../assets/assets.js";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

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
          <button className="w-full sm:max-w-44 h-52 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">

            <PlusIcon className="size-11 p-2.5 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-full group-hover:scale-110 transition" />

            <p className="text-sm group-hover:text-indigo-600 transition">
              Create Resume
            </p>

          </button>

          {/* Upload Resume */}
          <button className="w-full sm:max-w-44 h-52 flex flex-col items-center justify-center rounded-xl gap-3 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">

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

      </div>
    </div>
  );
};

export default Dashboard;