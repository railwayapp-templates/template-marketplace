# Deploy doh on Railway

a simaple private DNS, work at DoH

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gUgRJT)

## About

This project aims to develop a simple yet efficient private DNS service that supports DNS over HTTPS (DoH) protocol. By implementing DoH, we can provide DNS resolution services while ensuring user privacy and security. This private DNS solution effectively prevents DNS hijacking and eavesdropping, while also enhancing resolution speed and optimizing the overall network experience. Users can easily configure and utilize the service, making it suitable for individuals and small businesses alike. Our goal is to offer users a reliable and secure online environment, ensuring that every DNS query remains private and protected.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| doh | [flxxyz/zns](https://github.com/flxxyz/zns) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WEB_ROOT` | /app/web | Set web static dir |
| `PAYMENT_FREE` | 1 | Set free mode |
| `DNS_UPSTREAMS` | https://doh.pub/dns-query,https://dns.alidns.com/dns-query,https://doh.360.cn/dns-query | Set DoH upstream URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Go, JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/gUgRJT)
