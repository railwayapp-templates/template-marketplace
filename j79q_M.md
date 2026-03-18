# Deploy internal-load-balancer on Railway

A load balancer for internal networking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/j79q_M)

## About

# Internal Load Balancer

If you're using an internal railway service with multiple replicas, then you might have noticed that internal incoming traffic isn't always spread out across all replicas.

This load-balancer solves that issue by routing all traffic to this load balancer instead of the target service, and it will spread the requests to all replicas (Using Round-robin).

The only thing you need to configure is the `TARGET` environment variable to the internal hostname of the target service, so for example if your target's hostname is `process-ocr` then specify `TARGET=process-ocr`. And of course don't forget to route the original traffic to this load balancer instead of the original target host.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-internal-load-balancer | [DJint-code/railway-internal-load-balancer](https://github.com/DJint-code/railway-internal-load-balancer) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `TARGET` | The target service's hostname |

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/j79q_M)
