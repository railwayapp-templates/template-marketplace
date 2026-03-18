# Deploy railtail on Railway

Connect to Tailscale nodes from Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railtail)

## About

railtail is a HTTP/TCP proxy for Railway workloads connecting to Tailscale
nodes. It listens on a local address and forwards traffic it receives on
the local address to a target Tailscale node address.

📣 This is a workaround until there are [full VMs available in Railway](https://help.railway.com/feedback/full-unix-v-ms-44eef294). Please upvote the thread if you want this feature!

More information available at https://github.com/half0wl/railtail

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railtail | [half0wl/railtail](https://github.com/half0wl/railtail) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LISTEN_PORT` | - | Port to listen on. |
| `TARGET_ADDR` | - | address:port of the Tailscale node to send traffic to. Example: `your-rds-instance.rds.amazonaws.com:5432` |
| `TS_AUTH_KEY` | (secret) | Tailscale auth key |
| `TS_HOSTNAME` | - | Hostname to use for Tailscale |
| `TS_LOGIN_SERVER` | (secret) | Base URL of the control server. If you are using Headscale for your control server, use your Headscale instance's url. Defaults to using Tailscale. |
| `TS_STATEDIR_PATH` | /railtail | Tailscale state dir. |

## Configuration

- **Volume:** `/railtail`

**Category:** Other · **Languages:** Go

[View on Railway →](https://railway.com/deploy/railtail)
