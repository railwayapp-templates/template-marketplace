# Deploy RSSHub on Railway

Creates RSS feeds for websites

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rss-hub)

## About

RSSHub is an open-source feed generator that manufactures RSS, Atom and JSON feeds for the roughly 1,600 sites that no longer publish one — social networks, video platforms, forums, universities, notice boards, code hosts and newspapers. Each supported site has a *route*: a small piece of TypeScript that fetches the source and normalises it into feed items. If you have ever wanted a subscribe button on a page that only offers an algorithmic timeline, RSSHub is the piece that makes it exist.

Self-host RSSHub on Railway and you get a private feed factory instead of a shared one. This template runs the official `diygod/rsshub` image alongside a Railway-managed Redis holding the route and content cache, so repeat requests are answered from memory rather than by re-fetching the source. The app is the only service on the public internet; Redis stays private. Every route sits behind an access key, so your instance answers you and not the whole internet.

![Diagram of the RSSHub and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787196681/rsshub-architecture.png)

RSSHub sits between a website and your reader. A request arrives as a path such as `/bilibili/user/video/2267573`; RSSHub matches it to a route module, fetches the upstream page or API, parses it and renders a standards-compliant feed. Nothing is stored permanently, so a restart costs you nothing but a cold cache.

Teams self-host it for three reasons. The public demo is shared infrastructure, so your polling competes with everyone else's. Some routes need credentials — a YouTube API key, a GitHub token, site cookies — and those belong on hardware you control. And an internal instance can read intranet pages a public service never could.

Key features:

- Roughly 1,600 site namespaces and several thousand routes, community-maintained
- RSS 2.0, Atom, JSON Feed and RSS3 output from the same URL
- Regex include/exclude filters and item limits as query parameters
- Access-key auth, plus per-route codes that never expose the master key

The template runs two services. **rsshub** is the Node.js application on port 1200, with a public domain and a health check on `/`. **Redis** is Railway's managed instance, private, with its own volume; RSSHub writes two cache tiers into it — one keyed by route, a longer one for fetched article bodies — which is what stops a popular feed hammering its source on every poll.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rsshub | `diygod/rsshub:latest` | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rsshub | 1200 | HTTP port the app listens on |
| `REDIS_URL` | rsshub | - | Private Redis connection string |
| `ACCESS_KEY` | rsshub | - | Required on every route except the home page |
| `CACHE_TYPE` | rsshub | redis | Use Redis instead of the in-process LRU |
| `DEBUG_INFO` | rsshub | false | Hide request statistics on the home page |
| `NO_LOGFILES` | rsshub | true | Log to stdout only, no files on disk |
| `CACHE_EXPIRE` | rsshub | 600 | Route cache lifetime in seconds |
| `DISABLE_NSFW` | rsshub | true | Drop adult-site namespaces from the catalogue |
| `DISALLOW_ROBOT` | rsshub | true | Serve Disallow to search crawlers |
| `CACHE_CONTENT_EXPIRE` | rsshub | 7200 | Article body cache lifetime in seconds |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/rss-hub)
