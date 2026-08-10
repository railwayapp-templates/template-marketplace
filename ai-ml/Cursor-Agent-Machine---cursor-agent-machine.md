# Deploy Cursor Agent Machine on Railway

Cursor Agent Machine hosted on railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cursor-agent-machine)

## About

**Self-Hosted Worker Machine for Cursor Cloud Agents (My Machines)**

It wraps the public Cursor agent CLI so you can run a [My Machines](https://cursor.com/docs/cloud-agent/self-hosted-guides/my-machines) worker on [Railway](https://railway.com).

![image](https://raw.githubusercontent.com/roadmap-ai/railway-cursor-agent-worker/refs/heads/main/docs/images/cursor-dashboard-ingress.png)

"One-click deploy" an always-on background worker on Railway. The worker opens connection to Cursor's cloud, clones **one** git repo, and shows up under **My Machines** so Cloud Agent tool calls (shell, edits, git) run inside your Railway environment.

### Required variables

| Variable | Required | Description |
| --- | --- | --- |
| `CURSOR_API_KEY` | Yes (secret) | Personal user API key from [Cursor Dashboard → API Keys](https://cursor.com/dashboard/api) |
| `REPO_URL` | Yes | HTTPS git URL, e.g. `https://github.com/you/your-repo.git` |
| `GIT_TOKEN` | No (secret) | HTTPS token for private repos |
| `GIT_USERNAME` | No | Defaults to `x-access-token` (GitHub-friendly). |
| `BASE_IMAGE` | No (build-time) | Dev container **image** to build on (see below). Default: Node 22 |
| `EXTRA_APT_PACKAGES` | No (build-time) | Extra apt packages on top of the base image |

### Important: resource sizing &amp; idle costs

This worker runs as an **always-on** Railway service: it stays connected to Cursor Cloud so agent tool calls can execute, which means it consumes Railway compute (and billing) continuously, not just while an agent task is active.

- **Size resources deliberately.** Set CPU/RAM on the Railway service to match what your repo's toolchain and agent tasks actually need (e.g. Docker builds, test suites, language servers). Over-provisioning burns quota for no benefit; under-provisioning can cause slow or failing tool calls.
- **This worker has no inbound traffic**, so Railway's request-based sleep/scale-to-zero does not apply here: it will keep running (and billing) until you stop it, regardless of agent activity.
- **Recommended: only run it during working hours.** Since Cloud Agents are typically used interactively during the day, avoid paying for idle overnight/weekend uptime by turning the service off when you're not using it:
  - Manually pause/resume the service from the Railway dashboard at the start/end of your day, or
  - Automate it with a scheduled job (e.g. GitHub Actions cron, or Railway's own [cron/scheduled tasks](https://docs.railway.com)) that calls the [Railway public API](https://docs.railway.com/reference/public-api) to scale the service to 0 replicas after hours and back to 1 in the morning.
- Check the [Railway pricing page](https://railway.com/pricing) and your plan's usage dashboard periodically to confirm the worker's actual consumption matches expectations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cursor Agent Machine | [roadmap-ai/railway-cursor-agent-worker](https://github.com/roadmap-ai/railway-cursor-agent-worker) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REPO_URL` | - |  Git clone URL for the single repo this worker serves. Example: https://github.com/you/your-repo.git |
| `GIT_TOKEN` | (secret) | Personal access token / deploy token with read |
| `WORKER_NAME` | - | Cursor Machine Name. This is what will appear on your cursor "My Machines" dasbhoard |
| `GIT_USERNAME` | (secret) | Username to use for all git commands |
| `CURSOR_API_KEY` | (secret) |  Personal user API key from https://cursor.com/dashboard/api |

## Configuration

- **Volume:** `/workspace`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cursor-agent-machine)
