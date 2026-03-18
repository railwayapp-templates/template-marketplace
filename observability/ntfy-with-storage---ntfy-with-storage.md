# Deploy ntfy with storage on Railway

Deploy and Host ntfy with storage with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ntfy-with-storage)

## About

**ntfy** is a lightweight, self-hosted notification service. This Railway template deploys ntfy with a persistent storage disk—perfect for retaining user data, notification history, and configuration across restarts.

Create a username by following ntfy’s guide to generate a password hash, set the environment variable for your user, and you're ready to rock.

Here's the manual on creating a password: https://docs.ntfy.sh/config/#__tabbed_2_1

After logging in, create API tokens to use in applications like Uptime Kuma or any push notification software.

This build includes persistent disk storage and full user control. Your ntfy instance will retain credentials, tokens, and notification history—even after restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nfty w/ storage | `binwiederhier/ntfy` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | - |
| `NTFY_BASE_URL` | - | Will automatically use the public url. May need to update this if you use a custom URL. |
| `NTFY_AUTH_FILE` | /var/lib/ntfy/auth.db | - |
| `NTFY_LOG_LEVEL` | warn | - |
| `NTFY_AUTH_USERS` | username:passwordhash:role | Create a username and get your password hashed, see here: https://docs.ntfy.sh/config/#__tabbed_2_1 |
| `NTFY_CACHE_FILE` | /var/lib/ntfy/cache.db | - |
| `NTFY_BEHIND_PROXY` | true | - |
| `NTFY_ENABLE_LOGIN` | (secret) | - |
| `NTFY_AUTH_DEFAULT_ACCESS` | deny-all | - |
| `NTFY_ATTACHMENT_CACHE_DIR` | /var/lib/ntfy/attachments | - |

## Configuration

- **Start command:** `ntfy serve`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ntfy`

**Category:** Observability

[View on Railway →](https://railway.com/template/ntfy-with-storage)
