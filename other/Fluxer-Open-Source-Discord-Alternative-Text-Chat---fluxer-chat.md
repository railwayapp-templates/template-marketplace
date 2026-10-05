# Deploy Fluxer | Open-Source Discord Alternative (Text Chat) on Railway

Self-hosted Discord-style chat: servers, channels, DMs, uploads, search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fluxer-chat)

## About

[Fluxer](https://fluxer.app/) is an open-source alternative to Discord. It has communities (servers), text channels, replies, DMs and group DMs, roles and permissions, invites, emoji, file uploads with previews, link embeds and full-text message search, all in a fast web client. This template runs the official Fluxer images in **text-chat mode**, with every database and secret generated for you. Voice and video are switched off because Railway has no UDP.

Upstream's self-hosting setup is about 25 containers. This template collapses it into 13 Railway services while keeping each upstream image unchanged:

- **One public edge.** The `Fluxer` service is a Caddy server built on upstream's `fluxer-static` image. It serves the web client's assets itself and path-routes `/api`, `/gateway` (WebSocket), `/media` and `/admin` to the other services over Railway's private network. Only this service has a public domain.
- **Core services.** These run from the official `ghcr.io/fluxerapp/*` images:
  - `api` for REST
  - `worker` for background jobs and cron
  - `gateway`, the Erlang realtime WebSocket server
  - `media-proxy` for uploads, thumbnails and the presigned upload relay
  - `app-proxy`, which serves the web app
  - `admin`, the instance admin panel at `/admin`
- **Internal services in one container.** The snowflake, users, messages, GIF and link-unfurl services each run as a router plus a shard. The `svc` service bundles all ten processes from their official binaries and restarts the container if any of them exits.
- **Infrastructure.** Each of these has its own volume:
  - Postgres 16
  - Valkey 9
  - NATS 2.14 with JetStream
  - Meilisearch 1.53 for message search
  - SeaweedFS 4.47, the S3 store for attachments and avatars. Its first boot creates Fluxer's four buckets and an S3 identity with a generated key.
- **Pinned versions.** Every Fluxer image is pinned to the build that upstream's `v1` tag pointed to on 2026-10-05, so a redeploy never pulls an untested release.
- **Generated secrets.** Every signing key, RPC token, cookie and password is generated at deploy time, including:
  - the sudo, gateway, media-proxy, upload-relay and admin secrets
  - the Erlang cookie
  - the database, Valkey, Meilisearch and S3 passwords

  Web-push VAPID keys are derived at boot from a generated seed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `ghcr.io/fluxerapp/fluxer-api:2026.1004.160619` | Worker |
| Valkey | `valkey/valkey:9.1-alpine` | Database |
| svc | [nomideusz/fluxer-railway](https://github.com/nomideusz/fluxer-railway) (root: /svc) | Worker |
| Fluxer | [nomideusz/fluxer-railway](https://github.com/nomideusz/fluxer-railway) (root: /edge) | Web service |
| NATS | `nats:2.14-alpine` | Database |
| admin | `ghcr.io/fluxerapp/fluxer-admin:2026.1003.122521` | Worker |
| Meilisearch | `getmeili/meilisearch:v1.53` | Database |
| media-proxy | `ghcr.io/fluxerapp/fluxer-media-proxy:2026.1003.110721` | Worker |
| gateway | `ghcr.io/fluxerapp/fluxer-gateway:2026.1004.10845` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| SeaweedFS | [nomideusz/fluxer-railway](https://github.com/nomideusz/fluxer-railway) (root: /seaweedfs) | Database |
| api | `ghcr.io/fluxerapp/fluxer-api:2026.1004.160619` | Worker |
| app-proxy | `ghcr.io/fluxerapp/fluxer-app-proxy-self-hosted:2026.1004.174950` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `FLUXER_ENV` | worker | production | Runtime environment |
| `FLUXER_KV_URL` | worker | - | Valkey URL |
| `FLUXER_BOOT_JS` | worker | - | Boot shim |
| `SVC_DEPENDENCY` | worker | - | Orders this service after svc on deploy. Don't edit |
| `FLUXER_NATS_URL` | worker | - | NATS URL |
| `FLUXER_S3_REGION` | worker | us-east-1 | S3 region |
| `FLUXER_SEARCH_URL` | worker | - | Meilisearch URL |
| `FLUXER_VAPID_SEED` | worker | - | Seed for the derived VAPID keypair |
| `FLUXER_BASE_DOMAIN` | worker | - | Public hostname (set on the api service) |
| `FLUXER_PUBLIC_PORT` | worker | 443 | Public port |
| `FLUXER_S3_ENDPOINT` | worker | - | S3 endpoint (SeaweedFS) |
| `FLUXER_SELF_HOSTED` | worker | true | Self-hosted mode |
| `FLUXER_VAPID_EMAIL` | worker | - | Web push contact |
| `FLUXER_APP_ENDPOINT` | worker | - | Web app URL |
| `FLUXER_SVC_NATS_URL` | worker | - | NATS URL for internal services |
| `FLUXER_EMAIL_ENABLED` | worker | false | Email. Off = addresses auto-verified, no password reset mail |
| `FLUXER_PASSKEY_RP_ID` | worker | - | Passkey relying party |
| `FLUXER_POSTGRES_HOST` | worker | - | Postgres host |
| `FLUXER_POSTGRES_PORT` | worker | 5432 | Postgres port |
| `FLUXER_PUBLIC_SCHEME` | worker | https | Public scheme |
| `FLUXER_S3_BUCKET_CDN` | worker | fluxer | Processed assets bucket |
| `FLUXER_SEARCH_ENGINE` | worker | meilisearch | Search engine |
| `FLUXER_ADMIN_ENDPOINT` | worker | - | Admin dashboard URL |
| `FLUXER_MEDIA_ENDPOINT` | worker | - | Public media URL |
| `FLUXER_SEARCH_API_KEY` | worker | (secret) | Meilisearch master key |
| `FLUXER_API_WORKER_MODE` | worker | all_lanes | Run every job lane |
| `FLUXER_LIVEKIT_ENABLED` | worker | false | Voice/video. Off: LiveKit needs UDP, which Railway does not offer |
| `FLUXER_SVC_SHARD_COUNT` | worker | 1 | Internal service shard count |
| `FLUXER_DATABASE_BACKEND` | worker | postgres | Database backend |
| `FLUXER_EMAIL_FROM_EMAIL` | worker | - | From address once SMTP is configured |
| `FLUXER_S3_ACCESS_KEY_ID` | worker | - | S3 access key |
| `FLUXER_SUDO_MODE_SECRET` | worker | (secret) | Sudo-mode JWT key |
| `FLUXER_POSTGRES_DATABASE` | worker | - | Postgres database |
| `FLUXER_POSTGRES_PASSWORD` | worker | (secret) | Postgres password |
| `FLUXER_POSTGRES_USERNAME` | worker | (secret) | Postgres user |
| `FLUXER_S3_BUCKET_REPORTS` | worker | fluxer-reports | Abuse reports bucket |
| `FLUXER_S3_BUCKET_UPLOADS` | worker | fluxer-uploads | Raw uploads bucket |
| `FLUXER_MARKETING_ENDPOINT` | worker | - | Marketing URL |
| `FLUXER_NATS_JETSTREAM_URL` | worker | - | NATS JetStream URL |
| `FLUXER_S3_BUCKET_HARVESTS` | worker | fluxer-harvests | Data export bucket |
| `FLUXER_S3_PUBLIC_ENDPOINT` | worker | - | S3 endpoint used in presigned URLs (relayed via /media) |
| `FLUXER_S3_FORCE_PATH_STYLE` | worker | true | Path-style S3 addressing |
| `FLUXER_GATEWAY_PUSH_ENABLED` | worker | false | Browser push notifications (push service not deployed) |
| `FLUXER_S3_SECRET_ACCESS_KEY` | worker | (secret) | S3 secret key |
| `FLUXER_ADMIN_SECRET_KEY_BASE` | worker | (secret) | Admin session key |
| `FLUXER_INTERNAL_API_ENDPOINT` | worker | - | Internal API URL |
| `FLUXER_GATEWAY_RPC_AUTH_TOKEN` | worker | (secret) | API<->Gateway RPC token |
| `FLUXER_MEDIA_PROXY_SECRET_KEY` | worker | (secret) | Media proxy URL signing key |
| `FLUXER_TRUST_CLIENT_IP_HEADER` | worker | true | Trust X-Forwarded-For set by the edge |
| `FLUXER_POSTGRES_MAX_CONNECTIONS` | worker | 15 | Postgres pool size |
| `FLUXER_ADMIN_OAUTH_CLIENT_SECRET` | worker | (secret) | Admin OAuth client secret |
| `FLUXER_MEDIA_PROXY_PUBLIC_ENDPOINT` | worker | - | Public media URL |
| `FLUXER_CONNECTION_INITIATION_SECRET` | worker | (secret) | Connection initiation token key |
| `FLUXER_INTERNAL_MEDIA_PROXY_ENDPOINT` | worker | - | Internal media proxy URL |
| `FLUXER_API_WORKER_ENABLE_CRON_SCHEDULER` | worker | true | Run cron jobs |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_ENDPOINT` | worker | - | Upload relay URL |
| `FLUXER_PASSKEY_ADDITIONAL_ALLOWED_ORIGINS` | worker | - | Passkey origins |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_SECRET_BASE64` | worker | (secret) | Upload relay token key |
| `FLUXER_API_PRESIGNED_HARVEST_DOWNLOADS_ENABLED` | worker | false | Presigned data-export downloads |
| `VALKEY_PASSWORD` | Valkey | (secret) | Auto-generated Valkey password |
| `PORT` | svc | 8090 | Health port of the first internal service (healthcheck) |
| `FLUXER_ENV` | svc | production | Runtime environment |
| `FLUXER_KV_URL` | svc | - | Valkey URL |
| `FLUXER_NATS_URL` | svc | - | NATS URL |
| `FLUXER_S3_REGION` | svc | us-east-1 | S3 region |
| `FLUXER_SEARCH_URL` | svc | - | Meilisearch URL |
| `FLUXER_BASE_DOMAIN` | svc | - | Public hostname (set on the api service) |
| `FLUXER_PUBLIC_PORT` | svc | 443 | Public port |
| `FLUXER_S3_ENDPOINT` | svc | - | S3 endpoint (SeaweedFS) |
| `FLUXER_SELF_HOSTED` | svc | true | Self-hosted mode |
| `FLUXER_VAPID_EMAIL` | svc | - | Web push contact |
| `FLUXER_APP_ENDPOINT` | svc | - | Web app URL |
| `FLUXER_SVC_NATS_URL` | svc | - | NATS URL for internal services |
| `FLUXER_EMAIL_ENABLED` | svc | false | Email. Off = addresses auto-verified, no password reset mail |
| `FLUXER_PASSKEY_RP_ID` | svc | - | Passkey relying party |
| `FLUXER_POSTGRES_HOST` | svc | - | Postgres host |
| `FLUXER_POSTGRES_PORT` | svc | 5432 | Postgres port |
| `FLUXER_PUBLIC_SCHEME` | svc | https | Public scheme |
| `FLUXER_S3_BUCKET_CDN` | svc | fluxer | Processed assets bucket |
| `FLUXER_SEARCH_ENGINE` | svc | meilisearch | Search engine |
| `FLUXER_ADMIN_ENDPOINT` | svc | - | Admin dashboard URL |
| `FLUXER_MEDIA_ENDPOINT` | svc | - | Public media URL |
| `FLUXER_SEARCH_API_KEY` | svc | (secret) | Meilisearch master key |
| `FLUXER_LIVEKIT_ENABLED` | svc | false | Voice/video. Off: LiveKit needs UDP, which Railway does not offer |
| `FLUXER_SVC_SHARD_COUNT` | svc | 1 | Internal service shard count |
| `FLUXER_DATABASE_BACKEND` | svc | postgres | Database backend |
| `FLUXER_EMAIL_FROM_EMAIL` | svc | - | From address once SMTP is configured |
| `FLUXER_S3_ACCESS_KEY_ID` | svc | - | S3 access key |
| `FLUXER_SUDO_MODE_SECRET` | svc | (secret) | Sudo-mode JWT key |
| `FLUXER_POSTGRES_DATABASE` | svc | - | Postgres database |
| `FLUXER_POSTGRES_PASSWORD` | svc | (secret) | Postgres password |
| `FLUXER_POSTGRES_USERNAME` | svc | (secret) | Postgres user |
| `FLUXER_S3_BUCKET_REPORTS` | svc | fluxer-reports | Abuse reports bucket |
| `FLUXER_S3_BUCKET_UPLOADS` | svc | fluxer-uploads | Raw uploads bucket |
| `FLUXER_MARKETING_ENDPOINT` | svc | - | Marketing URL |
| `FLUXER_NATS_JETSTREAM_URL` | svc | - | NATS JetStream URL |
| `FLUXER_S3_BUCKET_HARVESTS` | svc | fluxer-harvests | Data export bucket |
| `FLUXER_S3_PUBLIC_ENDPOINT` | svc | - | S3 endpoint used in presigned URLs (relayed via /media) |
| `FLUXER_S3_FORCE_PATH_STYLE` | svc | true | Path-style S3 addressing |
| `FLUXER_GATEWAY_PUSH_ENABLED` | svc | false | Browser push notifications (push service not deployed) |
| `FLUXER_S3_SECRET_ACCESS_KEY` | svc | (secret) | S3 secret key |
| `FLUXER_ADMIN_SECRET_KEY_BASE` | svc | (secret) | Admin session key |
| `FLUXER_INTERNAL_API_ENDPOINT` | svc | - | Internal API URL |
| `FLUXER_GATEWAY_RPC_AUTH_TOKEN` | svc | (secret) | API<->Gateway RPC token |
| `FLUXER_MEDIA_PROXY_SECRET_KEY` | svc | (secret) | Media proxy URL signing key |
| `FLUXER_TRUST_CLIENT_IP_HEADER` | svc | true | Trust X-Forwarded-For set by the edge |
| `FLUXER_ADMIN_OAUTH_CLIENT_SECRET` | svc | (secret) | Admin OAuth client secret |
| `FLUXER_MEDIA_PROXY_PUBLIC_ENDPOINT` | svc | - | Public media URL |
| `FLUXER_CONNECTION_INITIATION_SECRET` | svc | (secret) | Connection initiation token key |
| `FLUXER_INTERNAL_MEDIA_PROXY_ENDPOINT` | svc | - | Internal media proxy URL |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_ENDPOINT` | svc | - | Upload relay URL |
| `FLUXER_PASSKEY_ADDITIONAL_ALLOWED_ORIGINS` | svc | - | Passkey origins |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_SECRET_BASE64` | svc | (secret) | Upload relay token key |
| `FLUXER_API_PRESIGNED_HARVEST_DOWNLOADS_ENABLED` | svc | false | Presigned data-export downloads |
| `PORT` | Fluxer | 8080 | Edge listen port |
| `API_UPSTREAM` | Fluxer | - | api upstream |
| `APP_UPSTREAM` | Fluxer | - | app-proxy upstream |
| `ADMIN_UPSTREAM` | Fluxer | - | admin upstream |
| `FLUXER_BOOT_JS` | Fluxer | const c=process.getBuiltinModule('crypto'),u=process.getBuiltinModule('url'),e=process.env;if(!e.FLUXER_VAPID_PRIVATE_KEY){const k=c.createHash('sha256').update('fluxer-vapid:'+e.FLUXER_VAPID_SEED).digest(),d=c.createECDH('prime256v1');d.setPrivateKey(k);e.FLUXER_VAPID_PRIVATE_KEY=k.toString('base64url');e.FLUXER_VAPID_PUBLIC_KEY=d.getPublicKey().toString('base64url')}import(u.pathToFileURL(process.argv[1]).href) | Boot shim: derives FLUXER_VAPID_* from FLUXER_VAPID_SEED, then starts Fluxer. Don't edit |
| `MEDIA_UPSTREAM` | Fluxer | - | media-proxy upstream |
| `GATEWAY_UPSTREAM` | Fluxer | - | gateway upstream |
| `FLUXER_VAPID_SEED` | Fluxer | - | Seed the web-push VAPID keypair is derived from at boot |
| `FLUXER_BASE_DOMAIN` | Fluxer | - | Public hostname every service reads. Change this when you add a custom domain |
| `FLUXER_SUDO_MODE_SECRET` | Fluxer | (secret) | Sudo-mode JWT key |
| `FLUXER_ADMIN_SECRET_KEY_BASE` | Fluxer | (secret) | Admin session key |
| `FLUXER_GATEWAY_RPC_AUTH_TOKEN` | Fluxer | (secret) | API<->Gateway RPC token |
| `FLUXER_MEDIA_PROXY_SECRET_KEY` | Fluxer | (secret) | Media proxy URL signing key |
| `FLUXER_ADMIN_OAUTH_CLIENT_SECRET` | Fluxer | (secret) | Admin OAuth client secret |
| `FLUXER_CONNECTION_INITIATION_SECRET` | Fluxer | (secret) | Connection initiation token key |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_SECRET_BASE64` | Fluxer | (secret) | Upload relay token key (base64, >=32 bytes) |
| `PORT` | admin | 8080 | Listen port |
| `FLUXER_ENV` | admin | production | Runtime environment |
| `FLUXER_KV_URL` | admin | - | Valkey URL |
| `FLUXER_NATS_URL` | admin | - | NATS URL |
| `FLUXER_S3_REGION` | admin | us-east-1 | S3 region |
| `FLUXER_ADMIN_PORT` | admin | 8080 | Listen port |
| `FLUXER_SEARCH_URL` | admin | - | Meilisearch URL |
| `FLUXER_BASE_DOMAIN` | admin | - | Public hostname (set on the api service) |
| `FLUXER_PUBLIC_PORT` | admin | 443 | Public port |
| `FLUXER_S3_ENDPOINT` | admin | - | S3 endpoint (SeaweedFS) |
| `FLUXER_SELF_HOSTED` | admin | true | Self-hosted mode |
| `FLUXER_VAPID_EMAIL` | admin | - | Web push contact |
| `FLUXER_API_ENDPOINT` | admin | - | Internal API URL |
| `FLUXER_APP_ENDPOINT` | admin | - | Web app URL |
| `FLUXER_SVC_NATS_URL` | admin | - | NATS URL for internal services |
| `FLUXER_EMAIL_ENABLED` | admin | false | Email. Off = addresses auto-verified, no password reset mail |
| `FLUXER_PASSKEY_RP_ID` | admin | - | Passkey relying party |
| `FLUXER_POSTGRES_HOST` | admin | - | Postgres host |
| `FLUXER_POSTGRES_PORT` | admin | 5432 | Postgres port |
| `FLUXER_PUBLIC_SCHEME` | admin | https | Public scheme |
| `FLUXER_S3_BUCKET_CDN` | admin | fluxer | Processed assets bucket |
| `FLUXER_SEARCH_ENGINE` | admin | meilisearch | Search engine |
| `FLUXER_ADMIN_ENDPOINT` | admin | - | Admin dashboard URL |
| `FLUXER_MEDIA_ENDPOINT` | admin | - | Public media URL |
| `FLUXER_SEARCH_API_KEY` | admin | (secret) | Meilisearch master key |
| `FLUXER_ADMIN_BASE_PATH` | admin | /admin | Admin path |
| `FLUXER_LIVEKIT_ENABLED` | admin | false | Voice/video. Off: LiveKit needs UDP, which Railway does not offer |
| `FLUXER_SVC_SHARD_COUNT` | admin | 1 | Internal service shard count |
| `FLUXER_DATABASE_BACKEND` | admin | postgres | Database backend |
| `FLUXER_EMAIL_FROM_EMAIL` | admin | - | From address once SMTP is configured |
| `FLUXER_S3_ACCESS_KEY_ID` | admin | - | S3 access key |
| `FLUXER_SUDO_MODE_SECRET` | admin | (secret) | Sudo-mode JWT key |
| `FLUXER_POSTGRES_DATABASE` | admin | - | Postgres database |
| `FLUXER_POSTGRES_PASSWORD` | admin | (secret) | Postgres password |
| `FLUXER_POSTGRES_USERNAME` | admin | (secret) | Postgres user |
| `FLUXER_S3_BUCKET_REPORTS` | admin | fluxer-reports | Abuse reports bucket |
| `FLUXER_S3_BUCKET_UPLOADS` | admin | fluxer-uploads | Raw uploads bucket |
| `FLUXER_MARKETING_ENDPOINT` | admin | - | Marketing URL |
| `FLUXER_NATS_JETSTREAM_URL` | admin | - | NATS JetStream URL |
| `FLUXER_S3_BUCKET_HARVESTS` | admin | fluxer-harvests | Data export bucket |
| `FLUXER_S3_PUBLIC_ENDPOINT` | admin | - | S3 endpoint used in presigned URLs (relayed via /media) |
| `FLUXER_S3_FORCE_PATH_STYLE` | admin | true | Path-style S3 addressing |
| `FLUXER_STATIC_CDN_ENDPOINT` | admin | - | Static CDN URL |
| `FLUXER_GATEWAY_PUSH_ENABLED` | admin | false | Browser push notifications (push service not deployed) |
| `FLUXER_S3_SECRET_ACCESS_KEY` | admin | (secret) | S3 secret key |
| `FLUXER_ADMIN_SECRET_KEY_BASE` | admin | (secret) | Admin session key |
| `FLUXER_INTERNAL_API_ENDPOINT` | admin | - | Internal API URL |
| `FLUXER_GATEWAY_RPC_AUTH_TOKEN` | admin | (secret) | API<->Gateway RPC token |
| `FLUXER_MEDIA_PROXY_SECRET_KEY` | admin | (secret) | Media proxy URL signing key |
| `FLUXER_TRUST_CLIENT_IP_HEADER` | admin | true | Trust X-Forwarded-For set by the edge |
| `FLUXER_ADMIN_OAUTH_CLIENT_SECRET` | admin | (secret) | Admin OAuth client secret |
| `FLUXER_MEDIA_PROXY_PUBLIC_ENDPOINT` | admin | - | Public media URL |
| `FLUXER_CONNECTION_INITIATION_SECRET` | admin | (secret) | Connection initiation token key |
| `FLUXER_INTERNAL_MEDIA_PROXY_ENDPOINT` | admin | - | Internal media proxy URL |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_ENDPOINT` | admin | - | Upload relay URL |
| `FLUXER_PASSKEY_ADDITIONAL_ALLOWED_ORIGINS` | admin | - | Passkey origins |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_SECRET_BASE64` | admin | (secret) | Upload relay token key |
| `FLUXER_API_PRESIGNED_HARVEST_DOWNLOADS_ENABLED` | admin | false | Presigned data-export downloads |
| `MEILI_ENV` | Meilisearch | production | Meilisearch mode |
| `MEILI_HTTP_ADDR` | Meilisearch | [::]:7700 | Listen on IPv6 + IPv4 for private networking |
| `MEILI_MASTER_KEY` | Meilisearch | - | Auto-generated Meilisearch master key |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Disable telemetry |
| `MEILI_MAX_INDEXING_MEMORY` | Meilisearch | 256mb | Indexing memory cap |
| `MEILI_MAX_INDEXING_THREADS` | Meilisearch | 2 | Indexing threads |
| `PORT` | media-proxy | 8080 | Listen port |
| `FLUXER_ENV` | media-proxy | production | Runtime environment |
| `FLUXER_KV_URL` | media-proxy | - | Valkey URL |
| `FLUXER_NATS_URL` | media-proxy | - | NATS URL |
| `FLUXER_S3_REGION` | media-proxy | us-east-1 | S3 region |
| `FLUXER_SEARCH_URL` | media-proxy | - | Meilisearch URL |
| `FLUXER_BASE_DOMAIN` | media-proxy | - | Public hostname (set on the api service) |
| `FLUXER_PUBLIC_PORT` | media-proxy | 443 | Public port |
| `FLUXER_S3_ENDPOINT` | media-proxy | - | S3 endpoint (SeaweedFS) |
| `FLUXER_SELF_HOSTED` | media-proxy | true | Self-hosted mode |
| `FLUXER_VAPID_EMAIL` | media-proxy | - | Web push contact |
| `FLUXER_APP_ENDPOINT` | media-proxy | - | Web app URL |
| `FLUXER_SVC_NATS_URL` | media-proxy | - | NATS URL for internal services |
| `FLUXER_EMAIL_ENABLED` | media-proxy | false | Email. Off = addresses auto-verified, no password reset mail |
| `FLUXER_PASSKEY_RP_ID` | media-proxy | - | Passkey relying party |
| `FLUXER_POSTGRES_HOST` | media-proxy | - | Postgres host |
| `FLUXER_POSTGRES_PORT` | media-proxy | 5432 | Postgres port |
| `FLUXER_PUBLIC_SCHEME` | media-proxy | https | Public scheme |
| `FLUXER_S3_BUCKET_CDN` | media-proxy | fluxer | Processed assets bucket |
| `FLUXER_SEARCH_ENGINE` | media-proxy | meilisearch | Search engine |
| `FLUXER_ADMIN_ENDPOINT` | media-proxy | - | Admin dashboard URL |
| `FLUXER_MEDIA_ENDPOINT` | media-proxy | - | Public media URL |
| `FLUXER_S3_READ_SIGNED` | media-proxy | true | Sign S3 reads |
| `FLUXER_SEARCH_API_KEY` | media-proxy | (secret) | Meilisearch master key |
| `FLUXER_LIVEKIT_ENABLED` | media-proxy | false | Voice/video. Off: LiveKit needs UDP, which Railway does not offer |
| `FLUXER_SVC_SHARD_COUNT` | media-proxy | 1 | Internal service shard count |
| `FLUXER_DATABASE_BACKEND` | media-proxy | postgres | Database backend |
| `FLUXER_EMAIL_FROM_EMAIL` | media-proxy | - | From address once SMTP is configured |
| `FLUXER_MEDIA_PROXY_MODE` | media-proxy | upload | Serve media + upload relay |
| `FLUXER_MEDIA_PROXY_PORT` | media-proxy | 8080 | Listen port |
| `FLUXER_S3_ACCESS_KEY_ID` | media-proxy | - | S3 access key |
| `FLUXER_SUDO_MODE_SECRET` | media-proxy | (secret) | Sudo-mode JWT key |
| `FLUXER_POSTGRES_DATABASE` | media-proxy | - | Postgres database |
| `FLUXER_POSTGRES_PASSWORD` | media-proxy | (secret) | Postgres password |
| `FLUXER_POSTGRES_USERNAME` | media-proxy | (secret) | Postgres user |
| `FLUXER_S3_BUCKET_REPORTS` | media-proxy | fluxer-reports | Abuse reports bucket |
| `FLUXER_S3_BUCKET_UPLOADS` | media-proxy | fluxer-uploads | Raw uploads bucket |
| `FLUXER_MARKETING_ENDPOINT` | media-proxy | - | Marketing URL |
| `FLUXER_NATS_JETSTREAM_URL` | media-proxy | - | NATS JetStream URL |
| `FLUXER_S3_BUCKET_HARVESTS` | media-proxy | fluxer-harvests | Data export bucket |
| `FLUXER_S3_PUBLIC_ENDPOINT` | media-proxy | - | S3 endpoint used in presigned URLs (relayed via /media) |
| `FLUXER_S3_FORCE_PATH_STYLE` | media-proxy | true | Path-style S3 addressing |
| `FLUXER_GATEWAY_PUSH_ENABLED` | media-proxy | false | Browser push notifications (push service not deployed) |
| `FLUXER_S3_SECRET_ACCESS_KEY` | media-proxy | (secret) | S3 secret key |
| `FLUXER_ADMIN_SECRET_KEY_BASE` | media-proxy | (secret) | Admin session key |
| `FLUXER_INTERNAL_API_ENDPOINT` | media-proxy | - | Internal API URL |
| `FLUXER_GATEWAY_RPC_AUTH_TOKEN` | media-proxy | (secret) | API<->Gateway RPC token |
| `FLUXER_MEDIA_PROXY_SECRET_KEY` | media-proxy | (secret) | Media proxy URL signing key |
| `FLUXER_TRUST_CLIENT_IP_HEADER` | media-proxy | true | Trust X-Forwarded-For set by the edge |
| `FLUXER_ADMIN_OAUTH_CLIENT_SECRET` | media-proxy | (secret) | Admin OAuth client secret |
| `FLUXER_MEDIA_PROXY_PUBLIC_ENDPOINT` | media-proxy | - | Public media URL |
| `FLUXER_MEDIA_PROXY_STORAGE_BACKEND` | media-proxy | s3 | Storage backend |
| `FLUXER_CONNECTION_INITIATION_SECRET` | media-proxy | (secret) | Connection initiation token key |
| `FLUXER_INTERNAL_MEDIA_PROXY_ENDPOINT` | media-proxy | - | Internal media proxy URL |
| `FLUXER_MEDIA_PROXY_CORS_ALLOWED_ORIGINS` | media-proxy | - | CORS origins |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_ENDPOINT` | media-proxy | - | Upload relay URL |
| `FLUXER_PASSKEY_ADDITIONAL_ALLOWED_ORIGINS` | media-proxy | - | Passkey origins |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_SECRET_BASE64` | media-proxy | (secret) | Upload relay token key |
| `FLUXER_API_PRESIGNED_HARVEST_DOWNLOADS_ENABLED` | media-proxy | false | Presigned data-export downloads |
| `PORT` | gateway | 8080 | Listen port |
| `FLUXER_ENV` | gateway | production | Runtime environment |
| `FLUXER_KV_URL` | gateway | - | Valkey URL |
| `FLUXER_NATS_URL` | gateway | - | NATS URL |
| `FLUXER_S3_REGION` | gateway | us-east-1 | S3 region |
| `FLUXER_SEARCH_URL` | gateway | - | Meilisearch URL |
| `FLUXER_BASE_DOMAIN` | gateway | - | Public hostname (set on the api service) |
| `FLUXER_PUBLIC_PORT` | gateway | 443 | Public port |
| `FLUXER_S3_ENDPOINT` | gateway | - | S3 endpoint (SeaweedFS) |
| `FLUXER_SELF_HOSTED` | gateway | true | Self-hosted mode |
| `FLUXER_VAPID_EMAIL` | gateway | - | Web push contact |
| `FLUXER_APP_ENDPOINT` | gateway | - | Web app URL |
| `FLUXER_GATEWAY_PORT` | gateway | 8080 | Listen port |
| `FLUXER_SVC_NATS_URL` | gateway | - | NATS URL for internal services |
| `FLUXER_EMAIL_ENABLED` | gateway | false | Email. Off = addresses auto-verified, no password reset mail |
| `FLUXER_ERLANG_COOKIE` | gateway | - | BEAM distribution cookie |
| `FLUXER_PASSKEY_RP_ID` | gateway | - | Passkey relying party |
| `FLUXER_POSTGRES_HOST` | gateway | - | Postgres host |
| `FLUXER_POSTGRES_PORT` | gateway | 5432 | Postgres port |
| `FLUXER_PUBLIC_SCHEME` | gateway | https | Public scheme |
| `FLUXER_S3_BUCKET_CDN` | gateway | fluxer | Processed assets bucket |
| `FLUXER_SEARCH_ENGINE` | gateway | meilisearch | Search engine |
| `FLUXER_ADMIN_ENDPOINT` | gateway | - | Admin dashboard URL |
| `FLUXER_MEDIA_ENDPOINT` | gateway | - | Public media URL |
| `FLUXER_SEARCH_API_KEY` | gateway | (secret) | Meilisearch master key |
| `FLUXER_LIVEKIT_ENABLED` | gateway | false | Voice/video. Off: LiveKit needs UDP, which Railway does not offer |
| `FLUXER_SVC_SHARD_COUNT` | gateway | 1 | Internal service shard count |
| `FLUXER_DATABASE_BACKEND` | gateway | postgres | Database backend |
| `FLUXER_EMAIL_FROM_EMAIL` | gateway | - | From address once SMTP is configured |
| `FLUXER_S3_ACCESS_KEY_ID` | gateway | - | S3 access key |
| `FLUXER_SUDO_MODE_SECRET` | gateway | (secret) | Sudo-mode JWT key |
| `FLUXER_POSTGRES_DATABASE` | gateway | - | Postgres database |
| `FLUXER_POSTGRES_PASSWORD` | gateway | (secret) | Postgres password |
| `FLUXER_POSTGRES_USERNAME` | gateway | (secret) | Postgres user |
| `FLUXER_S3_BUCKET_REPORTS` | gateway | fluxer-reports | Abuse reports bucket |
| `FLUXER_S3_BUCKET_UPLOADS` | gateway | fluxer-uploads | Raw uploads bucket |
| `FLUXER_MARKETING_ENDPOINT` | gateway | - | Marketing URL |
| `FLUXER_NATS_JETSTREAM_URL` | gateway | - | NATS JetStream URL |
| `FLUXER_S3_BUCKET_HARVESTS` | gateway | fluxer-harvests | Data export bucket |
| `FLUXER_S3_PUBLIC_ENDPOINT` | gateway | - | S3 endpoint used in presigned URLs (relayed via /media) |
| `FLUXER_S3_FORCE_PATH_STYLE` | gateway | true | Path-style S3 addressing |
| `FLUXER_GATEWAY_PUSH_ENABLED` | gateway | false | Browser push notifications (push service not deployed) |
| `FLUXER_S3_SECRET_ACCESS_KEY` | gateway | (secret) | S3 secret key |
| `FLUXER_ADMIN_SECRET_KEY_BASE` | gateway | (secret) | Admin session key |
| `FLUXER_INTERNAL_API_ENDPOINT` | gateway | - | Internal API URL |
| `FLUXER_GATEWAY_RPC_AUTH_TOKEN` | gateway | (secret) | API<->Gateway RPC token |
| `FLUXER_MEDIA_PROXY_SECRET_KEY` | gateway | (secret) | Media proxy URL signing key |
| `FLUXER_TRUST_CLIENT_IP_HEADER` | gateway | true | Trust X-Forwarded-For set by the edge |
| `FLUXER_ADMIN_OAUTH_CLIENT_SECRET` | gateway | (secret) | Admin OAuth client secret |
| `FLUXER_GATEWAY_STATIC_CDN_ENDPOINT` | gateway | - | Static CDN URL |
| `FLUXER_MEDIA_PROXY_PUBLIC_ENDPOINT` | gateway | - | Public media URL |
| `FLUXER_CONNECTION_INITIATION_SECRET` | gateway | (secret) | Connection initiation token key |
| `FLUXER_GATEWAY_MEDIA_PROXY_ENDPOINT` | gateway | - | Public media URL |
| `FLUXER_INTERNAL_MEDIA_PROXY_ENDPOINT` | gateway | - | Internal media proxy URL |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_ENDPOINT` | gateway | - | Upload relay URL |
| `FLUXER_PASSKEY_ADDITIONAL_ALLOWED_ORIGINS` | gateway | - | Passkey origins |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_SECRET_BASE64` | gateway | (secret) | Upload relay token key |
| `FLUXER_API_PRESIGNED_HARVEST_DOWNLOADS_ENABLED` | gateway | false | Presigned data-export downloads |
| `POSTGRES_DB` | Postgres | fluxer | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |
| `GOMEMLIMIT` | SeaweedFS | 512MiB | Go heap soft limit |
| `S3_ACCESS_KEY` | SeaweedFS | fluxer | S3 access key |
| `S3_SECRET_KEY` | SeaweedFS | (secret) | Auto-generated S3 secret key |
| `WEED_MASTER_VOLUME_GROWTH_COPY_1` | SeaweedFS | 1 | Grow one volume at a time (upstream default) |
| `PORT` | api | 8080 | Listen port |
| `FLUXER_ENV` | api | production | Runtime environment |
| `FLUXER_KV_URL` | api | - | Valkey URL |
| `FLUXER_BOOT_JS` | api | - | Boot shim |
| `SVC_DEPENDENCY` | api | - | Orders this service after svc on deploy. Don't edit |
| `FLUXER_API_PORT` | api | 8080 | Listen port |
| `FLUXER_NATS_URL` | api | - | NATS URL |
| `FLUXER_S3_REGION` | api | us-east-1 | S3 region |
| `FLUXER_SEARCH_URL` | api | - | Meilisearch URL |
| `FLUXER_VAPID_SEED` | api | - | Seed for the derived VAPID keypair |
| `FLUXER_BASE_DOMAIN` | api | - | Public hostname (set on the api service) |
| `FLUXER_PUBLIC_PORT` | api | 443 | Public port |
| `FLUXER_S3_ENDPOINT` | api | - | S3 endpoint (SeaweedFS) |
| `FLUXER_SELF_HOSTED` | api | true | Self-hosted mode |
| `FLUXER_VAPID_EMAIL` | api | - | Web push contact |
| `FLUXER_APP_ENDPOINT` | api | - | Web app URL |
| `FLUXER_SVC_NATS_URL` | api | - | NATS URL for internal services |
| `FLUXER_EMAIL_ENABLED` | api | false | Email. Off = addresses auto-verified, no password reset mail |
| `FLUXER_PASSKEY_RP_ID` | api | - | Passkey relying party |
| `FLUXER_POSTGRES_HOST` | api | - | Postgres host |
| `FLUXER_POSTGRES_PORT` | api | 5432 | Postgres port |
| `FLUXER_PUBLIC_SCHEME` | api | https | Public scheme |
| `FLUXER_S3_BUCKET_CDN` | api | fluxer | Processed assets bucket |
| `FLUXER_SEARCH_ENGINE` | api | meilisearch | Search engine |
| `FLUXER_ADMIN_ENDPOINT` | api | - | Admin dashboard URL |
| `FLUXER_MEDIA_ENDPOINT` | api | - | Public media URL |
| `FLUXER_SEARCH_API_KEY` | api | (secret) | Meilisearch master key |
| `FLUXER_LIVEKIT_ENABLED` | api | false | Voice/video. Off: LiveKit needs UDP, which Railway does not offer |
| `FLUXER_SVC_SHARD_COUNT` | api | 1 | Internal service shard count |
| `FLUXER_DATABASE_BACKEND` | api | postgres | Database backend |
| `FLUXER_EMAIL_FROM_EMAIL` | api | - | From address once SMTP is configured |
| `FLUXER_S3_ACCESS_KEY_ID` | api | - | S3 access key |
| `FLUXER_SUDO_MODE_SECRET` | api | (secret) | Sudo-mode JWT key |
| `FLUXER_POSTGRES_DATABASE` | api | - | Postgres database |
| `FLUXER_POSTGRES_PASSWORD` | api | (secret) | Postgres password |
| `FLUXER_POSTGRES_USERNAME` | api | (secret) | Postgres user |
| `FLUXER_S3_BUCKET_REPORTS` | api | fluxer-reports | Abuse reports bucket |
| `FLUXER_S3_BUCKET_UPLOADS` | api | fluxer-uploads | Raw uploads bucket |
| `FLUXER_MARKETING_ENDPOINT` | api | - | Marketing URL |
| `FLUXER_NATS_JETSTREAM_URL` | api | - | NATS JetStream URL |
| `FLUXER_S3_BUCKET_HARVESTS` | api | fluxer-harvests | Data export bucket |
| `FLUXER_S3_PUBLIC_ENDPOINT` | api | - | S3 endpoint used in presigned URLs (relayed via /media) |
| `FLUXER_S3_FORCE_PATH_STYLE` | api | true | Path-style S3 addressing |
| `FLUXER_GATEWAY_PUSH_ENABLED` | api | false | Browser push notifications (push service not deployed) |
| `FLUXER_S3_SECRET_ACCESS_KEY` | api | (secret) | S3 secret key |
| `FLUXER_ADMIN_SECRET_KEY_BASE` | api | (secret) | Admin session key |
| `FLUXER_INTERNAL_API_ENDPOINT` | api | - | Internal API URL |
| `FLUXER_GATEWAY_RPC_AUTH_TOKEN` | api | (secret) | API<->Gateway RPC token |
| `FLUXER_MEDIA_PROXY_SECRET_KEY` | api | (secret) | Media proxy URL signing key |
| `FLUXER_TRUST_CLIENT_IP_HEADER` | api | true | Trust X-Forwarded-For set by the edge |
| `FLUXER_POSTGRES_MAX_CONNECTIONS` | api | 20 | Postgres pool size |
| `FLUXER_ADMIN_OAUTH_CLIENT_SECRET` | api | (secret) | Admin OAuth client secret |
| `FLUXER_MEDIA_PROXY_PUBLIC_ENDPOINT` | api | - | Public media URL |
| `FLUXER_CONNECTION_INITIATION_SECRET` | api | (secret) | Connection initiation token key |
| `FLUXER_INTERNAL_MEDIA_PROXY_ENDPOINT` | api | - | Internal media proxy URL |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_ENDPOINT` | api | - | Upload relay URL |
| `FLUXER_PASSKEY_ADDITIONAL_ALLOWED_ORIGINS` | api | - | Passkey origins |
| `FLUXER_MEDIA_PROXY_UPLOAD_RELAY_SECRET_BASE64` | api | (secret) | Upload relay token key |
| `FLUXER_API_PRESIGNED_HARVEST_DOWNLOADS_ENABLED` | api | false | Presigned data-export downloads |
| `FLUXER_API_PRESIGNED_ATTACHMENT_UPLOADS_ENABLED` | api | true | Presigned attachment uploads |
| `PORT` | app-proxy | 8080 | Listen port |
| `FLUXER_S3_REGION` | app-proxy | us-east-1 | S3 region |
| `FLUXER_BASE_DOMAIN` | app-proxy | - | Public hostname |
| `FLUXER_PUBLIC_PORT` | app-proxy | 443 | Public port |
| `FLUXER_S3_ENDPOINT` | app-proxy | - | S3 endpoint (SeaweedFS) |
| `FLUXER_PUBLIC_SCHEME` | app-proxy | https | Public scheme |
| `FLUXER_APP_PROXY_PORT` | app-proxy | 8080 | Listen port |
| `DISCOVERY_UPSTREAM_URL` | app-proxy | - | Discovery via the edge's internal listener |
| `FLUXER_S3_ACCESS_KEY_ID` | app-proxy | - | S3 access key |
| `FLUXER_S3_BUCKET_UPLOADS` | app-proxy | fluxer-uploads | Raw uploads bucket |
| `FLUXER_S3_SECRET_ACCESS_KEY` | app-proxy | (secret) | S3 secret key |
| `FLUXER_TRUST_CLIENT_IP_HEADER` | app-proxy | true | Trust X-Forwarded-For set by the edge |
| `PUBLIC_BOOTSTRAP_API_ENDPOINT` | app-proxy | /api | API path in the page bootstrap |
| `PUBLIC_BOOTSTRAP_API_PUBLIC_ENDPOINT` | app-proxy | - | Absolute API URL in the page bootstrap |

## Configuration

- **Start command:** `/bin/sh -c 'exec node -e "$FLUXER_BOOT_JS" dist/WorkerEntrypoint.js'`
- **Start command:** `/bin/sh -c "chown -R valkey:valkey /data && exec docker-entrypoint.sh valkey-server --requirepass $VALKEY_PASSWORD --appendonly yes --dir /data --maxmemory 192mb --maxmemory-policy noeviction"`
- **Volume:** `/data`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `nats-server -js -sd /data -m 8222`
- **Volume:** `/meili_data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'exec node -e "$FLUXER_BOOT_JS" dist/AppEntrypoint.js'`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/fluxer-chat)
