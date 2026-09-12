# Deploy wanderer on Railway

Self-hosted trail database for GPX tracks, maps and photos

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wanderer)

## About

wanderer is a self-hosted trail database. Upload GPX, GeoJSON, TCX or KML tracks and get an
interactive map, distance and elevation profile, waypoints, photos, summit logs and comments.
Organise trails into lists, search everything, and optionally federate with other instances over
ActivityPub. This is a community-maintained template; it is not affiliated with the wanderer
project.

wanderer is three pieces that have to agree with each other: a SvelteKit frontend, a PocketBase
database that also stores uploaded photos and GPX files, and a Meilisearch index that every listing
page depends on. The two stateful pieces each need their own persistent volume, and all three must
share the same Meilisearch key and proxy secret. Only the frontend is exposed to the internet; the
database and the search index stay on Railway's private network, which is what keeps the deployment
safe.

The other hosting problem is the first five minutes. A fresh wanderer instance has open registration
and no privileged first account, so whoever reaches the public URL first can claim the instance.
This template runs a wrapper image that creates your account inside the container before the public
listener accepts a single request, and ships with registration switched off. The generated password
is a Railway variable you can read in the dashboard, and you change it in the app afterwards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wanderer | `ghcr.io/youssefsiam38/wanderer-railway:1.0.0` | Web service |
| search | `getmeili/meilisearch:v1.36.0` | Database |
| db | `flomp/wanderer-db:v0.20.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | wanderer | :: | Listen address. :: serves both IPv4 and IPv6. |
| `PORT` | wanderer | 3000 | Port the frontend listens on. Must match the domain target port. |
| `ORIGIN` | wanderer | - | Public URL of this instance. wanderer rejects writes from any other origin. |
| `MEILI_URL` | wanderer | - | Private URL of the Meilisearch service. |
| `BODY_SIZE_LIMIT` | wanderer | Infinity | SvelteKit upload limit. Photos and GPX archives exceed the default. |
| `MEILI_MASTER_KEY` | wanderer | - | Meilisearch API key. Must match the search service. |
| `APP_READY_TIMEOUT` | wanderer | 300 | Seconds to wait for PocketBase before giving up. |
| `WANDERER_OWNER_EMAIL` | wanderer | owner@example.com | E-mail of that account. Change it if you want password resets to work. |
| `PUBLIC_DISABLE_SIGNUP` | wanderer | true | Close registration. The owner account below is created before the app starts. |
| `PUBLIC_POCKETBASE_URL` | wanderer | - | Private URL of the PocketBase service. |
| `POCKETBASE_PROXY_SECRET` | wanderer | (secret) | Shared secret between the frontend and PocketBase. |
| `PUBLIC_PRIVATE_INSTANCE` | wanderer | true | Require a session for every page. Set false to publish trails to anonymous visitors. |
| `WANDERER_OWNER_PASSWORD` | wanderer | (secret) | Password of that account. Sign in with it, then change it in the app. |
| `WANDERER_OWNER_USERNAME` | wanderer | (secret) | Username of the account created on first start. |
| `MEILI_HTTP_ADDR` | search | [::]:7700 | Bind dual-stack so the private network can reach it. |
| `MEILI_MASTER_KEY` | search | - | Meilisearch API key, shared with the other two services. |
| `MEILI_NO_ANALYTICS` | search | true | Disable Meilisearch telemetry. |
| `ORIGIN` | db | - | Public URL of the instance, used for e-mail and ActivityPub links. |
| `MEILI_URL` | db | - | Private URL of the Meilisearch service. |
| `MEILI_MASTER_KEY` | db | - | Meilisearch API key. Must match the search service. |
| `POCKETBASE_PROXY_SECRET` | db | (secret) | Shared secret between PocketBase and the frontend. |
| `POCKETBASE_ENCRYPTION_KEY` | db | - | Encrypts PocketBase settings. Must be exactly 32 characters. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/meili_data`
- **Start command:** `/pocketbase serve --http=[::]:8090 --dir=/pb_data`
- **Volume:** `/pb_data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/wanderer)
