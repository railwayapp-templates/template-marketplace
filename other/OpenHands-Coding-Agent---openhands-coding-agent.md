# Deploy OpenHands Coding Agent on Railway

Self-hosted autonomous AI engineer. Open-source, model-agnostic, free

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhands-coding-agent)

## About

![OpenHands](https://opengraph.githubassets.com/4a3fa291732195ae8467266dd5a49902a29d66a2efa92dcdd854c9c7a7e035f3/OpenHands/OpenHands)

**Self-host the open-source alternative to Devin — no $500/month subscription, no vendor lock-in,
no per-seat fees.**

OpenHands is the leading open-source autonomous AI software engineer with **70k+ GitHub stars**,
$18.8M in funding, and an MIT license. It writes code, runs terminal commands, browses the web,
and opens pull requests — all inside a sandboxed environment — using whatever LLM you bring.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenHands | [sahilrupani/OpenHands](https://github.com/sahilrupani/OpenHands) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RUNTIME` | local | Runtime mode |
| `WEB_HOST` | - | Public host URL |
| `OH_WEB_URL` | - | Public web URL |
| `OH_SECRET_KEY` | (secret) | App secret key |
| `OH_ENABLE_BROWSER` | false | Disable browser |
| `OH_PERSISTENCE_DIR` | /.openhands | Persistent data dir |
| `OPENHANDS_BASIC_AUTH_USER` | (secret) | auth admin |
| `OPENHANDS_BASIC_AUTH_PASSWORD` | (secret) | auth password |

## Configuration

- **Volume:** `/.openhands`

**Category:** Other · **Languages:** Python, TypeScript, Go Template, Jinja, Makefile, CSS, JavaScript, Shell, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/openhands-coding-agent)
