# Dawit Tamirat Personal Portfolio (React + Express + MySQL)

A modern, high-performance, full-stack personal portfolio application for **Dawit Tamirat** matching the design reference with exact precision. Features full **Light Mode** and **Dark Mode** support, dynamic component architecture, REST API backend, and MySQL database integration.

---

## 🌟 Key Features

1. **Exact Visual Fidelity**: Recreates all visual sections (Hero, About Me with social badges, Technical Skills, Roles & Education, Projects grid with custom badges, CTA banner, and Contact Form).
2. **Light & Dark Theme Switcher**: Toggle button in the header that seamlessly switches color variables, cards, typography, and borders between light and dark themes.
3. **Full-Stack REST API & MySQL Database**:
   - Express server with endpoints for `/api/skills`, `/api/experiences`, `/api/projects`, and `/api/contact`.
   - MySQL database integration (`mysql2/promise`) with SQL DDL schema and automated seeding script.
   - Built-in graceful fallbacks if MySQL is offline during local testing.
4. **Interactive UI**: Modal previews for projects, responsive hamburger drawer for mobile viewports, search bar, and contact form with validation.

---

## 📁 Project Structure

```
portfolio/
├── server/                   # Node.js Express Backend
│   ├── config/
│   │   └── db.js             # MySQL Connection Pool
│   ├── scripts/
│   │   ├── schema.sql        # MySQL DDL Table Creation Script
│   │   └── seed.js           # Automated MySQL Database Seeder
│   ├── .env                  # Database Credentials
│   ├── server.js             # Express API Entry Point
│   └── package.json
├── src/                      # React Vite Frontend
│   ├── components/           # Navbar, Hero, About, Skills, Experience, Projects, Contact, Footer
│   ├── context/              # ThemeContext (Light & Dark mode state)
│   ├── services/             # API Service & Fetch Layer
│   ├── styles/               # Design Tokens & CSS Variables
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Run from the root directory:
```bash
npm install
```

### 2. Configure & Seed MySQL Database (Optional / Recommended)
1. Ensure MySQL server is running locally or remotely.
2. Edit `server/.env` with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=dawit_portfolio
   DB_PORT=3306
   ```
3. Run database seed command to create database, tables, and populate initial data:
   ```bash
   npm run seed
   ```

### 3. Run Application

#### Development Mode (Frontend)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Run Express Backend Server
```bash
npm run server
```
Server runs on [http://localhost:5000](http://localhost:5000).

---

## 📑 Database Schema Summary

- **`skills`**: `id`, `category`, `name`, `icon`
- **`experiences`**: `id`, `role`, `company`, `year`, `description`, `tags`
- **`education`**: `id`, `degree`, `institution`, `year`, `highlights`
- **`projects`**: `id`, `title`, `subtitle`, `promo_text`, `description`, `category`, `image`, `tags`, `live_url`, `github_url`
- **`contacts`**: `id`, `name`, `email`, `message`, `created_at`
