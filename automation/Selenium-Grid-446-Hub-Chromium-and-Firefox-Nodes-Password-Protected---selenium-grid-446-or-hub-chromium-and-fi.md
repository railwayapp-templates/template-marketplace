# Deploy Selenium Grid 4.46 | Hub + Chromium and Firefox Nodes, Password-Protected on Railway

Hub plus private Chromium and Firefox nodes, password-protected

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/selenium-grid-446-or-hub-chromium-and-fi)

## About

Selenium Grid runs your browser tests in parallel across several browsers at once. This template deploys **Selenium Grid 4.46** as three services — a public hub plus a Chromium node and a Firefox node on Railway's private network — **with the router password-protected**.

The hub is the only service with a public URL. Nodes register with it over `*.railway.internal`, so the browsers themselves are never reachable from the internet, and scaling a browser is changing one service's replica count rather than redeploying the stack.

A Grid router executes whatever the caller asks a browser to do, from inside your project's network. Published on a public URL with no credentials — how the stock images ship, and how the existing Selenium listings deploy — that is an open remote-execution endpoint for anyone who finds the hostname. This template enables Grid's built-in router basic auth, generates the password per deploy, hands it to the nodes through their registration URL, and the hub image **refuses to boot** with an empty password.

The rest is Railway-specific plumbing the stock images cannot know about. The hub honours Railway's injected `$PORT`, because Railway's healthcheck dials the injected port and not the domain's target port, so a hub pinned to 4444 serves 200 to the world while its deploy is failed. Nodes keep their own registration port (5555) instead, because the hub dials them back over the private network where no edge proxy is involved. Session count is pinned to 2 per node with `override-max-sessions`, because `nproc` inside a container reports the *host's* cores and Selenium's automatic `min(cpus, 8)` sizes itself for the metal. The Chromium node carries `--disable-dev-shm-usage` on every session, since a container gets 64 MB of `/dev/shm` and upstream's fix (`docker run --shm-size=2g`) is not a knob a Railway deploy has; the Firefox node deliberately does not, because geckodriver refuses a session that carries it.

Images are pinned to `4.46.0-20260707` — Chromium 150, Firefox 152. Upstream's `:latest` moves weekly and carries a new major browser with it, so an unpinned grid does not reproduce last week's test run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hub | `ghcr.io/bon5co/selenium-hub-railway:latest` | Web service |
| node-chromium | `ghcr.io/bon5co/selenium-node-chromium-railway:latest` | Worker |
| node-firefox | `ghcr.io/bon5co/selenium-node-firefox-railway:latest` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SE_ROUTER_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/selenium-grid-446-or-hub-chromium-and-fi)
