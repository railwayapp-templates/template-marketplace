# Deploy OpenHuman Core — Self-Hosted AI Memory Backend on Railway

Host OpenHuman's core & memory 24/7 — RPC backend for the app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhuman-core-rpc-backend)

## About

OpenHuman is an open-source personal AI agent with a persistent, local-first memory of your world — a "Memory Tree" that ingests your Gmail, Notion, GitHub, and 100+ other services into a readable Obsidian-style knowledge graph, so the agent knows your context instead of starting cold every session. This template hosts the **OpenHuman core** — the Rust backend and its RPC endpoint — on Railway, so your memory brain and auto-fetch loop run 24/7 in the cloud, and your desktop OpenHuman app connects to it from anywhere.

---

Understanding OpenHuman's architecture is essential to using this template correctly, because it hosts one specific part of the system.

**This hosts the core backend, not the desktop app.** OpenHuman ships primarily as a desktop application (Rust core + Tauri UI) with a mascot, screen awareness, and voice — features that belong on your own machine. But the *brain* — the persistent memory, the 20-minute auto-fetch loop that pulls your connected services, and the orchestration engine — is the Rust core, and it exposes an RPC endpoint. OpenHuman is explicitly built to support a **custom core RPC URL for self-hosted backends**. This template runs that core in the cloud.

**Why put the core on Railway?** The auto-fetch loop and background "subconscious" that diffs your world and writes your morning brief only run while the core is running — on your laptop, that stops when you close the lid. Hosted on Railway, your memory brain stays live around the clock, whether your machine is on or not. Your desktop app connects to this always-on core via its RPC URL and token instead of running the core locally.

**The RPC token secures your entire memory.** `OPENHUMAN_CORE_TOKEN` is the bearer credential for the RPC endpoint — and that endpoint has access to your complete personal memory graph. Set a strong token, keep it private, and connect your desktop app with it. Railway's automatic HTTPS encrypts the connection in transit.

**The volume is your brain.** The Memory Tree lives as a SQLite database plus a Markdown vault on the mounted volume. That is your accumulated memory of every connected service. Without a persistent volume, a redeploy erases it — so it's mounted here, and worth backing up.

You bring the models: OpenHuman routes to OpenAI-compatible endpoints (DeepSeek, an Ollama server, OpenRouter), so add your model API keys or point it at a model server. Inference happens at the provider; the core orchestrates.

Typical cost: **~$10–20/month** on Railway for an always-on core with memory storage, plus your model API usage. OpenHuman is GPL-3.0 and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openhuman-core | `ghcr.io/tinyhumansai/openhuman-core` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `BACKEND_URL` | https://api.tinyhumans.ai |
| `OPENHUMAN_WORKSPACE` | /home/openhuman/.openhuman |
| `OPENHUMAN_CORE_TOKEN` | (secret) |

## Configuration

- **Volume:** `/home/openhuman/.openhuman`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openhuman-core-rpc-backend)
