# Deploy Agents - Self Host on Railway

Multi agents,Tasks,MCPS,RAG powered by OpenClaw.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentaxis)

## About

AgentAxis is an open-source AI workforce operating platform that enables you to build, manage, and supervise teams of AI agents through a unified web interface. Create digital workers, organize workspaces, assign tasks, connect AI models, monitor execution, and maintain complete control over autonomous workflows—all from a single dashboard.

Deploying AgentAxis on Railway provides a production-ready environment for running AI workforces without managing infrastructure. Railway automatically builds the application from the repository, provisions persistent storage, enables HTTPS, and simplifies updates through automated deployments.

AgentAxis runs alongside the OpenClaw Gateway, which powers digital worker execution. Runtime data, authentication, workspace state, and application configuration are stored on a persistent Railway Volume, ensuring deployments and service restarts do not interrupt your AI operations. During the first deployment, an administrator account is securely created using the configured initial password. Once deployed, you can connect your preferred AI model provider, create workspaces, launch digital workers, monitor execution, and manage autonomous tasks from a centralized dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AgentAxis | [arloodots/AgentAxis](https://github.com/arloodots/AgentAxis) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AGENTOS_API_TOKEN` | (secret) | - |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | - |
| `AGENTOS_INITIAL_ADMIN_PASSWORD` | (secret) | Min 8 Characters. i.e Zizu786$ |
| `AGENTOS_INITIAL_ADMIN_USERNAME` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** TypeScript, JavaScript, CSS, PowerShell, Shell

[View on Railway →](https://railway.com/deploy/agentaxis)
