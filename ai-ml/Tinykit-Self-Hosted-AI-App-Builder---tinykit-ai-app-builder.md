# Deploy Tinykit — Self-Hosted AI App Builder on Railway

Self-host an AI app builder — DB, storage & 100+ apps, one service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tinykit-ai-app-builder)

## About

Tinykit is an open-source, self-hosted AI app builder — a self-hostable alternative to Lovable, v0, and Replit. Prompt an AI agent to write code, create database tables, and wire it together, then deploy instantly. Because it's powered by PocketBase, every app gets a real-time database, authentication, and file storage built in — no separate services to add. And it's dense: a single Railway service can host 100+ small real-time apps, each updated by typing `/tinykit` after its domain. This template deploys the whole thing in one click.

---

Tinykit is refreshingly self-contained, and understanding how it's built explains why it's cheap and simple to run.

**One service, everything included — thanks to PocketBase.** Tinykit embeds PocketBase, so the database, real-time subscriptions, authentication, and file storage all live inside the single container. There's no separate Postgres or Redis to wire up. That's what makes "real-time database & storage included" literal: deploy one service and you have the full backend, which keeps cost and complexity low.

**Host 100+ apps on one deployment.** Tinykit runs the builder (the "studio") and the apps it creates on the same server. You build at `/tinykit`, deploy to a domain, and can point many domains at one instance — hosting dozens or hundreds of small real-time apps from a single Railway service. Each app is one Svelte file with auto-generated tables that sync in real time, updated by adding `/tinykit` after its domain.

**Bring your own LLM key.** The AI agent needs a model. Configure your LLM from inside the app, or set the API key as an environment variable. You supply the key and pay your provider directly; Tinykit orchestrates the prompting and code generation.

**Persist the volume — it holds everything.** Your apps, their databases, content, and uploaded assets all live in Tinykit's data directory. Mount the volume so nothing is lost on redeploy. Tinykit also keeps snapshots on every change ("time travel"), so you can undo edits — but that history lives in the same persistent store.

**It's early alpha — scope it accordingly.** Tinykit is in active early-alpha development. It's excellent for personal utility tools, small-business CRUD apps, and internal tools, and AI-generated code should be reviewed before handling sensitive data or running in production. Pin a version, since it evolves quickly, and treat it as a fast-moving project rather than a stable platform.

Typical cost: **~$5–10/month** on Railway for the single service — remarkably cheap for the number of apps it can host — plus your own LLM usage. Tinykit is open source and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tinykit | [tinykit-studio/tinykit](https://github.com/tinykit-studio/tinykit) | Database |

## Configuration

- **Volume:** `/app/pocketbase/pb_data`

**Category:** AI/ML · **Languages:** Svelte, TypeScript, JavaScript, HTML, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tinykit-ai-app-builder)
