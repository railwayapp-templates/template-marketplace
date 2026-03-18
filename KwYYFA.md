# Deploy Node Express on Railway

A minimal production-ready node HTTP server with Express and Typescript

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/KwYYFA)

## About

# template-node-express

A minimal production-ready node HTTP server with [`express`](https://expressjs.com/).

## Features

- ✅ Typescript
- ✅ Graceful shutdown 
- ✅ Optional Tracing with OpenTelemetry (configurable via environment variables)
- ✅ Properly configured request payload size limiting to help prevent Denial of Service attack vectors
- ✅ `AbortSignal` propagation to prevent unnecessary work (includes example and test)
- ✅ Validation with [`express-validator`](https://express-validator.github.io/docs)
- ✅ Async error forwarding to default error handler with [`express-async-errors`](https://github.com/davidbanham/express-async-errors)
- ✅ Structured logging with [`pino`](https://github.com/pinojs/pino)
- ✅ Rich request logging middleware including request id, trace id, context propagation, and more
- ✅ Testing with [`jest`](https://github.com/jestjs/jest), [`supertest`](https://github.com/ladjs/supertest), and [`fetch-mock`](https://github.com/wheresrhys/fetch-mock)
- ✅ [`helmet`](https://github.com/helmetjs/helmet) & [`compression`](https://github.com/expressjs/compression)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| node-express | [dillonstreator/template-node-express](https://github.com/dillonstreator/template-node-express) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/KwYYFA)
