# Deploy Tailscale for Drizzle on Railway

Put an existing Drizzle Studio or Gateway on your tailnet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailscale-for-drizzle)

## About

Tailscale for Drizzle adds a private address to a Drizzle Studio or Drizzle Gateway service, or to a database, that you already run on Railway. Only devices on your tailnet can reach it.

This template adds one Tailscale service to a project that already runs Drizzle Studio or Drizzle Gateway from the plain template, or a database. Deploy those services first, then deploy this template into the same project. The Tailscale service joins your tailnet as its own machine and forwards its ports to your existing services over Railway's private network. It adds no public domain.

You do not generate or paste a key. The Tailscale service prints a sign-in link into its deploy log. You open the link, sign in, and the machine joins your tailnet. If you set `TS_FORWARD_BROWSER`, the log then prints the address to open in your browser.

On the deploy form, set `TS_FORWARD_BROWSER` for a browser: type `${{` and pick `RAILWAY_PRIVATE_DOMAIN` of your Drizzle Studio or Drizzle Gateway service. Set `TS_FORWARD_DATABASE` for a database the same way. Both fields are optional; fill the ones you need. The tutorial shows the full values.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tailscale | `ghcr.io/drizzle-team/railway-tailnet:v0.1.4` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TS_HOSTNAME` | drizzle-gateway | The machine name this service takes on your tailnet |
| `TS_FORWARD_BROWSER` | - | Optional. Forwards tailnet port 4983 to your browser service. Type ${{ and pick RAILWAY_PRIVATE_DOMAIN of your Drizzle Studio or Drizzle Gateway service. For other ports, write source port, host and target port as port:host:port. You can leave it empty. |
| `TS_FORWARD_DATABASE` | - | Optional. Forwards tailnet port 5432 to your database. Type ${{ and pick RAILWAY_PRIVATE_DOMAIN of your database service. For other ports, write source port, host and target port as port:host:port. You can leave it empty. |

## Configuration

- **Volume:** `/var/lib/tailnet`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tailscale-for-drizzle)
