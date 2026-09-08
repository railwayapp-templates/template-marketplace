# Deploy Leon on Railway

Alexa Alternative: Personal assistant that runs on your own server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/leon)

## About

Leon is an open-source personal assistant that runs on your own server. You type (or speak) to it, and it works out what you meant and runs a skill: adding items to a to-do list, telling you the weather, checking whether a site is down, or calling any skill you write yourself. Classification happens locally with an intent model and a spaCy named-entity pipeline, so nothing about your request reaches a third party. Developers who want an assistant they can extend — and people who do not want Alexa or Google Assistant in the room — self-host Leon for exactly that reason.

Self-host Leon on Railway with one service, `leon`. That container runs three processes: Leon's Node.js server, the Python NLP server that loads the spaCy model, and a Caddy gateway that owns the public port. Leon has no login screen of its own, so the gateway sits in front with HTTP basic auth on every route and passes authenticated traffic to Leon on loopback — you pick a password at deploy time and nothing else is exposed. A volume at `/data` holds what Leon accumulates: every skill's small JSON database, plus anything a skill downloads.

![Leon running as a single Railway service with a volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788802762/leon-architecture.png)

Leon started in 2017 as an answer to one question: why does a personal assistant have to run in someone else's data centre? It is MIT-licensed, written in TypeScript with a Python bridge, and built so adding a capability means adding a skill folder rather than patching the core. A skill declares the phrasings it answers to, the entities to pull from a sentence, and the code that runs.

Key features:

- Local intent classification, so an utterance never leaves your server
- spaCy named-entity recognition, which is how "add oat milk to the groceries list" splits into an item and a list
- A skill catalogue covering to-do lists, weather, news, games, and utilities
- Skills written in Node.js or Python, both with a first-class bridge
- An HTTP API (`POST /api/query`) so other software can put an utterance to Leon
- English and French out of the box

The deployment keeps upstream's single-container shape. Inside `leon`, the Node.js server serves the web app and the API; the Python TCP server holds the spaCy model in memory and answers entity-extraction requests over loopback; and Caddy terminates the public port, checks basic auth, and proxies through.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| leon | [gridalpha/leon-railway](https://github.com/gridalpha/leon-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Gateway listening port |
| `LEON_STT` | false | Speech-to-text, needs extra models |
| `LEON_TTS` | false | Text-to-speech, needs extra models |
| `LEON_LANG` | en-US | en-US or fr-FR, picks the spaCy model |
| `NODE_OPTIONS` | --max-old-space-size=1536 | Cap Node's heap below the host's RAM |
| `LEON_OVER_HTTP` | true | Enable the HTTP query endpoint |
| `LEON_TELEMETRY` | false | Disable upstream usage reporting |
| `LEON_TIME_ZONE` | Etc/UTC | IANA time zone name |
| `LEON_AFTER_SPEECH` | false | Re-open the mic after a reply |
| `LEON_HTTP_API_KEY` | (secret) | X-API-Key for POST /api/query |
| `LEON_HTTP_API_LANG` | en-US | Language used by the HTTP API |
| `LEON_INTERNAL_PORT` | 1337 | Leon's own loopback port |
| `LEON_BASIC_AUTH_USER` | (secret) | Gateway username |
| `LEON_BASIC_AUTH_PASSWORD` | (secret) | Gateway password, required |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/leon)
