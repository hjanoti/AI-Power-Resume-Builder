import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft } from "lucide-react";

const NotFound = () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
        <FileQuestion className="size-14 text-slate-300" />
        <p className="text-6xl font-semibold text-slate-800">404</p>
        <p className="text-slate-500">We couldn&apos;t find the page you were looking for.</p>
        <Link
            to="/"
            className="mt-4 flex items-center gap-2 rounded-full bg-blue-500 px-6 py-2 text-sm text-white transition-colors hover:bg-blue-600"
        >
            <ArrowLeft className="size-4" /> Go to home page
        </Link>
    </div>
);

export default NotFound;
