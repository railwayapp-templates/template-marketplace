# Deploy IT Tools on Railway

A toolbox of 70+ small utilities for developers and IT work

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ittools)

## About

IT Tools is a browser-based toolbox of about seventy small utilities developers and sysadmins reach for a dozen times a day: hashing and HMAC, JWT decoding, JSON/YAML/TOML/XML conversion, base64 encoding, UUID generation, cron building, chmod calculation, IPv4 subnetting, regex testing and QR codes. These are not hard to find — the trouble is that the free ones live on ad-funded sites you paste production secrets into. Every tool here runs in your own browser tab, so a JWT, an API key or a customer record pasted into it never leaves the machine.

Self-host IT Tools on Railway and that privacy property becomes something you can point at. This template deploys one service, **it-tools**, built from [gridalpha/it-tools-railway](https://github.com/gridalpha/it-tools-railway) on top of the official `corentinth/it-tools` image. A visitor's request hits Railway's edge, terminates TLS there and reaches an nginx tuned for this platform: it compresses the bundle, caches content-hashed assets for a year, serves the single-page app's client-side routes and answers a real health probe. There is no database, queue or volume, and no outbound network call — once the JavaScript has loaded, the server plays no part in any tool you use.

![Diagram of the single IT Tools service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788738891/it-tools-architecture.png)

IT Tools is an open-source Vue 3 single-page application by Corentin Thomasset, published under GPL-3.0 with more than 40,000 GitHub stars. Because every tool is pure client-side JavaScript, hosting it means serving static files well rather than running an application.

- **~70 utilities in one searchable interface**, keyboard-first, with per-user favourites.
- **Nothing is transmitted** — no analytics, no API calls, no server-side processing of anything you paste.
- **Installable as a PWA**, so it keeps working offline once loaded, with a multilingual UI.
- **Deep-linkable tools**, so `/jwt-parser` or `/crontab-generator` drops straight into a runbook.

The single Railway service replaces the upstream image's minimal file server with an nginx configured for a container platform. It listens on Railway's `$PORT` over IPv4 and IPv6, gzips JavaScript and CSS (the main chunk drops from roughly 900 KB to 270 KB on the wire), marks the hashed files under `/assets/` immutable for a year while leaving `sw.js` uncached so the app can update itself, sizes its workers from the container's CPU quota rather than the host's, and sends a Content-Security-Policy, HSTS and the usual hardening headers on every response. Because IT Tools makes no outbound request, that policy pins `connect-src` to the site's own origin — an injected script would have nowhere to send what you pasted.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| it-tools | [gridalpha/it-tools-railway](https://github.com/gridalpha/it-tools-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port nginx listens on inside the container |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ittools)
