# Deploy Fiber on Railway

Go + Fiber web server with Zap logging, .env config, and health route

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/go-fiber)

## About

Go + Fiber is a fast, minimalist web framework built on top of Go’s fasthttp package. It’s designed to be expressive like Express.js while leveraging Go’s performance and concurrency. Ideal for building high-speed APIs and microservices with minimal overhead.

Railway deploys Go + Fiber apps using Nixpacks. Just include a go.mod file and expose your Fiber server on os.Getenv("PORT"). Railway automatically detects and builds your project without needing a Dockerfile. You can define custom build steps with nixpacks.toml, and Railway handles port binding, logs, and environment variables out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| go-fiber | [railtools/go-fiber](https://github.com/railtools/go-fiber) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LOG_LEVEL` | debug |
| `ENVIRONMENT` | production |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Go

[View on Railway →](https://railway.com/template/go-fiber)
