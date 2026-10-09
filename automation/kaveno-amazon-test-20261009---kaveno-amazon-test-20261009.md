# Deploy kaveno-amazon-test-20261009 on Railway

Kavenobuilder Amazon runner (TEST). Deploy only via Kavenobuilder setup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaveno-amazon-test-20261009)

## About

Kavenobuilder Amazon runner, TEST publication. Deploy only from the Kavenobuilder setup flow; a deploy from this page alone starts nothing.

The runner is the customer's own cloud for Kavenobuilder's Amazon reports. It keeps the
customer's data on the customer's own Railway account. It registers only with
kavenobuilder.com, and only after the account owner approves it there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kaveno-amazon-test-20261009 | `ghcr.io/tommyv-spec/kaveno-amazon-runner@sha256:11053c4b33ff15c6e432a4192348244aa4e0c99b380c46c432613107134b9a07` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `KAVENO_CLOUD_CONTROL_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/kaveno-amazon-test-20261009)
