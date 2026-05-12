# 🎨 Employee Management System (EMS) — Frontend

[![Frontend CI](https://github.com/Daniel-wasihun/employee-front/actions/workflows/frontend.yml/badge.svg)](https://github.com/Daniel-wasihun/employee-front/actions/workflows/frontend.yml)
[![Vue](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A stunning, premium, and highly responsive administrative dashboard built with Vue 3 and Tailwind CSS v4.

---

## ✨ Features

- **💎 Modern UI**: Sleek dark-mode interface with glassmorphism and smooth animations.
- **⚡ High Performance**: Built with Vite 6 and Tailwind CSS v4 for ultra-fast load times.
- **📊 Interactive Dashboard**: Visualized statistics and real-time data monitoring.
- **📋 Data Management**: Robust `DataTable` with server-side pagination and type-safe data access.
- **🛡️ Secure Auth**: Integrated JWT session management with auto-refresh logic.
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop.
- **🔒 SSL/TLS**: Production-ready Nginx configuration with HTTPS support (Port 443).

---

## 🛠️ Tech Stack

- **Core**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS v4.0 (CSS-first configuration)
- **State**: Pinia (Centralized Stores)
- **Routing**: Vue Router 4
- **HTTP Client**: Axios with interceptors
- **Build Tool**: Vite 6 + TypeScript

---

## 🚦 Quick Start

### Using Docker (Recommended)
```bash
# 1. Clone the repository
git clone https://github.com/Daniel-wasihun/employee-front.git
cd employee-front

# 2. Run with Docker Compose
docker-compose up --build
```
The frontend will be available at `https://localhost` (Port 443).

### Manual Development
1. Install dependencies:
```bash
npm install
```
2. Start dev server:
```bash
npm run dev
```

---

## 📂 Project Structure

- `src/components/ui`: High-performance reusable components.
- `src/views`: Main page layouts (Dashboard, Employees, Departments).
- `src/stores`: Pinia state management.
- `src/api`: Axios-based service layer.
- `nginx/`: Production SSL and proxy configuration.

---

## 👨‍💻 Author
**Daniel Wasihun** - [GitHub](https://github.com/Daniel-wasihun)
