# Deploy crypt.fyi on Railway

ephemeral, zero-knowledge, end-to-end encrypted sensitive data sharing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Pmkrsc)

## About

[crypt.fyi](https://crypt.fyi) - A zero-knowledge, end-to-end encrypted secret sharing platform that enables secure transmission of sensitive information.

## Features

- 🔐 End-to-end encryption using AES-256-GCM
- 🛡️ Strict Content Security Policy (CSP) to prevent XSS attacks and unauthorized resource loading
- 🛡️ Strict rate limits to mitigate brute-force attacks
- 🤫 Zero-knowledge architecture - server never sees unencrypted data or decryption keys
- 🔥 Burn after reading w/ provisions to prevent erroneous burns from bots or url introspection
- ⏰ Automatic expiration (Time-To-Live)
- 🗝️ Password protection
- 📁 File sharing support w/ drag and drop
- 🪝 Webhook notifications for read success, read failure, and burn events
- 🌐 IP/CIDR allow-listing
- 🔢 Read count limits
- 📱 QR code generation
- ⌨️ [CLI](https://www.npmjs.com/package/@crypt.fyi/cli) for interacting with the API
- 🧩 [Chrome Extension](https://chromewebstore.google.com/detail/cryptfyi/hkmbmkjfjfdbpohlllleaacjkacfhald)
- 🐳 Docker images for the api server and web client
- 🌐 Localization with a handful of supported languages (more to come - help wanted!)

[![CI](https://github.com/osbytes/crypt.fyi/actions/workflows/ci.yml/badge.svg)](https://github.com/osbytes/crypt.fyi/actions/workflows/ci.yml)
[![Security Headers](https://img.shields.io/badge/Security%20Headers-A-brightgreen)](https://securityheaders.com/?q=https://www.crypt.fyi&followRedirects=on)
[![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade-score/crypt.fyi)](https://developer.mozilla.org/en-US/observatory/analyze?host=crypt.fyi)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/9850/badge)](https://bestpractices.coreinfrastructure.org/projects/9850)
[![i18n ✓](https://img.shields.io/badge/i18n-✓-blue?logo=translate)](https://github.com/osbytes/crypt.fyi/tree/main/packages/core/src/i18n/locales)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| @crypt.fyi/server | [osbytes/crypt.fyi](https://github.com/osbytes/crypt.fyi) | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| @crypt.fyi/web | [osbytes/crypt.fyi](https://github.com/osbytes/crypt.fyi) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | @crypt.fyi/server | production | - |
| `BODY_LIMIT_BYTES` | @crypt.fyi/server | 1MB | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `API_URL` | @crypt.fyi/web | - | Base URL of the @crypt.fyi/server service https://${{"@crypt.fyi/server".RAILWAY_PUBLIC_DOMAIN}} |
| `VITE_API_URL` | @crypt.fyi/web | - | Base URL of the @crypt.fyi/server service https://${{"@crypt.fyi/server".RAILWAY_PUBLIC_DOMAIN}} |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** TypeScript, JavaScript, HTML, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/Pmkrsc)
