# Deploy create-bun-stack on Railway

Deploy and Host create-bun-stack with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/create-bun-stack)

## About

`create-bun-stack` is a full-stack application starter powered by [Bun](https://bun.sh/), offering a batteries-included developer experience inspired by the Rails philosophy. It emphasizes local-first simplicity, modern JavaScript tooling, and zero-config developer workflows—shipping with TypeScript, SQLite, file-based routing, environment handling, and built-in auth.

Hosting `create-bun-stack` on Railway enables instant provisioning of the full stack—server, database, and environment—all from a single deploy. The stack is optimized for fast startup, local development parity, and deploys cleanly to Railway without needing Docker, external Redis, or Postgres. It supports SQLite in production using Railway’s persistent storage volumes or can be trivially adapted for Postgres with a single `.env` switch. Built with minimal moving parts, `create-bun-stack` abstracts infrastructure complexity so developers can ship fast with modern primitives.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| create-bun-stack | [jasencarroll/create-bun-stack](https://github.com/jasencarroll/create-bun-stack) (root: ./templates/default/) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NODE_ENV` | production |
| `JWT_SECRET` | (secret) |

**Category:** Other · **Languages:** TypeScript, CSS, HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/create-bun-stack)
