# Deploy nomad on Railway

a collaborative travel planner with maps, budgets, packing lists, bookings

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nomad-1)

## About

TREK (formerly NOMAD) is a self-hosted travel planning platform designed for collaborative trip organization. It supports shared itineraries, interactive maps, bookings, budgeting, packing lists, file uploads, and realtime updates. Railway is a managed deployment platform that makes it easy to run Docker-based applications with public networking, HTTPS, and environment-variable configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `mauriceboe/nomad:2.6.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NODE_ENV` | production |
| `JWT_SECRET` | (secret) |
| `TRUST_PROXY` | 1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nomad-1)
