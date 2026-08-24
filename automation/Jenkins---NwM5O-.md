# Deploy Jenkins on Railway

The leading open source automation server.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/NwM5O-)

## About

[What is Jenkins? Your description in roughly ~50 words.]

[Roughly 100 word description what's involved in hosting/deploying Jenkins]

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jenkins | `jenkins/jenkins:2.578` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TINI_SUBREAPER` | 1 |
| `JENKINS_PRIVATE_PORT` | 8080 |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/jenkins_home`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/NwM5O-)
