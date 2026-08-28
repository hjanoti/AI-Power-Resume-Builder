import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  Trash2,
  UploadCloud,
  UploadIcon,
  FileText,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api.js";
import getErrorMessage from "../utils/getErrorMessage.js";
import Modal from "../components/Modal.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import Spinner from "../components/Spinner.jsx";
import { DashboardSkeleton } from "../components/Skeleton.jsx";

const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5 MB

const Dashboard = () => {

  const { user } = useSelector(state => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  // One flag per in-flight action so each button shows its own spinner.
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const navigate = useNavigate();

  const loadAllResumes = useCallback(async () => {
    setIsFetching(true);
    try {
      const { data } = await api.get("/api/users/resumes")
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not load your resumes"));
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    loadAllResumes();
  }, [loadAllResumes]);

  const closeCreate = () => {
    setShowCreateResume(false);
    setTitle("");
  };

  const closeUpload = () => {
    setShowUploadResume(false);
    setTitle("");
    setResume(null);
  };

  const closeRename = () => {
    setEditResumeId("");
    setTitle("");
  };

  const createResume = async (e) => {
    e.preventDefault();
    if (!title.trim() || isCreating) return;

    setIsCreating(true);
    try {
      const { data } = await api.post("/api/resumes/create", { title: title.trim() })
      setAllResumes([data.resume, ...allResumes]);
      closeCreate();
      toast.success("Resume created");
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not create the resume"));
    } finally {
      setIsCreating(false);
    }
  };

  const handleFileSelect = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    if (file.size > MAX_PDF_SIZE) {
      toast.error("That PDF is larger than 5 MB");
      return;
    }

    setResume(file);
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (isUploading) return;

    if (!resume) {
      toast.error("Please select a PDF resume first");
      return;
    }

    setIsUploading(true);
    try {
      // pdf.js is ~300 KB, so it is only fetched when someone actually uploads.
      const { default: pdfToText } = await import("react-pdftotext");
      const resumeText = await pdfToText(resume);

      // A scanned PDF has no selectable text, so the AI would get nothing.
      if (!resumeText?.trim()) {
        toast.error("No readable text found in this PDF. Try a text-based resume.");
        return;
      }

      const { data } = await api.post("/api/ai/upload-resume", { title: title.trim(), resumeText })
      closeUpload();
      toast.success("Resume imported");
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not read this resume"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleResumeClick = (resumeId) => {
    navigate(`/app/builder/${resumeId}`);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget._id);
    try {
      const { data } = await api.delete(`/api/resumes/delete/${deleteTarget._id}`)
      setAllResumes((prev) => prev.filter(item => item._id !== deleteTarget._id));
      setDeleteTarget(null);
      toast.success(data.message);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not delete the resume"));
    } finally {
      setDeletingId("");
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();
    if (!title.trim() || isRenaming) return;

    setIsRenaming(true);
    try {
      const { data } = await api.put(`/api/resumes/update`, { resumeId: editResumeId, resumeData: { title: title.trim() } });
      setAllResumes(allResumes.map(item => item._id === editResumeId ? { ...item, title: title.trim() } : item));
      closeRename();
      toast.success(data.message);
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not rename the resume"));
    } finally {
      setIsRenaming(false);
    }
  };

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Mobile Welcome */}
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, {firstName}
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
        {isFetching ? (
          <DashboardSkeleton />
        ) : allResumes.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <FileText className="mx-auto mb-3 size-12 text-slate-300" />
            <p className="font-medium">No resumes yet</p>
            <p className="text-sm">Create one from scratch, or upload a PDF to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

            {allResumes.map((item, index) => {
              const baseColor = colors[index % colors.length];
              const isDeleting = deletingId === item._id;

              return (
                <div
                  key={item._id}
                  className={`relative w-full h-52 flex flex-col items-center justify-center rounded-xl border backdrop-blur-sm group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${isDeleting ? "pointer-events-none opacity-50" : ""}`}
                  style={{
                    background: `linear-gradient(135deg, ${baseColor}15, ${baseColor}35)`,
                    borderColor: baseColor + "40",
                  }}
                  onClick={() => handleResumeClick(item._id)}
                >

                  {/* Resume Icon */}
                  <FilePenLineIcon
                    className="size-10 mb-2 group-hover:scale-110 transition"
                    style={{ color: baseColor }}
                  />

                  {/* Resume Title */}
                  <p
                    className="text-sm font-semibold text-center px-3 line-clamp-2"
                    style={{ color: baseColor }}
                  >
                    {item.title}
                  </p>

                  {/* Updated Date */}
                  <p className="absolute bottom-3 text-[11px] text-slate-500 text-center px-2">
                    Updated on{" "}
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </p>

                  {/* Action Buttons */}
                  <div onClick={(event) => event.stopPropagation()} className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition">

                    <button
                      aria-label={`Delete ${item.title}`}
                      className="p-1.5 bg-white/80 backdrop-blur border border-red-300 rounded-md hover:bg-red-50 transition"
                      onClick={() => setDeleteTarget(item)}
                    >
                      <Trash2 className="size-4 text-red-500" />
                    </button>

                    <button
                      aria-label={`Rename ${item.title}`}
                      className="p-1.5 bg-white/80 backdrop-blur border border-blue-300 rounded-md hover:bg-blue-50 transition"
                      onClick={() => { setEditResumeId(item._id); setTitle(item.title) }}
                    >
                      <PencilIcon className="size-4 text-blue-500" />
                    </button>

                  </div>

                  {isDeleting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                      <Spinner className="size-6 text-red-500" />
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

        {/* Create Resume */}
        <Modal open={showCreateResume} onClose={closeCreate} title="Create New Resume" busy={isCreating}>
          <form onSubmit={createResume}>
            <label htmlFor="create-title" className="mb-1 block text-sm text-slate-600">Resume title</label>
            <input
              id="create-title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="e.g. Frontend Developer CV"
              maxLength={80}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 mb-4 outline-none transition-colors focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
            />

            <button
              type="submit"
              disabled={isCreating || !title.trim()}
              className="flex w-full items-center justify-center gap-2 rounded bg-green-600 py-2 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCreating && <Spinner />}
              {isCreating ? "Creating..." : "Create Resume"}
            </button>
          </form>
        </Modal>

        {/* Upload Resume */}
        <Modal open={showUploadResume} onClose={closeUpload} title="Upload Resume" busy={isUploading}>
          <form onSubmit={uploadResume}>
            <label htmlFor="upload-title" className="mb-1 block text-sm text-slate-600">Resume title</label>
            <input
              id="upload-title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="e.g. Frontend Developer CV"
              maxLength={80}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 mb-4 outline-none transition-colors focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
            />

            <div>
              <label htmlFor="resume-input" className="block text-sm text-slate-700">
                Select Resume File
                <div className="my-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-slate-400 p-4 py-10 text-slate-400 transition-colors hover:border-green-500 hover:text-green-700">
                  {resume ? (
                    <p className="px-2 text-center break-all text-green-700">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="size-14 stroke-1" />
                      <p>Upload a PDF (max 5 MB)</p>
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="resume-input"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              disabled={isUploading || !resume}
              className="flex w-full items-center justify-center gap-2 rounded bg-green-600 py-2 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading && <Spinner />}
              {isUploading ? "Reading your resume..." : "Upload Resume"}
            </button>

            {isUploading && (
              <p className="mt-2 text-center text-xs text-slate-500">
                This can take up to 30 seconds while AI extracts your details.
              </p>
            )}
          </form>
        </Modal>

        {/* Rename Resume */}
        <Modal open={Boolean(editResumeId)} onClose={closeRename} title="Edit Resume Title" busy={isRenaming}>
          <form onSubmit={editTitle}>
            <label htmlFor="rename-title" className="mb-1 block text-sm text-slate-600">Resume title</label>
            <input
              id="rename-title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter resume title"
              maxLength={80}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 mb-4 outline-none transition-colors focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
            />

            <button
              type="submit"
              disabled={isRenaming || !title.trim()}
              className="flex w-full items-center justify-center gap-2 rounded bg-green-600 py-2 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRenaming && <Spinner />}
              {isRenaming ? "Saving..." : "Update Title"}
            </button>
          </form>
        </Modal>

        {/* Delete confirmation */}
        <ConfirmDialog
          open={Boolean(deleteTarget)}
          title="Delete resume?"
          message={`"${deleteTarget?.title}" will be permanently deleted. This cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
          busy={Boolean(deletingId)}
        />

      </div>
    </div>
  );
};

export default Dashboard;
