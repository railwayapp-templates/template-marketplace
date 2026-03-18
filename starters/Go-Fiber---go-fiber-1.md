# Deploy Go Fiber on Railway

A minimal Go Fiber RESTful API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/go-fiber-1)

## About

Go Fiber is a fast, minimalist web framework built on top of Fasthttp for Go. It focuses on performance, developer ergonomics, and a familiar Express-like API. This starter template provides a small, production-ready base with health checks, logging, graceful shutdown, and environment-based configuration using `PORT`, making it ideal for quick deployments.

Hosting a Go Fiber application typically involves building a small statically-linked binary, exposing an HTTP port, and wiring environment variables for configuration. Because Go compiles to a single executable, deployment is usually a matter of running that binary behind a reverse proxy or on a platform that handles networking and scaling for you. On Railway, you can build and run the Docker image defined in this repo, configure the `PORT` environment variable, and let Railway manage the underlying infrastructure, logs, and scaling with minimal manual setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| go-fiber | [codestorm-official/go-fiber](https://github.com/codestorm-official/go-fiber) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

**Category:** Starters · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/go-fiber-1)
