# Deploy Buzz | Open Source Slack Alternative with AI Agents on Railway

Self-hosted team chat with AI agents, git repos and QR pairing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/buzz-relay-workspace)

## About

Buzz is an open-source team communication platform from Block — channels, threads, huddles and git repositories, with AI agents as first-class members rather than bots bolted on. This template deploys the self-hosted relay with PostgreSQL, Redis, object storage and the device-pairing sidecar, fully wired.

Four services and a bucket, all from official upstream images:

- **Buzz** — the relay: WebSocket protocol, REST API, git smart HTTP and the bundled web UI. Public domain, health check, and a signing identity generated on deploy.
- **Pairing** — the NIP-AB device-pairing sidecar, on its own domain. This is the piece that makes mobile QR pairing work; see below.
- **Postgres** — messages, channels, memberships and workspace state, on a volume.
- **Redis** — pub/sub between relay processes and rate-limit counters. Deliberately without a volume: nothing here is authoritative, and a Redis container cannot write to a Railway volume anyway — the way that fails is to stop accepting writes altogether.
- **Bucket** — Railway object storage, holding uploaded media **and every git repository**.

Every variable is filled in and described on the deploy screen. Exactly one is yours to supply — your Nostr public key, which is the account that owns the workspace.

Four things this template does that are worth knowing about:

