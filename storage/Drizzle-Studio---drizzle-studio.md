# Deploy Drizzle Studio on Railway

Deploy and Host Drizzle Studio Gateway with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/drizzle-studio)

## About

Drizzle Studio is a powerful visual database browser and editor that provides an intuitive web interface for managing your database schemas, running queries, and exploring data. It's the official GUI companion for Drizzle ORM, offering real-time database interaction with support for PostgreSQL, MySQL, and SQLite databases.

![Drizzle Studio Demo](https://zyugzloemocjcxmspsso.supabase.co/storage/v1/object/public/static-assets/drizzle-studio-demo.png)

Hosting Drizzle Studio involves deploying a web-based database management interface that connects to your databases securely. This template uses Docker containerization to ensure consistent deployment across environments, includes persistent volume storage to maintain your database connections and query history, and provides password-protected access to keep your data secure. The deployment automatically configures the necessary environment variables and storage requirements for a production-ready database management solution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| drizzle-studio-gateway | `ghcr.io/drizzle-team/gateway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4983 | Set the port for Drizzle Gateway |
| `MASTERPASS` | - | Set your master pass |
| `STORE_PATH` | /app | Set your store path |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Storage

[View on Railway →](https://railway.com/template/drizzle-studio)
