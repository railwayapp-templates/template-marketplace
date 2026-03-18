# Deploy TRIP on Railway

Self-hostable minimalist Map tracker and Trip planner

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/trip)

## About

**TRIP** is a lightweight travel planning web application packaged as a single Docker image. It runs as a self-contained service and persists data using a single mounted volume, making it simple to deploy and operate.

Hosting TRIP on Railway consists of deploying a prebuilt Docker image and attaching one persistent volume for application data. There are no external services, databases, or background workers required. Railway manages the container lifecycle, networking, and storage, allowing TRIP to run with minimal configuration and low operational overhead.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Trip | `ghcr.io/itskovacs/trip:1` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Other

[View on Railway →](https://railway.com/template/trip)
