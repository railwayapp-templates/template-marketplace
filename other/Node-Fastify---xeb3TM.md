# Deploy Node Fastify on Railway

A minimal production-ready node HTTP server with fastify and typescript

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xeb3TM)

## About

A minimal production-ready node HTTP server with [`Fastify`](https://fastify.dev/) and Typescript.

- ✅ Typescript
- ✅ Graceful shutdown
- ✅ Optional Tracing with OpenTelemetry (configurable via environment variables)
- ✅ Properly configured request payload size limiting to help prevent Denial of Service attack vectors 
- ✅ Auto-generated Swagger/OpenAPI documentation 
- ✅ `AbortSignal` propagation to prevent unnecessary work (includes example and test)  
- ✅ Structured logging with [`pino`](https://github.com/pinojs/pino) 
- ✅ Rich request logging middleware including request id, trace id, context propagation, and more 
- ✅ [`zod`](https://github.com/turkerdev/fastify-type-provider-zod) for request validation, JSON schema inference, and OpenAPI/Swagger generation 
- ✅ Testing with [`tap`](https://www.npmjs.com/package/tap) and [`undici`](https://www.npmjs.com/package/undici) 
- ✅ [`helmet`](https://github.com/fastify/fastify-helmet) & [`compression`](https://github.com/fastify/fastify-compress)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| node-fastify | [dillonstreator/template-node-fastify](https://github.com/dillonstreator/template-node-fastify) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ENV` | production |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/xeb3TM)
