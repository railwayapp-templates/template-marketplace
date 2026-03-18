# Deploy Bifrost AI Gateway on Railway

Go from zero to production-ready AI gateway in under a minute.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bifrost-ai-gateway)

## About

Fastest enterprise AI gateway (50x faster than LiteLLM) with adaptive load balancer, cluster mode, guardrails, 1000+ models support &amp; &lt;100 µs overhead at 5k RPS.

Hosting Bifrost involves running the gateway service as a containerised application and exposing its API and web dashboard. The gateway acts as an intermediary between applications and AI model providers, managing credentials, routing rules, and provider configuration. A persistent application data directory is required so configuration and runtime state survive restarts and deployments. After deployment, administrators access the dashboard to configure model providers, routing logic, and observability settings. An important post-installation step is enabling authentication for the dashboard by setting a username and password in the security settings, ensuring administrative access is protected before the gateway is used in production.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bifrost docker image | `maximhq/bifrost` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Default Port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/bifrost-ai-gateway)
