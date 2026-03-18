# Deploy nginx-modsecurity-waf on Railway

Deploy and Host nginx-modsecurity-waf with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nginx-modsecurity-waf)

## About

nginx-modsecurity-waf is a lightweight security reverse proxy built with Nginx, ModSecurity 3, and the OWASP Core Rule Set. It filters and blocks common web attacks before they reach your backend.

Deploying nginx-modsecurity-waf means running an Nginx reverse proxy with ModSecurity enabled and CRS rules loaded. The WAF inspects every request and only forwards clean traffic to your backend. On Railway it listens on port 8080 and connects to your app using the BACKEND environment variable. Railway handles networking, scaling, and SSL termination so you get a fully managed WAF with minimal setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| coreruleset/modsecurity-crs | `ghcr.io/coreruleset/modsecurity-crs:nginx-alpine` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BACKEND` | - | Your backend URL |
| `LOGLEVEL` | warn | - |
| `SSL_PORT` | 8443 | - |
| `SSL_ENGINE` | off | enable if needed |
| `ALLOWED_METHODS` | GET HEAD POST OPTIONS | - |
| `MODSEC_AUDIT_LOG` | /dev/stdout | - |
| `BLOCKING_PARANOIA` | 1 | - |
| `METRICS_DENY_FROM` | none | - |
| `DETECTION_PARANOIA` | 1 | - |
| `METRICS_ALLOW_FROM` | 0.0.0.0/0 | - |
| `CRS_DISABLE_PLUGINS` | 0 | - |
| `MODSEC_AUDIT_ENGINE` | RelevantOnly | - |
| `VALIDATE_UTF8_ENCODING` | 0 | common false-positive source |
| `NGINX_ALWAYS_TLS_REDIRECT` | off | - |
| `APACHE_ALWAYS_TLS_REDIRECT` | off | - |
| `ALLOWED_REQUEST_CONTENT_TYPE` | |application/json| | - |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8443

**Category:** Other

[View on Railway →](https://railway.com/template/nginx-modsecurity-waf)
