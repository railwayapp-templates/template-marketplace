# Deploy GOTH Stack on Railway

A Go + Go Templates + HTMX Starter

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Tu9vmY)

## About

This template is meant to get you started with Go, templates, and HTMX for full stack applications. This is modeled after my personal site, and has blogging and server sent events built right in. For an example of a full site using this template, please check out my site: https://atri.dad

Once deployed, you should be good to begin modifying the code to make changes. There is nothing needed out of the box to set things up!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis` | Database |
| goth.stack | [atridadl/goth.stack](https://github.com/atridadl/goth.stack) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `PORT` | goth.stack | 3000 | The port the go server is exposed on. |
| `REDIS_URL` | goth.stack | - | The Redis URL you want to point this template to. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Go, HTML, Shell

[View on Railway →](https://railway.com/deploy/Tu9vmY)
