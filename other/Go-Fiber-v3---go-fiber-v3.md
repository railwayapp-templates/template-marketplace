# Deploy Go Fiber v3 on Railway

a go Template for Fiber v3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/go-fiber-v3)

## About

Go Fiber v3 is a fast, minimalist web framework for Go built on top of the high-performance fasthttp engine. It’s designed for building APIs and web services with an Express-like routing style, middleware support, and low overhead. Fiber focuses on speed, simplicity, and developer productivity for modern backend apps.

Deploying a Go Fiber v3 app on Railway is mainly “push code, Railway builds and runs it.” You connect a GitHub repo, and Railway detects Go via Nixpacks (or you provide a Dockerfile). Set the build/start commands if needed, and make sure your app listens on 0.0.0.0 and uses Railway’s PORT environment variable (not a hardcoded port). Configure environment variables/secrets in the Railway dashboard (DB URLs, API keys, etc.). Railway provides logs, automatic deploys on git push, and easy rollbacks. Add a health check endpoint, enable a custom domain, and Railway handles HTTPS/TLS. You can scale by increasing resources or adding replicas.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fiber-v3 | [kronborg6/fiber-v3](https://github.com/kronborg6/fiber-v3) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Go

[View on Railway →](https://railway.com/template/go-fiber-v3)
