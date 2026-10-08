# Deploy Super Productivity on Railway

Self-hosted to-do list and time tracker with private WebDAV sync

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/super-productivity)

## About

Super Productivity is an open-source to-do list and time tracker with timeboxing, Pomodoro and focus modes, projects,
tags, notes, repeatable tasks and work-log reports. It runs as a web app that keeps its data in the browser and syncs
between devices through a sync backend. This template deploys the Super Productivity web app together with its own
private WebDAV sync store on one HTTPS domain, behind a login with a generated password. It is a community-maintained
template based on Super Productivity. It is not affiliated with, endorsed by, or an official offering of the Super
Productivity project, and it does not use its logo.

The Super Productivity web app is a static single-page app: tasks live in the browser's storage until you turn on
sync. On its own it has no login, and a WebDAV share open to the internet would expose all of your data. This
template bundles both halves in one container: the official web app (unmodified), a WebDAV server that stores the
sync data on a Railway volume, and a Caddy front door that puts everything behind HTTP basic auth. The same owner
credential signs you in to the app and is the WebDAV sync login, so every browser, phone and desktop that uses this
deployment syncs to the same place.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/youssefsiam38/super-productivity-railway:1.0.0@sha256:f024df37c6300bccb900ca546e2516f76a11989f742b08ca93ee406cc05a122b` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes traffic and health checks to (the Caddy front door; keep it 8080). |
| `FORWARD_PROTO` | https | Scheme the front door reports to the WebDAV server (keep it https on Railway). |
| `OWNER_PASSWORD` | (secret) | Generated password for the login prompt and for WebDAV sync (https://<domain>/webdav/). Copy it to sign in. |
| `OWNER_USERNAME` | (secret) | Username for the login prompt and for WebDAV sync (letters, digits, '.', '_' or '-'). |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/super-productivity)
