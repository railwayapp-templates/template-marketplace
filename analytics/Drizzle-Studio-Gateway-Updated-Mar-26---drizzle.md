# Deploy Drizzle Studio Gateway [Updated Mar ’26] on Railway

Drizzle Studio [Mar ’26] (Manage DB Schemas & Queries Easily) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/drizzle)

## About

Drizzle Studio is a modern, open-source SQL editor built for developers and database administrators who want a seamless and intuitive interface to visualize, query, and manage their databases. Designed by the creators of Drizzle ORM, Drizzle Studio simplifies database management and makes it lightning-fast to run queries, explore schemas, and view results without complex setup. It’s especially loved for its simplicity, developer-friendly features, and speed.

Self-hosting Drizzle Studio gives you full ownership and flexibility to manage your database tools without relying on third-party infrastructure. You can run it in your secure environment, integrate it with your preferred SQL databases (like PostgreSQL, MySQL, or SQLite), and customize it to your workflow.

Railway makes the hosting process effortless. It eliminates the need for manual setup, server provisioning, or network configurations. Within a few clicks, you can deploy Drizzle Studio directly on Railway, connect it to your existing databases, and begin managing data instantly. Railway’s managed environment ensures scalability, uptime, and security—without any DevOps overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| drizzle-team/gateway:1.0.4 | `ghcr.io/drizzle-team/gateway:1.0.4` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4983 | - |
| `MASTERPASS` | - | This will be your Login Password. |
| `STORE_PATH` | /app | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/drizzle)
