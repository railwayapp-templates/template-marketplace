# Deploy Remark42 on Railway

Remark42 1.17: privacy-focused comment engine for blogs and sites.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/remark42-1)

## About

Remark42 is a lightweight, privacy-focused comment engine for blogs and websites. You embed a small script, and readers can comment anonymously or sign in with social or email providers. It supports Markdown, voting, replies, moderation, import from Disqus and WordPress, and keeps no tracking data.

This template runs the official `umputun/remark42:v1.17.1` image as one service. Comments are stored in BoltDB on a Railway volume at `/srv/var`, with automatic daily backups next to it, so they survive redeploys. Anonymous commenting is on by default so it works without any OAuth app; add GitHub, Google or email login by setting their variables. A generated `ADMIN_PASSWD` protects the admin API, and `SECRET` signs sessions. The Railway proxy ranges are trusted so real client IPs reach rate limits. It is tiny and fits the Hobby plan. Point the embed script at your Railway domain and set `SITE` to match.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| remark42 | `umputun/remark42:v1.17.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `SITE` | remark |
| `SECRET` | (secret) |
| `AUTH_ANON` | true |
| `BACKUP_PATH` | /srv/var/backup |
| `TRUSTED_PROXY` | 10.0.0.0/8,100.64.0.0/10,172.16.0.0/12,192.168.0.0/16,fd00::/8 |
| `STORE_BOLT_PATH` | /srv/var/db |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/var`

**Category:** Other

[View on Railway →](https://railway.com/deploy/remark42-1)
