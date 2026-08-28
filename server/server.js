import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

// Database Connection
await connectDB();

// Security headers. crossOriginResourcePolicy is relaxed so the
// frontend on another origin can still load ImageKit assets.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(express.json({ limit: '10mb' }));

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://ai-power-resume-builder.netlify.app",
  "http://localhost:5173",
  "http://localhost:4173",
].filter(Boolean);

// Netlify deploy previews get a generated subdomain, so match them by pattern.
const allowedPatterns = [/^https:\/\/[a-z0-9-]+\.netlify\.app$/i];

const isAllowedOrigin = (origin) =>
  allowedOrigins.includes(origin) || allowedPatterns.some((re) => re.test(origin));

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    if (isAllowedOrigin(origin)) return callback(null, true);

    // Outside production an unknown origin is almost always a local tool,
    // so allow it there and only enforce the allowlist on the deployed API.
    if (!isProduction) return callback(null, true);

    console.warn(`CORS blocked origin: ${origin}`);
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Health Check Endpoint
app.get("/", (req, res) => {
  res.json({
    status: "Server is live!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// API Routes
app.use("/api", apiLimiter);
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Body larger than the express.json limit, or malformed JSON.
  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "Request body is too large" });
  }
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON body" });
  }
  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }

  res.status(500).json({
    message: "Something went wrong!",
    error: isProduction ? undefined : err.message
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
