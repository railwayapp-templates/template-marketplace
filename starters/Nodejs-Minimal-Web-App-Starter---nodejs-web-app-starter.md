# Deploy Node.js — Minimal Web App Starter on Railway

Deploy a minimal Node.js web app — HTTPS & Git deploys included

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nodejs-web-app-starter)

## About

A clean, minimal Node.js web application ready to deploy in one click — a production-ready starting point for building APIs, web services, and backends on Railway. It ships with a working HTTP server, sensible project structure, and zero configuration to get running, so you can skip the boilerplate and start writing your own code immediately. Auto-deploys from GitHub, scales on demand, and runs with automatic HTTPS out of the box.

---

This template is a foundation, and it's built to be the simplest possible correct starting point on Railway.

**It binds to Railway's port automatically.** The server reads the `PORT` environment variable Railway provides and binds to `0.0.0.0`, which is what lets Railway route public traffic to it. This is the single most common mistake in a hand-rolled Node deploy — hardcoding a port, so Railway can't reach the app — and it's handled here so the template just works.

**Add infrastructure when you need it.** The template is intentionally minimal — no database, no cache, no extra services. When your app needs persistence, add a Railway PostgreSQL or Redis service and reference its connection variables; Railway wires them over the private network. Starting minimal keeps your first deploy fast and your costs low.

**Auto-deploys from GitHub.** Connect the repository and every push to your default branch redeploys automatically, so your workflow is just `git push`. No build scripts, SSH, or manual steps.

**Bring your own dependencies.** Add packages with npm as normal; Railway installs them on build. The template is a starting point, not a framework — use Express, Fastify, Hono, or plain Node, whatever fits your project.

Typical cost: **~$5/month** on Railway's Hobby plan for a small service, scaling with your resource usage. Node.js and the template are free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nodejs | [alphasecio/nodejs](https://github.com/alphasecio/nodejs) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/nodejs-web-app-starter)
