# 🦷 DentaPremium — Luxury Private Dental Clinic Website

[![Live Demo](https://img.shields.io/badge/Live%20Demo-denta--premium.vercel.app-0ea5e9?style=for-the-badge&logo=vercel)](https://denta-premium.vercel.app/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.7-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

> **DentaPremium** is a state-of-the-art, luxury dental practice web application engineered for modern private clinics. Designed with bespoke typography, subtle micro-interactions, smooth Lenis inertia scrolling, and high-performance GSAP animations, DentaPremium provides a showcase experience for prospective patients.

---

## 🌐 Live Preview

✨ **Explore the live website**: [https://denta-premium.vercel.app/](https://denta-premium.vercel.app/)

---

## ✨ Key Features

- 🏥 **Bespoke Clinic Experience**: Tailored layouts for Cosmetic Dentistry, Dental Implants, Orthodontics, Emergency Care, and Periodontics.
- 🎨 **Luxury Aesthetic & Design System**: Modern dark-slate and electric sky-blue accents, glassmorphic floating cards, and curated typography.
- 🚀 **Smooth Inertia Scrolling**: Integrated **Lenis** smooth scroll synchronized with **GSAP ScrollTrigger** for fluidity across all devices.
- ⚡ **State Persistence**: Active navigation tabs persist across page refreshes via `localStorage` state retention.
- 📱 **Fully Responsive Layout**: Mobile-first design with a responsive drawer menu and edge-to-edge full-width header navigation.
- 👨‍⚕️ **Team & Showcase Portfolios**: Interactive specialist showcases, clinic tour cards, and patient reviews feed.
- 📅 **Centralized Booking Gateway**: Streamlined appointment CTA routing with non-interactive phone display badges for showcase mode.

---

## 🛠️ Technology Stack

- **Frontend Core**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
- **Styling & Icons**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Animations & Motion**: [GSAP (GreenSock)](https://greensock.com/gsap/), [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll**: [@studio-freight/lenis](https://lenis.darkroom.engineering/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📁 Repository Structure

```text
DentaPremium/
└── Client/
    ├── public/              # Static assets & favicons
    ├── src/
    │   ├── assets/          # Project images & vector graphics
    │   ├── components/
    │   │   ├── PComponents/ # Page-specific section components
    │   │   │   ├── AboutPage/
    │   │   │   ├── ContactPage/
    │   │   │   ├── HomePage/
    │   │   │   ├── ReviewsPage/
    │   │   │   ├── ServicePage/
    │   │   │   └── TeamPage/
    │   │   └── UI/          # Global UI components (Navbar, Footer, Button)
    │   ├── Pages/           # Main page view wrappers
    │   ├── App.jsx          # Root application component & layout state
    │   ├── index.css        # Global CSS styles & Tailwind directives
    │   └── main.jsx         # Application entry point
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

Follow these steps to run DentaPremium locally on your machine:

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AshisChetia/DentaPremium---Dentist-Website-.git
   cd DentaPremium---Dentist-Website-/Client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173` to view the application live in your browser.

---

## 👨‍💻 Developer & Contact Info

Designed & Developed with ❤️ by **Ashis Chetia**.

- 📸 **Instagram**: [@_ashischetia_](https://www.instagram.com/_ashischetia_?igsh=MW1nZWFvczM1cXZvbw%3D%3D)
- 🐙 **GitHub**: [@AshisChetia](https://github.com/AshisChetia)
- 💼 **LinkedIn**: [Ashis Chetia](https://www.linkedin.com/in/ashis-chetia-a981b1351/)
- 🟢 **Fiverr**: [ashis_chetia](https://www.fiverr.com/users/ashis_chetia/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
