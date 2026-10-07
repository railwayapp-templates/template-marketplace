# Deploy GitHub Repo Banner on Railway

About Generate customizable GitHub repository banners via URL parameters.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/github-repo-banner)

## About

GitHub Repo Banner is a fast, customizable SVG banner generator for GitHub repositories. Generate beautiful banners through simple URL parameters—no design tools required. Built with Hono and TypeScript for instant, on-demand banner creation with support for custom colors, backgrounds, gradients, and text formatting.

GitHub Repo Banner is a lightweight, stateless API service built with Hono (ultrafast web framework) and TypeScript. It generates SVG banners dynamically through HTTP requests with zero database requirements. The service accepts URL parameters for header text, colors, backgrounds, and styling, then returns optimized SVG graphics in real-time. Deployment is straightforward—simply build the TypeScript source and run the Node.js server. The service includes a web UI for easy banner customization and preview, making it accessible to both developers and non-technical users. With built-in caching headers and health checks, it's production-ready out of the box.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Banner API and Website | [warengonzaga/github-repo-banner](https://github.com/warengonzaga/github-repo-banner) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | Banner API and Website | 8080 | Application listening port; matches the template HTTP port. |
| `REDIS_URL` | Banner API and Website | - | Private connection to the bundled Redis service. |
| `PEXELS_API_KEY` | Banner API and Website | (secret) | Optional Pexels API key. Leave blank to hide photo search; direct image URLs still work. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH --appendonly yes --maxmemory 128mb --maxmemory-policy noeviction"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, HTML, JavaScript, CSS, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/github-repo-banner)
