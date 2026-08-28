// Request bodies are untrusted: a JSON body can carry objects where a string is
// expected, which is how query-operator injection ({ "$ne": null }) gets in.
export const asString = (value) => (typeof value === "string" ? value.trim() : "");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (email) => EMAIL_REGEX.test(email);

export const MIN_PASSWORD_LENGTH = 8;

// Fields the client is allowed to set on a resume. Anything else (userId, _id,
// timestamps) is dropped so a request cannot reassign or forge ownership.
const RESUME_FIELDS = [
    "title",
    "public",
    "template",
    "accent_color",
    "professional_summary",
    "skills",
    "personal_info",
    "experience",
    "projects",
    "education",
];

export const pickResumeFields = (data) => {
    if (!data || typeof data !== "object" || Array.isArray(data)) return {};

    return RESUME_FIELDS.reduce((clean, field) => {
        if (data[field] !== undefined) clean[field] = data[field];
        return clean;
    }, {});
};
