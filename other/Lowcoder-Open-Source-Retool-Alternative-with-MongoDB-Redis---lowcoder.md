# Deploy Lowcoder | Open-Source Retool Alternative with MongoDB & Redis on Railway

Drag-and-drop internal tools, admin panels and dashboards, self-hosted

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lowcoder)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/lowcoder?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=lowcoder)

[Lowcoder](https://lowcoder.cloud/) is the open-source Retool alternative: build internal tools, admin panels, dashboards and customer-facing apps with a drag-and-drop editor, connect them to your databases and APIs, script them with JavaScript, and share or embed the results. This template runs the official multi-image Lowcoder build (web frontend, API service and Node service) with MongoDB and Redis, and creates your super-admin account on first boot with a generated password.

The stack is five services: Lowcoder (the web frontend), lowcoder-api, lowcoder-node, MongoDB and Redis.

- **Upstream's own images, pinned.** All three Lowcoder services run the official `lowcoderorg/lowcoder-ce-*` images at a fixed release (2.7.6), not `latest`, so a redeploy never surprises you with an untested version. Database migrations run automatically when the API service boots, so upgrading is bumping the tag on all three.
- **Only the frontend is public.** The Lowcoder service serves the web app and proxies `/api` to the API service over Railway's private network. The API service, Node service, MongoDB and Redis have no public domain.
- **Proxy that follows redeploys.** The frontend's nginx resolves the API and Node services per request (instead of once at startup), so redeploying the API service never leaves the frontend pointing at a dead address.
- **No default credentials.** The super-admin is created from `LOWCODER_SUPERUSER_USERNAME` (your email, asked at deploy time) and a generated `LOWCODER_SUPERUSER_PASSWORD`. Every other secret upstream ships a public default for is generated per deployment: the database encryption password and salt, the API key signing secret, the API-to-Node service secret, and the MongoDB and Redis passwords.
- **Everything in MongoDB.** Apps, queries, data source credentials (encrypted) and uploaded files (GridFS) live in MongoDB 7 with authentication on, on its own volume. Redis keeps sessions in an append-only file on its own volume. The Lowcoder services themselves are stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.10.2-alpine` | Database |
| lowcoder-node | `lowcoderorg/lowcoder-ce-node-service:2.7.6` | Worker |
| lowcoder-api | `lowcoderorg/lowcoder-ce-api-service:2.7.6` | Worker |
| MongoDB | `mongo:7.0.43` | Database |
| Lowcoder | `lowcoderorg/lowcoder-ce-frontend:2.7.6` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | lowcoder-node | 6060 | Port the Node service listens on - leave as is |
| `API_HOST` | lowcoder-node | - | API service on the private network |
| `NODE_OPTIONS` | lowcoder-node | --max-old-space-size=384 | Node heap cap - the bundled data source plugins need about 300 MB at boot |
| `LOWCODER_NODE_SERVICE_SECRET` | lowcoder-node | (secret) | Encrypts data source configs exchanged with the API service (generated) |
| `LOWCODER_NODE_SERVICE_SECRET_SALT` | lowcoder-node | (secret) | Salt for the secret above (generated) |
| `PORT` | lowcoder-api | 8080 | Port the API service listens on - leave as is |
| `JAVA_OPTS` | lowcoder-api | -Xms64m -Xmx256m -XX:MaxMetaspaceSize=160m -XX:ReservedCodeCacheSize=48m -XX:TieredStopAtLevel=1 -XX:MaxDirectMemorySize=64m -Xss512k -XX:+UseSerialGC | JVM memory caps so the API service fits in 512 MB (Trial). On Hobby you can raise -Xmx (e.g. 768m) for large query results and drop TieredStopAtLevel=1 for full JIT |
| `MALLOC_ARENA_MAX` | lowcoder-api | 2 | Limits glibc malloc arenas - keeps the JVM's native memory small |
| `LOWCODER_REDIS_URL` | lowcoder-api | - | Redis on the private network |
| `LOWCODER_PUBLIC_URL` | lowcoder-api | - | Public URL of Lowcoder (invite links, emails, OAuth callbacks) - set it to your custom domain after adding one |
| `LOWCODER_MONGODB_URL` | lowcoder-api | - | MongoDB on the private network |
| `LOWCODER_API_KEY_SECRET` | lowcoder-api | (secret) | Signs personal API keys - changing it invalidates every key |
| `LOWCODER_WORKSPACE_MODE` | lowcoder-api | SAAS | SAAS: every sign-up gets its own workspace. ENTERPRISE: everyone joins the first workspace |
| `LOWCODER_ADMIN_SMTP_HOST` | lowcoder-api | - | Optional SMTP server for invitation and password-reset emails (Railway allows outbound SMTP on Pro only) |
| `LOWCODER_ADMIN_SMTP_PORT` | lowcoder-api | 587 | SMTP port |
| `LOWCODER_MAX_REQUEST_SIZE` | lowcoder-api | 20m | Max upload / query request and response size |
| `LOWCODER_NODE_SERVICE_URL` | lowcoder-api | - | Node service (JS execution and data source plugins) on the private network |
| `LOWCODER_DB_ENCRYPTION_SALT` | lowcoder-api | - | Salt for the database encryption above - never change it after first boot |
| `LOWCODER_EMAIL_AUTH_ENABLED` | lowcoder-api | true | Email + password sign-in. Keep true: the web UI hides the login and sign-up forms unless this is exactly true, and the super-admin signs in with it |
| `LOWCODER_SUPERUSER_PASSWORD` | lowcoder-api | (secret) | Super-admin password (generated). It is re-applied on every boot, so change it here, not in the UI |
| `LOWCODER_SUPERUSER_USERNAME` | lowcoder-api | (secret) | Your email - the super-admin login, created on first boot |
| `LOWCODER_ADMIN_SMTP_PASSWORD` | lowcoder-api | (secret) | SMTP password |
| `LOWCODER_ADMIN_SMTP_USERNAME` | lowcoder-api | (secret) | SMTP username |
| `LOWCODER_NODE_SERVICE_SECRET` | lowcoder-api | (secret) | Shared with the Node service - encrypts data source configs passed to it |
| `LOWCODER_EMAIL_SIGNUP_ENABLED` | lowcoder-api | true | Allow new accounts to sign up with email (needed for invite links). In the default SAAS mode every sign-up gets its own isolated workspace; set false to close sign-ups |
| `LOWCODER_DB_ENCRYPTION_PASSWORD` | lowcoder-api | (secret) | Encrypts data source credentials stored in MongoDB. BACK IT UP - changing it makes saved credentials unreadable |
| `LOWCODER_NODE_SERVICE_SECRET_SALT` | lowcoder-api | (secret) | Shared with the Node service |
| `LOWCODER_EMAIL_NOTIFICATIONS_SENDER` | lowcoder-api | - | Sender address for Lowcoder emails |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Auto-generated MongoDB root password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | MongoDB root user |
| `PORT` | Lowcoder | 3000 | Port the Lowcoder web server (nginx) listens on - leave as is |
| `LOWCODER_API_SERVICE_URL` | Lowcoder | - | API service on the private network (nginx proxies /api here) |
| `LOWCODER_MAX_REQUEST_SIZE` | Lowcoder | 20m | Max upload / request size - keep in sync with the API service |
| `LOWCODER_NODE_SERVICE_URL` | Lowcoder | - | Node service on the private network |
| `LOWCODER_MAX_QUERY_TIMEOUT` | Lowcoder | 120 | Proxy timeout in seconds for long-running queries |

## Configuration

- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "cd /lowcoder/node-service/app && exec gosu lowcoder node ./build/server.js"`
- **Healthcheck:** `/`
- **Healthcheck:** `/api/status/health`
- **Start command:** `docker-entrypoint.sh mongod --bind_ip_all --ipv6 --wiredTigerCacheSizeGB 0.25`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "grep -q '^resolver' /etc/nginx/server.conf || { R=$(awk '/^nameserver/{print $2; exit}' /etc/resolv.conf); case $R in *:*) R=[$R];; esac; sed -i -e '1i resolver '$R' valid=10s;' -e 's#proxy_pass __LOWCODER_API_SERVICE_URL__;#set $lc_up __LOWCODER_API_SERVICE_URL__; proxy_pass $lc_up;#' -e 's#proxy_pass __LOWCODER_NODE_SERVICE_URL__;#set $lc_up __LOWCODER_NODE_SERVICE_URL__; proxy_pass $lc_up;#' /etc/nginx/server.conf; }; exec /docker-entrypoint.sh nginx -g 'daemon off;'"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/lowcoder)
