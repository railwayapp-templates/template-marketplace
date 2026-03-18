# Deploy Tailscale Forwarder on Railway

Connect to Railway services that are not publicly accessible

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tailscale-forwarder)

## About

Tailscale Forwarder is a TCP proxy that allows you to connect through a Tailscale machine to the configured target address and port pair. This enables secure access to Railway services that are not accessible from the internet, effectively creating a private network tunnel for your infrastructure.

&nbsp;

Hosting Tailscale Forwarder gives you access to a secure TCP proxy service that bridges your Tailscale network with Railway's private services. The forwarder provides secure network tunneling, flexible port mapping configuration, and seamless integration with Railway's private domains. It excels at creating secure connections to databases and services that should remain locked down from public internet access, while supporting multiple concurrent connection mappings.

&nbsp;

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tailscale Forwarder | `ghcr.io/brody192/tailscale-forwarder:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TS_AUTHKEY` | - | Your Tailscale Auth Key. |
| `TS_HOSTNAME` | - | The hostname to use for the Tailscale machine. |
| `TS_EPHEMERAL` | false | Run Tailscale as a persistent machine. |
| `TS_STATE_DIR` | - | The location in which Tailscale's state is stored. |
| `CONNECTION_MAPPING_01` | - | The connection mapping for the initial service; add more by incrementing the index.&nbsp;See the [README](https://github.com/brody192/tailscale-forwarder?tab=readme-ov-file#usage) for supported syntax. |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/tailscale-forwarder)
