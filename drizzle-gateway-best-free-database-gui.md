# Deploy Drizzle Gateway - Best free Database GUI on Railway

Deploy and Host Drizzle Gateway - Best free Database GUI with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/drizzle-gateway-best-free-database-gui)

## About

Drizzle Gateway is an enhanced, self-hosted version of Drizzle Studio that provides a powerful web-based database management interface. It offers advanced features like query optimization, schema visualization, and real-time database monitoring for PostgreSQL, MySQL, and SQLite databases.

Hosting Drizzle Gateway involves deploying a Node.js application that connects to your databases and provides a web interface for database management. The deployment includes setting up environment variables for database connections, configuring authentication, and ensuring proper networking for secure database access. Railway simplifies this process by handling the containerization, SSL certificates, and automatic deployments from your Git repository, making it easy to maintain and scale your database management tool.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| drizzle-gateway | `ghcr.io/drizzle-team/gateway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4983 | - |
| `MASTERPASS` | - | This is your password |
| `STORE_PATH` | /data | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/drizzle-gateway-best-free-database-gui)
