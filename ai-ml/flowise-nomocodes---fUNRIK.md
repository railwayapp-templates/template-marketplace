# Deploy flowise-nomocodes on Railway

A template for deploying FlowiseAI with persisted volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fUNRIK)

## About

This is a template for deploying FlowiseAI with persisted volume. I made this for @nomocodes users to quickly try out FlowiseAI without figuring out the paths themselves and getting lost.

For the variables, other than flowise username and passwords, do not change the rest of the variables. Flowise username and passwords are optional and should only be used if you want to gate access to your flowise app.

Happy building with no-code!

Jasper @nomocodes

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| FlowiseAI-Railway | [jiajasper/FlowiseAI-Railway-Nomo](https://github.com/jiajasper/FlowiseAI-Railway-Nomo) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | DO NOT CHANGE THIS |
| `LOG_PATH` | /opt/railway/.flowise/logs | DO NOT CHANGE THIS |
| `PASSPHRASE` | MYPASSPHRASE | DO NOT CHANGE THIS |
| `APIKEY_PATH` | /opt/railway/.flowise | DO NOT CHANGE THIS |
| `DATABASE_PATH` | /opt/railway/.flowise | DO NOT CHANGE THIS |
| `SECRETKEY_PATH` | (secret) | DO NOT CHANGE THIS |
| `FLOWISE_PASSWORD` | (secret) | Put your own password  |
| `FLOWISE_USERNAME` | (secret) | Put your own user name |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/railway/.flowise`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/fUNRIK)
