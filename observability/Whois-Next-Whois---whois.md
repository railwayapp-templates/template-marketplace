# Deploy Whois | Next Whois on Railway

Better Whois Lookup Tool With Modern UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whois)

## About

Next Whois is a fast, modern WHOIS and RDAP lookup tool built with Next.js. It allows users to perform lookups for domains, IPv4, IPv6, ASNs, and CIDR blocks with an RDAP-first approach and WHOIS fallback. Designed with a responsive interface, dark/light themes, dynamic Open Graph image generation, and multi-language support, it caters to network administrators, developers, and web professionals.

![whois UI](https://raw.githubusercontent.com/bilalnawaz072/whois/main/public/banner.png)

Deploying Next Whois on Railway provides a scalable, low-latency web service for executing domain and IP queries. Railway automatically builds and runs the application using its built-in Dockerfile configuration without requiring custom build steps.

For performance optimization, Next Whois supports an optional Redis database integration to cache lookup results and manage rate limits. Networking and HTTPS termination are handled seamlessly by Railway's edge network, providing a public URL over standard HTTP/HTTPS ports. The application operates as a stateless web service by default, but connecting an optional Redis instance ensures cached responses and faster response times across repeat queries.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whois | [bilalnawaz072/whois](https://github.com/bilalnawaz072/whois) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | whois | (secret) | - |
| `REDIS_CACHE_TTL` | whois | 3600 | - |
| `NEXT_PUBLIC_SITE_TITLE` | whois | Next Whois | - |
| `NEXT_PUBLIC_HISTORY_LIMIT` | whois | -1 | - |
| `NEXT_PUBLIC_MAX_WHOIS_FOLLOW` | whois | 0 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Observability · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/whois)
