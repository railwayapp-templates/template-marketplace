# Deploy SFTPGo on Railway

File transfer server offering SFTP, WebDAV and a browser file manager

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sftpgo-1)

## About

SFTPGo is an open-source file transfer server that puts SFTP, WebDAV, an HTTP API and a browser file manager in front of one set of storage. Rather than handing a contractor a shell account, you create a file transfer user with its own quota, permissions and IP restrictions, reaching the same files over whichever protocol suits. It is written in Go, under AGPL-3.0, at [drakkan/sftpgo](https://github.com/drakkan/sftpgo).

Deploy SFTPGo on Railway and the awkward parts of self-hosting it are already wired up. Accounts, groups, shares and ban records live in a managed **Postgres** database rather than a SQLite file. The **sftpgo** service holds the server, with a volume for user home directories, SSH host keys and backups. A **caddy** gateway owns the public HTTPS domain and routes `/dav` to the WebDAV listener and everything else to the web interface and REST API, since one domain must serve both. A TCP proxy publishes the SSH listener, so you get a real SFTP endpoint, not just a web UI.

![SFTPGo, its Caddy gateway and Postgres on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788532934/sftpgo-architecture.png)

Self-host SFTPGo when several parties exchange files with you and none should get a shell, a cloud console or each other's data. Every account is virtual — it lives in the database, not `/etc/passwd` — which makes quotas, expiry dates and permissions easy to hand out and take away.

- SFTP, SCP, WebDAV and an HTTP file manager over one storage backend
- Per-user and per-directory permissions, quotas, bandwidth caps and IP filters
- Public share links, with optional password and expiry, for non-account holders
- Two-factor auth, SSH keys and OpenID Connect for the web UIs
- An event manager running actions on upload, download, delete or a schedule
- Storage beyond local disk: S3-compatible, Google Cloud Storage, Azure Blob, SFTP
- A REST API for creating accounts and shares from your code

Here **sftpgo** keeps only files on its volume; every account, share and setting is in **Postgres** over the private network. **caddy** stores nothing — it exists because the edge routes by hostname, and WebDAV needs its own path prefix.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| caddy | [gridalpha/sftpgo-railway](https://github.com/gridalpha/sftpgo-railway) | Web service |
| sftpgo | [gridalpha/sftpgo-railway](https://github.com/gridalpha/sftpgo-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | caddy | 8080 | Public listener port |
| `SFTPGO_HOST` | caddy | - | Private host to proxy to |
| `SFTPGO_HTTP_PORT` | caddy | 8080 | SFTPGo web and API port |
| `SFTPGO_WEBDAV_PORT` | caddy | 10080 | SFTPGo WebDAV port |
| `PORT` | sftpgo | 8080 | Health-check port; SFTPGo does not read it |
| `SFTPGO_LOG_LEVEL` | sftpgo | info | Log verbosity; debug is very noisy |
| `SFTPGO_PRIVATE_HOST` | sftpgo | sftpgo.railway.internal | Private host the gateway proxies to |
| `SFTPGO_DATA_PROVIDER__HOST` | sftpgo | - | Database host |
| `SFTPGO_DATA_PROVIDER__NAME` | sftpgo | - | Database name |
| `SFTPGO_DATA_PROVIDER__PORT` | sftpgo | - | Database port |
| `SFTPGO_DATA_PROVIDER__DRIVER` | sftpgo | postgresql | Store accounts in Postgres |
| `SFTPGO_DATA_PROVIDER__SSLMODE` | sftpgo | 1 | Require TLS without certificate checks |
| `SFTPGO_DEFAULT_ADMIN_PASSWORD` | sftpgo | (secret) | First administrator's password |
| `SFTPGO_DEFAULT_ADMIN_USERNAME` | sftpgo | (secret) | First administrator's username |
| `SFTPGO_DATA_PROVIDER__PASSWORD` | sftpgo | (secret) | Database password |
| `SFTPGO_DATA_PROVIDER__USERNAME` | sftpgo | (secret) | Database user |
| `SFTPGO_COMMON__DEFENDER__DRIVER` | sftpgo | provider | Keep bans in the database |
| `SFTPGO_HTTPD__BINDINGS__0__PORT` | sftpgo | 8080 | Web admin, web client and REST API port |
| `SFTPGO_KMS__SECRETS__MASTER_KEY` | sftpgo | (secret) | Encrypts secrets in the database |
| `SFTPGO_SFTPD__BINDINGS__0__PORT` | sftpgo | 2022 | SSH/SFTP port behind the TCP proxy |
| `SFTPGO_COMMON__DEFENDER__ENABLED` | sftpgo | true | Ban repeat failed logins |
| `SFTPGO_HTTPD__SIGNING_PASSPHRASE` | sftpgo | - | Signs session and share tokens |
| `SFTPGO_WEBDAVD__BINDINGS__0__PORT` | sftpgo | 10080 | WebDAV listener port |
| `SFTPGO_WEBDAVD__BINDINGS__0__PREFIX` | sftpgo | /dav | URL prefix WebDAV is served under |
| `SFTPGO_COMMON__MAX_PER_HOST_CONNECTIONS` | sftpgo | 100 | Concurrent connections per client |
| `SFTPGO_HTTPD__BINDINGS__0__PROXY_ALLOWED` | sftpgo | fd00::/8,10.0.0.0/8,100.64.0.0/10,127.0.0.1,::1 | Hosts allowed to set client-IP headers |
| `SFTPGO_DATA_PROVIDER__CREATE_DEFAULT_ADMIN` | sftpgo | 1 | Seed the first administrator |
| `SFTPGO_WEBDAVD__BINDINGS__0__PROXY_ALLOWED` | sftpgo | fd00::/8,10.0.0.0/8,100.64.0.0/10,127.0.0.1,::1 | Hosts allowed to set client-IP headers |
| `SFTPGO_HTTPD__BINDINGS__0__SECURITY__ENABLED` | sftpgo | true | Send security response headers |
| `SFTPGO_HTTPD__BINDINGS__0__SECURITY__STS_SECONDS` | sftpgo | 31536000 | HSTS max-age |
| `SFTPGO_HTTPD__BINDINGS__0__CLIENT_IP_HEADER_DEPTH` | sftpgo | 0 | Take the only entry in that header |
| `SFTPGO_HTTPD__BINDINGS__0__CLIENT_IP_PROXY_HEADER` | sftpgo | X-Forwarded-For | Header carrying the real client IP |
| `SFTPGO_WEBDAVD__BINDINGS__0__CLIENT_IP_HEADER_DEPTH` | sftpgo | 0 | Take the only entry in that header |
| `SFTPGO_WEBDAVD__BINDINGS__0__CLIENT_IP_PROXY_HEADER` | sftpgo | X-Forwarded-For | Header carrying the real client IP |
| `SFTPGO_HTTPD__BINDINGS__0__SECURITY__REFERRER_POLICY` | sftpgo | same-origin | Referrer-Policy header value |
| `SFTPGO_HTTPD__BINDINGS__0__SECURITY__CONTENT_TYPE_NOSNIFF` | sftpgo | true | Send X-Content-Type-Options |
| `SFTPGO_HTTPD__BINDINGS__0__SECURITY__HTTPS_PROXY_HEADERS__0__KEY` | sftpgo | X-Forwarded-Proto | Header proving the request was HTTPS |
| `SFTPGO_HTTPD__BINDINGS__0__SECURITY__HTTPS_PROXY_HEADERS__0__VALUE` | sftpgo | https | Value that marks it secure |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/_healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`
- **TCP Proxies:** 2022
- **Volume:** `/srv/sftpgo`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/sftpgo-1)
