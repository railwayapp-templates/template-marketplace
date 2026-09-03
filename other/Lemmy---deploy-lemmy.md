# Deploy Lemmy on Railway

Link aggregator and discussion forum that talks to the fediverse

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-lemmy)

## About

Lemmy is an open-source link aggregator and discussion platform — communities, threaded comments and voting in the shape people know from Reddit, except every instance federates over ActivityPub. Someone on Mastodon, Mbin or another Lemmy server can subscribe, comment and vote without an account on yours, while you keep the moderation rules, the data and the domain.

Deploy Lemmy on Railway and the whole stack comes up wired together: the Rust API server, the web UI, a Caddy front door routing browser and ActivityPub traffic to the right place, pict-rs for image uploads on a volume, PostgreSQL, and a mail catcher so password resets work on day one. Self-host Lemmy without writing an nginx config or an hjson settings file — the source repository [gridalpha/lemmy-railway](https://github.com/gridalpha/lemmy-railway) renders that config from environment variables at boot.

![Lemmy's six Railway services and the links between them](https://res.cloudinary.com/rroe4rtk/image/upload/v1788369079/lemmy-architecture.png)

Lemmy solves a problem centralised forums cannot: a community that outlives the platform it started on. Every user, community and post is an addressable ActivityPub object, so people on other servers take part as first-class members.

- Communities with threaded comments, voting, sorting and full-text search
- Federation with Lemmy, Mbin, PieFed, Mastodon and anything on ActivityPub
- Moderation: registration applications, reports, bans, a public modlog
- Image uploads, remote thumbnail caching and an optional image proxy
- A documented `/api/v3` REST API behind Jerboa, Voyager and Thunder

The architecture mirrors upstream's production layout. **lemmy** is the Rust API server: it owns the schema, runs migrations at boot and drives the federation queue in-process. **lemmy-ui** server-renders the web app and calls the API privately. **proxy** cannot be skipped — an ActivityPub fetch of `/u/name` is the same URL a browser requests, distinguished only by the `Accept` header, so Caddy sends API paths, inbox `POST`s and ActivityPub requests to the backend and everything else to the UI. **pictrs** keeps originals and thumbnails on a volume, **Postgres** holds every post, comment, vote and remote actor, and **mailpit** captures mail until a real relay is connected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lemmy | [gridalpha/lemmy-railway](https://github.com/gridalpha/lemmy-railway) | Worker |
| lemmy-ui | `dessalines/lemmy-ui:0.19.20` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| pictrs | `asonix/pictrs:0.5` | Database |
| proxy | [gridalpha/lemmy-railway](https://github.com/gridalpha/lemmy-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | lemmy | 8536 | Port Railway health-checks |
| `RUST_LOG` | lemmy | warn,lemmy_server=info,lemmy_api=info,lemmy_apub=info,lemmy_routes=info | Log verbosity |
| `LEMMY_BIND` | lemmy | 0.0.0.0 | Listen address, dual-stack relayed |
| `LEMMY_PORT` | lemmy | 8536 | API listen port |
| `PRIVATE_HOST` | lemmy | lemmy.railway.internal:8536 | Private address peers dial |
| `LEMMY_HOSTNAME` | lemmy | - | Public domain, permanent after setup |
| `LEMMY_POOL_SIZE` | lemmy | 15 | Maximum SQL connections |
| `LEMMY_PICTRS_URL` | lemmy | - | Image server address |
| `LEMMY_SMTP_SERVER` | lemmy | - | Outgoing SMTP host and port |
| `LEMMY_TLS_ENABLED` | lemmy | true | Emit https URLs, required for federation |
| `LEMMY_DATABASE_URL` | lemmy | - | Postgres connection string |
| `LEMMY_SMTP_TLS_TYPE` | lemmy | none | none, tls or starttls |
| `LEMMY_PICTRS_API_KEY` | lemmy | (secret) | Shared image-server key |
| `LEMMY_SETUP_SITE_NAME` | lemmy | Lemmy | Instance name, 20 characters max |
| `LEMMY_PICTRS_IMAGE_MODE` | lemmy | StoreLinkPreviews | Remote thumbnail handling |
| `LEMMY_SETUP_ADMIN_EMAIL` | lemmy | - | First administrator email |
| `LEMMY_SETUP_ADMIN_PASSWORD` | lemmy | (secret) | First administrator password |
| `LEMMY_SETUP_ADMIN_USERNAME` | lemmy | (secret) | First administrator username |
| `PORT` | lemmy-ui | 1234 | Port Railway health-checks |
| `LEMMY_UI_HOST` | lemmy-ui | :1234 | Empty host binds dual-stack |
| `LEMMY_UI_HTTPS` | lemmy-ui | true | Build https links server-side |
| `LEMMY_UI_LEMMY_EXTERNAL_HOST` | lemmy-ui | - | Public host the browser calls |
| `LEMMY_UI_LEMMY_INTERNAL_HOST` | lemmy-ui | - | Backend address over private network |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | pictrs | 8080 | Container port |
| `PRIVATE_URL` | pictrs | http://pictrs.railway.internal:8080/ | Address Lemmy calls |
| `PICTRS__REPO__PATH` | pictrs | /mnt/sled-repo | Metadata location on the volume |
| `PICTRS__REPO__TYPE` | pictrs | sled | Metadata backend |
| `PICTRS__STORE__PATH` | pictrs | /mnt/files | Image location on the volume |
| `PICTRS__STORE__TYPE` | pictrs | filesystem | Image storage backend |
| `PICTRS__OLD_REPO__PATH` | pictrs | /mnt/sled-repo | Upgrade path from older layouts |
| `PICTRS__SERVER__ADDRESS` | pictrs | [::]:8080 | IPv6 bind, reachable from peers |
| `PICTRS__SERVER__API_KEY` | pictrs | (secret) | Internal API key |
| `PICTRS__SERVER__TEMPORARY_DIRECTORY` | pictrs | /mnt/tmp | Scratch directory on the volume |
| `PORT` | proxy | 8080 | Public listen port |
| `LEMMY_UI` | proxy | lemmy-ui.railway.internal:1234 | Web UI upstream |
| `LEMMY_BACKEND` | proxy | lemmy.railway.internal:8536 | API upstream |
| `PORT` | mailpit | 8025 | Web inbox port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `PRIVATE_SMTP` | mailpit | mailpit.railway.internal:1025 | Address Lemmy sends through |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web inbox bind |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP bind, reachable from peers |

## Configuration

- **Healthcheck:** `/api/v3/site`
- **Healthcheck:** `/css/themelist`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/mnt`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/livez`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/deploy-lemmy)
