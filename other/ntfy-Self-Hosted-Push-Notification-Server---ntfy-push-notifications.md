# Deploy ntfy — Self-Hosted Push Notification Server on Railway

Self-host ntfy — send push notifications via simple HTTP calls

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntfy-push-notifications)

## About

ntfy (pronounced "notify") is an open-source push notification service that turns any HTTP request into a push notification on your phone, desktop, or browser — no SDK, no API keys, no accounts. Send an alert with a single `curl` command from a script, cron job, server, or CI pipeline, and it appears instantly on every subscribed device. This template deploys your own private ntfy server with a persistent volume for message history and users — so you own your notification infrastructure, with no rate limits and no data on a third party, in minutes.

---

ntfy is trivially light to run, and one security default is the thing everyone must get right — this template makes it clear.

**ntfy is open by default — lock it down for a private server.** This is the critical point: out of the box, anyone who knows your URL can publish and subscribe to any topic. That's fine for public use, but for a private notification server you must set `NTFY_AUTH_DEFAULT_ACCESS=deny-all` and `NTFY_ENABLE_LOGIN=true`, then create an admin user by opening a Railway shell and running `ntfy user add --role=admin`. After that, all publishing and subscribing requires authentication. Do this first, or your notification server is open to anyone who finds the URL.

**All three data paths persist on one volume.** ntfy writes three things under `/var/lib/ntfy`: the message cache (`NTFY_CACHE_FILE`), user authentication (`NTFY_AUTH_FILE`), and attachments (`NTFY_ATTACHMENT_CACHE_DIR`). This template mounts the volume there, so your message history *and your user accounts* survive redeploys — miss the volume and you'd lose both. No external database is needed.

**`NTFY_BASE_URL` must be your domain, and proxy mode is set.** `NTFY_BASE_URL` is set to your Railway domain, which the mobile and desktop apps need to subscribe correctly and to build links. `NTFY_BEHIND_PROXY=true` is set so ntfy reads the real client IP behind Railway's edge proxy, which matters for rate limiting and access rules.

**Send a notification with one HTTP call.** The whole appeal is simplicity: `curl -d "Backup complete" https://your-domain/mytopic` sends a push to everyone subscribed to `mytopic`. Add a title, priority, tags (emojis), and click actions with simple headers. Beyond plain messages, ntfy supports file attachments, delayed/scheduled delivery, priority levels, action buttons, and email publishing — all through HTTP headers, with attachments persisting on the volume.

Typical cost: **~$2–5/month** on Railway — ntfy is one of the lightest services you can run, handling thousands of subscribers on minimal resources. It's dual-licensed Apache-2.0 / GPLv2 and free.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ntfy | `binwiederhier/ntfy` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port |
| `NTFY_BASE_URL` | - | NTFY BASE URL |
| `NTFY_UPSTREAM_BASE_URL` | https://ntfy.sh | NTFY UPSTREAM BASE URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/ntfy-push-notifications)
