# Deploy Go Chi on Railway

A minimal production-ready golang HTTP server with go-chi/chi

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/FdfQPz)

## About

# `template-go-chi`

A minimal production-ready golang HTTP server with [`go-chi/chi`](https://github.com/go-chi/chi).

## Features

- ✅ Graceful shutdown
- ✅ Tracing with OpenTelemetry
- ✅ Trust proxy
- ✅ Structured logging with `log/slog`
- ✅ Rich request logging middleware including bytes written/read, request id, trace id, context propagation, and more
- ✅ Panic recovery with rich logging including request id and trace id

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| go-chi | [dillonstreator/template-go-chi](https://github.com/dillonstreator/template-go-chi) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Go

[View on Railway →](https://railway.com/deploy/FdfQPz)
