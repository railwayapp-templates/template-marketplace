# Deploy Faktory on Railway

Language-agnostic persistent background job server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Hh00T5)

## About

<p align="center">
    <a href="https://contribsys.com/faktory/">
        <img alt="faktory logo" src="https://contribsys.com/images/faktory-logo.svg" style="background: #EEEEEE; padding: 30px; border-radius: 5px; width: 500px;">
    </a>
</p>

<h3 align="center">High-performance job processing for the polyglot enterprise</h3>

<img alt="sample faktory web ui screenshot" src="https://contribsys.com/images/faktory-ui.png" style="border-radius: 5px;">

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Faktory | `contribsys/faktory` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `FAKTORY_URL` | - | Public URL |
| `FAKTORY_HOST` | - | Public host |
| `FAKTORY_PORT` | - | Public port |
| `FAKTORY_PASSWORD` | (secret) | Password for Faktory |
| `FAKTORY_PRIVATE_URL` | - | Private URL |
| `FAKTORY_PRIVATE_HOST` | - | Private host |
| `FAKTORY_PRIVATE_PORT` | 7419 | Private port |
| `FAKTORY_UI_PRIVATE_PORT` | 7420 | UI private port |

## Configuration

- **Start command:** `/bin/sh -c "exec /faktory -w [::]:${FAKTORY_UI_PRIVATE_PORT} -b [::]:${FAKTORY_PRIVATE_PORT}"`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7419
- **Volume:** `/var/lib/faktory/db`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/Hh00T5)
