import { Component } from "react";
import { AlertTriangle } from "lucide-react";

// Without this, one thrown render error blanks the entire app.
class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Unhandled UI error:", error, info);
    }

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
                <AlertTriangle className="size-12 text-amber-500" />
                <h1 className="text-2xl font-semibold text-slate-800">Something went wrong</h1>
                <p className="max-w-md text-sm text-slate-500">
                    The page ran into an unexpected error. Reloading usually fixes it — your saved
                    resumes are safe.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="rounded-full bg-slate-900 px-6 py-2 text-sm text-white transition-opacity hover:opacity-90"
                >
                    Reload page
                </button>
            </div>
        );
    }
}

export default ErrorBoundary;
