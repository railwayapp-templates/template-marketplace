# Deploy OpenClaw | Installed at Build, Not on Every Boot on Railway

OpenClaw in the image, not downloaded on every start. Current version.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-or-installed-at-build-not-on-ev)

## About

# OpenClaw

The self-hosted OpenClaw agent, with the software in the image instead of
downloaded on every start.

## What this fixes

The existing OpenClaw templates run `npm install -g openclaw@` in the
**entrypoint** - so every container start reaches out to the npm registry before
the app can serve anything. That puts a network call on the start path, makes a
cold start slow, and turns any registry hiccup into a failed deploy. Both variants
report 44% health.

Here the install happens at build time, in the image. The start path does no
network I/O at all.

The override still works exactly as before: the entrypoint compares the installed
version with `OPENCLAW_VERSION` and only installs when they differ, so setting a
different version in the service variables still switches it at boot - the default
just costs nothing now.

The version is also current: `2026.7.1-2` rather than the `2026.6.6` the
upstream template pins.

## Verified

By using the setup surface, not by pinging it. Deployed from this template:
`/setup` returns 401 with no credentials and 401 with a wrong password, 200 with
the generated `SETUP_PASSWORD`, and `/setup/api/status` reports
`OpenClaw 2026.7.1-2` - which is the wrapper actually executing the binary that
was installed during the build.

## Using it

Open the domain, sign in with the generated `SETUP_PASSWORD` (the username is
ignored), and follow the setup to connect your channels. State and workspace live
on the volume at `/data`.

## Configuration

Nothing to fill in. `SETUP_PASSWORD` and `OPENCLAW_GATEWAY_TOKEN` are generated.
`ENABLE_WEB_TUI` is off by default - turn it on only if you want a terminal in the
browser, and understand that it is one.

Built on the MIT-licensed Railway template by praveen-ks-2001, with the install
moved to build time:
https://github.com/praveen-ks-2001/openclaw-railway-template-new

Our fork: https://github.com/ak40u/openclaw-railway-starter

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | [ak40u/openclaw-railway-starter](https://github.com/ak40u/openclaw-railway-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `ENABLE_WEB_TUI` | false |
| `SETUP_PASSWORD` | (secret) |
| `OPENCLAW_STATE_DIR` | /data/state |
| `INTERNAL_GATEWAY_HOST` | 127.0.0.1 |
| `INTERNAL_GATEWAY_PORT` | 8081 |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** HTML, JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openclaw-or-installed-at-build-not-on-ev)
