# Deploy Headscale - Self-Hosted Tailscale Control Server, Actually Persistent on Railway

Self-hosted Tailscale control server - fixed: domain + persistent state

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/headscale-self-hosted-tailscale-control-)

## About

Headscale is the open-source, self-hosted implementation of the Tailscale
control server - it lets you run your own coordination server for a
WireGuard mesh VPN instead of depending on Tailscale's SaaS. This template
runs the official `headscale/headscale:stable` binary behind a small Alpine
wrapper (from [Sokanon/railway-headscale](https://github.com/Sokanon/railway-headscale),
deployed here from [a fork](https://github.com/ak40u/railway-headscale) so
the source stays stable) that substitutes your Railway domain into the
config at startup.

The catalog's existing Headscale template has two defects that together
explain its 25% health score, both confirmed by deploying the exact
published configuration:

**No public domain, so every deploy crash-loops on first boot.** The
entrypoint script builds `server_url` from `RAILWAY_PUBLIC_DOMAIN` and
exits immediately if neither that nor `HEADSCALE_SERVER_URL` is set:
`ERROR: No server URL configured.` The template's own config never
generates a domain, so `RAILWAY_PUBLIC_DOMAIN` is never populated -
deploying it as published fails 100% of the time until you notice this in
the Railway dashboard and add a domain yourself. This template generates
the domain automatically.

**No volume, so the server's identity and node registry reset on every
restart.** Headscale stores its SQLite node database and its own Noise
protocol private key under `/var/lib/headscale`. Without a persistent
volume there, both get recreated from scratch on every redeploy - every
device you'd registered has to be re-authenticated, and the server itself
gets a brand new cryptographic identity, which for a VPN control plane
means a working mesh gets reset by routine maintenance. Verified on this
template by redeploying twice: the first boot logs `no private key file at
path, creating...`; the second boot (with the volume mounted) does not -
the key and database persist as they should.

A minor third fix: the shipped `config.yaml` used
`ephemeral_node_inactivity_timeout`, a config key headscale deprecated and
removed in favor of `node.ephemeral.inactivity_timeout`. Harmless but noisy
- it printed a deprecation warning on every boot. Updated to the current key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| headscale | [ak40u/railway-headscale](https://github.com/ak40u/railway-headscale) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP server port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/headscale`

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/headscale-self-hosted-tailscale-control-)
