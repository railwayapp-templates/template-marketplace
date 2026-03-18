# Deploy Xata PostgreSQL + Node.js + Drizzle on Railway

Deploy and Host Xata PostgreSQL + Node.js + Drizzle with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xata-postgresql-nodejs-drizzle)

## About

Xata is a fully-managed PostgreSQL service offering advanced features like:

- Copy-on-Write branching
- Point-in-Time (PITR) recovery
- Separation of storage from compute
- High availability, redundancy, and scalability
- Long list of PostgreSQL extensions, including pgvector, postgis, pg_cron, etc.
- Built-in query editor, AI self-optimizations, advanced observability
- Expert support in PostgreSQL

This template contains a sample Node.js application configured to use Drizzle ORM to connect to the Xata PostgreSQL service. You can use this template, or simply follow the same pattern in your own application. 

This template is for Node.js, but Xata PostgreSQL can be used with any programming language or framework that supports PostgreSQL.

The `DATABASE_URL` is the only environment variable required. Set it to the PostgreSQL connection string, which you can copy from the branch overview page in the Xata console.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Node.js with Xata | [xataio/railway-nodejs-drizzle-xata](https://github.com/xataio/railway-nodejs-drizzle-xata) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `DATABASE_URL` | The PostgreSQL connection string. Copy it from the Xata console. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Verified:** Yes · **Languages:** JavaScript, HTML, CSS

[View on Railway →](https://railway.com/deploy/xata-postgresql-nodejs-drizzle)
