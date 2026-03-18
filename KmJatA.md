# Deploy Prometheus on Railway

A minimal implementation of the Prometheus time series database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/KmJatA)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/KmJatA?referralCode=9kQOPq)

Deploy Prometheus on Railway with one click. Pre-configured to self-monitor the Prometheus service and [a well-known demo-application](https://node.demo.prometheus.io/metrics)

Once you have deployed this template, modifications are simple.:

1) find and clone your new repo

2) update or replace the `prometheus.yml` file with your own settings and endpoints

3) push the changes to your GitHub repo and Railway will automatically redeploy the service

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-prometheus | [zuchka/railway-prometheus](https://github.com/zuchka/railway-prometheus) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9090 | default port for prometheus service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/prometheus`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/KmJatA)
