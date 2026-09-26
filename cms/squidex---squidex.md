# Deploy squidex on Railway

Squidex 7.23: headless CMS with REST and GraphQL APIs, on MongoDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/squidex)

## About

Squidex is an open-source headless CMS. You design content schemas in a web editor, your team writes and publishes content, and apps read it through generated REST and GraphQL APIs. It supports workflows, localization, versioning, assets and webhooks, and fits websites, mobile apps and any project that needs structured content.

This template runs the official `squidex/squidex:7.23.0` image with a Railway MongoDB database. The admin user is created on first boot from the variables, and a client-credentials admin client is created for automation. Squidex ships demo Google, GitHub and Microsoft login credentials in its defaults; the start command clears them, so only password login appears and strangers cannot sign up through those buttons. New users are locked until an admin unlocks them. Assets are stored on a Railway volume and everything else in MongoDB, so all of it survives redeploys. Squidex needs about 600 MB of memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| squidex | `squidex/squidex:7.23.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |
| `PORT` | squidex | 80 |
| `STORE__TYPE` | squidex | MongoDb |
| `ASSETSTORE__TYPE` | squidex | Folder |
| `EVENTSTORE__TYPE` | squidex | MongoDb |
| `IDENTITY__ADMINEMAIL` | squidex | admin@example.com |
| `IDENTITY__ADMINCLIENTID` | squidex | railway-admin |
| `IDENTITY__ADMINPASSWORD` | squidex | (secret) |
| `ASSETSTORE__FOLDER__PATH` | squidex | /app/Assets |
| `IDENTITY__ADMINCLIENTSECRET` | squidex | (secret) |
| `IDENTITY__ALLOWPASSWORDAUTH` | squidex | (secret) |
| `IDENTITY__LOCKAUTOMATICALLY` | squidex | true |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `sh -c 'export IDENTITY__GOOGLECLIENT= IDENTITY__GITHUBCLIENT= IDENTITY__MICROSOFTCLIENT=; exec dotnet Squidex.dll'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/Assets`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/squidex)
