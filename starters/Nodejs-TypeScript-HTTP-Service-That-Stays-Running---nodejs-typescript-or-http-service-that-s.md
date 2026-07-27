# Deploy Node.js TypeScript | HTTP Service That Stays Running on Railway

Node 24 and TypeScript 7 on Railway, with health and graceful shutdown

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nodejs-typescript-or-http-service-that-s)

## About

A minimal HTTP service on Node 24 and TypeScript 7 - no framework, but a service that stays up.

The Node.js TypeScript starter on Railway deploys a repository whose entire program is one line:

```
console.log(process.env.PORT)
```

It prints a line and exits. A container that exits is a container the platform marks as stopped - there is nothing to route a domain to and nothing to health-check. One deployment in five reports as healthy, and those are healthy by accident.

This template listens, answers, and shuts down cleanly, which is the smallest thing that deserves to be called a service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | [ak40u/node-ts-railway-starter](https://github.com/ak40u/node-ts-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript

[View on Railway →](https://railway.com/deploy/nodejs-typescript-or-http-service-that-s)
