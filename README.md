<div align="center">

<br/>

# ⚡ AI Power Resume Builder

**Build stunning, professional resumes in minutes — powered by AI.**

<br/>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

[🌐 **Live Demo**](https://ai-power-resume-builder.netlify.app/) &nbsp;•&nbsp;
[🐛 **Report Bug**](https://github.com/hjanoti/AI-Power-Resume-Builder/issues) &nbsp;•&nbsp;
[✨ **Request Feature**](https://github.com/hjanoti/AI-Power-Resume-Builder/issues)

<br/>

</div>

---

## 📸 Overview

A modern, **AI-powered resume builder** that helps you craft beautiful, professional resumes in minutes. Choose from polished templates, edit in real-time, and manage multiple resumes from a clean, intuitive dashboard.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Multiple Templates** | Choose from professionally designed resume layouts |
| ⚡ **Real-time Editor** | See changes reflected instantly as you type |
| 📱 **Responsive Design** | Looks great on mobile, tablet, and desktop |
| 🗂️ **Resume Dashboard** | Create, manage, and organize all your resumes in one place |
| 🔐 **Authentication** | Secure login and user account management |
| 🎯 **Modern UI/UX** | Clean, intuitive interface built with React & Tailwind CSS |

---

## 🛠️ Tech Stack

```
Frontend   →  React + React Router DOM
Styling    →  Tailwind CSS
Build      →  Vite
Icons      →  Lucide React
Deploy     →  Netlify
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/hjanoti/AI-Power-Resume-Builder.git
cd AI-Power-Resume-Builder

# 2. Install dependencies
cd client
npm install

# 3. Start the development server
npm run dev
```

Open your browser and visit → **http://localhost:5173**

---

## 🗂️ Project Structure

```
AI-Power-Resume-Builder/
├── client/
│   ├── public/
│   │   ├── _redirects
│   │   └── assets/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   └── home/
│   │   ├── pages/
│   │   │   ├── Home.jsx          ← Landing page
│   │   │   ├── Dashboard.jsx     ← Resume management
│   │   │   ├── Login.jsx         ← Authentication
│   │   │   ├── ResumeBuilder.jsx ← Editor
│   │   │   └── Preview.jsx       ← Resume preview
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── netlify.toml
└── README.md
```

---

## 🗺️ Routes

| Route | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/login` | Authentication | Public |
| `/app` | Dashboard | 🔒 Protected |
| `/app/builder/:resumeId` | Resume Builder | 🔒 Protected |
| `/view/:resumeId` | Resume Preview | Public |

---

## 🎨 Templates

| Template | Description | Status |
|---|---|---|
| Minimal Image | Clean layout with profile picture | ✅ Available |
| Corporate | Classic professional style | 🔜 Coming Soon |
| Creative | Bold, modern design | 🔜 Coming Soon |
| Academic | Detailed CV format | 🔜 Coming Soon |

---

## 🧰 Development Scripts

```bash
npm run dev       # Start local development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run lint      # Run ESLint checks
```

---

## ☁️ Deployment

This project is configured for **automatic CI/CD deployment on Netlify**.

| Setting | Value |
|---|---|
| Base Directory | `client/` |
| Build Command | `npm run build` |
| Publish Directory | `dist` |
| Node Version | `20` |

> All routes are redirected to `index.html` to support SPA routing.

---

## 🔮 Roadmap

- [ ] 🤖 AI-powered resume content suggestions
- [ ] 📄 PDF export functionality
- [ ] 🎨 Additional resume templates
- [ ] 📊 Resume analytics dashboard
- [ ] 🌍 Multi-language support
- [ ] 📤 Social sharing options

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how to get started:

```bash
# Fork the repo, then:
git checkout -b feature/YourAmazingFeature
git commit -m "feat: add YourAmazingFeature"
git push origin feature/YourAmazingFeature
# Open a Pull Request 🎉
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

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

A huge thanks to the open-source community and the amazing tools that made this project possible:

- [React](https://reactjs.org/) — UI library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Vite](https://vitejs.dev/) — Lightning-fast build tooling
- [Lucide](https://lucide.dev/) — Beautiful, consistent icons

---

<div align="center">

**If you found this project helpful, please consider giving it a ⭐ on GitHub — it means a lot!**

<br/>

Made with ❤️ by [Heera Singh Janoti](https://github.com/hjanoti)

</div>
