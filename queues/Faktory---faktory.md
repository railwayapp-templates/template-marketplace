# Deploy Faktory on Railway

Faktory 1.10: language-agnostic background job server with a web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/faktory)

## About

Faktory is a language-agnostic background job server from the author of Sidekiq. Producers push jobs to named queues, and workers in Ruby, Go, Python, Node.js, Rust or other languages fetch and acknowledge them. It handles retries with backoff, scheduled jobs and a dead set, and comes with a web dashboard.

This template runs the official `contribsys/faktory:1.10.0` image as one service in production mode, where every client and the dashboard need the generated password. Workers in the same project connect over the private network on port 7419, and a TCP proxy lets workers outside Railway connect too. The web dashboard is on a public HTTPS domain and asks for the same password with any username. Queues live in Faktory's embedded Redis on a Railway volume, so pending jobs survive redeploys. The image runs as root and has no health endpoint, so the service relies on the restart policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| faktory | `contribsys/faktory:1.10.0` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 7420 |
| `FAKTORY_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/faktory -b [::]:7419 -w [::]:7420 -e production`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 7419
- **Volume:** `/var/lib/faktory`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/faktory)
