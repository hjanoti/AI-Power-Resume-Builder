import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Spinner from "./Spinner";

// Replaces window.confirm so destructive actions can show their own busy state.
const ConfirmDialog = ({
    open,
    title = "Are you sure?",
    message,
    confirmLabel = "Delete",
    onConfirm,
    onCancel,
    busy = false,
}) => (
    <Modal open={open} onClose={onCancel} title={title} busy={busy}>
        <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-500" />
            <p className="text-sm text-slate-600">{message}</p>
        </div>

        <div className="mt-6 flex gap-3">
            <button
                type="button"
                onClick={onCancel}
                disabled={busy}
                className="flex-1 rounded-lg border border-slate-300 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={onConfirm}
                disabled={busy}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
                {busy && <Spinner />}
                {busy ? "Deleting..." : confirmLabel}
            </button>
        </div>
    </Modal>
);

export default ConfirmDialog;
