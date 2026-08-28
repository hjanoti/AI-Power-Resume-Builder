import { useEffect } from "react";

// Warns before a tab close or reload while edits are still unsaved.
// In-app navigation is guarded separately, since React Router owns that.
const useUnsavedChanges = (isDirty) => {
    useEffect(() => {
        if (!isDirty) return;

        const handler = (event) => {
            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", handler);
        return () => window.removeEventListener("beforeunload", handler);
    }, [isDirty]);
};

export default useUnsavedChanges;
