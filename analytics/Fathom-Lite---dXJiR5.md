# Deploy Fathom Lite on Railway

An open-source website analytics tool.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dXJiR5)

## About

Fathom Lite is an open-source, privacy-focused website analytics tool built with Go and Preact. It tracks page views, referrers, bounce rates, and average session duration — without collecting any personally identifiable information (PII) or setting tracking cookies.

Fathom Lite is a single Go binary served via Docker. By default it uses a SQLite database stored in the working directory, making it a zero-dependency deployment — no external database required. This Railway template deploys the official Docker image with SQLite, giving you a lightweight analytics dashboard reachable on a Railway-provided HTTPS domain immediately after deployment. On first launch, add a user account via the Railway shell, then create a site in the dashboard and paste the provided tracking snippet into your website.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fathom-lite | `usefathom/fathom` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/dXJiR5)
