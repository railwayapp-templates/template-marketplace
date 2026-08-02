# Deploy 9router [Updated Aug '26] on Railway

9Router [Aug '26] (Self-Hosted AI Gateway & LLM Router) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-1)

## About

9Router is the open-source AI gateway that puts every LLM provider behind one endpoint. Point Claude Code, Cursor, Codex, or any OpenAI-compatible tool at it, and it routes requests across 40+ providers with automatic fallback and built-in token compression, without touching client config every time you switch models.

OpenRouter charges a 5.5% markup on every token you route through it, on top of whatever the underlying provider already bills. On a team spending $2,000/month on API calls, that's $110 a month handed over just for routing. Portkey's managed gateway starts at $49/month before any API costs at all. 9Router self-hosted on Railway costs a flat infrastructure fee, no markup, no per-seat charge, so the more you route through it, the more you save compared to OpenRouter specifically.

The bigger reason to self-host this particular category of tool isn't price alone. A gateway sees every request you send to every AI provider: your prompts, your code, your API keys for each provider. Routing that through someone else's proxy means trusting their logging practices and their breach history with everything your coding tools send. Self-hosting keeps that traffic on infrastructure you control, end to end.

It's also worth being specific about what 9Router actually saves beyond the markup. Its built-in RTK Token Saver compresses git diffs, grep output, and file trees losslessly before they ever reach the LLM, cutting input token consumption 20-40% on every request. That's real money back on top of skipping OpenRouter's fee, not a separate feature you have to configure.

And it's not a small or unproven project. 9Router has crossed 23,000 GitHub stars, which puts it well ahead of most self-hosted AI infrastructure tools in this category. That kind of adoption matters for a gateway specifically, since it's the single piece of infrastructure every one of your AI coding requests passes through, and a large, active community means bugs and provider-compatibility issues get caught and fixed fast.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router-railway | [shruti060701/9router-railway](https://github.com/shruti060701/9router-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | Port Railway routes external traffic to. Must be an explicit Railway variable, not just a Dockerfile `ENV` default — this project has confirmed the hard way (Metabase, Postiz, Vaultwarden) that a Dockerfile-only default alone doesn't reliably get picked up by Railway's edge routing. |
| `BASE_URL` | - | Public URL of the instance, used for internal callback/sync jobs. Optional per the app's own `.env.example`, but setting it avoids any sync-related edge cases. |
| `DATA_DIR` | /app/data | Directory where the SQLite database and settings are stored. Must match the Railway volume mount path exactly. |
| `HOSTNAME` | 0.0.0.0 | Binds the Next.js standalone server to all network interfaces. Already set as a Dockerfile default too, but set explicitly here for the same reason as `PORT`. |
| `JWT_SECRET` | (secret) | Signs dashboard session tokens. If unset, the app auto-generates one and writes it to a file in `DATA_DIR` — but setting it explicitly as a Railway variable avoids any risk of session invalidation if that file location ever changes across a redeploy. |
| `API_KEY_SECRET` | (secret) | Secret used internally to derive and validate issued 9Router API keys. |
| `MACHINE_ID_SALT` | - | Salt used for internal instance identification. |
| `INITIAL_PASSWORD` | (secret) | Bootstrap login password. **Critical: confirmed via source code that if this is ever unset, 9Router falls back to a hardcoded password (`123456`)** — never mark this optional or leave it blank. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/9router-1)
