# Deploy ConvertX on Railway

Self-hosted online file converter. Supports 1000+ formats

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convertx-updated)

## About

ConvertX is a self-hosted online file conversion service that lets users convert files between supported formats through a web interface. It runs as a Docker-based application and provides configurable authentication, registration, sharing, automatic file cleanup, and conversion settings. ConvertX is designed for users who want to run their own private or shared file-conversion service.

Hosting ConvertX on Railway requires a single Docker service and a persistent Railway Volume. Deploy the `c4illin/convertx:latest` image and expose port `3000` through Railway's public networking. ConvertX stores its application files in `/app/data`, so a Railway Volume must be mounted at that path to preserve data across deployments and container restarts.

No PostgreSQL, Redis, MongoDB, Dockerfile, or Nixpacks configuration is required for this deployment. Railway provides the public domain and HTTPS, while ConvertX handles file conversion inside the application container. Configure `JWT_SECRET` as a secure application secret and set `LANGUAGE=en` for the default interface language. Optional variables can enable account registration, unauthenticated access, automatic cleanup, history visibility, and other application behavior.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| convertx | `c4illin/convertx:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Used to help Railway auto-detect the port; not changeable. |
| `LANGUAGE` | en | Language to format date strings in, specified as a BCP 47 language tag |
| `JWT_SECRET` | (secret) | A long and secret string used to sign the JSON Web Token |
| `HIDE_HISTORY` | false | Hide the history page |
| `MAX_CONVERT_PROCESS` | 2 | Maximum parallel conversion processes. |
| `ACCOUNT_REGISTRATION` | false | Allow users to register accounts |
| `ALLOW_UNAUTHENTICATED` | false | Allow unauthenticated users to use the service, only set this to true locally |
| `AUTO_DELETE_EVERY_N_HOURS` | 24 | Checks every n hours for files older then n hours and deletes them, set to 0 to disable |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/convertx-updated)
