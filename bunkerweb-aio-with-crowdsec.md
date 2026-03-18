# Deploy BunkerWeb AIO with CrowdSec on Railway

Full BunkerWeb AIO setup with CrowdSec enabled, pre-configured for Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/bunkerweb-aio-with-crowdsec)

## About

BunkerWeb All-In-One (AIO) with CrowdSec is a comprehensive, open-source security solution that combines a next-generation Web Application Firewall (WAF) with real-time intrusion prevention. It simplifies web security by bundling Nginx, ModSecurity, and CrowdSec into a single, easy-to-deploy container designed to protect applications from bots, brute-force attacks, and CVE-specific exploits.

Hosting BunkerWeb AIO with CrowdSec involves deploying a containerized instance that acts as a secure reverse proxy for your applications. The process includes configuring environment variables to define your server name, enabling CrowdSec for threat intelligence sharing, and setting up persistent storage for security logs and databases. On Railway, this is streamlined using a `template.json` configuration that manages networking (TCP Proxy for ports 80/443), volume mounting for data persistence, and internal networking to securely connect to your backend services like `rounds.railway.internal`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bunkerity/bunkerweb-all-in-one:1.6.6 | `bunkerity/bunkerweb-all-in-one:1.6.6` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MULTISITE` | yes |
| `USE_REDIS` | yes |
| `SERVICE_UI` | yes |
| `SERVICE_API` | no |
| `USE_CROWDSEC` | yes |
| `AUTO_LETS_ENCRYPT` | yes |
| `REVERSE_PROXY_URL` | / |
| `USE_REVERSE_PROXY` | yes |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8443
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/bunkerweb-aio-with-crowdsec)
