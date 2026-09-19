# Deploy home-assistant-template on Railway

Home Assistant (container) for cloud smart homes - one-click deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/home-assistant-template)

## About

Home Assistant Container deploys on Railway as a single service built from the official upstream image, with a persistent volume at `/config` and the web UI on port 8123 at your Railway domain. Everything that defines your smart home — `configuration.yaml`, `automations.yaml`, the `.storage` directory, and the SQLite recorder database — lives on the volume, so redeploys and upgrades never lose your setup. The template ships a first-boot seed that configures Home Assistant to trust Railway's reverse proxy (required, otherwise every proxied request is rejected) and gives the process a graceful 60-second drain at shutdown so the recorder can checkpoint its database.

Hosting Home Assistant yourself means your automations, dashboards, and integrations run on infrastructure you control, reachable from anywhere via HTTPS on your Railway domain. You create your own admin account in the onboarding wizard on first visit — nothing is shared with the template author. Expect roughly $5–10/month for the service and volume. Container mode cannot use USB radios or the add-on store, and LAN discovery does not exist in the cloud, so integrations are added by IP address or cloud account; MQTT, ESPHome-over-network, webhooks, Nabu Casa, and HACS all work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| home-assistant | [lNamelessl/home-assistant-railway-template](https://github.com/lNamelessl/home-assistant-railway-template) | Web service |

## Configuration

- **Healthcheck:** `/api/onboarding`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Automation · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/home-assistant-template)
