# Deploy habittrove on Railway

HabitTrove is a habit tracker that rewards completed habits with coins

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/habittrove-template)

## About

[HabitTrove](https://github.com/dohsimpson/HabitTrove) is a self-hosted, open-source, gamified habit tracking application built with Next.js. It helps users create habits, track progress, earn coins for completions, and redeem those coins against a custom wishlist of rewards.

The official Docker image stores data in local JSON files under the container filesystem (`/app/data`) and creates rotating backups in `/app/backups`. On Railway, this template deploys the upstream image directly and mounts persistent storage to `/app/data`, which keeps user data and application state across restarts and redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| habittrove | `dohsimpson/habittrove:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `AUTH_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/habittrove-template)
