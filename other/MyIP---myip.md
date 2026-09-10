# Deploy MyIP on Railway

All-in-one IP, DNS, WebRTC leak and network diagnostics toolbox

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/myip)

## About

MyIP is an open-source IP toolbox that folds a dozen network-diagnostic websites into one page. It reports the IPv4 and IPv6 addresses you are seen with from several independent lookup sources at once, tests latency to sites you choose, detects WebRTC and DNS leaks, resolves a domain against public resolvers worldwide, runs Whois and MAC lookups, and draws an ASN's upstream path to the Tier 1 backbone. Network engineers, VPN users and anyone debugging why a site is slow from one country and fine from another use it instead of six bookmarks. Upstream is [jason5ng32/MyIP](https://github.com/jason5ng32/MyIP); its demo runs at ipcheck.ing.

Self-host MyIP on Railway and you get one service, `myip`, built from the [gridalpha/myip-railway](https://github.com/gridalpha/myip-railway) repository on top of the official `jason5ng32/myip:latest` image. The container runs two Node processes: a static server on the public port serving the Vue front end, and an API backend it proxies `/api` to over localhost. The backend talks to the outside world — geolocation providers, Whois registries, CAIDA, RIPEstat and Globalping — so API keys never reach the browser. A 5 GB volume at `/data` holds the ASN datasets downloaded on first boot.

![Diagram of the MyIP service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788938396/myip-architecture.png)

The problem MyIP solves is fragmentation. Answering "is my VPN working, and why is this site slow?" normally means one site for your IP, another for a DNS leak test, a third for WebRTC and a fourth for Whois. Self-hosting puts all of it on a host you control, so the diagnostic traffic stays with you.

Key features:

- IP and geolocation from several independent sources side by side, for IPv4 and IPv6
- WebRTC leak detection with NAT type, and a DNS leak test naming the resolvers that answered
- Connectivity checks against up to 60 sites of your choosing, plus speed tests
- DNS resolution compared across public resolvers by country, over DNS and DNS-over-HTTPS
- Whois for domains and IPs, MAC vendor lookup, BGP prefix history and ASN upstream topology
- Global latency and MTR tests from Globalping probes, plus OONI-backed censorship checks
- Browser fingerprinting, six UI languages, dark mode and PWA install

The Railway architecture is deliberately small. `myip` is the only service and needs no database: everything a visitor accumulates lives in their own browser. The volume is not user data — it holds the CAIDA snapshots behind ASN naming and the topology graph, plus the optional MaxMind databases. Keeping them there means a redeploy serves in about two seconds rather than re-downloading on every boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| myip | [gridalpha/myip-railway](https://github.com/gridalpha/myip-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 18966 | Public HTTP port for the front end |
| `LOG_LEVEL` | info | Log verbosity: debug, info, warn, error |
| `BACKEND_PORT` | 11966 | Internal API port, never published |
| `IPINFO_API_KEY` | (secret) | Optional ipinfo.io token, raises quota |
| `ALLOWED_DOMAINS` | - | Referer allow-list for /api |
| `TRUST_PROXY_HOPS` | 2 | Express trust-proxy hop count on Railway |
| `CAIDA_AUTO_UPDATE` | true | Refresh ASN datasets daily |
| `MAXMIND_ACCOUNT_ID` | - | Optional free GeoLite2 account id |
| `MAXMIND_AUTO_UPDATE` | true | Refresh GeoLite2 daily when credentials set |
| `MAXMIND_LICENSE_KEY` | - | Optional free GeoLite2 license key |
| `SECURITY_RATE_LIMIT` | 1200 | API requests per client IP per 20 minutes |
| `SECURITY_DELAY_AFTER` | 1000 | Requests per IP per hour before slowdown |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/myip)
