# Deploy Hey on Railway

Decentralized and permissionless social media app built with Lens Protocol

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hey)

## About

Hey is a decentralized, permissionless social media application built on the Lens Protocol. It leverages Web3 technologies, Next.js, and GraphQL to provide a robust, censorship-resistant platform. Hey allows users to connect their wallets, interact with the decentralized social graph, and manage their Web3 social presence.

Hosting Hey on Railway simplifies the deployment of a modern Web3 monorepo stack. Railway manages the underlying infrastructure, allowing this Turborepo-based Node.js application to run seamlessly in the cloud. Deploying Hey involves provisioning a Node.js environment to serve the API and frontend, alongside a PostgreSQL database for backend data management.

Railway's automatic environment variables map directly to Hey's required configuration, such as Lens Protocol keys and internal API secrets. Railway also automatically provisions HTTPS and a public domain, exposing the application securely. The platform easily scales both horizontally and vertically, handling traffic spikes typical in social media applications without requiring manual server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hey | [bilalnawaz072/hey](https://github.com/bilalnawaz072/hey) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `HOST` | hey | 0.0.0.0 | Bind to all interfaces for Railway. |
| `PORT` | hey | 4783 | Internal application listening port. |
| `PRIVATE_KEY` | hey | - | Private key used to sign Lens requests. |
| `DATABASE_URL` | hey | - | Railway PostgreSQL connection string. |
| `SHARED_SECRET` | hey | (secret) | Token for internal API authorization. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs · **Languages:** TypeScript, JavaScript, CSS, HTML

[View on Railway →](https://railway.com/deploy/hey)
