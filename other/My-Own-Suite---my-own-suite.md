# Deploy My Own Suite on Railway

All-in-one private cloud with files, photos, docs, calendar, and more.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/my-own-suite)

## About

My Own Suite is a curated private cloud suite that helps people move away from Google, Apple, and Microsoft services without giving up convenience. It bundles trusted open-source apps for files, documents, photos, passwords, calendars, PDFs, and dashboard access into one cohesive setup with a guided first-run experience.

![My Own Suite dashboard](https://github.com/rpuls/my-own-suite/raw/main/site/src/assets/screenshots/homepage/my-own-suite-homepage-dashboard-private-cloud-launchpad.png)

Hosting My Own Suite means running your own connected set of everyday cloud tools instead of relying on a consumer platform that owns the app layer and ecosystem. Rather than assembling each service manually, this template gives you a ready-made private cloud that feels like one product instead of a loose bundle of containers. Railway makes this especially approachable by handling the hosting layer for you, so you can focus on using the suite instead of managing server infrastructure. It is the easiest way to get My Own Suite online, evaluate the experience, and start using your own hosted alternatives for storage, passwords, photos, calendars, and browser-based work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Seafile | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/seafile) | Web service |
| MySQL | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/seafile) | Database |
| Vaultwarden-Postgres | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/vaultwarden) | Database |
| My Own Suite | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/suite-manager) | Web service |
| radicale-proxy | `ghcr.io/railwayapp/function-bun:1.3.0` | Web service |
| Immich | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/immich) | Web service |
| Memcached | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/seafile) | Worker |
| Immich-ml | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/immich) | Worker |
| Radicale | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/radicale) | Web service |
| Immich-postgres | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/immich) | Database |
| Homepage | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/homepage) | Worker |
| OnlyOffice | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/onlyoffice) | Web service |
| Vaultwarden | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/vaultwarden) | Web service |
| Stirling | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/stirling-pdf) | Web service |
| Immich-valkey | [rpuls/my-own-suite](https://github.com/rpuls/my-own-suite) (branch: main) (root: /apps/immich) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_USER_HOST` | Seafile | % | - |
| `SMTP_PASSWORD` | Seafile | (secret) | - |
| `SMTP_USERNAME` | Seafile | (secret) | - |
| `ONLYOFFICE_JWT_SECRET` | Seafile | (secret) | - |
| `SEAFILE_ADMIN_PASSWORD` | Seafile | (secret) | - |
| `SEAFILE_SERVER_PROTOCOL` | Seafile | https | - |
| `VERIFY_ONLYOFFICE_CERTIFICATE` | Seafile | true | - |
| `MYSQLPORT` | MySQL | 3306 | - |
| `MYSQLUSER` | MySQL | root | - |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | seafile | - |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `POSTGRES_DB` | Vaultwarden-Postgres | vaultwarden | - |
| `POSTGRES_USER` | Vaultwarden-Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Vaultwarden-Postgres | (secret) | - |
| `TIMEZONE` | My Own Suite | UTC | Use any TZ identifier from [this list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#Type) |
| `SMTP_FROM` | My Own Suite | noreply@example.com | Sender email shown on outgoing mail |
| `SMTP_HOST` | My Own Suite | smtp.example.com | Custom SMTP host for advanced users |
| `SMTP_PORT` | My Own Suite | 587 | Custom SMTP port, usually 587 for STARTTLS |
| `SMTP_ENABLED` | My Own Suite | false | Enable email features for compatible apps |
| `SMTP_PASSWORD` | My Own Suite | (secret) | Custom SMTP password or API key |
| `SMTP_SECURITY` | My Own Suite | starttls | SMTP security: starttls, force_tls, or off |
| `SMTP_USERNAME` | My Own Suite | (secret) | Custom SMTP username |
| `OWNER_PASSWORD` | My Own Suite | (secret) | - |
| `SESSION_SECRET` | My Own Suite | (secret) | - |
| `SMTP_FROM_NAME` | My Own Suite | My Own Suite | Sender name shown in inboxes |
| `PUBLIC_URL_SCHEME` | My Own Suite | https | - |
| `SEAFILE_ADMIN_PASSWORD` | My Own Suite | (secret) | - |
| `RADICALE_ADMIN_PASSWORD` | My Own Suite | (secret) | - |
| `RADICALE_ADMIN_USERNAME` | My Own Suite | (secret) | - |
| `SUITE_MANAGER_BASE_PATH` | My Own Suite | /setup | - |
| `PORT` | radicale-proxy | 3000 | - |
| `RADICALE_PORT` | radicale-proxy | 5232 | - |
| `CALENDAR_PROXY_TOKEN` | radicale-proxy | (secret) | - |
| `RADICALE_ADMIN_PASSWORD` | radicale-proxy | (secret) | - |
| `RADICALE_ADMIN_USERNAME` | radicale-proxy | (secret) | - |
| `DB_PORT` | Immich | 5432 | - |
| `DB_PASSWORD` | Immich | (secret) | - |
| `DB_USERNAME` | Immich | (secret) | - |
| `REDIS_PASSWORD` | Immich | (secret) | - |
| `UPLOAD_LOCATION` | Immich | /usr/src/app/upload | - |
| `RADICALE_ADMIN_PASSWORD` | Radicale | (secret) | - |
| `RADICALE_ADMIN_USERNAME` | Radicale | (secret) | - |
| `POSTGRES_DB` | Immich-postgres | immich | - |
| `POSTGRES_USER` | Immich-postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Immich-postgres | (secret) | - |
| `POSTGRES_INITDB_ARGS` | Immich-postgres | --data-checksums | - |
| `JWT_SECRET` | OnlyOffice | (secret) | - |
| `JWT_ENABLED` | OnlyOffice | true | - |
| `SECURE_LINK_SECRET` | OnlyOffice | (secret) | - |
| `ALLOW_META_IP_ADDRESS` | OnlyOffice | true | - |
| `ALLOW_PRIVATE_IP_ADDRESS` | OnlyOffice | true | - |
| `ADMIN_TOKEN` | Vaultwarden | (secret) | - |
| `ROCKET_PORT` | Vaultwarden | 80 | - |
| `SMTP_PASSWORD` | Vaultwarden | (secret) | - |
| `SMTP_USERNAME` | Vaultwarden | (secret) | - |
| `WEBSOCKET_ENABLED` | Vaultwarden | true | - |
| `LANGS` | Stirling | en_GB | - |
| `SYSTEM_DISABLEPIXEL` | Stirling | true | Disables analytics/tracking pixel behavior and related consent-prompt tracking hooks. |
| `SYSTEM_ENABLEPOSTHOG` | Stirling | false | Explicitly disables PostHog analytics/reporting if supported by the image/runtime. |
| `SYSTEM_ENABLEANALYTICS` | Stirling | false | Turns off Stirling PDF's built-in analytics collection. |
| `REDISPORT` | Immich-valkey | 6379 | - |
| `REDISUSER` | Immich-valkey | default | - |
| `REDISPASSWORD` | Immich-valkey | (secret) | - |
| `REDIS_PASSWORD` | Immich-valkey | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/shared`
- **Start command:** `docker-entrypoint.sh mysqld --default-authentication-plugin=mysql_native_password --innodb-use-native-aio=0 --skip-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `./run.sh Ly8gaW5kZXgudHN4IChCdW4gdjEuMyBydW50aW1lKQppbXBvcnQgeyBIb25vIH0gZnJvbSAiaG9ub0A0IjsKaW1wb3J0IHsgY29ycyB9IGZyb20gImhvbm8vY29ycyI7Cgpjb25zdCBhcHAgPSBuZXcgSG9ubygpOwphcHAudXNlKCIvKiIsIGNvcnMoKSk7Cgpjb25zdCBUT0tFTiA9IHByb2Nlc3MuZW52LkNBTEVOREFSX1BST1hZX1RPS0VOID8/ICIiOwpjb25zdCBVU0VSID0gcHJvY2Vzcy5lbnYuUkFESUNBTEVfQURNSU5fVVNFUk5BTUUgPz8gIiI7CmNvbnN0IFBBU1MgPSBwcm9jZXNzLmVudi5SQURJQ0FMRV9BRE1JTl9QQVNTV09SRCA/PyAiIjsKY29uc3QgSE9TVCA9IHByb2Nlc3MuZW52LlJBRElDQUxFX1BSSVZBVEVfRE9NQUlOID8/ICJyYWRpY2FsZS5yYWlsd2F5LmludGVybmFsIjsKY29uc3QgUkFESUNBTEVfUE9SVCA9IHByb2Nlc3MuZW52LlJBRElDQUxFX1BPUlQgPz8gIjUyMzIiOwoKYXBwLmdldCgiLyIsIChjKSA9PiBjLnRleHQoImNhbGVuZGFyLXByb3h5IikpOwphcHAuZ2V0KCIvYXBpL2hlYWx0aCIsIChjKSA9PiBjLmpzb24oeyBzdGF0dXM6ICJvayIgfSkpOwoKYXBwLmdldCgiL2ludGVybmFsL3JhZGljYWxlLWljYWwvOnRva2VuIiwgYXN5bmMgKGMpID0+IHsKICBjb25zdCBpbmNvbWluZyA9IGMucmVxLnBhcmFtKCJ0b2tlbiIpOwogIGlmICghVE9LRU4gfHwgaW5jb21pbmcgIT09IFRPS0VOKSByZXR1cm4gYy50ZXh0KCJVbmF1dGhvcml6ZWQiLCA0MDEpOwogIGlmICghVVNFUiB8fCAhUEFTUykgcmV0dXJuIGMudGV4dCgiTWlzc2luZyBSYWRpY2FsZSBjcmVkZW50aWFscyIsIDUwMCk7CgogIGNvbnN0IHVwc3RyZWFtID0gYGh0dHA6Ly8ke0hPU1R9OiR7UkFESUNBTEVfUE9SVH0vJHtlbmNvZGVVUklDb21wb25lbnQoCiAgICBVU0VSCiAgKX0vZGVmYXVsdC1jYWxlbmRhci8/ZXhwb3J0YDsKICBjb25zdCBhdXRoID0gIkJhc2ljICIgKyBCdWZmZXIuZnJvbShgJHtVU0VSfToke1BBU1N9YCkudG9TdHJpbmcoImJhc2U2NCIpOwoKICB0cnkgewogICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXBzdHJlYW0sIHsKICAgICAgaGVhZGVyczogewogICAgICAgIEF1dGhvcml6YXRpb246IGF1dGgsCiAgICAgICAgQWNjZXB0OiAidGV4dC9jYWxlbmRhciwqLyo7cT0wLjgiLAogICAgICB9LAogICAgfSk7CgogICAgY29uc3QgY29udGVudFR5cGUgPQogICAgICByZXMuaGVhZGVycy5nZXQoImNvbnRlbnQtdHlwZSIpID8/ICJ0ZXh0L2NhbGVuZGFyOyBjaGFyc2V0PXV0Zi04IjsKICAgIHJldHVybiBuZXcgUmVzcG9uc2UocmVzLmJvZHksIHsKICAgICAgc3RhdHVzOiByZXMuc3RhdHVzLAogICAgICBoZWFkZXJzOiB7CiAgICAgICAgImNvbnRlbnQtdHlwZSI6IGNvbnRlbnRUeXBlLAogICAgICAgICJjYWNoZS1jb250cm9sIjogIm5vLXN0b3JlIiwKICAgICAgfSwKICAgIH0pOwogIH0gY2F0Y2ggKGVycikgewogICAgcmV0dXJuIGMudGV4dChgVXBzdHJlYW0gY29ubmVjdGlvbiBmYWlsZWQ6ICR7U3RyaW5nKGVycil9YCwgNTAyKTsKICB9Cn0pOwoKQnVuLnNlcnZlKHsKICBwb3J0OiBOdW1iZXIocHJvY2Vzcy5lbnYuUE9SVCA/PyAzMDAwKSwKICBmZXRjaDogYXBwLmZldGNoLAp9KTsK`
- **Volume:** `/usr/src/app/upload`
- **Start command:** `docker-entrypoint.sh memcached -vv --max-item-size=32m`
- **Volume:** `/data`
- **Start command:** `/usr/local/bin/immich-docker-entrypoint.sh postgres -c config_file=/etc/postgresql/postgresql.conf -c shared_preload_libraries=vchord.so,vectors.so`
- **Healthcheck:** `/healthcheck`
- **Volume:** `/var/www/onlyoffice/Data`
- **Volume:** `/configs`
- **Start command:** `sh -lc 'valkey-server --requirepass "$REDIS_PASSWORD"'`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, MDX, Astro, Shell, Dockerfile, PowerShell, HTML

[View on Railway →](https://railway.com/deploy/my-own-suite)
