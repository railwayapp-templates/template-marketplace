# Deploy Selenium Standalone Edge | Password-Protected Grid, Pinned 4.46 on Railway

Password-protected Selenium 4.46 grid, Edge 150, pinned image

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selenium-standalone-edge-or-password-pro)

## About

Selenium is the W3C WebDriver stack that drives a real browser from your code. This template deploys **Selenium Standalone Edge 4.46** — router, distributor and browser node in one container — behind an HTTPS URL your tests, scrapers and agents can point at, **with the router password-protected**.

A Selenium Grid executes whatever the caller asks a browser to do, from inside your project's network. Published on a public URL with no credentials — which is how the stock image ships and how the existing Selenium listings deploy — that is an open remote-execution endpoint for anyone who finds the hostname. This template turns on Grid's built-in router basic auth, generates the password per deploy, and the image **refuses to boot** if the password is empty, so an open grid is not something you can leave behind by accident.

The rest is Railway-specific plumbing the stock image cannot know about. The router honours Railway's injected `$PORT`, because Railway's healthcheck dials the injected port and not the domain's target port; a service pinned to 4444 serves 200 to the world while its deploy is failed. Session count is pinned to 2 with `override-max-sessions`, because `nproc` inside a container reports the *host's* cores and Selenium's automatic `min(cpus, 8)` sizes itself for the metal, oversubscribes your plan and takes browsers down with it. `--disable-dev-shm-usage` is baked into every session, because a container gets 64 MB of `/dev/shm` and an Edge renderer that runs out of it dies mid-test with nothing but "page crash" in the log. Grid's timeouts sit at 300s, inside Railway's ~5-minute edge limit, so a stuck session surfaces as a Selenium error your client can read instead of a bare 502.

The image is pinned to `selenium/standalone-edge:4.46.0-20260707` — Edge 150. Upstream's `:latest` moves weekly and carries a new major browser with it, so an unpinned grid does not reproduce last week's test run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| selenium | `ghcr.io/bon5co/selenium-standalone-edge-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SE_ROUTER_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/selenium-standalone-edge-or-password-pro)
