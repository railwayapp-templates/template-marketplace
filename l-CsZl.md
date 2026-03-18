# Deploy Grafana on Railway

Open source analytics & monitoring solution for every database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/l-CsZl)

## About

# Dashboard anything. Observe everything.

Query, visualize, alert on, and understand your data no matter where it’s stored. With Grafana you can create, explore, and share all of your data through beautiful, flexible dashboards.

Create, explore, and share beautiful dashboards that combine data from multiple sources to foster a data-driven culture within your team.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grafana | `grafana/grafana:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GF_SECURITY_ADMIN_USER` | (secret) |
| `GF_USERS_ALLOW_SIGN_UP` | false |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/grafana`

**Category:** Analytics

[View on Railway →](https://railway.com/template/l-CsZl)
