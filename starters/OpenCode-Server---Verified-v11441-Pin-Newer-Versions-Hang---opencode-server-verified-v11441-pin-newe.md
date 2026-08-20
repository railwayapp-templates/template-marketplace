# Deploy OpenCode Server - Verified v1.14.41 Pin (Newer Versions Hang) on Railway

Self-hosted OpenCode with Basic Auth - version pin verified, not stale

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-server-verified-v11441-pin-newe)

## About

OpenCode is the open-source, always-on AI coding agent from the team behind
SST (formerly `sst/opencode`, now `anomalyco/opencode`, 199k+ GitHub stars).
This template runs it as a persistent, authenticated web server so you can
drive it from a browser or point automation at it, instead of only running
it locally in a terminal.

This template builds OpenCode from source at deploy time and wraps it with a
small Node.js proxy that adds HTTP Basic Auth plus signed-cookie browser
sessions, since the OpenCode CLI's own web server has no built-in
authentication. All credit for that wrapper goes to
[LaceLetho/opencode-railway-template](https://github.com/LaceLetho/opencode-railway-template) -
this template deploys the same code, unmodified, from
[a fork](https://github.com/ak40u/opencode-railway-template) so the source
stays stable regardless of upstream changes.

The one thing this template does differently from the current catalog
listing: it explains, and keeps verified, *why* the OpenCode version is
pinned to `v1.14.41` instead of tracking `latest`.

Testing this template against newer OpenCode releases (`v1.18.18`, the
current tag, tested both as a source build and via the published
`opencode-ai` npm package) reproduces the same failure every time: the
internal `opencode serve` process starts and logs
`opencode server listening on http://127.0.0.1:18080`, but the wrapper's own
outbound health check to that same endpoint never resolves. No further log
output, no timeout error, no crash - the outer proxy on port 8080 simply
never starts, and every request gets Railway's own `502 Application failed
to respond`. `v1.14.41` does not have this problem: verified across three
separate live deployments, health check, and full Basic Auth login flow all
passing cleanly. Something between those two releases broke compatibility
with the wrapper's startup check, and the fix here is to not guess at a
newer default until that's root-caused upstream.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencode | [ak40u/opencode-railway-template](https://github.com/ak40u/opencode-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_LEVEL` | INFO | - |
| `SOURCE_MODE` | true | if build from source |
| `OPENCODE_REF` | v1.14.41 | version of opencode - pinned to a verified-working release, see README before changing |
| `ENABLE_MONITOR` | true | - |
| `OPENCODE_SERVER_PASSWORD` | (secret) | default username: opencode |
| `OPENCODE_SERVER_USERNAME` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencode-server-verified-v11441-pin-newe)
