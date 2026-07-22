# Deploy AgentOS on Railway

Deploy and run your AI workforce with AgentOS, powered by OpenClaw.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentos-1)

## About

# Deploy AgentOS on Railway

## Build Your AI Workforce. Run It Like a Company.

AgentOS is an operating system for creating, organizing, and running digital workers.

Create dedicated workspaces, give agents roles and context, connect models and tools, assign real work, monitor operations, and control how autonomously your AI workforce can act—all from one secure interface.

Under the hood, AgentOS uses OpenClaw as its agent runtime. OpenClaw handles execution, sessions, browser automation, and runtime state, while AgentOS provides the higher-level company structure, operational visibility, and human control needed to manage multiple agents effectively.

## What This Railway Template Deploys

This template deploys a complete, persistent AgentOS environment as a single Railway service.

It includes:

* AgentOS web application
* A pinned OpenClaw Gateway runtime
* Persistent agent workspaces and runtime state
* Secure administrator access
* Chromium for browser-capable agents
* Managed HTTPS and health monitoring
* Automatically generated internal secrets

AgentOS is exposed through Railway HTTPS, while the OpenClaw Gateway remains private inside the container and is accessible only through the AgentOS service.

A persistent volume mounted at `/data` stores:

* AgentOS workspaces
* OpenClaw configuration
* Agent sessions and runtime state
* Credentials and connected accounts
* Instance protection settings
* Logs and operational data

During deployment, you only need to choose an initial administrator password. Internal AgentOS and OpenClaw tokens are generated automatically.

After signing in for the first time, open the AgentOS Setup Center to connect your preferred AI model provider and begin creating digital workers.

## What You Can Build

Use AgentOS to:

* Create specialized digital workers with different roles and responsibilities
* Organize agents into persistent workspaces
* Assign tasks and monitor ongoing operations
* Run long-lived and recurring AI workflows
* Manage models, tools, accounts, context, memory, and policies
* Review agent activity, sessions, outputs, and runtime status
* Run browser automation through the included Chromium installation
* Access your AI workforce securely from desktop, tablet, or mobile
* Operate one protected AgentOS instance across multiple trusted devices

AgentOS is designed for people who want to move beyond isolated prompts and individual agents—and start building coordinated AI teams that can perform real work continuously.

## Hosting Requirements

You need:

* A Railway account with persistent volume support
* Credentials for at least one supported AI model provider

Model providers are connected after deployment through the AgentOS Setup Center.

## Deployment Resources

* [AgentOS source code and documentation](https://github.com/SapienXai/AgentOS)
* [Railway volume documentation](https://docs.railway.com/volumes)

## Technical Implementation

The Railway service:

* Builds using `Dockerfile.railway`
* Exposes AgentOS on port `3000`
* Uses `/api/health` for health checks
* Mounts a persistent volume at `/data`
* Includes Chromium for browser automation
* Runs OpenClaw Gateway on `127.0.0.1:18789`
* Starts OpenClaw before launching AgentOS
* Pins OpenClaw to version `2026.6.11`

The OpenClaw Gateway is never exposed publicly. AgentOS communicates with it over the container loopback interface.

This deployment should run with **one replica** because the OpenClaw runtime and persistent volume contain writable state. Multiple replicas could create conflicting sessions or state changes.

## Why Deploy AgentOS on Railway?

Railway provides a simple way to launch a complete AgentOS environment without manually configuring servers, reverse proxies, certificates, runtime processes, or persistent storage.

You get:

* One-click deployment
* Managed HTTPS
* Persistent storage
* Automatic health checks
* Generated internal secrets
* A private OpenClaw runtime
* A secure, mobile-friendly AgentOS interface

The result is a persistent home for your digital workforce: always available, securely hosted, and ready to run AI agents like a company.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AgentOS | [SapienXai/AgentOS](https://github.com/SapienXai/AgentOS) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Keeps Railway public networking and deployment healthchecks on the AgentOS listener port. |
| `AGENTOS_API_TOKEN` | (secret) | - |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | - |
| `AGENTOS_INITIAL_ADMIN_PASSWORD` | (secret) | - |
| `AGENTOS_INITIAL_ADMIN_USERNAME` | (secret) | - |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS, PowerShell, Shell

[View on Railway →](https://railway.com/deploy/agentos-1)
