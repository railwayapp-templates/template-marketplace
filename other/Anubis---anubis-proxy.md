# Deploy Anubis on Railway

Reverse proxy that blocks AI scrapers with a browser puzzle

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anubis-proxy)

## About

Anubis is a Web AI Firewall Utility that sits in front of a website and makes every visiting browser solve a small proof-of-work puzzle before the request reaches the application behind it. AI training crawlers now generate a large share of traffic to small sites, and a wiki or Git forge that was comfortable on one server can be knocked over by one walking every page revision. A scraper that does not execute JavaScript cannot solve the puzzle, so it never reaches the origin.

This template lets you deploy Anubis and self-host Anubis on Railway with the three pieces it needs already wired together. **Anubis** is the only service with a public domain: it weighs each request against a bot policy and proxies whatever passes to **Origin**, a small nginx service reachable only through it. **Redis** stores issued challenges so they survive a redeploy and stay valid across replicas. Origin is a stand-in for whatever you actually want protected — change one variable and Anubis fronts your own service instead.

![Public Anubis service above the private Origin and Redis](https://res.cloudinary.com/rroe4rtk/image/upload/v1788789391/anubis-architecture.png)

Anubis is a reverse proxy written in Go by Xe Iaso at Techaro, under the MIT licence. A policy file decides whether each request is allowed, denied with a page a scraper reads as success, challenged with proof of work, or reweighted so borderline traffic is judged on the balance of signals.

- A default policy denying the known AI crawler fleet by name and challenging anything else claiming to be a browser
- Rules matched on user agent, path, headers, address range and CEL expressions
- Configurable difficulty, so you decide how expensive scraping becomes
- An allow-list for real search engines, scoped to their published IP ranges, so indexing survives
- Open Graph passthrough, so chat-app link previews survive the challenge
- A Prometheus endpoint reporting how often each named rule fired

Self-host it when you cannot or will not put a commercial CDN in front of an origin and the traffic has stopped being sustainable. It is deliberately blunt: some smaller crawlers and text-mode browsers get blocked too.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Origin | [gridalpha/anubis-railway](https://github.com/gridalpha/anubis-railway) | Worker |
| Redis | `redis:8.2` | Database |
| Anubis | [gridalpha/anubis-railway](https://github.com/gridalpha/anubis-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Origin | 8080 | HTTP listener, private only |
| `PRIVATE_URL` | Origin | http://origin.railway.internal:8080 | Private URL Anubis proxies to |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `BIND` | Anubis | :8923 | Proxy listener, the public domain's target |
| `PORT` | Anubis | 9090 | Health-check port, the metrics listener |
| `TARGET` | Anubis | - | Service that passing requests reach |
| `REDIS_URL` | Anubis | - | Issued-challenge store |
| `DIFFICULTY` | Anubis | 4 | Leading zeroes the proof of work needs |
| `SLOG_LEVEL` | Anubis | INFO | Log level; DEBUG logs every request |
| `METRICS_BIND` | Anubis | :9090 | Metrics and /healthz listener |
| `COOKIE_SECURE` | Anubis | true | Secure flag on the challenge cookie |
| `OG_PASSTHROUGH` | Anubis | true | Proxy Open Graph tags for link previews |
| `REDIRECT_DOMAINS` | Anubis | - | Domains a passed challenge may reach |
| `SERVE_ROBOTS_TXT` | Anubis | true | Serve a robots.txt naming AI crawlers |
| `ED25519_PRIVATE_KEY_HEX` | Anubis | - | Signs challenge tokens |

## Configuration

- **Healthcheck:** `/healthz`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/anubis-proxy)
