# Deploy SFTPGo | (Just Updated) SFTP Server, Files and Host Keys Survive Redeploys on Railway

SFTP server whose uploads, users and host keys survive every redeploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sftpgo-or-just-updated-sftp-server-files)

## About

SFTPGo is a fully featured SFTP, FTP and WebDAV server with a web admin panel, a web
client, a REST API, per-user virtual filesystems, quotas, and pluggable storage backends.
This template runs it as a single service on a Railway volume, with SFTP exposed on a
public TCP proxy and the admin panel on an HTTPS domain.

SFTPGo on Railway needs three things that are easy to get wrong, and this template fixes
all three.

**Everything stateful lives on the one volume.** Upstream stores user home directories at
`/srv/sftpgo/data` and regenerates SSH host keys into `/etc/sftpgo` on every boot, so a
template that mounts only `/var/lib/sftpgo` loses every uploaded file on redeploy and makes
every SFTP client warn about a changed host key. This image relocates the SQLite data
provider, all user home directories, the backup directory and the host keys onto the single
Railway volume at `/var/lib/sftpgo`. Verified: a file uploaded over SFTP and the SSH host
key fingerprint were both unchanged after a full redeploy.

**The admin account is sealed at deploy time.** The admin password is generated per deploy
as a Railway secret, and the container refuses to start if it is empty, so the install is
never left with a well-known password or an unclaimed setup page on a public URL.

**API tokens are not bound to the client IP.** Railway's edge address rotates between
requests, so SFTPGo's default IP-bound tokens are rejected on the second REST call and the
admin session drops. This image turns that binding off and reads the real client address
from `X-Forwarded-For` instead.

The image is `ghcr.io/bon5co/sftpgo-railway`, pinned by digest and built from upstream
`drakkan/sftpgo` 2.7.5, also pinned by digest. Source:
[bon5co/sftpgo-railway](https://github.com/bon5co/sftpgo-railway).

**Which protocols are actually reachable.** SFTP is public over Railway's TCP proxy, at the
host and port in `RAILWAY_TCP_PROXY_DOMAIN` / `RAILWAY_TCP_PROXY_PORT`. The web admin
panel, the web client and the REST API are public over HTTPS on the service domain. FTP and
FTPS are **not** exposed: they need a passive port range, and Railway's TCP proxy gives one
port per service. WebDAV is disabled for the same reason — one service gets one HTTP domain,
and it is used by the admin panel.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sftpgo | `ghcr.io/bon5co/sftpgo-railway@sha256:83a1a7c7b0f31e896d95ae84bf52c2b98f8bd3f3255b07519ef6dedf33913cb8` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SFTPGO_DEFAULT_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 2022
- **Volume:** `/var/lib/sftpgo`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/sftpgo-or-just-updated-sftp-server-files)
