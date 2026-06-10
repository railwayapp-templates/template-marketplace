# Deploy Pocketbase on Railway

Open Source backend for your SaaS and Mobile app in 1 file.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/73ofk1)

## About

<p align="center">
  <a href="https://pocketbase.io" rel="noopener">
    <img width="320" src="https://i.imgur.com/5qimnm5.png" alt="PocketBase - open source backend in 1 file">
  </a>
</p>

<h1 align="center">PocketBase on Railway</h1>

<p align="center">
  <strong>Your entire backend in one click.</strong><br>
  Database, auth, file storage, realtime API and an admin dashboard — deployed and ready in under a minute.
</p>

<p align="center">
  <a href="https://railway.com/deploy/73ofk1?referralCode=HKQvZr&amp;utm_medium=integration&amp;utm_source=template&amp;utm_campaign=generic">
    <img src="https://railway.com/button.svg" alt="Deploy on Railway">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PocketBase-v0.36-2d3748" alt="PocketBase v0.36">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License MIT">
  <img src="https://img.shields.io/badge/storage-persistent%20volume-green" alt="Persistent storage">
</p>

---

## ⚡ Why this template?

Stop wiring together a database, an auth provider, a file bucket and an API server. [PocketBase](https://pocketbase.io) gives you **all of that in a single Go binary** — and this template runs it on Railway with **persistent storage already configured**, so your data survives every redeploy.

Perfect for **MVPs, side projects, prototypes and small production apps** where you want a real backend without the infrastructure babysitting.

## ✨ What you get out of the box

- 🗄️ **Embedded SQLite database** with **realtime subscriptions** over WebSockets
- 🔐 **Built-in authentication** — email/password, OAuth2 (Google, GitHub, etc.) and one-time passwords
- 📁 **File storage &amp; management** (local or S3-compatible)
- 🎛️ **Beautiful admin dashboard** to manage collections, records, users and settings — no extra UI to build
- 🔌 **Auto-generated REST-ish API** the moment you create a collection
- 💾 **Persistent volume** pre-mounted so your data is never wiped on deploy
- ⚙️ **Zero-config networking** — Railway assigns your public HTTPS domain automatically

## 🚀 Get started in 3 steps

1. **Click "Deploy on Railway"** above and let it build.
2. **Open your service's public URL** and add `/_/` at the end (e.g. `https://your-app.up.railway.app/_/`) to reach the admin dashboard.
3. **Create your first superuser account** on the setup screen — and you're live. Start creating collections and your API endpoints appear instantly.

&gt; 💡 **Tip:** Click *"Generate Domain"* in the Railway service Settings if you don't see a public URL yet.

## 💾 Your data is safe

This template mounts a **persistent volume at `/pb_data`**, where PocketBase keeps the SQLite database, uploaded files and settings. That means **redeploys, restarts and new versions won't erase your data** — the #1 mistake people make when self-hosting PocketBase.

## 🔌 Connect your app

The easiest way to talk to your backend is through an official SDK:

```js
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://your-app.up.railway.app');

// Authenticate a user
await pb.collection('users').authWithPassword('user@example.com', 'password');

// Query records with filters, realtime, pagination — all built in
const posts = await pb.collection('posts').getList(1, 20, {
  filter: 'published = true',
});
```

- **JavaScript / TypeScript** — [pocketbase/js-sdk](https://github.com/pocketbase/js-sdk) (browser, Node.js, React Native)
- **Dart / Flutter** — [pocketbase/dart-sdk](https://github.com/pocketbase/dart-sdk) (web, mobile, desktop)

## ⚙️ Configuration (optional)

| Variable | Description |
| --- | --- |
| `PORT` | Set automatically by Railway — PocketBase binds to it. |
| `PB_VERSION` | *(if your Dockerfile uses it)* Pin the PocketBase version to build. |

&gt; Adjust this table to match the variables your template actually exposes.

## 📚 Resources

- 📖 [Full documentation](https://pocketbase.io/docs)
- 🧩 [Extend with JavaScript hooks](https://pocketbase.io/docs/js-overview/)
- 🛠️ [Use PocketBase as a Go framework](https://pocketbase.io/docs/go-overview/)

---

&gt; ⚠️ **Heads up:** PocketBase is still under active development (currently pre-`v1.0.0`), so full backward compatibility isn't guaranteed between minor versions. It's great for most projects — just skim the changelog before upgrading critical apps.

<p align="center">
  <sub>PocketBase is free and open source under the <a href="https://github.com/pocketbase/pocketbase/blob/master/LICENSE.md">MIT License</a>. Built with ❤️ on Railway.</sub>
</p>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pocketbase | [laguillo/pocketbase](https://github.com/laguillo/pocketbase) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb/pb_data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/73ofk1)
