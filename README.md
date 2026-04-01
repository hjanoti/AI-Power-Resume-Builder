<div align="center">

# ⚡ AI Power Resume Builder

**Build stunning, professional resumes in minutes — powered by AI.**

<br/>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/)

<br/>

[🌐 **Live Demo**](https://ai-power-resume-builder.netlify.app/) &nbsp;•&nbsp;
[🐛 **Report Bug**](https://github.com/hjanoti/AI-Power-Resume-Builder/issues) &nbsp;•&nbsp;
[✨ **Request Feature**](https://github.com/hjanoti/AI-Power-Resume-Builder/issues)

<br/>

</div>

---

## 📸 Overview

AI Power Resume Builder is a **full-stack AI-powered resume creation platform** that helps job seekers craft professional, ATS-friendly resumes in minutes. The application combines modern frontend technologies with AI capabilities to provide intelligent content suggestions, automated resume parsing, and beautiful customizable templates.

### 🎯 Problem It Solves

Creating a professional resume can be time-consuming and challenging. This platform solves that by:
- Providing **AI-powered content suggestions** for professional summaries and job descriptions
- Offering **PDF upload & auto-extraction** to import existing resumes
- Enabling **real-time editing** with instant preview
- Supporting **multiple professional templates** with customizable colors
- Allowing **easy sharing** via public links

---

## ✨ Features

### 🤖 AI-Powered Features
| Feature | Description |
|---------|-------------|
| **AI Content Enhancement** | Enhance professional summaries with Gemini AI integration |
| **Job Description Enhancer** | Improve job descriptions using action verbs and quantifiable results |
| **Resume Upload & Parse** | Upload existing PDF resumes and auto-extract structured data using AI |

### 📝 Resume Management
| Feature | Description |
|---------|-------------|
| **Dashboard** | Create, manage, and organize all resumes in one place |
| **Real-time Editor** | Step-by-step form builder with 6 sections: Personal Info, Summary, Experience, Education, Projects, Skills |
| **Template Selector** | Choose from multiple professional resume templates |
| **Color Customization** | Customize accent colors to match personal branding |
| **Image Upload** | Add profile pictures with optional background removal via ImageKit |
| **Public/Private Toggle** | Control resume visibility for sharing |
| **PDF Download** | Print-ready resume export functionality |
| **Social Sharing** | Share resumes via native share API |

### 🔐 Authentication & Security
| Feature | Description |
|---------|-------------|
| **JWT Authentication** | Secure token-based user authentication |
| **Password Hashing** | Bcrypt-encrypted passwords |
| **Protected Routes** | Middleware-protected API endpoints |

### 🎨 UI/UX
| Feature | Description |
|---------|-------------|
| **Responsive Design** | Fully responsive across mobile, tablet, and desktop |
| **Modern Landing Page** | Hero section, About section, Features, Testimonials, CTA |
| **Smooth Animations** | Hover effects, transitions, and scroll-triggered animations |
| **Toast Notifications** | Real-time feedback with react-hot-toast |
| **Loading States** | Loader components for better UX |

---

## 🛠️ Tech Stack

### Frontend
```
React 19          →  UI Library with Hooks
Redux Toolkit     →  State Management
React Router v7   →  Client-side Routing
Tailwind CSS v4   →  Utility-first Styling
Vite              →  Build Tool & Dev Server
Lucide React      →  Icon Library
react-hot-toast   →  Toast Notifications
react-pdftotext   →  PDF Text Extraction
Axios             →  HTTP Client
```

### Backend
```
Node.js           →  Runtime Environment
Express.js        →  Web Framework
MongoDB           →  NoSQL Database
Mongoose          →  ODM for MongoDB
JWT               →  Authentication Tokens
Bcrypt            →  Password Hashing
Multer            →  File Upload Handling
ImageKit          →  Image Storage & Processing
OpenAI/Gemini     →  AI Content Generation
```

### APIs & Services
- **Gemini AI API** - Content enhancement and resume parsing
- **ImageKit** - Image upload, transformation, and CDN delivery
- **MongoDB Atlas** - Cloud database hosting

---

## 🗂️ Project Structure

```
AI-Power-Resume-Builder/
├── client/                          # Frontend Application
│   ├── public/
│   │   ├── _redirects              # Netlify SPA routing
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── features/
│   │   │   │   └── authSlice.js    # Redux auth state
│   │   │   └── store.js            # Redux store config
│   │   │
│   │   ├── assets/
│   │   │   └── assets.js           # Dummy data & constants
│   │   │
│   │   ├── components/
│   │   │   ├── home/               # Landing page components
│   │   │   │   ├── About.jsx       # About section
│   │   │   │   ├── Banner.jsx      # Top banner
│   │   │   │   ├── CallToAction.jsx
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Hero.jsx        # Landing hero
│   │   │   │   ├── Testimonial.jsx
│   │   │   │   └── Title.jsx
│   │   │   │
│   │   │   ├── templates/          # Resume templates
│   │   │   │   ├── Minimal.jsx
│   │   │   │   ├── Modern.jsx
│   │   │   │   └── Classic.jsx
│   │   │   │
│   │   │   ├── ColorPicker.jsx     # Accent color selector
│   │   │   ├── EducationForm.jsx   # Education section form
│   │   │   ├── ExperienceForm.jsx  # Work experience form
│   │   │   ├── Loader.jsx          # Loading spinner
│   │   │   ├── Navbar.jsx          # Navigation component
│   │   │   ├── PersonalInfoForm.jsx
│   │   │   ├── ProfessionalSummary.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── ResumePreview.jsx   # Live resume preview
│   │   │   ├── SkillsForm.jsx
│   │   │   └── TemplateSelector.jsx
│   │   │
│   │   ├── configs/
│   │   │   └── api.js                # Axios configuration
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx         # Resume management
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Layout.jsx            # App layout wrapper
│   │   │   ├── Login.jsx             # Auth page
│   │   │   ├── Preview.jsx           # Public resume view
│   │   │   └── ResumeBuilder.jsx     # Resume editor
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env                          # Frontend environment variables
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                           # Backend Application
│   ├── configs/
│   │   ├── ai.js                     # OpenAI/Gemini configuration
│   │   ├── db.js                     # MongoDB connection
│   │   ├── imageKit.js               # ImageKit configuration
│   │   └── multer.js                 # File upload config
│   │
│   ├── controllers/
│   │   ├── aiController.js           # AI feature controllers
│   │   ├── resumeController.js       # Resume CRUD operations
│   │   └── userController.js         # Auth controllers
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js         # JWT verification
│   │
│   ├── models/
│   │   ├── Resume.js                 # Resume schema
│   │   └── User.js                   # User schema
│   │
│   ├── routes/
│   │   ├── aiRoutes.js               # AI endpoints
│   │   ├── resumeRoutes.js           # Resume endpoints
│   │   └── userRoutes.js             # Auth endpoints
│   │
│   ├── uploads/                      # Temporary upload storage
│   ├── .env                          # Backend environment variables
│   ├── package.json
│   └── server.js                     # Express app entry point
│
├── netlify.toml                      # Netlify deployment config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ installed
- **npm** or **yarn** package manager
- **MongoDB** instance (local or Atlas)
- **ImageKit** account (for image uploads)
- **Gemini API Key** (for AI features)

### 1. Clone the Repository

```bash
git clone https://github.com/hjanoti/AI-Power-Resume-Builder.git
cd AI-Power-Resume-Builder
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
touch .env

# Start development server
npm run server
```

Server will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file (see Environment Variables section)
touch .env

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🔐 Environment Variables

### Server `.env`

```env
# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# MongoDB Connection
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name

# ImageKit Configuration
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint

# Gemini/OpenAI Configuration
OPENAI_API_KEY=your_gemini_api_key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.5-flash

# Server Port (optional)
PORT=3000
```

### Client `.env`

```env
# API Base URL
VITE_BASE_URL=http://localhost:3000
```

---

## 📡 API Endpoints

### Authentication (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login existing user | No |
| GET | `/data` | Get current user data | Yes |
| GET | `/resumes` | Get all user resumes | Yes |

### Resume Management (`/api/resumes`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create` | Create new resume | Yes |
| PUT | `/update` | Update resume (with image upload) | Yes |
| DELETE | `/delete/:resumeId` | Delete resume | Yes |
| GET | `/get/:resumeId` | Get resume by ID | Yes |
| GET | `/public/:resumeId` | Get public resume (no auth) | No |

### AI Features (`/api/ai`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/enhance-pro-sum` | Enhance professional summary | Yes |
| POST | `/enhance-job-desc` | Enhance job description | Yes |
| POST | `/upload-resume` | Parse uploaded PDF resume | Yes |

---

## 🎨 UI Sections

### Landing Page
1. **Hero** - Main banner with CTA, trust indicators, company logos
2. **Features** - Product features showcase
3. **About** - Platform introduction with key features
4. **Testimonials** - User reviews and social proof
5. **CTA** - Call-to-action section
6. **Footer** - Links and social media

### Dashboard
- Create new resume button
- Upload existing resume (PDF) button
- Resume cards grid with color-coded backgrounds
- Edit/delete actions on hover
- Modal forms for creating/editing

### Resume Builder
- **Left Panel**: Step-by-step form (6 sections)
  - Personal Info with image upload
  - Professional Summary with AI enhance
  - Experience with AI enhance
  - Education
  - Projects
  - Skills
- **Right Panel**: Live resume preview
- **Bottom Bar**: Template selector, color picker, share/download buttons

### Public Preview
- Clean view of shared resumes
- Print-friendly layout
- Back navigation

---

## 🧰 Development Scripts

### Client
```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Server
```bash
npm start         # Start production server
npm run server    # Start with nodemon (dev)
```

---

## 🗺️ Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing Page | Public |
| `/app` | Dashboard | 🔒 Protected |
| `/app?state=login` | Login/Register | Public |
| `/app/builder/:resumeId` | Resume Editor | 🔒 Protected |
| `/view/:resumeId` | Public Resume View | Public (if resume is public) |

---

## ☁️ FREE Deployment (100% Zero Cost)

Deploy your full-stack AI Resume Builder completely FREE using **Netlify** (Frontend) + **Render** (Backend).

---

### 🚀 Quick Deploy (One-Click)

#### Frontend (Netlify) - Already Configured
The frontend is pre-configured for Netlify deployment.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/hjanoti/AI-Power-Resume-Builder)

**Manual Steps:**
1. Push code to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Build settings:
   - **Base Directory**: `client/`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

#### Backend (Render) - FREE Tier

**Option 1: Deploy via Dashboard (Recommended for Beginners)**

1. **Create Render Account**: [signup.render.com](https://signup.render.com) (FREE)
2. **New Web Service** → Connect your GitHub repo
3. **Configure Settings**:
   - **Name**: `ai-resume-api`
   - **Runtime**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: `Free`

4. **Add Environment Variables** (in Render Dashboard):

| Variable | Value | How to Get |
|----------|-------|------------|
| `NODE_ENV` | `production` | - |
| `PORT` | `10000` | - |
| `CLIENT_URL` | `https://your-netlify-app.netlify.app` | Your Netlify URL |
| `JWT_SECRET` | Random string (32+ chars) | Generate at [jwtsecret.com](https://jwtsecret.com) |
| `MONGODB_URL` | MongoDB connection string | MongoDB Atlas (FREE tier) |
| `IMAGEKIT_PRIVATE_KEY` | Your ImageKit key | [imagekit.io](https://imagekit.io) (FREE) |
| `IMAGEKIT_PUBLIC_KEY` | Your ImageKit key | ImageKit dashboard |
| `IMAGEKIT_URL_ENDPOINT` | Your ImageKit URL | ImageKit dashboard |
| `OPENAI_API_KEY` | Gemini API key | [Google AI Studio](https://makersuite.google.com/app/apikey) (FREE) |
| `OPENAI_BASE_URL` | `https://generativelanguage.googleapis.com/v1beta/openai/` | - |
| `OPENAI_MODEL` | `gemini-2.5-flash` | - |

5. **Click "Create Web Service"**

**Option 2: Deploy via Blueprint (render.yaml)**

Create `render.yaml` in root:
```yaml
services:
  - type: web
    name: ai-resume-builder-api
    env: node
    plan: free
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: CLIENT_URL
        value: https://ai-power-resume-builder.netlify.app
```
Then use "Blueprint" option in Render dashboard.

---

### 🔗 Connecting Frontend to Backend

After backend is deployed:

1. **Get your Render URL**: `https://ai-resume-api.onrender.com`
2. **Update Frontend Environment**:
   - In Netlify Dashboard → Site Settings → Environment Variables
   - Add: `VITE_BASE_URL` = `https://your-render-app.onrender.com`
3. **Redeploy Frontend** (automatic on Netlify)

---

### ⚡ Handling Render Free Tier Limitations

| Issue | Solution |
|-------|----------|
| **Cold Starts** (30+ sec delay) | Server sleeps after 15 min inactivity. First request wakes it up. |
| **Timeout Errors** | API timeout increased to 30s in `api.js` to handle spin-up |
| **Monthly Limit** | 750 hours/month (enough for 1 app running 24/7) |
| **Disk Storage** | Ephemeral (cleared on restart). Use MongoDB Atlas for persistence. |

**Tips for Cold Starts:**
- Add a loading state in your UI: "Connecting to server..."
- Use the `/health` endpoint to check if server is awake
- Consider a ping service (optional): [UptimeRobot](https://uptimerobot.com) FREE tier pings every 5 min

---

### 🔒 Required FREE Services Setup

#### 1. MongoDB Atlas (FREE Database)
1. [Sign up](https://mongodb.com/cloud/atlas) → FREE tier (512MB)
2. Create cluster → Choose AWS region close to Render
3. Database Access → Create user with password
4. Network Access → Add `0.0.0.0/0` (allow all) for Render
5. Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net`

#### 2. ImageKit (FREE Image Storage)
1. [Sign up](https://imagekit.io) → FREE tier (20GB bandwidth/month)
2. Get API keys from Dashboard
3. Note URL endpoint: `https://ik.imagekit.io/your_id`

#### 3. Google AI Studio (FREE AI API)
1. [Get API Key](https://makersuite.google.com/app/apikey)
2. Use Gemini 2.5 Flash model (FREE tier: 15 requests/min)

---

### ✅ Deployment Checklist

**Backend (Render):**
- [ ] Repository connected
- [ ] Build command: `cd server && npm install`
- [ ] Start command: `cd server && npm start`
- [ ] All 10 environment variables added
- [ ] Deploy successful (green checkmark)
- [ ] Test `/health` endpoint: `https://your-app.onrender.com/health`

**Frontend (Netlify):**
- [ ] Repository connected
- [ ] Build settings correct
- [ ] `VITE_BASE_URL` environment variable set
- [ ] Deploy successful
- [ ] Test login/registration works
- [ ] Test resume creation works

---

### 🐛 Common Issues & Fixes

**CORS Errors:**
- Check `CLIENT_URL` in Render matches your Netlify URL exactly
- Include `https://` and no trailing slash

**401 Unauthorized:**
- JWT token expired → User needs to login again
- Check `JWT_SECRET` is set correctly

**MongoDB Connection Failed:**
- Whitelist `0.0.0.0/0` in MongoDB Atlas Network Access
- Verify connection string format

**Image Upload Fails:**
- Check ImageKit credentials
- Verify `IMAGEKIT_URL_ENDPOINT` ends without `/`

**AI Features Not Working:**
- Check `OPENAI_API_KEY` is valid
- Verify `OPENAI_BASE_URL` is exactly: `https://generativelanguage.googleapis.com/v1beta/openai/`

---

### 📊 Free Tier Limits Summary

| Service | Free Tier | Limitations |
|---------|-----------|-------------|
| **Netlify** | 100GB bandwidth/mo | 300 build minutes/mo |
| **Render** | 750 hours/mo | Sleeps after 15min idle |
| **MongoDB** | 512MB storage | Shared RAM |
| **ImageKit** | 20GB bandwidth/mo | 1000 transformations/mo |
| **Gemini AI** | 15 req/min | Rate limited |

---

### 🎨 Templates

| Template | Description | Status |
|----------|-------------|--------|
| Classic | Traditional professional layout | ✅ Available |
| Modern | Clean contemporary design | ✅ Available |
| Minimal | Simple elegant style | ✅ Available |

Each template supports:
- Custom accent colors
- Profile image integration
- Responsive formatting
- Print optimization

---

## 🔮 Future Improvements

- [ ] 📊 Resume analytics (views, downloads tracking)
- [ ] 🌍 Multi-language support
- [ ] 📤 Direct PDF export (not just print)
- [ ] 🔗 LinkedIn profile import
- [ ] 🎨 More resume templates
- [ ] 💼 Cover letter generator
- [ ] 🤝 Job application tracking
- [ ] 📱 Mobile app (React Native)
- [ ] 💾 Auto-save drafts
- [ ] 🔄 Resume version history

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# Fork the repository
git clone https://github.com/your-username/AI-Power-Resume-Builder.git

# Create a feature branch
git checkout -b feature/AmazingFeature

# Commit your changes
git commit -m "feat: add AmazingFeature"

# Push to branch
git push origin feature/AmazingFeature

# Open a Pull Request
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` file for more information.

---

## 👨‍💻 Author

<div align="center">

**Heera Singh Janoti**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hjanoti)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/heera-singh-janoti/)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://hjanoti-portfolio.netlify.app/)

</div>

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) — UI library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Vite](https://vitejs.dev/) — Lightning-fast build tooling
- [Express](https://expressjs.com/) — Backend framework
- [MongoDB](https://mongodb.com/) — Database
- [Gemini AI](https://ai.google.dev/) — AI content generation
- [ImageKit](https://imagekit.io/) — Image management
- [Lucide](https://lucide.dev/) — Beautiful icons

---

<div align="center">

**If you found this project helpful, please ⭐ star the repository!**

Made with ❤️ by [Heera Singh Janoti](https://github.com/hjanoti)

</div>
