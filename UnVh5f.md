# Deploy Triplit Server on Railway

The official template for self-hosting the Triplit Server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/UnVh5f)

## About

A full-stack, syncing database that runs on both server and client. Pluggable storage (indexeddb, sqlite, durable objects), syncs over websockets, and works with your favorite framework (React, Solid, Vue, Svelte).

You can run a self-hosted Triplit server completely independently or connect your self-hosted deployment to the Triplit Cloud dashboard for easier management and access to the Triplit Console.

1. Create an account on [Triplit](https://triplit.dev)
2. Create a new project
3. Update your project in Triplit Cloud to point to your Railway deployment

More info in the [Triplit Docs](https://www.triplit.dev/docs/triplit-cloud/self-hosted-deployments)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Triplit Server | `aspencloud/triplit-server` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `JWT_SECRET` | (secret) | Token used to validate incoming requests |
| `VERBOSE_LOGS` | TRUE | Whether to use verbose lgos |
| `LOCAL_DATABASE_URL` | /mnt/triplitdb/app.db | Location of local SQLite database in the filesystem |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/triplitdb`

**Category:** Storage

[View on Railway →](https://railway.com/template/UnVh5f)
