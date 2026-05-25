# Deploy CronCoco Scheduled Webhook Starter on Railway

Deploy webhook endpoints on Railway and schedule them with CronCoco.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/croncoco-scheduled-webhook-starter)

## About

CronCoco Scheduled Webhook Starter is a tiny Node.js webhook receiver for testing and running scheduled product workflows. Deploy it on Railway, set a shared secret, then use CronCoco to call endpoints for hourly syncs, weekly digests, cleanup jobs, and other recurring API work.

Hosting this starter on Railway gives you a public HTTPS app with ready-made webhook endpoints and a health check. Railway runs the Node.js service, provides the public domain, stores your `CRON_SECRET` environment variable, and shows request logs when scheduled webhooks arrive. After deployment, copy your Railway domain into CronCoco, create a scheduled job, and CronCoco will POST to your Railway endpoint on the cron schedule you choose. This is useful for validating scheduled webhook workflows before adding the same pattern to your own app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| croncoco-railway-template | [wb-s/croncoco-railway-template](https://github.com/wb-s/croncoco-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `CRON_SECRET` | (secret) | Shared secret expected in the x-cron-secret header. Use a long random value. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/croncoco-scheduled-webhook-starter)
