# Deploy Go worker on Railway

Go worker (non-API) with .env config and structured Zap logging

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/go)

## About

Deploy statically compiled Go binaries on Railway using Nixpacks. Railway auto-detects your Go project via go.mod, builds it in a clean container, and runs it without needing a Dockerfile. Works for servers, workers, and one-shot scripts.

Railway uses Nixpacks to build your Go project automatically — no Dockerfile needed. Just include a go.mod file and a main() function. For HTTP services, Railway exposes the $PORT env var. For one-off scripts, set restartPolicyType = "never" in railway.toml.

Custom build or binary name? Add a nixpacks.toml to override build/start commands.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| go | [railtools/go](https://github.com/railtools/go) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | debug | debug|info|warn|error |
| `ENVIRONMENT` | production | Changing the environment changes how we log |

**Category:** Starters · **Languages:** Go

[View on Railway →](https://railway.com/deploy/go)
