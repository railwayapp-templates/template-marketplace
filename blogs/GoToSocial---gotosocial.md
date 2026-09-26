# Deploy GoToSocial on Railway

GoToSocial 0.22: lightweight ActivityPub server for the fediverse.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gotosocial)

## About

GoToSocial is a lightweight ActivityPub server for the fediverse. It lets you run your own Mastodon-compatible account or small instance that follows and talks to people on Mastodon, Pixelfed, Akkoma and other servers. It has no built-in timeline UI; you use apps such as Phanpy, Elk, Tusky or Ivory.

This template runs the official `superseriousbusiness/gotosocial:0.22.1` image as one service, with SQLite and media storage on a Railway volume. On first boot a seed step creates an admin account from the variables, confirms it and grants admin rights. Registration is closed, so the instance is yours until you open it. The server trusts Railway's proxy range, so rate limiting sees real client IPs. Important: the host name becomes part of every account address and can never change after you federate, so add your custom domain and set `GTS_HOST` before the first boot if you want one. It uses about 150 MB of memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gotosocial | `superseriousbusiness/gotosocial:0.22.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `GTS_PORT` | 8080 |
| `ADMIN_EMAIL` | admin@example.com |
| `GTS_DB_TYPE` | sqlite |
| `GTS_PROTOCOL` | https |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |
| `GTS_DB_ADDRESS` | /gotosocial/storage/sqlite.db |
| `GTS_BIND_ADDRESS` | 0.0.0.0 |
| `GTS_TRUSTED_PROXIES` | 100.64.0.0/10 |
| `GTS_LETSENCRYPT_ENABLED` | false |
| `GTS_STORAGE_LOCAL_BASE_PATH` | /gotosocial/storage |
| `GTS_ACCOUNTS_REGISTRATION_OPEN` | false |

## Configuration

- **Start command:** `sh -c 'G=/gotosocial/gotosocial; $G server start & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; (for i in $(seq 1 60); do sleep 3; out=$($G admin account create --username $ADMIN_USERNAME --email $ADMIN_EMAIL --password $ADMIN_PASSWORD 2>&1) && { $G admin account confirm --username $ADMIN_USERNAME && $G admin account promote --username $ADMIN_USERNAME; echo "[seed] admin $ADMIN_USERNAME created"; break; }; case "$out" in *already*|*taken*|*exists*) echo "[seed] admin already set up"; break;; esac; done) 2>&1 | grep seed & wait $pid'`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/gotosocial/storage`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/gotosocial)
