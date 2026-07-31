# Deploy 9Router | Self-Hosted AI Gateway, Nothing to Configure on Railway

Self-hosted AI gateway. 40+ providers, one endpoint, nothing to configure.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-or-self-hosted-ai-gateway-nothin)

## About

9Router is an open-source (MIT) self-hosted AI gateway and LLM router. It exposes a single OpenAI-compatible endpoint and routes each request across 40+ providers — OpenAI, Anthropic, Google, DeepSeek, Qwen, OpenRouter and more — by price, quota and availability, with automatic fallback when a provider hits its limit. A web dashboard manages providers, API keys, routing rules and usage, and it works as a drop-in base URL for Claude Code, Codex, Cursor, Gemini CLI and anything else that speaks the OpenAI API.

It is bring-your-own-key: it runs on your infrastructure with your own provider accounts and takes no markup.

This template deploys it as a single pinned service on a persistent volume, and the deploy form has **nothing you have to fill in**.

9Router is one container, so the interesting part of hosting it is not the topology — it is that the container holds your provider credentials and answers on a public URL. Three things this template does differently from the other 9Router listings:

- **The dashboard password is generated, not left blank.** Upstream reads `process.env.INITIAL_PASSWORD || "123456"` in its login route, and an empty string is falsy in JavaScript — so a deploy that leaves that variable empty is reachable at its public Railway URL with the password `123456`, guarding a dashboard that stores your OpenAI and Anthropic keys. Listings that publish `INITIAL_PASSWORD` as an empty required field put exactly one typo between the deployer and that outcome. Here it arrives as a generated 24-character secret, so the fallback is unreachable: on the reference deploy, `123456` returns `401 Invalid password` while the generated value logs in cleanly. Read it in Railway's variables panel, and change it in the dashboard whenever you like.
- **The image is version-pinned.** This template runs `decolua/9router:0.5.45`, never `latest`. 9Router ships often — nine releases in the last six weeks — and on Railway an unrelated restart months from now will happily pull a newer build of a service that is proxying your production traffic and holding your billing-relevant provider quotas. Upgrading here is an explicit change of tag.
- **It keeps the image's own entrypoint, so it does not run as root.** The upstream image chowns its data directory and then drops to an unprivileged `node` user before starting. A Railway start command *replaces* an image's entrypoint instead of adding to it, so any listing that sets one silently loses both that privilege drop and the `chown` that makes a Railway volume writable in the first place. This template sets no start command.

Sizing: it is a Node/Next.js service with a SQLite database — a few hundred MB of RAM. Comfortable on the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router | `decolua/9router:0.5.45` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JWT_SECRET` | (secret) |
| `API_KEY_SECRET` | (secret) |
| `INITIAL_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-or-self-hosted-ai-gateway-nothin)
