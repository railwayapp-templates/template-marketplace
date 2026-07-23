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
| OpenHands | [praveen-ks-2001/openhands-railway](https://github.com/praveen-ks-2001/openhands-railway) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `RUNTIME` | local | Runtime mode |
| `LLM_MODEL` | - | Optional: pre-fill default model name (e.g. claude-sonnet-4-6) |
| `FILE_STORE` | local | - |
| `LLM_API_KEY` | (secret) | Optional: pre-fill LLM provider API key |
| `LLM_BASE_URL` | - | Optional: pre-fill custom LLM endpoint URL |
| `INTERNAL_PORT` | 3001 | - |
| `ENABLE_BROWSER` | false | - |
| `SERVE_FRONTEND` | true | - |
| `BASIC_AUTH_USER` | (secret) | - |
| `FILE_STORE_PATH` | /.openhands | - |
| `SANDBOX_USER_ID` | 0 | - |
| `PYTHONUNBUFFERED` | 1 | - |
| `RUN_AS_OPENHANDS` | false | - |
| `BASIC_AUTH_PASSWORD` | (secret) | - |
| `SKIP_DEPENDENCY_CHECK` | 1 | - |

## Configuration

- **Volume:** `/.openhands`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openhands-coding-agent)
