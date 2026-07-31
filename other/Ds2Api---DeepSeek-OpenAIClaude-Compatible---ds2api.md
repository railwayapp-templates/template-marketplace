# Deploy Ds2Api - DeepSeek ,OpenAI,Claude Compatible on Railway

DeepSeek compatible Go middleware converts web protocols  high concurrency

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ds2api)

## About

Ds2Api is a high-concurrency middleware interface that converts DeepSeek web dialogue capabilities into standard OpenAI, Claude, and Gemini compatible APIs. Written in Go, it features a built-in React management console, multi-account polling, concurrent queue control, and advanced tool calling adaptation for seamless integration with existing AI workflows.

Hosting Ds2Api on Railway provides a scalable, zero-configuration backend for standardizing DeepSeek API requests. Railway handles the underlying infrastructure, allowing you to run the Go-based core alongside the static WebUI seamlessly.

The deployment utilizes Railway's Docker integration to build and run the application automatically from the source repository. A Railway Volume is required to persist the application's configuration file, ensuring that your customized settings, API keys, and account pools are not lost between deployments or restarts. Network traffic is routed through a standard HTTP proxy on port 5001. Railway's automatic TLS provides secure HTTPS access out of the box, making it safe to use the web-based admin panel and expose your API endpoints to client applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ds2Api | [bilalnawaz072/ds2api](https://github.com/bilalnawaz072/ds2api) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5001 |
| `LOG_LEVEL` | INFO |
| `DS2API_ADMIN_KEY` | admin123 |
| `DS2API_CONFIG_PATH` | /data/config.json |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Go, JavaScript, Shell, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/ds2api)
