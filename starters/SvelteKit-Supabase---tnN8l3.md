# Deploy SvelteKit Supabase on Railway

A modern web app starter powered by SvelteKit and Supabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tnN8l3)

## About

---

## ⚡ SvelteKit Supabase Starter Template

Build modern full-stack web apps with ease using **SvelteKit** and **Supabase**. This Railway-ready template comes with authentication, real-time capabilities, and a responsive UI — all preconfigured and ready to deploy.

---

### 🎯 Features

* ✅ **Auth System** – Email/password login, session handling, and protected routes
* 🎨 **Tailwind CSS UI** – Modern, mobile-first design with a clean blue theme
* 🔗 **Supabase Integration** – Includes auth, database, storage, and real-time setup
* 🧠 **TypeScript Support** – Safer and clearer development experience
* 🚀 **One-click Deploy** – Deploy instantly with Railway + environment template

---

### 🧱 Pages Included

* Landing Page
* Login / Register
* Dashboard
* User Profile

---

### 🗂️ Project Structure

```
src/
├── lib/
│   ├── components/       # Reusable UI components
│   ├── auth/             # Authentication helpers
│   └── supabase/         # Supabase functions
├── routes/
│   ├── auth/             # Login & register
│   ├── dashboard/        # Main dashboard
│   └── profile/          # User profile
```

---

### 🚀 Getting Started

1. Click **Deploy** to clone the project and set up on Railway
2. Add your **Supabase URL** and **anon key** in the `.env`
3. You're ready to go — no manual setup needed

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sveltekit-supabase | [zxdev7/sveltekit-supabase](https://github.com/zxdev7/sveltekit-supabase) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PUBLIC_SUPABASE_URL` | your-supabase-url |
| `PUBLIC_SUPABASE_ANON_KEY` | your-supabase-anon-key |

## Configuration

- **Start command:** `node build`

**Category:** Starters · **Languages:** Svelte, TypeScript, JavaScript, HTML, CSS

[View on Railway →](https://railway.com/deploy/tnN8l3)
