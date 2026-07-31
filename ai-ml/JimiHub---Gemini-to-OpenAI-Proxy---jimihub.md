# Deploy JimiHub - Gemini to OpenAI Proxy on Railway

Centralized Gemini API proxy, key management, and quota tracker.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jimihub)

## About

JimiHub is an open-source proxy service designed to seamlessly convert OpenAI Chat Completions API requests into Google Gemini API requests. It features multi-API key rotation, request load balancing, global model quota management, and a built-in administrative Web UI for monitoring usage and managing worker credentials across distributed applications.

Hosting JimiHub on Railway provides a zero-maintenance containerized deployment for your API proxy infrastructure. Railway runs the prebuilt Docker container (`dreamhartley705/jimihub:latest`) on its high-availability infrastructure, automatically managing public HTTPS networking, SSL certificates, and internal traffic routing to the application's default container port (`3000`).

To maintain persistent application state across container deployments—such as user session databases, worker keys, and key rotation settings—JimiHub relies on local filesystem storage mounted at `/app/data`. Railway handles this seamlessly via persistent volumes, ensuring continuous uptime without data loss during application restarts or redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dreamhartley705/jimihub:latest | `dreamhartley705/jimihub:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Internal port on which the web container listens (Railway routes public traffic here automatically) |
| `ADMIN_PASSWORD` | (secret) | Administrator password used to authenticate and log in to the JimiHub admin panel |
| `GITHUB_PROJECT` | - | OPTIONAL: GitHub repository in "username/repo-name" format to enable remote config syncing |
| `GEMINI_BASE_URL` | https://generativelanguage.googleapis.com | Upstream Google Gemini API base URL used for polling requests |
| `GITHUB_ENCRYPT_KEY` | - | OPTIONAL: A secret 32-character string used to encrypt sync data saved to your GitHub repo |
| `GITHUB_PROJECT_PAT` | - | OPTIONAL: GitHub Personal Access Token (PAT) with 'repo' scope permissions for syncing |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/jimihub)
