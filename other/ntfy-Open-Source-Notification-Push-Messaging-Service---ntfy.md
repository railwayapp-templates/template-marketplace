# Deploy ntfy (Open-Source Notification & Push Messaging Service) on Railway

ntfy [Mar ’26] (Send Push Messages via Simple HTTP Calls) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntfy)

## About

Ntfy.sh is a free, open-source notification service that lets you send real-time push notifications to your devices using simple HTTP requests. It’s a lightweight, self-hosted alternative to proprietary push notification systems like Firebase Cloud Messaging (FCM), giving you full control and privacy over your notifications.

Self-hosting Ntfy on Railway allows you to manage your notification service independently, with full data ownership and no third-party dependencies. You can set up your own Ntfy instance to handle notifications for personal use, team alerts, or integration into your custom apps — all while benefiting from Railway’s managed infrastructure and automated scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| binwiederhier/ntfy | `binwiederhier/ntfy` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `NTFY_UPSTREAM_BASE_URL` | https://ntfy.sh |

**Category:** Other

[View on Railway →](https://railway.com/deploy/ntfy)
