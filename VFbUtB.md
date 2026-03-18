# Deploy Caching CORS Proxy on Railway

A simple CORS proxy with optional dynamic caching capabilities

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/VFbUtB)

## About

## Caching CORS Proxy

A simple CORS proxy with optional dynamic caching. To use the cache, use the `/cache/{time}` endpoint. Time must represent a valid duration. Ex:

-   `1 minute`
-   `2 hours`

Allowed durations are:

-   ms
-   second(s)
-   minute(s)
-   hour(s)
-   day(s)
-   week(s)
-   month(s)

To avoid using the cache, simply use `/{YOUR URL}`. To bypass cache on a specific request, set `"x-apicache-bypass": true` in the request header.

ALL requests will be routed through the CORS server, regardless of whether they are cached or not.

To enable detailed logs of requests in the console, set the `EHNANCED_LOGS` environment variable to `true`.

### Examples

-   `https://CACHE PROXY URL/cache/10 minutes/https://URL TO BE CACHED/` will be cached for 10 minutes.
-   `https://CACHE PROXY URL/cache/1 hour/https://URL TO BE CACHED/` will be cached for 1 hour.
-   `https://CACHE PROXY URL/https://URL TO BE CACHED/` will not be cached.

For bug reports or feature requests, please open an issue on [our github page](https://github.com/campaigncode/proxy).

_Notice:_ The logo for this template is provided by [VectorPortal](https://vectorportal.com).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Proxy | [campaigncode/proxy](https://github.com/campaigncode/proxy) | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | Proxy | - | Redis URL |
| `ENHANCED_LOGS` | Proxy | false | Setting to true enables enhanced logging of each request |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/VFbUtB)
