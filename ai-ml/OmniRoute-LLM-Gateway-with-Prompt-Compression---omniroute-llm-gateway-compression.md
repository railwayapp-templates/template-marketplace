# Deploy OmniRoute — LLM Gateway with Prompt Compression on Railway

Self-host OmniRoute — cut token costs, unify LLM providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute-llm-gateway-compression)

## About

OmniRoute is an open-source LLM gateway — one OpenAI-compatible endpoint in front of your API keys across many providers (OpenAI, Anthropic, Google, DeepSeek, Groq, Mistral, and more). Point any OpenAI-compatible tool at a single URL, and OmniRoute handles routing, automatic fallback, format translation, and transparent prompt compression that can cut token usage on every request. This template self-hosts it so your keys and traffic stay on infrastructure you own.

---

OmniRoute sits between your tools and your model providers as an OpenAI-compatible proxy, and there are a few things worth setting up correctly.

**Bring your own provider keys.** OmniRoute is a routing layer, not a model host — you add your own API keys for the providers you use, and requests are billed by those providers directly. It unifies them behind one endpoint so switching or combining providers happens in the dashboard, not in your application code. Point your OpenAI-compatible client at `https://your-domain/v1` with a key issued from the dashboard, and it works unchanged.

**Transparent compression can lower your token spend.** OmniRoute can compress prompts before they reach a provider, reducing the tokens billed on your own keys. It offers several modes from light to aggressive, and the savings vary widely by content — tool-heavy sessions compress far more than short prompts — so treat the range as "up to," not a fixed number, and benchmark against your own traffic. It's transparent to the client: no changes to your app.

**Persist the data volume, and encrypt it.** All state — provider config, routing, and history — lives in SQLite under `DATA_DIR` (`/app/data`). Mount the volume or a redeploy wipes your setup. Because that database holds provider credentials, set `STORAGE_ENCRYPTION_KEY` (`openssl rand -hex 32`) to encrypt it at rest, and back the key up — losing it means the encrypted database can't be read.

**Secure the dashboard.** The instance holds all your provider keys, so protect it. Set a strong dashboard credential and rely on Railway's automatic HTTPS; never leave it openly reachable.

One practical note: OmniRoute is a fast-moving project that ships frequently. Pin a specific image tag rather than `latest` and upgrade deliberately, so an update doesn't change behavior under you.

Typical cost: **~$5–10/month** on Railway for the single service, plus whatever you pay your providers directly. OmniRoute is MIT-licensed and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Omniroute | [INAPP-Mobile/railway-omniroute](https://github.com/INAPP-Mobile/railway-omniroute) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 20128 |
| `DATA_DIR` | /app/data |
| `JWT_SECRET` | (secret) |
| `API_KEY_SECRET` | (secret) |
| `INITIAL_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/omniroute-llm-gateway-compression)
