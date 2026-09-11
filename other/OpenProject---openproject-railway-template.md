# Deploy OpenProject on Railway

An open-source project management platform for teams and enterprises.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openproject-railway-template)

## About

OpenProject is an open-source project management platform for teams that need planning, collaboration, task tracking, agile workflows, roadmaps, time tracking, and project reporting in one place. It provides a web-based workspace for managing projects across traditional, agile, and hybrid methodologies.

This template deploys the official OpenProject all-in-one container on Railway.

The deployment includes the OpenProject web application together with its internal PostgreSQL database, Memcached cache, background workers, and supporting processes inside a single Railway service.

A persistent Railway volume is mounted at `/var/openproject` so application assets and the internal PostgreSQL database can survive service restarts and redeployments.

Railway Public Networking exposes the OpenProject web interface over HTTPS while the application itself listens internally on port `80`.

This deployment is designed to provide a simple self-hosted OpenProject setup without requiring separate database, cache, worker, or storage services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openproject | `openproject/openproject:17` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET_KEY_BASE` | (secret) | Persistent Rails encryption and session secret |
| `OPENPROJECT_HTTPS` | true | Enable HTTPS-aware URLs behind Railway proxy |
| `RAILS_MAX_THREADS` | 16 | Maximum Rails application threads |
| `RAILS_MIN_THREADS` | 4 | Minimum Rails application threads |
| `OPENPROJECT_HOST__NAME` | - | Public Railway hostname |
| `OPENPROJECT_DEFAULT__LANGUAGE` | en | Default OpenProject language |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/openproject`

**Category:** Other

[View on Railway →](https://railway.com/deploy/openproject-railway-template)
