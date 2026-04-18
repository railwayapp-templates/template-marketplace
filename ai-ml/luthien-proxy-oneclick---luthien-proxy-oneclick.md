# Deploy luthien-proxy-oneclick on Railway

Deploy and Host luthien-proxy-oneclick with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/luthien-proxy-oneclick)

## About

Luthien Proxy is an AI control gateway for Claude Code. It sits between Claude Code and the Anthropic API, logging all conversations and optionally applying
  safety policies (secret redaction, content review) via configurable plain-English rules. Deploys with OAuth passthrough — no API keys required.

  ## About Hosting luthien-proxy-oneclick

  Luthien Proxy deploys as a single service on Railway with zero configuration. The gateway auto-detects Railway at startup and configures sensible defaults: OAuth
   passthrough authentication (users bring their own Claude subscription), SQLite for storage, and a default policy that logs all conversations and applies basic
  safety rules. After deploying, generate a domain in the Railway dashboard and set `ANTHROPIC_BASE_URL` in Claude Code to point at your proxy. The activity
  monitor at `/activity` provides a live feed of all proxied conversations, and the `/diffs` page shows before/after comparisons when policies modify responses.

  ## Common Use Cases

  - **AI safety monitoring**: Log and review all Claude Code conversations passing through the proxy, with a real-time activity feed and conversation diff viewer
  - **Content policy enforcement**: Apply plain-English safety rules (redact secrets, block harmful content, enforce professional tone) via a judge LLM that
  reviews every response
  - **Organizational oversight**: Deploy a shared proxy endpoint for a team to route Claude Code traffic through, providing centralized visibility into AI
  assistant usage

  ## Dependencies for luthien-proxy-oneclick Hosting

  - **Python 3.13**: Runtime for the FastAPI gateway
  - **Docker**: Railway builds from the included Dockerfile

  ### Links

  - [Luthien Proxy on GitHub](https://github.com/LuthienResearch/luthien-proxy)
  - [Luthien](https://luthien.cc)

### Deployment Dependencies

None

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| luthien-proxy | [LuthienResearch/luthien-proxy](https://github.com/LuthienResearch/luthien-proxy) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ADMIN_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, HTML, JavaScript, Shell, TypeScript, Mermaid, Dockerfile, CSS

[View on Railway →](https://railway.com/deploy/luthien-proxy-oneclick)
