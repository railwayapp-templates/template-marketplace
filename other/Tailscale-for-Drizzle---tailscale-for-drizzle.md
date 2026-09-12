# Deploy Tailscale for Drizzle on Railway

Put an existing Drizzle Studio or Gateway on your tailnet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailscale-for-drizzle)

## About

Tailscale for Drizzle adds a private address to a Drizzle Studio or Drizzle Gateway service that you already run on Railway. Only devices on your tailnet can reach it.

This template adds one Tailscale service to a project that already runs Drizzle Studio or Drizzle Gateway from the plain template. Deploy the browser service first, then deploy this template into the same project. The Tailscale service joins your tailnet as its own machine and forwards its port to your existing browser service over Railway's private network. It adds no public domain.

You do not generate or paste a key. The Tailscale service prints a sign-in link into its deploy log. You open the link, sign in, and the machine joins your tailnet. The log then prints the address to open in your browser.

On the deploy form, fill `TS_FORWARD_1`: type `4983:`, then type `${{` and pick `RAILWAY_PRIVATE_DOMAIN` of your Drizzle Studio or Drizzle Gateway service, then type `:4983`. The tutorial shows the full value.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tailscale | `ghcr.io/drizzle-team/railway-tailnet:v0.1.3` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TS_HOSTNAME` | drizzle-gateway | The machine name this service takes on your tailnet |
| `TS_FORWARD_1` | - | Required. Forwards tailnet port 4983 to your browser service. Type 4983:, then type ${{ and pick RAILWAY_PRIVATE_DOMAIN of your Drizzle Studio or Drizzle Gateway service, then type :4983. |
| `TS_FORWARD_2` | - | Optional. Forwards tailnet port 5432 to your database. Type 5432:, then type ${{ and pick RAILWAY_PRIVATE_DOMAIN of your database service, then type :5432. You can leave it empty. |

## Configuration

- **Volume:** `/var/lib/tailnet`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tailscale-for-drizzle)
