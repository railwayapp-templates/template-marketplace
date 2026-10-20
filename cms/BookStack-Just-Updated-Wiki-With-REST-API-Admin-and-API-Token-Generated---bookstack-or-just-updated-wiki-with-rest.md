# Deploy BookStack | (Just Updated) Wiki With REST API, Admin and API Token Generated on Railway

BookStack wiki + MariaDB, admin and API token generated, no setup needed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bookstack-or-just-updated-wiki-with-rest)

## About

BookStack is the open-source wiki that organises documentation as shelves, books, chapters and pages, with a full REST API. This template deploys BookStack with its own MariaDB database, a persistent volume, and **everything an AI agent needs already generated** - nothing to fill in, no browser step, no default password left behind.

**Easy for an LLM agent to use.** There is no manual deploy step: deploy, read the variables below, and call the API. The admin login and a working API token pair are generated at deploy time (BookStack's well-known `admin@admin.com` / `password` is replaced on first boot), the contract block below lists every URL and variable name, and one `curl` against `/api/books` works as soon as the service is healthy.

Two services run in one Railway project:

- **bookstack** - the `linuxserver/bookstack` image (pinned by digest: nginx, PHP-FPM, queue worker and cron in one container). The uploads, images, themes and config live on a volume mounted at `/config`.
- **mariadb** - the official `mariadb` image (pinned by digest) on its own volume. The data directory is a subfolder of the mount, so the filesystem's `lost+found` never lands inside it. The database password is generated and wired into BookStack over the private network.

On first boot the start command derives a valid Laravel `APP_KEY` (`base64:` plus 32 bytes) from a generated seed, waits for MariaDB, lets BookStack run its migrations, then a boot step (a) rewrites the default admin with the generated email and password and (b) creates the API token pair in the database. On every later boot the same step finds both already in place and changes nothing, so redeploys are safe.

### Agent contract

- Base URL: `https://` (also in variable `APP_URL`)
- Health path: `GET /status` - unauthenticated, returns `{"database":true,"cache":true,"session":true}`
- Admin login (`/login`): email in `BOOKSTACK_ADMIN_EMAIL`, password in `BOOKSTACK_ADMIN_PASSWORD`
- API token id: `BOOKSTACK_API_TOKEN_ID`, token secret: `BOOKSTACK_API_TOKEN_SECRET` (admin role, expires in 100 years)
- API header: `Authorization: Token :`
- API reference: `/api/docs` (after logging in)
- Database (private network only): service `mariadb`, host in `DB_HOST`, password in `DB_PASSWORD`, database and user `bookstack`
- Generated variables, all on the `bookstack` service: `BOOKSTACK_KEY_SEED`, `BOOKSTACK_ADMIN_PASSWORD`, `BOOKSTACK_API_TOKEN_ID`, `BOOKSTACK_API_TOKEN_SECRET`

One working call:

```bash
curl -s https:///api/books \
  -H "Authorization: Token $BOOKSTACK_API_TOKEN_ID:$BOOKSTACK_API_TOKEN_SECRET"

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11.8@sha256:6422478cb8e159f080fb1d8ccf65101e26fe51385787fde7d16c3b165a331f15` | Database |
| bookstack | `linuxserver/bookstack@sha256:0d66f65417fa667085849bf9b32b412ec9a90420773c4f47a95138c4711876b7` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_PASSWORD` | mariadb | (secret) |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |
| `DB_PASSWORD` | bookstack | (secret) |
| `BOOKSTACK_API_TOKEN_ID` | bookstack | (secret) |
| `BOOKSTACK_ADMIN_PASSWORD` | bookstack | (secret) |
| `BOOKSTACK_API_TOKEN_SECRET` | bookstack | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); if [ "$M" != max ]; then B=$((M / 2 / 1048576)); [ "$B" -lt 128 ] && B=128; else B=512; fi; export MARIADB_DATABASE=bookstack MARIADB_USER=bookstack; echo "[railway] uid=$(id -u) innodbBufferPoolMB=$B owner=$(stat -c %u:%g /var/lib/mysql)"; exec docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data --innodb-buffer-pool-size=${B}M --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci'`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'set -e; export PUID=1000 PGID=1000 TZ=Etc/UTC DB_PORT=3306 DB_DATABASE=bookstack DB_USERNAME=bookstack APP_PROXIES="*"; export APP_KEY="base64:$(printf %s "$BOOKSTACK_KEY_SEED" | openssl dgst -sha256 -binary | openssl base64 -A)"; mkdir -p /custom-cont-init.d; echo "IyEvYmluL2Jhc2gKIyBCb29rU3RhY2sgb24gUmFpbHdheTogcnVucyBpbnNpZGUgdGhlIExpbnV4U2VydmVyIGluaXQgY2hhaW4sIGFzIHJvb3QsIEFGVEVSIHRoZQojIGRhdGFiYXNlIG1pZ3JhdGlvbnMgYW5kIEJFRk9SRSBuZ2lueCAvIHBocC1mcG0gc3RhcnQuIFNhZmUgdG8gcnVuIG9uIGV2ZXJ5IGJvb3QuCiMgIDEuIFJlcGxhY2UgdGhlIGRlZmF1bHQgYWRtaW4gKGFkbWluQGFkbWluLmNvbSAvIHBhc3N3b3JkKSB3aXRoIHRoZSBnZW5lcmF0ZWQgY3JlZGVudGlhbC4KIyAgMi4gQ3JlYXRlIHRoZSBnZW5lcmF0ZWQgQVBJIHRva2VuIHBhaXIgaWYgaXQgaXMgbm90IHRoZXJlIHlldC4KY2QgL2FwcC93d3cgfHwgZXhpdCAxCgojIGJvb2tzdGFjazpjcmVhdGUtYWRtaW4gLS1pbml0aWFsIHJld3JpdGVzIHRoZSBkZWZhdWx0IGFkbWluIG9uY2U7IG9uIGxhdGVyIGJvb3RzIHRoZSBkZWZhdWx0CiMgYWRtaW4gaXMgYWxyZWFkeSBnb25lIGFuZCBpdCBleGl0cyAyICgibm9uLWRlZmF1bHQgYWRtaW4gZXhpc3RzIiksIHdoaWNoIGlzIGNvcnJlY3QuCnM2LXNldHVpZGdpZCBhYmMgcGhwIGFydGlzYW4gYm9va3N0YWNrOmNyZWF0ZS1hZG1pbiAtLWluaXRpYWwgXAogIC0tZW1haWw9IiRCT09LU1RBQ0tfQURNSU5fRU1BSUwiIC0tbmFtZT0iQWRtaW4iIC0tcGFzc3dvcmQ9IiRCT09LU1RBQ0tfQURNSU5fUEFTU1dPUkQiCmVjaG8gIltyYWlsd2F5XSBjcmVhdGUtYWRtaW4gZXhpdD0kPyIKCnBocCAtciAnCiRwZG8gPSBuZXcgUERPKAogICJteXNxbDpob3N0PSIgLiBnZXRlbnYoIkRCX0hPU1QiKSAuICI7cG9ydD0iIC4gZ2V0ZW52KCJEQl9QT1JUIikgLiAiO2RibmFtZT0iIC4gZ2V0ZW52KCJEQl9EQVRBQkFTRSIpLAogIGdldGVudigiREJfVVNFUk5BTUUiKSwgZ2V0ZW52KCJEQl9QQVNTV09SRCIpLCBbUERPOjpBVFRSX0VSUk1PREUgPT4gUERPOjpFUlJNT0RFX0VYQ0VQVElPTl0pOwokdGlkID0gZ2V0ZW52KCJCT09LU1RBQ0tfQVBJX1RPS0VOX0lEIik7ICRzZWMgPSBnZXRlbnYoIkJPT0tTVEFDS19BUElfVE9LRU5fU0VDUkVUIik7CmlmICgkdGlkID09PSAiIiB8fCAkc2VjID09PSAiIikgeyBlY2hvICJbcmFpbHdheV0gbm8gQVBJIHRva2VuIHZhcmlhYmxlcyBzZXQsIHNraXBwaW5nIHRva2VuXG4iOyBleGl0KDApOyB9CiRxID0gJHBkby0+cHJlcGFyZSgiU0VMRUNUIGlkIEZST00gdXNlcnMgV0hFUkUgZW1haWwgPSA/Iik7ICRxLT5leGVjdXRlKFtnZXRlbnYoIkJPT0tTVEFDS19BRE1JTl9FTUFJTCIpXSk7CiR1aWQgPSAkcS0+ZmV0Y2hDb2x1bW4oKTsKaWYgKCEkdWlkKSB7CiAgJHVpZCA9ICRwZG8tPnF1ZXJ5KCJTRUxFQ1QgcnUudXNlcl9pZCBGUk9NIHJvbGVfdXNlciBydSBKT0lOIHJvbGVzIHIgT04gci5pZCA9IHJ1LnJvbGVfaWQKICAgICAgICAgICAgICAgICAgICAgIFdIRVJFIHIuc3lzdGVtX25hbWUgPSBcImFkbWluXCIgT1JERVIgQlkgcnUudXNlcl9pZCBMSU1JVCAxIiktPmZldGNoQ29sdW1uKCk7Cn0KaWYgKCEkdWlkKSB7IGVjaG8gIltyYWlsd2F5XSBubyBhZG1pbiB1c2VyIGZvdW5kLCBza2lwcGluZyB0b2tlblxuIjsgZXhpdCgwKTsgfQokcSA9ICRwZG8tPnByZXBhcmUoIlNFTEVDVCBpZCwgc2VjcmV0LCB1c2VyX2lkIEZST00gYXBpX3Rva2VucyBXSEVSRSB0b2tlbl9pZCA9ID8iKTsgJHEtPmV4ZWN1dGUoWyR0aWRdKTsKJHJvdyA9ICRxLT5mZXRjaChQRE86OkZFVENIX0FTU09DKTsgJG5vdyA9IGRhdGUoIlktbS1kIEg6aTpzIik7CmlmICghJHJvdykgewogICRwZG8tPnByZXBhcmUoIklOU0VSVCBJTlRPIGFwaV90b2tlbnMgKG5hbWUsIHRva2VuX2lkLCBzZWNyZXQsIHVzZXJfaWQsIGV4cGlyZXNfYXQsIGNyZWF0ZWRfYXQsIHVwZGF0ZWRfYXQpIFZBTFVFUyAoPyw/LD8sPyw/LD8sPykiKQogICAgICAtPmV4ZWN1dGUoWyJyYWlsd2F5LWFnZW50IiwgJHRpZCwgcGFzc3dvcmRfaGFzaCgkc2VjLCBQQVNTV09SRF9CQ1JZUFQpLCAkdWlkLCBkYXRlKCJZLW0tZCIsIHN0cnRvdGltZSgiKzEwMCB5ZWFycyIpKSwgJG5vdywgJG5vd10pOwogIGVjaG8gIltyYWlsd2F5XSBBUEkgdG9rZW4gY3JlYXRlZCBmb3IgdXNlciAkdWlkXG4iOwp9IGVsc2VpZiAoIXBhc3N3b3JkX3ZlcmlmeSgkc2VjLCAkcm93WyJzZWNyZXQiXSkgfHwgKGludCkkcm93WyJ1c2VyX2lkIl0gIT09IChpbnQpJHVpZCkgewogICRwZG8tPnByZXBhcmUoIlVQREFURSBhcGlfdG9rZW5zIFNFVCBzZWNyZXQgPSA/LCB1c2VyX2lkID0gPywgdXBkYXRlZF9hdCA9ID8gV0hFUkUgaWQgPSA/IikKICAgICAgLT5leGVjdXRlKFtwYXNzd29yZF9oYXNoKCRzZWMsIFBBU1NXT1JEX0JDUllQVCksICR1aWQsICRub3csICRyb3dbImlkIl1dKTsKICBlY2hvICJbcmFpbHdheV0gQVBJIHRva2VuIHJlZnJlc2hlZFxuIjsKfSBlbHNlIHsgZWNobyAiW3JhaWx3YXldIEFQSSB0b2tlbiBhbHJlYWR5IHByZXNlbnRcbiI7IH0KJwplY2hvICJbcmFpbHdheV0gdG9rZW4gc3RlcCBleGl0PSQ/Igo=" | base64 -d > /custom-cont-init.d/10-railway.sh; chmod +x /custom-cont-init.d/10-railway.sh; P=${PORT:-8080}; sed -i "s/listen 80 /listen $P /; s/listen \[::\]:80 /listen [::]:$P /" /defaults/nginx/site-confs/default.conf.sample /config/nginx/site-confs/default.conf 2>/dev/null || true; echo "[railway] uid=$(id -u) config_owner=$(stat -c %u:%g /config) port=$P db=$DB_HOST"; n=0; until nc -z -w2 "$DB_HOST" "$DB_PORT" 2>/dev/null; do n=$((n+1)); if [ $n -gt 150 ]; then echo "[railway] database never answered"; break; fi; sleep 2; done; exec /init'`
- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/bookstack-or-just-updated-wiki-with-rest)
