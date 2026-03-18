# Deploy remark42 on Railway

Privacy-focused lightweight commenting engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/remark42)

## About

Remark42 is a self-hosted, lightweight, and privacy-focused comment engine. It serves as a robust alternative to proprietary systems like Disqus, featuring social logins (Google, GitHub, Twitter, etc.), Markdown support, and moderation tools. It is designed to be easy to integrate into static websites and blogs without tracking user data.

Hosting Remark42 on Railway requires running a Docker container and attaching a **Persistent Volume** to store the embedded database (BoltDB) and user avatars. Without a volume, all user comments and data will be lost upon service restart. Configuration is primarily handled via environment variables, including a crucial `SECRET` for security and an `ADMIN_PASSWD` for moderation access. The deployment automatically utilizes Railway’s public domain for the `REMARK_URL`, simplifying the initial setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| remark42 | `ghcr.io/umputun/remark42:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | false | debug mode |
| `SECRET` | (secret) | the shared secret key used to sign JWT, should be a random, long, hard-to-guess string, required |
| `REMARK_URL` | - | URL to Remark42 server, required |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/var`

**Category:** Other

[View on Railway →](https://railway.com/deploy/remark42)
