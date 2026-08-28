import { useEffect, useRef } from "react";
import { XIcon } from "lucide-react";

// Accessible dialog shell: closes on Escape, focuses its first field on open,
// keeps Tab inside the dialog, and restores focus to the trigger on close.
const Modal = ({ open, onClose, title, children, busy = false }) => {
    const panelRef = useRef(null);
    const previouslyFocused = useRef(null);

    useEffect(() => {
        if (!open) return;

        previouslyFocused.current = document.activeElement;

        const panel = panelRef.current;
        const focusable = panel?.querySelectorAll(
            'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])'
        );
        focusable?.[0]?.focus();

        const onKeyDown = (event) => {
            if (event.key === "Escape" && !busy) {
                onClose();
                return;
            }

            if (event.key !== "Tab" || !focusable?.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
            previouslyFocused.current?.focus?.();
        };
    }, [open, busy, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onMouseDown={() => !busy && onClose()}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                onMouseDown={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
            >
                <h2 className="mb-4 pr-8 text-xl font-bold text-slate-900">{title}</h2>
                {children}
                <button
                    type="button"
                    onClick={onClose}
                    disabled={busy}
                    aria-label="Close dialog"
                    className="absolute top-4 right-4 rounded text-slate-400 transition-colors hover:text-slate-600 disabled:opacity-40"
                >
                    <XIcon className="size-5" />
                </button>
            </div>
        </div>
    );
};

export default Modal;
