# Deploy Drizzle Gateway with Tailscale on Railway

Drizzle Gateway on your tailnet, with no public domain

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/drizzle-gateway-with-tailscale)

## About

Drizzle Gateway is a browser-based interface for managing several database connections. This template runs it on Railway behind a Tailscale service, so only devices on your tailnet can open it.

This template deploys Drizzle Gateway, a browser-based interface for managing several database connections, together with a Tailscale service. Neither service gets a public domain. The Tailscale service joins your tailnet as its own machine and forwards its port to Drizzle Gateway over Railway's private network. Your device reaches Drizzle Gateway only through your tailnet.

You do not generate or paste a key. The Tailscale service prints a sign-in link into its deploy log. You open the link, sign in, and the machine joins your tailnet. The log then prints the address to open in your browser.

On the deploy form, you can pick your database service's connection string for `DATABASE_URL_Postgres`. Drizzle Gateway then saves that connection the first time it starts. You can also leave the field empty and add a connection later, inside Drizzle Gateway. To reach a database from your machine over the tailnet as well, set `TS_FORWARD_DATABASE`: type `${{` and pick `RAILWAY_PRIVATE_DOMAIN` of your database service. You can leave it empty.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tailscale | `ghcr.io/drizzle-team/railway-tailnet:v0.1.4` | Database |
| Drizzle Gateway | `ghcr.io/drizzle-team/gateway:1.6.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TS_HOSTNAME` | Tailscale | drizzle-gateway | The machine name this service takes on your tailnet |
| `TS_FORWARD_BROWSER` | Tailscale | - | Optional. The host that tailnet port 4983 forwards to. Keep the default to reach Drizzle Gateway. For other ports, write source port, host and target port as port:host:port. |
| `TS_FORWARD_DATABASE` | Tailscale | - | Optional. Forwards tailnet port 5432 to your database. Type ${{ and pick RAILWAY_PRIVATE_DOMAIN of your database service. For other ports, write source port, host and target port as port:host:port. You can leave it empty. |
| `PORT` | Drizzle Gateway | 4983 | The port the Gateway listens on inside the project |
| `MASTERPASS` | Drizzle Gateway | - | The admin password for secure access |
| `DATABASE_URL_Postgres` | Drizzle Gateway | - | Optional. On the deploy form, type ${{ and pick DATABASE_URL of your database service. Drizzle Gateway then opens with that connection saved. You can leave it empty. |

## Configuration

- **Volume:** `/var/lib/tailnet`
- **Healthcheck:** `/health`
- **Volume:** `/app`

**Category:** Other

[View on Railway →](https://railway.com/deploy/drizzle-gateway-with-tailscale)
