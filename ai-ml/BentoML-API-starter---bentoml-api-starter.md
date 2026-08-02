# Deploy BentoML API starter on Railway

CPU-safe BentoML starter with typed inference and batch APIs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bentoml-api-starter)

## About

Deploy a source-backed BentoML inference service with a tiny CPU-safe example model, typed single and batch APIs, built-in readiness checks, and an interactive API explorer.

BentoML is an Apache-2.0 framework for turning Python inference code into online API services. This starter pins BentoML 1.4.39 and its complete dependency graph while keeping the example model small enough to build and run without a GPU or external model download.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| BentoML API | [tech-progress/railway-template-bentoml](https://github.com/tech-progress/railway-template-bentoml) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Railway HTTP routing port used by the BentoML server. |
| `BENTOML_DO_NOT_TRACK` | True | Disables BentoML's anonymous framework usage telemetry. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Shell, Python, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/bentoml-api-starter)
