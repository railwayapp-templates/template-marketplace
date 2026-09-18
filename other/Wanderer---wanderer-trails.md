# Deploy Wanderer on Railway

Trail database for GPX hikes, rides and route planning

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wanderer-trails)

## About

Wanderer is an open-source trail database for people who walk, run and ride. Upload a GPX, TCX or FIT recording and it becomes a trail page with distance, an elevation profile, an interactive map, photos, waypoints and a summit book for repeat visits. Hikers, trail runners and outdoor clubs use it to keep a permanent record of routes a tracking app buries behind a subscription. Instances speak ActivityPub, so a self-hosted Wanderer can follow users elsewhere.

Deploy Wanderer on Railway and this template gives you the full three-tier setup rather than one container. The **web** service runs the SvelteKit application and is the address your users visit. The **db** service runs Wanderer's PocketBase backend, holding every trail, photo and GPX file on a persistent volume. The **search** service runs Meilisearch, powering the trail library, map queries and place search. The app reaches both over the private network and proxies uploads through the web tier, so no storage endpoint is public.

![Wanderer web, PocketBase and Meilisearch services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789663872/wanderer-architecture.webp)

Wanderer solves a problem every long-time hiker hits: routes scattered across a watch vendor's cloud, a phone app and a folder of GPX files, none of it searchable. Self-hosting puts it in one place you own, with no activity cap. Key features:

- GPX, TCX and FIT import, with distance, duration and elevation derived automatically
- Route planning with auto-routing, reorderable anchors and points of interest
- Photos, waypoints and a per-trail summit book
- Lists for grouping trails, with visibility set per list and per trail
- Full-text and map-viewport search across trails and lists
- ActivityPub federation, so instances can follow each other
- Strava, komoot and Hammerhead plugins for importing activities and sending routes

Wanderer's backend is PocketBase, a single Go binary with an embedded SQLite database and file store, which is why this template needs no separate database service — the `db` service *is* the database, and its volume holds every record and upload. Meilisearch sits beside it as a derived index that PocketBase writes into and the web tier queries for anything list-shaped. It stores no primary data, but keeps its own volume so a redeploy does not force a reindex.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| db | [gridalpha/wanderer-railway](https://github.com/gridalpha/wanderer-railway) | Web service |
| search | `getmeili/meilisearch:v1.36.0` | Database |
| web | `flomp/wanderer-web:v0.20.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | db | 8090 | HTTP port PocketBase listens on |
| `ORIGIN` | db | - | Frontend URL, used for ActivityPub ids |
| `MEILI_URL` | db | - | Meilisearch endpoint, private network |
| `PRIVATE_URL` | db | http://db.railway.internal:8090 | Private address for the web service |
| `MEILI_MASTER_KEY` | db | - | Indexes trails, lists and actors |
| `WANDERER_VERSION` | db | v0.20.0 | Wanderer release and matching plugin bundles |
| `POCKETBASE_SMTP_HOST` | db | - | SMTP server hostname |
| `POCKETBASE_SMTP_PORT` | db | - | SMTP server port |
| `POCKETBASE_SMTP_ENABLED` | db | false | Set true to send email |
| `POCKETBASE_SMTP_PASSWORD` | db | (secret) | SMTP password |
| `POCKETBASE_SMTP_USERNAME` | db | (secret) | SMTP username |
| `POCKETBASE_ENCRYPTION_KEY` | db | - | Exactly 32 chars, encrypts stored secrets |
| `POCKETBASE_SUPERUSER_EMAIL` | db | admin@example.com | PocketBase dashboard login |
| `POCKETBASE_SMTP_SENDER_NAME` | db | - | From name on outgoing mail |
| `POCKETBASE_SUPERUSER_PASSWORD` | db | (secret) | Dashboard password, min 10 chars |
| `POCKETBASE_SMTP_SENDER_ADDRESS` | db | - | From address on outgoing mail |
| `PORT` | search | 7700 | Health-check port selector |
| `MEILI_ENV` | search | production | Disables the bundled web UI |
| `PRIVATE_URL` | search | http://search.railway.internal:7700 | Private address for web and db |
| `MEILI_DB_PATH` | search | /meili_data/data.ms | Index location on the volume |
| `MEILI_HTTP_ADDR` | search | [::]:7700 | Dual-stack bind, required for private peers |
| `MEILI_MASTER_KEY` | search | - | Meilisearch master key |
| `MEILI_NO_ANALYTICS` | search | true | Disable telemetry |
| `MEILI_MAX_INDEXING_MEMORY` | search | 512 MiB | Cap indexing memory to the RAM quota |
| `MEILI_MAX_INDEXING_THREADS` | search | 2 | Cap indexing threads to the CPU quota |
| `PORT` | web | 3000 | HTTP port the app listens on |
| `ORIGIN` | web | - | Public URL of this instance |
| `MEILI_URL` | web | - | Meilisearch endpoint, private network |
| `NODE_OPTIONS` | web | --dns-result-order=ipv6first | Prefer IPv6 for private peers |
| `VALHALLA_URL` | web | https://valhalla1.openstreetmap.de | Auto-routing and elevation data |
| `NOMINATIM_URL` | web | https://nominatim.openstreetmap.org | Place search and reverse geocoding |
| `BODY_SIZE_LIMIT` | web | Infinity | Allow large GPX and photo uploads |
| `MEILI_MASTER_KEY` | web | - | Mints per-user search tokens |
| `OVERPASS_API_URL` | web | https://overpass-api.de | Points of interest on the map |
| `PUBLIC_DISABLE_SIGNUP` | web | false | Set true to close registration |
| `PUBLIC_POCKETBASE_URL` | web | - | PocketBase backend, private network |
| `PUBLIC_PRIVATE_INSTANCE` | web | false | Set true to require login for all content |
| `PUBLIC_MAP_MAX_POLYLINES` | web | 100 | Route previews drawn per map viewport |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pb_data`
- **Volume:** `/meili_data`
- **Healthcheck:** `/`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/wanderer-trails)
