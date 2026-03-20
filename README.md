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

### 🚀 Key Technical Features

#### 🌍 Full Internationalization (i18n)
- Native support for **PT-BR** and **EN-US** using a custom middleware (`proxy.ts`) for locale detection and routing.
- Context-aware UI strings and localized assets (e.g., specific PDF resumes for each locale).

#### 🛡️ Robust Security (Post-Audit)
- **Technical Security Audit**: Implemented 17+ critical fixes covering CSP, X-Frame-Options, and more.
- **Form Integrity**: Contact form protected by Google **ReCAPTCHA v3**, **Honeypot** traps, and strict **server-side Zod validation**.
- **Sanitized Backend**: Environment variable validation via `env.ts` (Zod) to ensure zero failures during runtime and build.

#### ⚡ Performance & Specialized Logic
- **Memory Leak Protection**: Optimized `IntersectionObserver` implementations in the navigation and components.
- **Smart Components**: Localized date utilities and experience calculations to ensure data relevance without manual updates.
- **Static Assets**: Subresource Integrity (SRI) for external stylesheets (e.g., Devicons).

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
