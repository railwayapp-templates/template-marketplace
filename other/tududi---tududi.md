# Deploy tududi on Railway

tududi is a FOSS task and project management service

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tududi)

## About

[tududi](https://tududi.com) is a FOSS task and project management web application that allows users to efficiently manage their tasks and projects, categorize them into different areas, and track due dates. It is designed to be intuitive and easy to use, providing a seamless experience for personal productivity.

* [tududi on GitHub](https://github.com/chrisvel/tududi)

Hosting tududi is pretty simple: It runs in a Docker container with a local SQLite DB attached in a volume. You need to provide user credentials to authenticate with the service, so you can open it to the public internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tududi | `chrisvel/tududi` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TUDUDI_USER_EMAIL` | - | Email is used as a login name |
| `TUDUDI_USER_PASSWORD` | (secret) | Password you are using to log in |
| `TUDUDI_SESSION_SECRET` | (secret) | Session secret for Cookie encryption. Needs to be at least 32 char long. |
| `TUDUDI_INTERNAL_SSL_ENABLED` | false | Whether to use SSL internally as well. Usually not needed as it all runs within the Railwayx infrastructure. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/src/app/tududi_db`

**Category:** Other

[View on Railway →](https://railway.com/template/tududi)
