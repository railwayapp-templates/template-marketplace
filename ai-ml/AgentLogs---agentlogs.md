# Deploy AgentLogs on Railway

Collaboration in the age of agentic engineering.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agentlogs)

## About

**AgentLogs** is an open-source observability platform that captures and analyzes transcripts from AI coding agents (Claude Code, Codex, OpenCode, Pi) to give teams visibility into AI-assisted development. It tracks sessions, links conversations to Git commits, and enables shared learning across engineering teams.

Hosting AgentLogs involves deploying a web server that collects, analyzes, and stores AI agent transcripts while providing a dashboard for team visibility. The application requires a GitHub OAuth App for authentication via BetterAuth, environment variables for OAuth credentials, and persistent volume storage for SQLite data and session blobs. AgentLogs auto-syncs transcripts from various AI agents and provides team observability metrics, Git integration linking sessions to specific commits, and a session browser for discovering effective prompts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AgentLogs | `ghcr.io/agentlogs/agentlogs` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port exposed by AgentLogs. |
| `WEB_URL` | - | Public web URL |
| `GITHUB_CLIENT_ID` | - | GitHub Client ID. |
| `BETTER_AUTH_SECRET` | (secret) | Generated secret for Better Auth. |
| `GITHUB_CLIENT_SECRET` | (secret) | GitHub Client Secret. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/agentlogs)
