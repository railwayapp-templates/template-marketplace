# Deploy PicoClaw on Railway

Tiny self-hosted AI assistant with file, shell and cron tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/picoclaw-agent)

## About

PicoClaw is an ultra-lightweight personal AI assistant written from scratch in Go by the embedded-hardware company Sipeed. It gives you a private chat agent that reads and writes files, runs shell commands, searches the web, schedules cron jobs and calls any Model Context Protocol server — a heavyweight assistant's feature set in one static binary that idles around 10–20 MB of RAM and boots in under a second. It was built so an assistant could live on a $10 RISC-V board rather than a workstation, which is why it fits a small cloud container.

Deploy PicoClaw on Railway and you get the full Web UI build, not the headless one. The template runs one service, `picoclaw`, built from the [gridalpha/picoclaw-railway](https://github.com/gridalpha/picoclaw-railway) repository on top of the official `sipeed/picoclaw:launcher` image. It serves the dashboard on Railway's public URL and supervises the agent gateway as a child process on an internal port that is never exposed. A volume at `/data` holds model settings, encrypted provider credentials, skills, cron jobs, chat memory and the dashboard password — which is seeded from a Railway variable before the server answers its first request, so there is no window in which a stranger can claim your instance.

![Diagram of the PicoClaw service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788771297/picoclaw-architecture.png)

Most self-hosted AI assistants assume a beefy always-on machine. PicoClaw inverts that: it compiles to one dependency-free binary for x86-64, ARM64, RISC-V, MIPS and LoongArch, so the same build runs on a single-board computer, an old Android phone or a cloud container. Self-hosting matters because it holds your provider keys, reads your files and runs shell commands on your behalf.

Key features:

- **Bring your own model** — two dozen providers, plus local Ollama, vLLM and LM Studio endpoints
- **Real tools, not just chat** — filesystem read/write/edit, sandboxed shell `exec`, cron, web search and fetch
- **Native Model Context Protocol support**, plus importable skill packs — eight built in
- **Twenty chat channels** — Telegram, Discord, Slack, Matrix, IRC, MQTT, Feishu, DingTalk and more
- **Rule-based model routing** and `spawn` sub-agents for background work

The Railway deployment is deliberately flat. The `picoclaw` service runs the launcher, which serves the dashboard and starts the gateway process owning the agent loop, the cron scheduler and every channel connection. There is no database, queue or worker tier: state is plain files — JSON config, an encrypted `.security.yml` credential store, a SQLite password file and JSONL memory — all on the one volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| picoclaw | [gridalpha/picoclaw-railway](https://github.com/gridalpha/picoclaw-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Dashboard port, health-checked by Railway |
| `PICOCLAW_HOME` | /data/picoclaw | All state, one level below the mount |
| `PICOCLAW_DASHBOARD_PASSWORD` | (secret) | Web UI password, min 8 chars |

## Configuration

- **Healthcheck:** `/api/auth/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/picoclaw-agent)
