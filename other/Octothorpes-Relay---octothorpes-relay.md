# Deploy Octothorpes Relay on Railway

Hashtags for websites. A community library for the open web.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/octothorpes-relay)

## About

An Octothorpes Relay connects independent websites through the Octothorpe Protocol. Pages ask the relay to index them; it reads the hashtags, links, and terms they already contain, keeps them in a queryable store, and serves them back as a JSON API, RSS, and a small website. Run one for your community, platform, or webring.

A relay is two services: the app itself and an Oxigraph triplestore, kept private on Railway's internal network with a persistent volume so indexed data survives redeploys. The template wires the app's public domain in automatically, so setup is short: connect SMTP credentials for registration email, set an admin secret, and pick a registration mode — `open` (auto-verify on first index) or `approval`, moderated from the relay's own `/admin` form.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| oxigraph/oxigraph:latest | `ghcr.io/oxigraph/oxigraph:latest` | Database |
| octothorp.es | [stucco-software/octothorp.es](https://github.com/stucco-software/octothorp.es) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADAPTER` | node | Required to run sveltekit on railway |
| `instance` | - | The public facing domain for this instance. |
| `smtp_host` | smtp.fastmail.com | How do you send emails? |
| `smtp_port` | 587 | How do you send emails? |
| `smtp_user` | (secret) | How do you send emails? |
| `admin_email` | - | What email should we send to for registration requests? |
| `badge_image` | badge.png | Where do you host your custom badge image? |
| `robot_email` | - | Who do you send emails as? |
| `server_name` | CHANGEME | The public facing name of your instance |
| `smtp_secure` | false | Just one of those things |
| `admin_secret` | (secret) | Use this as a secret password to perform /admin actions for your instance. |
| `smtp_password` | (secret) | you know, for sending emails |
| `sparql_endpoint` | http://oxigraph.railway.internal:7878 | Where the triplestore lives. Connected to the other service in this template.  |
| `registration_mode` | approval | approval | open | closed ; controls how sites are added to this instance |

## Configuration

- **Start command:** `/usr/local/bin/oxigraph serve --location /data --bind [::]:7878`
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, HTML, Svelte, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/octothorpes-relay)
