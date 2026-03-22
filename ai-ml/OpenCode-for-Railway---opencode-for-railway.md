# Deploy OpenCode for Railway on Railway

Pre-configured OpenCode server template for Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-for-railway)

## About

OpenCode for Railway is a pre-configured OpenCode server with built-in skills for Railway
  deployment, browser automation, and tool management via mise. Connect from your local terminal
  with `opencode attach` and get a remote AI coding agent with persistent storage.

```bash
opencode attach https://your-app.railway.app -p your-password
```

  ## About Hosting OpenCode for Railway

  Hosting OpenCode for Railway gives you a remote AI coding agent accessible from anywhere. The
  server comes pre-loaded with Node.js, Python, Bun, Go, and common developer tools managed by
  mise. Pre-installed skills let the agent deploy to Railway, browse the web, and discover new
  capabilities. A persistent volume preserves all sessions, installed tools, and project files
  across redeploys. Authentication is handled via a server password, and you connect using the
  OpenCode TUI from your local machine.

  ## Common Use Cases

  - Run a remote AI coding agent you can connect to from any machine
  - Build and deploy applications to Railway using natural language
  - Automate browser-based tasks like testing, scraping, and form filling

  ## Dependencies for OpenCode for Railway Hosting

  - An LLM provider API key (configured via OpenCode after connecting)
  - OpenCode CLI installed locally (`curl -fsSL https://opencode.ai/install | bash`)

  ### Deployment Dependencies

  - [OpenCode Documentation](https://opencode.ai/docs/)
  - [OpenCode Server Docs](https://opencode.ai/docs/server/)
  - [mise Tool Manager](https://mise.jdx.dev/)
  - [Railway Skills](https://skills.sh/railwayapp/railway-skills/use-railway)

  ## Why Deploy OpenCode for Railway on Railway?

  Railway is a singular platform to deploy your infrastructure stack. Railway will host your
  infrastructure so you don't have to deal with configuration, while allowing you to vertically and
   horizontally scale it.

  By deploying OpenCode for Railway on Railway, you are one step closer to supporting a complete
  full-stack application with minimal burden. Host your servers, databases, AI agents, and more on
  Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-opencode:latest | `ghcr.io/joeychilson/railway-opencode:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GITHUB_TOKEN` | (secret) |
| `OPENCODE_SERVER_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/opencode`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/opencode-for-railway)
