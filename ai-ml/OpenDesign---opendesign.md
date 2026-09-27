# Deploy OpenDesign on Railway

Open-source Claude Design alternative, with Claude Code, Codex and OpenCode

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opendesign)

## About

[OpenDesign](https://github.com/nexu-io/open-design) (Apache-2.0) is an open-source alternative to Claude Design: you describe a prototype, landing page, slide deck, document or image, a coding agent builds it as real files, and the studio previews them and exports HTML, PDF or PPTX.

This template runs upstream's Docker image with the agent CLIs added. Upstream leaves Claude Code, Codex and OpenCode out of its image on purpose and suggests a separate layer for servers that need them. Without them only the plain-API mode works, where the model returns one artifact block; with them the agent writes project files itself. This template is that layer, plus libc6-compat, which is what upstream's own Dockerfile.local adds so those CLIs run on Alpine.

When the deploy finishes, open `OPEN_DESIGN_URL` from the Variables tab. The browser asks for a login: the username is `open-design` and the password is `OD_API_TOKEN`. That's upstream's own authentication, and API clients can send the same token as `Authorization: Bearer`.

To give the agents a model, set a key on the service: `ANTHROPIC_API_KEY` for Claude Code, `OPENAI_API_KEY` for Codex or `OPENROUTER_API_KEY` for OpenCode with OpenRouter models. You can also paste a key in the studio's BYOK settings, which uses the plain-API mode.

Before publishing I tested it end to end. The studio and API return 401 without the token and `/api/health` answers without it, for Railway's healthcheck. The service found Claude Code 2.1.283, Codex 0.157.1 and OpenCode. A call through the BYOK proxy to OpenRouter streamed its answer back. Then I asked OpenCode, on an OpenRouter model, for a landing page for a bakery: 10 seconds later the project had a 1.6 KB HTML file, registered as an artifact with HTML, PDF and ZIP export. After a restart the project was still there. I didn't run Claude Code or Codex with real keys, only confirmed they're installed and detected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-design | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /open-design) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOME` | /data/home | Home of the agent CLIs, so their logins and settings survive redeploys |
| `PORT` | 7456 | Port of the web studio and API |
| `OD_PORT` | 7456 | Daemon port |
| `NODE_ENV` | production | Node environment |
| `OD_DATA_DIR` | /data/od | Projects, design systems and settings (on the volume) |
| `NODE_OPTIONS` | --max-old-space-size=512 | Node heap cap (upstream uses 192 MB; exports need more) |
| `OD_API_TOKEN` | (secret) | Password for the studio (user: open-design) and Bearer token for the API (generated) |
| `OD_BIND_HOST` | 0.0.0.0 | Listen on all interfaces so Railway can route to it |
| `OPENAI_API_KEY` | (secret) | Optional: for the Codex runtime |
| `OPEN_DESIGN_URL` | - | Open this and sign in as open-design with OD_API_TOKEN as the password |
| `ANTHROPIC_API_KEY` | (secret) | Optional: for the Claude Code runtime |
| `OD_ALLOWED_ORIGINS` | - | Browser origins allowed to call the API; add your custom domain here |
| `OPENROUTER_API_KEY` | (secret) | Optional: for OpenCode with OpenRouter models |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Tags:** open-design, design, ai-agents, claude-code, codex, opencode · **Languages:** JavaScript, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/opendesign)
