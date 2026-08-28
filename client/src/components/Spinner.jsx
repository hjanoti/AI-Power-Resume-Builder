import { Loader2 } from "lucide-react";

// Inline spinner for buttons and small inline loading states.
const Spinner = ({ className = "size-4" }) => (
    <Loader2 className={`animate-spin ${className}`} aria-hidden="true" />
);

export default Spinner;
