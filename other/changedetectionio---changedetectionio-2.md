# Deploy changedetection.io on Railway

Monitor website changes and get notified.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/changedetectionio-2)

## About

changedetection.io is an open-source website monitoring and alerting application. It watches pages, JSON APIs, and PDFs for meaningful changes, then notifies you when content moves. Use it to follow prices, product availability, release notes, status pages, legal documents, and other important information without repeatedly checking each source yourself.

Hosting changedetection.io on Railway uses one digest-pinned container, one public HTTPS domain, and one persistent volume mounted at `/datastore`. Railway routes port `5000` and checks `/` for readiness. `BASE_URL` is derived from the service's Railway domain; the remaining settings are portable literals. Keep one replica for the single datastore and back up watch definitions and history according to your operating needs. The template's source project was verified at version `0.55.8`; review upstream release notes before future upgrades.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| changedetection.io | `ghcr.io/dgtlmoon/changedetection.io:0.55.8@sha256:5438423d5e906eff4e8f7886823482ad23f472bf7b8530ccaca89fb48c337882` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PORT` | 5000 |
| `HIDE_REFERER` | true |
| `USE_X_SETTINGS` | 1 |
| `DISABLE_VERSION_CHECK` | true |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/datastore`

**Category:** Other

[View on Railway →](https://railway.com/deploy/changedetectionio-2)
