# Deploy Echo on Railway

Go + Echo web server with Zap logging, .env config, and health endpoint

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/go-echo)

## About

[Go + Echo](https://echo.labstack.com/) is a high-performance, extensible, and minimalist Go web framework. It provides a simple API with robust routing, middleware support, and zero dependency for performance-focused web apps. Echo is ideal for building fast, clean REST APIs and backend services in Go.

Railway uses [Nixpacks](https://nixpacks.com) to build and deploy Go + Echo projects with zero config. Just include a `go.mod` and a `main()` function that starts your Echo server on the `$PORT` environment variable. Railway handles HTTP routing, logs, and environment variables out of the box. No Dockerfile required. Custom build or start commands can be added via `nixpacks.toml`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| go-echo | [railtools/go-echo](https://github.com/railtools/go-echo) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LOG_LEVEL` | debug |
| `ENVIRONMENT` | production |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Go

[View on Railway →](https://railway.com/template/go-echo)
