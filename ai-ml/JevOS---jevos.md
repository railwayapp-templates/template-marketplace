# Deploy JevOS on Railway

Offline customer-support triage classifier (local Jev model server)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jevos)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/jevos)

**JevOS** is an open-source, CPU-only alternative to [TypeSafe Jev](https://typesafe.com/jev) for yes/no decisions — ship it and your application can ask a small model, entirely offline, "is this X?" and get back `P(yes)` in tens of milliseconds. It runs [jevos-v3](https://github.com/feder-cr/jev) (MiniCPM5-1B cut to 17 layers with a single-logit head, INT8 OpenVINO weights) on the CPU in a single binary — no Python, no GPU, no database, no companion service.

- API: **`POST /v1/systemone`** with `{model?, state, questions}` — TypeSafe's wire format, so existing Jev clients work unchanged
- **`GET /health`** — liveness + model fingerprint, unauthenticated (Railway's healthcheck target)
- Optional lock-down: set **`JEV_API_KEY`** and every endpoint except `/health` requires the `Authorization: Bearer *** header

Single service, Dockerfile build. The heavy lifting (the ~630 MB int8 model) is downloaded and SHA-256-verified at build time into a `debian:trixie-slim` runtime:

1. **Pinned release** — the binary *and* the model come from the same tagged `jevos-v3` release, so the serving code and the weights are from one build. Integrity is checked against the release's `SHA256SUMS.txt` before the model is copied in.
2. **Non-root runtime** — the container runs as uid 1000. Nothing is volume-mounted, so there is nothing root-owned for the Railway volume trap to collide with.
3. **Port injected correctly** — the entrypoint reads `PORT` (Railway's value) and binds `0.0.0.0:$PORT`, so the public domain routes to the app.
4. **In-image healthcheck** — `curl` probes `/health` on `$PORT` with a short boot window, matching the `railway.json` healthcheck.
5. **Optional lock-down** — set `JEV_API_KEY` to require a Bearer token; leave it blank for an open instance (the default).

No volume is created: the service is fully stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jevos | [mc9max/jevos](https://github.com/mc9max/jevos) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JEV_API_KEY` | (secret) | Optional access key. Blank = open public instance (the default). When set, every endpoint except GET /health requires 'Authorization: Bearer <JEV_API_KEY>' (header, or append ?apiKey=<value> to the URL). No key is needed to run — the model is self-contained and free. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/jevos)
