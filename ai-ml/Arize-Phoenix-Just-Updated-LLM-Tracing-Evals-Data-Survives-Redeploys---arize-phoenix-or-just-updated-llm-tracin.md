# Deploy Arize Phoenix | (Just Updated) LLM Tracing & Evals, Data Survives Redeploys on Railway

LLM tracing and evals, traces kept on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arize-phoenix-or-just-updated-llm-tracin)

## About

Arize Phoenix is an open-source AI observability platform for LLM applications. It collects OpenTelemetry traces from
your app, shows every prompt, retrieval and tool call in a trace view, and runs evaluations, datasets and experiments
so you can compare prompt and model changes.

This template runs Phoenix 20.21.1 as a single service from a digest-pinned official image, with the web UI and the
OTLP/HTTP collector on one HTTPS domain and the working directory on a Railway volume.

Phoenix needs a few things handled before it keeps your data on Railway:

- **Data survives redeploys.** Traces, datasets and experiments are stored in a SQLite database under
  `/root/.phoenix`. The template mounts a Railway volume there, so redeploying does not wipe your history.
- **One URL for the UI and the collector.** Port 6006 serves the web UI and the OTLP/HTTP endpoint
  (`/v1/traces`), so you point your instrumented app at the same domain you open in the browser.
- **Pinned image.** The official image is pinned by digest, so a redeploy does not silently pull a different build.
- **Authentication is off by default**, as in upstream. Anyone with the URL can view and write traces. Add
  `PHOENIX_ENABLE_AUTH=true` and `PHOENIX_SECRET` (a long random string) in the service variables to turn on logins
  before sending real data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| phoenix | `arizephoenix/phoenix:20.21.1@sha256:4a58a611389459514a936960d306776b976ed66c96649cef834bbc683ae5b4ab` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root/.phoenix`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/arize-phoenix-or-just-updated-llm-tracin)
