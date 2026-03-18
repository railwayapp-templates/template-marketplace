# Deploy Gin on Railway

Go + Gin web server with Zap logging, .env config, and health check route

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/go-gin)

## About

[Go + Gin](https://gin-gonic.com/) is a high-performance HTTP web framework built on top of the Go standard library. It offers fast routing, middleware support, and a simple API for building RESTful services. Ideal for developers who want minimal overhead with excellent speed and productivity.

Railway deploys Go + Gin projects using [Nixpacks](https://nixpacks.com), which automatically detects your Go setup based on `go.mod` and builds it in a container. As long as your Gin app listens on the `$PORT` environment variable, Railway will route traffic correctly. No Dockerfile is required. You can customize the build or start process using a `nixpacks.toml` file, and environment variables can be configured via the Railway dashboard.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| go-gin | [railtools/go-gin](https://github.com/railtools/go-gin) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LOG_LEVEL` | debug |
| `ENVIRONMENT` | production |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Go

[View on Railway →](https://railway.com/template/go-gin)
