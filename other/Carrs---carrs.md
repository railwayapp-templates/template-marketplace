# Deploy Car.rs on Railway

calendar, scheduling, cal.com, calendarly, cal.rs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/carrs)

## About

Cal.rs is a fast, self-hostable scheduling platform written in Rust — think Cal.com, but shipped as a single binary with SQLite storage and zero external runtime dependencies. Connect a CalDAV calendar (Nextcloud, Fastmail, iCloud, BlueMind), define bookable meeting types, and share a link. Free, open source, and AGPL-3.0 licensed.

Hosting Cal.rs is unusually simple for a scheduling app: a single Rust binary serves HTTP on port 3000, persists everything to one SQLite WAL-mode file, and ships as a multi-arch (amd64/arm64) Docker image at `ghcr.io/olivierlambert/calrs:latest`. Deployment requires a persistent volume mounted at `/var/lib/calrs` to keep the SQLite database, accounts, and synced calendar data across restarts, plus the `CALRS_BASE_URL` environment variable set to your public Railway URL so booking links and email invites resolve correctly. SMTP credentials are optional but recommended so guests receive HTML confirmation emails with `.ics` invites.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| olivierlambert/calrs:latest | `ghcr.io/olivierlambert/calrs:latest` | Database |

## Configuration

- **Volume:** `/var/lib/calrs`

**Category:** Other

[View on Railway →](https://railway.com/deploy/carrs)
