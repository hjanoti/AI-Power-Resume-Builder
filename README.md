<div align="center">

# ⚡ AI Power Resume Builder

**Build stunning, professional resumes in minutes — powered by AI.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

[🌐 Live Demo](https://ai-power-resume-builder.netlify.app/) &nbsp;•&nbsp;
[🐛 Report Bug](https://github.com/hjanoti/AI-Power-Resume-Builder/issues) &nbsp;•&nbsp;
[✨ Request Feature](https://github.com/hjanoti/AI-Power-Resume-Builder/issues)

</div>

---

## Overview

A full-stack AI-powered resume creation platform that helps job seekers craft professional, ATS-friendly resumes in minutes. Combines intelligent content suggestions, automated resume parsing, and customizable templates with a real-time live preview.

---

## Features

**AI-Powered**
- Enhance professional summaries and job descriptions using Gemini AI
- Upload an existing PDF resume and auto-extract structured data

**Resume Management**
- Step-by-step editor covering Personal Info, Summary, Experience, Education, Projects, and Skills
- Multiple professional templates (Classic, Modern, Minimal) with custom accent colors
- Profile picture upload with optional background removal via ImageKit
- Public/private toggle, shareable links, and print-to-PDF export

**Auth & Security**
- JWT-based authentication with bcrypt password hashing
- Protected API routes via middleware

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Redux Toolkit, React Router v7, Tailwind CSS v4, Vite |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Multer |
| AI & Media | Gemini AI (via OpenAI-compatible API), ImageKit |
| Deployment | Netlify (frontend), Render (backend), MongoDB Atlas |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)
- [ImageKit](https://imagekit.io) account
- [Gemini API Key](https://makersuite.google.com/app/apikey)

### Installation

```bash
# Clone the repo
git clone https://github.com/hjanoti/AI-Power-Resume-Builder.git
cd AI-Power-Resume-Builder

# Install & run backend
cd server
npm install
npm run server   # runs on http://localhost:3000

# Install & run frontend (new terminal)
cd ../client
npm install
npm run dev      # runs on http://localhost:5173
```

---

## Environment Variables

### Server (`server/.env`)

```env
JWT_SECRET=
MONGODB_URL=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_URL_ENDPOINT=
OPENAI_API_KEY=
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.5-flash
PORT=3000
```

### Client (`client/.env`)

```env
VITE_BASE_URL=http://localhost:3000
```

> ⚠️ Never commit `.env` files. Add them to `.gitignore` before pushing.

---

## API Reference

### Auth — `/api/users`

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/register` | No |
| POST | `/login` | No |
| GET | `/data` | Yes |
| GET | `/resumes` | Yes |

### Resumes — `/api/resumes`

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/create` | Yes |
| PUT | `/update` | Yes |
| DELETE | `/delete/:resumeId` | Yes |
| GET | `/get/:resumeId` | Yes |
| GET | `/public/:resumeId` | No |

### AI — `/api/ai`

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/enhance-pro-sum` | Yes |
| POST | `/enhance-job-desc` | Yes |
| POST | `/upload-resume` | Yes |

---

## Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing Page | Public |
| `/app` | Dashboard | Protected |
| `/app?state=login` | Login / Register | Public |
| `/app/builder/:resumeId` | Resume Editor | Protected |
| `/view/:resumeId` | Public Resume View | Public |

---

## Deployment (Free Tier)

### Frontend → [Netlify](https://netlify.com)

- Base directory: `client/`
- Build command: `npm run build`
- Publish directory: `dist`
- Add `VITE_BASE_URL` as an environment variable pointing to your Render URL

### Backend → [Render](https://render.com)

- Build command: `cd server && npm install`
- Start command: `cd server && npm start`
- Add all server environment variables in the Render dashboard

> **Note:** Render's free tier sleeps after 15 minutes of inactivity. The first request after idle may take 30+ seconds.

---

## Project Structure

```
AI-Power-Resume-Builder/
├── client/
│   └── src/
│       ├── app/           # Redux store & slices
│       ├── components/    # UI components & resume templates
│       ├── pages/         # Route-level pages
│       └── configs/       # Axios config
│
└── server/
    ├── configs/           # DB, AI, ImageKit, Multer setup
    ├── controllers/       # Route logic
    ├── middlewares/       # JWT auth
    ├── models/            # Mongoose schemas
    └── routes/            # Express routers
```

---

## Roadmap

- [ ] Direct PDF export (not print-based)
- [ ] Resume analytics (views & downloads)
- [ ] LinkedIn profile import
- [ ] Cover letter generator
- [ ] Auto-save drafts & version history
- [ ] Multi-language support
- [ ] More templates

---

## Contributing

```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
# Open a Pull Request
```

---

## License

Distributed under the **MIT License**.

---

<div align="center">

Made with ❤️ by [Heera Singh Janoti](https://github.com/hjanoti)

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hjanoti)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/heera-singh-janoti/)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://hjanoti-portfolio.netlify.app/)

</div>
