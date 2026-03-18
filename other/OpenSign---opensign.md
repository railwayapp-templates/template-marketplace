# Deploy OpenSign on Railway

Self-hosted document signing — upload, place fields, send for signatures

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opensign)

## About

OpenSign is an open-source digital document signing platform and a self-hosted alternative to DocuSign. It provides document upload, signature field placement, and email-based signing workflows, all running on your own infrastructure.

OpenSign is a MERN-stack application consisting of a React frontend, a Node.js/Express backend built on Parse Server, and a MongoDB database. This template deploys all three as separate Railway services with automatic credential wiring between them. The server stores uploaded documents and signed PDFs on a persistent volume. MongoDB credentials and Parse Server keys are auto-generated. The client connects to the server's API endpoint via Railway's public domain references. For production signing workflows, you'll want to configure SMTP credentials for email notifications, though the application is fully functional without them for testing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| server | [Sokanon/railway-opensign](https://github.com/Sokanon/railway-opensign) (root: server) | Worker |
| client | [Sokanon/railway-opensign](https://github.com/Sokanon/railway-opensign) (root: client) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | - |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | MongoDB Admin username |
| `appName` | server | open_sign_server | Application name |
| `NODE_ENV` | server | production | - |
| `USE_LOCAL` | server | true | Use local file storage |
| `PARSE_MOUNT` | server | /api | Parse server mount path |
| `SMTP_ENABLE` | server | false | Enable SMTP email |
| `NODE_ENV` | client | production | - |
| `GENERATE_SOURCEMAP` | client | false | Disable Sourcemaps  |

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/opensign)
