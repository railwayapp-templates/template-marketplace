# Deploy AgentOS on Railway

Deploy and run your AI workforce with AgentOS, powered by OpenClaw.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentos-1)

## About

# Deploy AgentOS on Railway

## Build Your AI Workforce. Run It Like a Company.

AgentOS is an operating system for creating, organizing, and running digital workers. Create dedicated workspaces, give agents roles and context, connect models and tools, assign real work, monitor operations, and control how autonomously your AI workforce can act from one secure interface.

Under the hood, AgentOS uses OpenClaw as its runtime. OpenClaw handles execution, sessions, browser automation, and runtime state, while AgentOS provides the workspace structure, operator visibility, and human control needed to manage multiple agents safely.

## What This Railway Template Deploys

This template deploys a complete two-service AgentOS environment:

- One public AgentOS application service built from the AgentOS repository
- One private browser-worker service for interactive Chromium sessions
- One persistent /data volume for AgentOS and OpenClaw state
- One separate persistent /data volume for Chromium profiles
- Managed HTTPS for AgentOS
- Generated internal secrets for AgentOS, OpenClaw Gateway, and the browser worker
- Instance Protection bootstrap using your initial administrator credentials

Only AgentOS is exposed through the public Railway domain. OpenClaw stays on container loopback inside the public app service, and interactive Chromium runs inside the private browser-worker over Railway private networking.

## What You Can Build

Use AgentOS to:

- Create specialized digital workers with different roles and responsibilities
- Organize agents into persistent workspaces
- Assign tasks and monitor ongoing operations
- Run long-lived and recurring AI workflows
- Manage models, tools, accounts, context, memory, and policies
- Review agent activity, sessions, outputs, and runtime status
- Connect secure browser accounts with persisted Chromium profiles
- Operate one protected AgentOS instance across desktop and mobile

## Hosting Requirements

You need:

- A Railway account with support for persistent volumes and private networking
- Credentials for at least one supported AI model provider

Model providers are connected after deployment through the AgentOS Setup Center.

## Deployment Notes

During template deployment, the only operator-provided secret should be the initial administrator password. The template generates the internal AgentOS API token, OpenClaw Gateway token, and browser-worker token automatically.

The deployment should run with one replica per service. Both the OpenClaw runtime and Chromium profile storage are writable and should not be shared across horizontal replicas.

## Technical Implementation

The public AgentOS service:

- Builds with Dockerfile.railway
- Serves AgentOS on port 3000
- Uses /api/health for Railway health checks
- Runs the pinned OpenClaw Gateway on 127.0.0.1:18789
- Persists AgentOS, OpenClaw, and workspace state on /data

The private browser-worker service:

- Builds with Dockerfile.browser-worker
- Listens on port 18794 over Railway private networking
- Uses /healthz for Railway health checks
- Runs interactive Chromium with a dedicated persisted profile volume
- Keeps raw browser control surfaces private to the project network

## Resources

- [AgentOS source code and documentation](https://github.com/SapienXai/AgentOS)
- [Railway private networking](https://docs.railway.com/private-networking)
- [Railway volumes](https://docs.railway.com/volumes)

## Why Deploy AgentOS on Railway?

Railway provides a practical way to launch a complete AgentOS environment without manually configuring HTTPS, process supervision, persistent storage, secret wiring, or browser-worker networking.

You get:

- One-click deployment from the published template
- Managed HTTPS for the AgentOS control plane
- Persistent storage for AgentOS, OpenClaw, and browser profiles
- Private networking between AgentOS and the browser worker
- Automatic health checks and restart policies
- A secure, operator-friendly interface for running AI workers continuously

The result is a persistent, production-oriented home for your digital workforce: always available, observable, and ready to run real agent operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AgentOS | [SapienXai/AgentOS](https://github.com/SapienXai/AgentOS) | Web service |
| AgentOS-7mrk | [SapienXai/AgentOS](https://github.com/SapienXai/AgentOS) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | AgentOS | 3000 | Keeps Railway public networking and deployment healthchecks on the AgentOS listener port. |
| `AGENTOS_API_TOKEN` | AgentOS | (secret) | - |
| `OPENCLAW_GATEWAY_TOKEN` | AgentOS | (secret) | - |
| `AGENTOS_BROWSER_WORKER_TOKEN` | AgentOS | (secret) | - |
| `AGENTOS_INITIAL_ADMIN_PASSWORD` | AgentOS | (secret) | - |
| `AGENTOS_INITIAL_ADMIN_USERNAME` | AgentOS | (secret) | - |
| `PORT` | AgentOS-7mrk | 18794 | - |
| `AGENTOS_SERVICE_ROLE` | AgentOS-7mrk | browser-worker | - |
| `AGENTOS_BROWSER_WORKER_TOKEN` | AgentOS-7mrk | (secret) | - |
| `AGENTOS_BROWSER_DISABLE_CHROMIUM_SANDBOX` | AgentOS-7mrk | 1 | - |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS, Shell, PowerShell, HTML

[View on Railway →](https://railway.com/deploy/agentos-1)
