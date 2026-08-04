# Deploy Password Pusher on Railway

Encrypted expiring secret sharing with persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/password-pusher-secure)

## About

Password Pusher is an encrypted secret-sharing application. This template deploys upstream version 2.9.7 with its web process, expiration worker, and persistent local storage.

After deployment, open the application and read its deployment logs for the one-time boot code required by `/first_run`. The boot code creates the first administrator and is then removed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| password-pusher | [monotykamary/railway-template-password-pusher](https://github.com/monotykamary/railway-template-password-pusher) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Internal Rails application port. Keep this separate from the public gateway port. |
| `HTTP_PORT` | 5100 | Unprivileged HTTP gateway port used by the Railway public domain. |
| `PWP__NOINDEX` | true | Prevents public search engines from indexing secret-sharing pages. |
| `SECRET_KEY_BASE` | (secret) | Persistent Rails session-signing secret generated once during deployment. |
| `PWP__HOST_DOMAIN` | - | Public Railway hostname used when Password Pusher generates links. |
| `PWPUSH_MASTER_KEY` | - | 256-bit hexadecimal master key used to encrypt pushes. Do not rotate without the upstream key-rotation procedure. |
| `PWP__HOST_PROTOCOL` | https | Public link protocol. Railway terminates TLS. |
| `PWP__FILES__STORAGE` | local | Stores file pushes on the attached persistent volume. |
| `PWP__SECURE_COOKIES` | true | Restricts authentication cookies to HTTPS connections. |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/PasswordPusher/storage`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/password-pusher-secure)
