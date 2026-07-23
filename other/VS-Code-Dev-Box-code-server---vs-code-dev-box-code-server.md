# Deploy VS Code Dev Box (code-server) on Railway

VS Code in your browser: password-protected, Node & Python preinstalled.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vs-code-dev-box-code-server)

## About

Self-host VS Code in your browser with one click. This is a batteries-included cloud dev box built on the official code-server: password-protected by default, with git, build-essential (gcc/make), Python 3 (pip/venv/pipx), and Node.js 22 LTS preinstalled, plus a persistent home directory so your code, extensions, and settings survive redeploys.

Most code-server templates hand you a bare editor: no compilers, no Node, no Python, and a volume that breaks the non-root image on first boot. This template ships a thin, fully commented Dockerfile on top of the official pinned code-server release that fixes all three: it preinstalls a real toolchain, and its entrypoint fixes volume ownership on first boot before dropping privileges back to the non-root coder user. Authentication can't be accidentally disabled — the container refuses to start without a password, which is auto-generated for you. Your entire home directory (/home/coder) lives on a persistent volume: projects, extensions, SSH keys, shell config.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | [niteshkumargupta/code-server-railway-template](https://github.com/niteshkumargupta/code-server-railway-template) (root: app) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Container timezone. |
| `PASSWORD` | (secret) | Auto-generated login password for the code-server web UI. Change it any time in this Variables tab; never remove it on a public domain. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/coder`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/vs-code-dev-box-code-server)
