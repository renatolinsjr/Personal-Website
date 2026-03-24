# Renato Lins | Senior Software Engineer
## Modern Portfolio & Technical Case Study

[![Next.js](https://img.shields.io/badge/FullStack-Next.js%2016-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/Library-React%2019-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind--CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/UI-Radix--UI-black?style=for-the-badge&logo=radix-ui)](https://www.radix-ui.com/)
[![Zod](https://img.shields.io/badge/Validation-Zod-3068b7?style=for-the-badge&logo=zod)](https://zod.dev/)

---

This repository contains my personal portfolio, built as a high-performance, internationalized Next.js application. Beyond showcasing my journey, this project serves as a technical demonstration of **Clean Code**, **Web Security**, and **Modern Architecture**.

---

### 🚀 Key Technical Architecture

#### 🌍 Localization & Internationalization (i18n)
- **Native Support**: Bilingual support for **PT-BR** and **EN-US** using a custom middleware (`proxy.ts`) for locale detection and routing.
- **Dynamic Assets**: Localized resumes (PDFs) and context-aware strings.

#### ⚡ 100 Lighthouse Performance Architecture
This project is optimized to achieve a perfect 100 score in Performance, Accessibility, Best Practices, and SEO.

![Recording2026-03-23205605-ezgif com-optimize](https://github.com/user-attachments/assets/c2611524-2315-47e5-93a0-608897511bf5)


- **Dynamic Loading & Code Splitting**: Sections below the fold (`Skills`, `Experience`, `Contact`) use `next/dynamic` to reduce the initial JavaScript bundle by ~240KB, prioritizing **LCP**.
- **Main Thread Optimization**: Custom `useOptimizedTask` hook via **Scheduler API (`postTask`)**. Heavy `framer-motion` animations are deferred until the thread is idle to hit **0ms TBT**.
- **BF Cache & Headers**: `vercel.json` configured with specific headers to enable instant back/forward navigation.
- **Micro-Optimization**: `optimizePackageImports` in `next.config.ts` for aggressive tree-shaking of large icon libraries.

#### 🛡️ Security & Integrity (Post-Audit)
- **Full Security Headers**: 17+ critical fixes (CSP, X-Frame-Options, etc.) implemented after a technical audit.
- **Anti-Spam Form**: High-integrity contact form with **Google ReCAPTCHA v3**, **Honeypot**, and **Zod** server-side validation.
- **Type Safety**: Runtime and Build-time environment variable validation via `env.ts`.

#### 🎨 Modern UI/UX
- **Next.js 16 + React 19**: Leveraging Server Components and Concurrent rendering.
- **Fluid Themes**: `next-themes` with zero layout shift (CLS).
- **Smooth Motion**: Complex animations with Framer Motion, optimized for performance.

---

### 🎨 Design Philosophy
The UI is built with **Tailwind CSS** and **shadcn/ui**, following a premium dark-themed Dracula aesthetic with fluid animations from **Framer Motion**.

---

### 🛠️ Local Setup

1. **Clone & Install**:
   ```bash
   git clone https://github.com/renatolinsjr/Personal-Website.git
   cd Personal-Website
   pnpm install
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env` and fill in the following:
   - `NEXT_PUBLIC_GA_ID`
   - `RECAPTCHA_SECRET_KEY`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `FORMSPREE_ENDPOINT`

3. **Development**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

### 🧪 Quality Assurance
- Automated tests with **Vitest**.
- CI/CD pipeline configured with **GitHub Actions**.
- Continuous technical monitoring of security headers and performance metrics.

---
**Crafted with passion by [Renato Lins](https://www.linkedin.com/in/renatolinsjr/)**
