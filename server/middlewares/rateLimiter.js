import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const message = (text) => (req, res) => res.status(429).json({ message: text });

// Broad ceiling for the whole API so a single client cannot flood the server.
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: message("Too many requests. Please try again in a few minutes."),
});

// Login and register are brute-force targets, so they get a tighter budget.
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    handler: message("Too many attempts. Please try again in 15 minutes."),
});

// Every AI call costs money, so it is limited per user rather than per IP.
export const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 40,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    // Authenticated calls are keyed per user; the IP fallback goes through the
    // helper so IPv6 clients cannot sidestep the limit by changing address.
    keyGenerator: (req, res) => req.userId || ipKeyGenerator(req.ip),
    handler: message("AI usage limit reached. Please try again later."),
});
