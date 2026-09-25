# Deploy Anubis on Railway

Anubis 1.27 proof-of-work proxy that keeps AI scrapers off your site.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anubis-1)

## About

Anubis is a web application firewall that protects sites from aggressive AI crawlers and scrapers. It sits in front of your app as a reverse proxy, gives browsers a small proof-of-work challenge, blocks known bad bots by rule, and lets real visitors and well-behaved tools through, reducing load caused by scraping.

This template deploys Anubis v1.27.0 from the official image in front of a small `whoami` placeholder app, so it works right after deploying. Replace the placeholder by pointing `TARGET` at your own service's private address, then delete the `app` service. The signing key is generated once, so visitors keep their pass across redeploys. Anubis also serves a `robots.txt` that disallows known AI crawlers. Railway's edge supplies the client IP header Anubis needs. It is very light and fits the Hobby plan. Tune the challenge difficulty and bot rules with environment variables or a policy file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `traefik/whoami:v1.11.0` | Worker |
| anubis | `ghcr.io/techarohq/anubis:v1.27.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | app | 80 |
| `BIND` | anubis | :8923 |
| `PORT` | anubis | 8923 |
| `DIFFICULTY` | anubis | 4 |
| `SERVE_ROBOTS_TXT` | anubis | true |
| `COOKIE_DYNAMIC_DOMAIN` | anubis | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/anubis-1)
