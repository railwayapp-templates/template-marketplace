# Deploy Sync Google, Outlook & iCloud Calendars — Self-Host Keeper.sh on Railway on Railway

Self-host Keeper.sh: sync Google, Outlook & iCloud. MCP server included.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keeper)

## About

![Keeper.sh self-hosted calendar sync dashboard](https://raw.githubusercontent.com/ridafkih/keeper.sh/main/applications/web/public/open-graph.png)

Keeper.sh is an open-source calendar sync platform with **1.1k+ GitHub stars** that solves
the double-booking problem — connect Google Calendar, Microsoft Outlook, Office 365, iCloud,
CalDAV, and ICS feeds into a single unified view where your availability is always accurate
across every platform. It also ships as an **MCP server**, so your local AI agents can read
and manage your schedule directly without API keys or third-party integrations.

Running three calendars across Google, Outlook, and iCloud without Keeper means you're one
ignored invite away from a double-booking. Self-host on Railway for ~$5–10/month — no
Calendly subscription, no per-seat fees, full ownership of every event.

---

Managing multiple calendars across Google, Outlook, and iCloud without sync means your
availability in each platform is always slightly out of date. Keeper.sh solves this by
running a background sync process that propagates events across all connected calendar
sources — when something is blocked in Google, it appears blocked in Outlook and iCloud
within seconds.

Without a managed host, you're managing Docker Compose, OAuth credentials for Google and
Microsoft, SSL, and 24/7 process uptime. Railway provisions all of it automatically.

Typical cost: **~$5–10/month** on Railway's Hobby plan. Calendly Teams costs $16/user/month.
Motion costs $34/month. Keeper.sh on Railway gives you multi-provider calendar sync at flat
compute cost with full data ownership.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Keeper | `ghcr.io/ridafkih/keeper-standalone:2.10` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | - |
| `RESEND_API_KEY` | (secret) | For sending auth/invite emails |
| `GOOGLE_CLIENT_ID` | - | Google Cloud Console → OAuth 2.0 credentials |
| `POSTGRES_PASSWORD` | (secret) | - |
| `BETTER_AUTH_SECRET` | (secret) | - |
| `MICROSOFT_CLIENT_ID` | - | Azure Portal → App registrations |
| `GOOGLE_CLIENT_SECRET` | (secret) | Google Cloud Console → OAuth 2.0 credentials |
| `MICROSOFT_CLIENT_SECRET` | (secret) | Azure Portal → App registrations |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/keeper)