**Mobile QR pairing actually works.** The relay advertises NIP-43 in its NIP-11 document, from which clients infer a `/pair` sidecar — and no self-hosted deployment stands one up. The Compose bundle has no such service and the Helm chart ships it disabled, so pairing a phone fails with `WebSocket connection failed: HTTP error: 404 Not Found` (upstream issue #3842). Upstream's workaround is a reverse proxy mapping `/pair`. Here the sidecar simply has a domain of its own and the relay advertises it directly, so nothing has to guess. Verified end to end: a signed `kind:24134` handshake published on one connection is delivered to a `#p`-filtered subscriber on another, and a tampered signature is rejected.

**It takes your key in the form you actually have it.** The relay accepts `RELAY_OWNER_PUBKEY` only as 64-character hex, and Nostr shows identities as `npub1…` — so pasting what is on your clipboard makes the relay log *"not a valid 64-char hex pubkey — ignoring"* and then refuse to boot, because membership enforcement needs an owner. A correct-looking value produces a crash loop. This template decodes bech32 in the start command and hands hex to the relay; either form works, and the log says which one it got.

**It waits for its databases.** The relay does not retry — it exits when Postgres or Redis is not answering yet, and Railway starts services in parallel, so on a cold deploy that race is the default rather than the exception. The start command waits for both first, and the relay is allowed enough restarts to survive a database restart later on.

**It pins a released version.** The image is `0.2.1`, the newest actual release and what `latest` resolves to. `main` is rebuilt on every merge into a repository that takes dozens of commits a day.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pairing | `ghcr.io/block/buzz:0.2.1` | Web service |
| Buzz | `ghcr.io/block/buzz:0.2.1` | Web service |
| Redis | `redis:8.10.0-alpine` | Database |
| Postgres | `postgres:18.4-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Pairing | 5000 | Port Railway routes traffic to. Must match BUZZ_PAIR_RELAY_BIND_ADDR. |
| `BUZZ_PAIR_RELAY_BIND_ADDR` | Pairing | [::]:5000 | Listen address for the pairing sidecar. Parsed strictly as a socket address, so the brackets are required. |
| `PORT` | Buzz | 3000 | Port Railway routes traffic and health checks to. Must match BUZZ_BIND_ADDR. |
| `RUST_LOG` | Buzz | buzz_relay=info,buzz_db=info,buzz_auth=info,buzz_pubsub=info,tower_http=warn | Log filters. tower_http=warn keeps one line per request out of the log; raise it to info while debugging a client. |
| `REDIS_URL` | Buzz | - | Redis connection string, wired to the cache in this project. |
| `RELAY_URL` | Buzz | - | Public WebSocket URL clients connect to. The relay derives its workspace from the host here - point it somewhere else and the relay serves a brand-new empty workspace instead of yours. |
| `DATABASE_URL` | Buzz | - | Postgres connection string, wired to the database in this project. |
| `DB_WAIT_HOST` | Buzz | - | Read by the start command, which waits for Postgres before starting the relay. |
| `DB_WAIT_PORT` | Buzz | 5432 | Port the start command waits on before starting the relay. |
| `BUZZ_BIND_ADDR` | Buzz | [::]:3000 | Listen address. The brackets are required - the relay parses this as a socket address, and a bare :: is a parse error. The IPv6 wildcard stays dual-stack, so IPv4 health checks are answered too. |
| `BUZZ_S3_BUCKET` | Buzz | - | Bucket holding media and git objects. |
| `BUZZ_S3_REGION` | Buzz | - | Bucket region. |
| `REDIS_WAIT_HOST` | Buzz | - | Read by the start command, which waits for Redis before starting the relay. |
| `REDIS_WAIT_PORT` | Buzz | 6379 | Port the start command waits on before starting the relay. |
| `BUZZ_S3_ENDPOINT` | Buzz | - | Object storage endpoint. Media and every git repository live here. |
| `BUZZ_AUTO_MIGRATE` | Buzz | true | Runs database migrations on start. Off by default upstream, which leaves a fresh database with no schema. |
| `BUZZ_CORS_ORIGINS` | Buzz | - | Browser origins allowed to call the REST API. The two tauri:// entries are the desktop app - remove them and the app connects but every request is blocked. |
| `BUZZ_GIT_REPO_PATH` | Buzz | /data/git | Scratch directory git repositories are hydrated into on demand. Not where they are stored - that is the bucket - so nothing here needs to survive a restart. |
| `BUZZ_S3_ACCESS_KEY` | Buzz | - | Bucket access key. |
| `BUZZ_S3_SECRET_KEY` | Buzz | (secret) | Bucket secret key. |
| `RELAY_OWNER_PUBKEY` | Buzz | - | Your Nostr public key - the account that owns this workspace and can invite everyone else. Paste either the npub1... form the Buzz app shows you or a 64-character hex key; this template converts npub to hex for you. It cannot be generated here because it is your identity, not the server's. |
| `BUZZ_MEDIA_BASE_URL` | Buzz | - | Public URL prefix that uploaded media is served from. |
| `BUZZ_ALLOW_NIP_OA_AUTH` | Buzz | true | Allows NIP-OA authentication, which is how agents attach to the workspace. |
| `BUZZ_PAIRING_RELAY_URL` | Buzz | - | Advertised in the relay's NIP-11 document so phones find the pairing sidecar. Without it clients guess at a /pair path that does not exist and QR pairing fails with a 404. |
| `BUZZ_RELAY_PRIVATE_KEY` | Buzz | - | The relay's own signing identity, generated once for this deployment. Changing it invalidates every outstanding invite and makes already-signed membership events unverifiable. |
| `BUZZ_REQUIRE_AUTH_TOKEN` | Buzz | (secret) | Requires a token on REST calls. Turn it off only for local debugging. |
| `BUZZ_MEDIA_SERVER_DOMAIN` | Buzz | - | Domain advertised to clients for media uploads. |
| `BUZZ_S3_ADDRESSING_STYLE` | Buzz | virtual | Railway buckets serve virtual-hosted URLs. Set this to path and every object read returns 404, which fails the git storage probe at boot. |
| `BUZZ_GIT_HOOK_HMAC_SECRET` | Buzz | (secret) | Signs git hook callbacks. Generated once for this deployment. |
| `BUZZ_GIT_CONFORMANCE_PROBE` | Buzz | true | Tests the bucket's conditional-write behaviour on start and refuses to serve git if it fails, instead of discovering the problem during a push. |
| `BUZZ_REQUIRE_RELAY_MEMBERSHIP` | Buzz | true | Restricts the workspace to invited members. Setting this to false makes every message readable by anyone who finds the URL. |
| `PORT` | Redis | 6379 | Port Redis listens on inside the private network. |
| `PORT` | Postgres | 5432 | Port Postgres listens on inside the private network. |
| `POSTGRES_DB` | Postgres | buzz | Database name. It is baked into the relay's connection string - renaming it here alone breaks the relay. |
| `POSTGRES_USER` | Postgres | (secret) | Database user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once for this deployment. Letters and digits only, because it is embedded in a connection URL. |

## Configuration

- **Start command:** `/usr/local/bin/buzz-pair-relay`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bash -c 'for i in $(seq 1 90); do (echo > /dev/tcp/$DB_WAIT_HOST/$DB_WAIT_PORT) 2>/dev/null && break; echo "waiting for postgres ($i/90)"; sleep 2; done; for i in $(seq 1 90); do (echo > /dev/tcp/$REDIS_WAIT_HOST/$REDIS_WAIT_PORT) 2>/dev/null && break; echo "waiting for redis ($i/90)"; sleep 2; done; o=$(printf %s "$RELAY_OWNER_PUBKEY" | tr "[:upper:]" "[:lower:]" | tr -d "[:space:]"); if [ -n "$o" ] && [ -z "${o##npub1*}" ]; then d=${o#npub1}; d=${d:0:${#d}-6}; cs=qpzry9x8gf2tvdw0s3jn54khce6mua7l; a=0; b=0; h=; for ((i=0;i<${#d};i++)); do c=${d:i:1}; t=${cs%%"$c"*}; if [ "$t" = "$cs" ]; then h=; break; fi; a=$(( (a<<5) | ${#t} )); b=$((b+5)); while [ $b -ge 8 ]; do b=$((b-8)); printf -v x "%02x" $(( (a>>b) & 255 )); h=$h$x; done; done; if [ ${#h} -eq 64 ]; then echo "RELAY_OWNER_PUBKEY: decoded npub to hex"; RELAY_OWNER_PUBKEY=$h; else echo "RELAY_OWNER_PUBKEY: starts with npub1 but did not decode - passing it through unchanged"; fi; else RELAY_OWNER_PUBKEY=$o; fi; export RELAY_OWNER_PUBKEY; exec /usr/local/bin/buzz-relay'`
- **Healthcheck:** `/_readiness`
- **Volume:** `/var/lib/postgresql`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/buzz-relay-workspace)
