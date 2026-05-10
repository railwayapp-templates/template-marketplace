# Deploy railbird on Railway

Connect to Railway services via Netbird.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railbird)

## About

railbird is a TCP port forwarder that bridges Railway services and a [NetBird](https://netbird.io/) mesh. It runs an embedded NetBird client and forwards traffic in either direction — Railway → mesh peers (egress) or mesh peers → Railway services (ingress) — so services on Railway can reach other peers on a NetBird mesh without per-app SOCKS5 setup.

Hosting railbird is a matter of running a single Go binary as its own Railway service, accessible only over Railway's Private Network. The container joins your NetBird mesh at startup using a setup key and your management URL, then opens one local listener per entry in the `FORWARDS` list. State (the device's WireGuard private key) lives on a small persistent volume so the same peer identity survives redeploys instead of re-registering against your setup-key quota every restart. No public ports are exposed; sibling Railway services connect via railbird's `RAILWAY_PRIVATE_DOMAIN` on the listen ports you configured.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railbird | [jratienza65/railbird](https://github.com/jratienza65/railbird) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MODE` | ingress | Forwarding mode (ingress, egress) |
| `FORWARDS` | - | Comma-separated. Example: 5432=db.internal:5432, 6379=cache.internal:6379. |
| `NB_STATE_DIR` | /var/lib/netbird/data | - |
| `NB_DEVICE_NAME` | railbird | - |
| `NB_MANAGEMENT_URL` | https://api.netbird.io | - |

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/railbird)
