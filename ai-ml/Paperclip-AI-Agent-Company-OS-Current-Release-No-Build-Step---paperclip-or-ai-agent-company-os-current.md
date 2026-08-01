# Deploy Paperclip | AI Agent Company OS, Current Release + No Build Step on Railway

Run a company with AI agents. Current release, no build step, empty form.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperclip-or-ai-agent-company-os-current)

## About

Paperclip is open-source (MIT) orchestration for running a company with AI agents. You set goals, hire agents — Claude Code, Codex, OpenCode, Gemini, Hermes, OpenClaw and more — give them budgets and heartbeats, and Paperclip coordinates the work through org charts, tickets, tool approvals and governance, so the day-to-day runs without you dispatching every task by hand.

This template deploys it as two services — the app on a persistent volume plus a managed PostgreSQL — from the **official upstream image**, pinned to a release commit. The deploy form has **nothing you have to fill in**.

Paperclip is a Node monorepo that also ships the agent CLIs it drives, so hosting it is mostly about three things: what gets built, what persists, and whether the agents can actually act. This template differs from the other Paperclip listings on all three.

- **No build step.** Upstream publishes an official production image for every commit. This template runs `ghcr.io/paperclipai/paperclip` pinned to the image built from the current release, so a deploy is an image pull. Every other listing forks a template repo that clones the monorepo and runs `pnpm install --frozen-lockfile` plus three package builds on your build minutes — and the most-deployed one still pins its clone to a release from April, thirteen releases back.
- **Tool approvals are configured, so hired agents can actually do work.** Paperclip signs approval-required tool actions with `PAPERCLIP_TOOL_ACTION_SIGNING_SECRET`. That variable has no default and no fallback anywhere in the codebase: when it is unset, the tool gateway cancels the pending approval, marks the invocation failed with `signing_secret_unconfigured`, and returns HTTP 500 — on an instance that boots and looks perfectly healthy. This template generates it per deploy.
- **The volume actually works.** Paperclip's current release cannot write a Railway volume at all: it only repairs ownership of its home directory when the container asks for a UID remap, which Railway never does, so it drops privileges onto a root-owned mount and dies on its first `mkdir`. This template runs that release image with the ownership repair applied — the same fix upstream landed on 2026-07-31, ahead of its first tagged release. The volume at `/paperclip` keeps the instance config, local file storage and the credentials for the bundled agent CLIs across redeploys, and the container still drops to an unprivileged user. That is also why this template sets **no start command**: a Railway start command replaces an image's entrypoint instead of adding to it.

Access is authenticated out of the box: the image ships `PAPERCLIP_DEPLOYMENT_MODE=authenticated` (the codebase's default when that is unset is *no auth at all*), Better Auth guards the API, and the first person to sign in claims the instance-admin role. Sign in as soon as the deploy is green.

Sizing: the app is comfortable on ~1 GB of RAM idle, and grows with how many agents you run concurrently; PostgreSQL is small. Both scale vertically on Railway without a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17` | Database |
| paperclip | `ghcr.io/bon5co/paperclip-railway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `BETTER_AUTH_SECRET` | paperclip | (secret) |
| `PAPERCLIP_TOOL_ACTION_SIGNING_SECRET` | paperclip | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/paperclip`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/paperclip-or-ai-agent-company-os-current)
