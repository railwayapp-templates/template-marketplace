# Deploy Drizzle Studio with Tailscale on Railway

Drizzle Studio on your tailnet, with no public domain

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/drizzle-studio-with-tailscale)

## About

Drizzle Studio is a browser-based interface for your database. This template runs it on Railway behind a Tailscale service, so only devices on your tailnet can open it.

This template deploys Drizzle Studio, a browser-based interface for your database, together with a Tailscale service. Neither service gets a public domain. The Tailscale service joins your tailnet as its own machine and forwards its port to Drizzle Studio over Railway's private network. Your device reaches Drizzle Studio only through your tailnet. On the deploy form, pick your database service's connection string for `DATABASE_URL` from the reference list.

You do not generate or paste a key. The Tailscale service prints a sign-in link into its deploy log. You open the link, sign in, and the machine joins your tailnet. The log then prints the address to open in your browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tailscale | `ghcr.io/drizzle-team/railway-tailnet:v0.1.3` | Database |
| Drizzle Studio | `ghcr.io/drizzle-team/railway-studio:1.0.2` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TS_HOSTNAME` | Tailscale | drizzle-studio | The machine name this service takes on your tailnet |
| `TS_FORWARD_1` | Tailscale | - | Tailnet port 4983 forwards to Studio |
| `TS_FORWARD_2` | Tailscale | - | Optional. Forwards tailnet port 5432 to your database. Type 5432:, then type ${{ and pick RAILWAY_PRIVATE_DOMAIN of your database service, then type :5432. You can leave it empty. |
| `PORT` | Drizzle Studio | 4983 | The port Studio listens on inside the project |
| `PASSCODE` | Drizzle Studio | - | The password for secure access |
| `DATABASE_URL` | Drizzle Studio | - | Required. The connection string of your database. On the deploy form, type ${{ and pick DATABASE_URL of your database service. |

## Configuration

- **Volume:** `/var/lib/tailnet`
- **Healthcheck:** `/health`

**Category:** Other

[View on Railway →](https://railway.com/deploy/drizzle-studio-with-tailscale)
