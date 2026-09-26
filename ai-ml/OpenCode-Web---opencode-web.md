# Deploy OpenCode Web on Railway

OpenCode's web UI with a password, your projects and logins on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-web)

## About

[OpenCode](https://github.com/anomalyco/opencode) is an open-source (MIT) AI coding agent that works with most model providers. This template runs its built-in web UI, `opencode web`, protected by OpenCode's own password setting. Everything OpenCode stores, including your projects and provider logins, lives in a home directory on a Railway volume.

I made it because the eight OpenCode templates on Railway all have health scores between 0 and 89 out of 100. This one uses OpenCode's own server and login instead of a custom wrapper, and pins the version so a deploy today and a deploy next month behave the same.

When the deploy finishes, open `OPENCODE_URL` from the Variables tab and log in as `opencode` with `OPENCODE_SERVER_PASSWORD`. Add a model provider either by setting `OPENROUTER_API_KEY`, `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` on the service, or by connecting one from the web UI. Clone your repositories into `~/projects`, which is where OpenCode starts.

Before publishing I tested it through the same HTTP API the web UI uses. Without the password both the UI and the API return 401. With an OpenRouter key set, a new session on `openai/gpt-4o-mini` answered with exactly the text I asked for in 2.9 seconds, using about 6,900 tokens for that one short message. After a restart the session was still there. Once started, the service settled at 245 MB of RAM, about $2.50 a month.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /opencode) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4096 | Port of the OpenCode web UI |
| `OPENCODE_URL` | - | Open this and log in with the username and password above |
| `GIT_USER_NAME` | - | Optional: name for commits the agent makes |
| `GIT_USER_EMAIL` | - | Optional: email for commits the agent makes |
| `OPENAI_API_KEY` | (secret) | Optional: OpenAI API key |
| `OPENCODE_VERSION` | 1.18.32 | OpenCode version, used at build time. Change it and redeploy to upgrade |
| `ANTHROPIC_API_KEY` | (secret) | Optional: Anthropic API key |
| `OPENROUTER_API_KEY` | (secret) | Optional: OpenRouter key. Or connect providers from the web UI |
| `OPENCODE_SERVER_PASSWORD` | (secret) | Login password (generated) |
| `OPENCODE_SERVER_USERNAME` | (secret) | Login username |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/dev`

**Category:** AI/ML · **Tags:** opencode, coding-agent, ai, web-ui · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/opencode-web)
