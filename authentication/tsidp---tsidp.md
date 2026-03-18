# Deploy tsidp on Railway

A simple OIDC / OAuth Identity Provider (IdP) server for your tailnet.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tsidp)

## About

[tsidp](https://github.com/tailscale/tsidp) is an OIDC / OAuth Identity Provider (IdP) server that integrates with your Tailscale network. It allows you to use Tailscale identities for zero-click authentication into applications that support OpenID Connect as well as authenticated MCP client / server connections.

To any application that supports a custom auth provider, tsidp presents itself as an IdP just like Google, Entra ID, Okta, etc. After registering a locally hosted or SaaS application with tsidp and configuring tsidp as the auth provider, users authenticating into the app will be redirected to tsidp, their identity verified, and then immediately redirected back.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tsidp | `ghcr.io/tailscale/tsidp:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TSIDP_LOG` | - | Set logging level: debug, info, warn, error |
| `TSIDP_PORT` | - | Port to listen on. Defaults to 443. |
| `TS_AUTHKEY` | - | RECOMMENDED — Key for registering a tsidp as a new node on your tailnet. If omitted a link will be printed to manually register. |
| `TS_HOSTNAME` | - | hostname on tailnet. Will become <hostname>.your-tailnet.ts.net Defaults to idp |
| `TS_STATE_DIR` | /data | Directory path to save tsnet and tsidp state. Template defaults to /data. |
| `TSIDP_ENABLE_STS` | - | Enable OAuth token exchange using RFC 8693. |
| `TSIDP_USE_FUNNEL` | - | Use Tailscale Funnel to make tsidp available on the public internet so it works with SaaS products. |
| `TAILSCALE_USE_WIP_CODE` | 1 | Needs to be set until version 1.0 |

## Configuration

- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/template/tsidp)
