# Deploy Lemmy on Railway

Federated Lemmy community with persistent media and PostgreSQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lemmy)

## About

Deploy a production-ready **Lemmy** instance on Railway. Lemmy is an open-source, federated link aggregator and forum—a self-hosted alternative to Reddit that participates in the Fediverse through ActivityPub.

A Lemmy deployment needs an API and federation server, server-rendered web UI, PostgreSQL database, persistent image service, and a shared public origin. This template provisions those components as five Railway services connected through private networking. Only the Proxy service is publicly exposed.

The template pins Lemmy and Lemmy UI 0.19.20, Pict-rs 0.5.24, and Caddy 2.11.4. It generates independent administrator, media, and database secrets and persists both application data and uploaded media across redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Lemmy UI | `dessalines/lemmy-ui:0.19.20@sha256:e5e67f73ad589f24712a2eb56ef9ce2854cc7c770bd28af59804335283257592` | Worker |
| Lemmy | `ghcr.io/monotykamary/railway-template-lemmy-lemmy:0.19.20-r2@sha256:abfa6db5b0aecdd326bf86a45455820f5998da850aa6f1a2e5f898d53c49178` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18@sha256:3b8bc16ccb823c9a293b09d20d4180049502ee2b243b5989d59e258450044e22` | Database |
| Pict-rs | `asonix/pictrs:0.5.24@sha256:ccaf207cb6bc859893db0b51738a17f955e14569de64b50c41d3cd66f171a90a` | Database |
| Proxy | `ghcr.io/monotykamary/railway-template-lemmy-proxy:0.19.20-r2@sha256:b3e8d0fa00c0d0290db64d03e0aaee813423a147b02f068829cea236d0898f4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Lemmy UI | 1234 | Internal port for the Lemmy UI server. |
| `LEMMY_UI_HOST` | Lemmy UI | 0.0.0.0:1234 | Listen address for the Lemmy UI server. |
| `LEMMY_UI_DEBUG` | Lemmy UI | false | Disables browser debugging tools in production. |
| `LEMMY_UI_HTTPS` | Lemmy UI | true | Uses HTTPS for the public Lemmy origin. |
| `LEMMY_UI_LEMMY_EXTERNAL_HOST` | Lemmy UI | - | Public Lemmy hostname used by browsers. |
| `LEMMY_UI_LEMMY_INTERNAL_HOST` | Lemmy UI | - | Private Lemmy API hostname used for server-side rendering. |
| `PORT` | Lemmy | 8536 | Internal port for the Lemmy API and federation server. |
| `NO_COLOR` | Lemmy | 1 | Disables ANSI color codes in Railway logs. |
| `RUST_LOG` | Lemmy | info | Lemmy log level. |
| `PICTRS_URL` | Lemmy | - | Private URL used to store and retrieve media from Pict-rs. |
| `LEMMY_HOSTNAME` | Lemmy | - | Public hostname used for Lemmy and ActivityPub identities. |
| `PICTRS_API_KEY` | Lemmy | (secret) | Shared API key used to manage media in Pict-rs. |
| `LEMMY_SITE_NAME` | Lemmy | My Lemmy | Initial site name; it can be changed later in the administration panel. |
| `LEMMY_DATABASE_URL` | Lemmy | - | Private PostgreSQL connection URL. |
| `LEMMY_ADMIN_PASSWORD` | Lemmy | (secret) | Generated password for the initial administrator account. |
| `LEMMY_ADMIN_USERNAME` | Lemmy | (secret) | Username for the initial administrator account. |
| `POSTGRES_DB` | Postgres | railway | Database created for Lemmy. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL connection URL used by Lemmy. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL administrator user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |
| `PORT` | Pict-rs | 8080 | Internal port for the Pict-rs media server. |
| `PICTRS__MEDIA__FORMAT` | Pict-rs | webp | Preferred output format for processed media. |
| `PICTRS__SERVER__ADDRESS` | Pict-rs | 0.0.0.0:8080 | Listen address for the Pict-rs media server. |
| `PICTRS__SERVER__API_KEY` | Pict-rs | (secret) | Generated API key shared with Lemmy for media management. |
| `PORT` | Proxy | 8080 | Internal HTTP port used by the public edge proxy. |
| `LEMMY_PRIVATE_DOMAIN` | Proxy | - | Private Railway hostname for the Lemmy API service. |
| `LEMMY_UI_PRIVATE_DOMAIN` | Proxy | - | Private Railway hostname for the Lemmy UI service. |

## Configuration

- **Healthcheck:** `/`
- **Healthcheck:** `/api/v3/site`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/mnt`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/lemmy)
