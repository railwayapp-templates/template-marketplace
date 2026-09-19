# Deploy SFTPgo on Railway

Secure file transfer server with web UI, SFTP, FTP/S, and WebDAV support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sftpgo-3)

## About

SFTPGo runs as a single container on Railway with a volume mount at `/var/lib/sftpgo`. All configuration, user data, and the SQLite database persist across restarts. The container starts as root only to fix volume permissions, then runs SFTPGo.

Behind Railway's reverse proxy the client IP changes between requests, so this template sets `SFTPGO_HTTPD__TOKEN_VALIDATION=1` (SFTPGo's documented proxy mode) — without it, logging in fails with "The form token is not valid".

### Default Ports

| Port | Service | Description |
|------|---------|-------------|
| 8080 | HTTP/S | Web UI, WebClient, REST API (mapped to public domain) |
| 2022 | SFTP | SFTP file transfer service (TCP proxy pre-wired — see below) |

### SFTP transfers

This template pre-wires a Railway TCP proxy on port `2022`, so the SFTP service is reachable out of the box. After deploying, Railway assigns the proxy host and port — find them under the `sftpgo` service → **Settings** → **Networking** → **TCP Proxy**, then connect:

```
sftp -P  youruser@.proxy.rlwy.net
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sftpgo | `ghcr.io/mc9max/sftpgo:2.7.5` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for log timestamps (e.g. America/New_York). |
| `PORT` | 8080 | Web UI port. Railway maps this to the public domain. |
| `SFTPGO_LOG_LEVEL` | INFO | Logging level. Options: TRACE, DEBUG, INFO, WARN, ERROR. |
| `SFTPGO_DATA_PROVIDER__NAME` | /var/lib/sftpgo/sftpgo.db | SQLite database file path. |
| `SFTPGO_DATA_PROVIDER__DRIVER` | sqlite | Data provider: sqlite (single instance), mysql, postgresql, cockroachdb, bbolt, memory. |
| `SFTPGO_HTTPD__TOKEN_VALIDATION` | (secret) | Web CSRF/JWT token validation mode. Required: 1 (no IP binding) behind Railway's reverse proxy, otherwise login fails with 'The form token is not valid' (sftpgo #1816). |
| `SFTPGO_SFTPD__BINDINGS__0__PORT` | 2022 | SFTP service port. |
| `SFTPGO_HTTPD__BINDINGS__0__ADDRESS` | 0.0.0.0 | Bind address for the Web UI. |
| `SFTPGO_SFTPD__BINDINGS__0__ADDRESS` | 0.0.0.0 | Bind address for the SFTP server. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 2022
- **Volume:** `/var/lib/sftpgo`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/sftpgo-3)
