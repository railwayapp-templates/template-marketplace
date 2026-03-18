# Deploy Flipt on Railway

Open source feature flag service for gradual rollouts and testing.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/TSv4bp)

## About

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/flipt-io/docs/refs/heads/main/logo/dark-logo.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/flipt-io/docs/refs/heads/main/logo/light-logo.svg">
    <img alt="Flipt: Cookie-free privacy-focused website analytics." src="https://raw.githubusercontent.com/flipt-io/docs/refs/heads/main/logo/light-logo.svg">
  </picture>
  <h3>Open Source Feature Flag Management</h3>
  <a href="https://www.flipt.io/">Website</a> |
  <a href="https://docs.flipt.io/introduction">Documentation</a> |
  <a href="https://discord.com/invite/kRhEqG2TEZ">Discord</a>
</div>

**Flipt** is an open source feature flag management platform that allows development teams to enable or disable functionality in their applications without needing to perform full deployments.  
This enables practices such as:

- **Trunk-based development**
- **A/B testing**
- **Progressive rollouts**

These features help increase agility and safety across the software development lifecycle.

---

## 🌟 Key Features

### ✅ Open Source &amp; Self-Hosted
You can deploy Flipt on your own infrastructure, giving you full control over your data, configurations, and privacy.

### 🔁 GitOps Integration
Flipt supports Git-based configuration management, making it easy to version and track changes to your feature flags via repositories.

### 🧰 Multi-language SDK Support
Flipt provides SDKs for:

- Node.js
- Go
- Python
- Java
- Rust
- PHP

This allows seamless integration across various tech stacks.

### ⚡ Client-side Evaluation
Flipt supports client-side feature evaluation to reduce latency and improve performance in end-user applications.

### 💻 Intuitive Web UI
A modern and minimalistic web interface helps you define, toggle, and monitor flags and experiments with ease.

### ☁️ Flipt Cloud
If you prefer not to self-host, Flipt also offers a managed cloud version that maintains all control and security advantages, without infrastructure overhead.

---

## 🚀 Common Use Cases

- **Trunk-based development**  
  Integrate features into the main codebase while controlling their activation via flags.

- **A/B testing and experimentation**  
  Run controlled experiments to assess how new features impact user behavior.

- **Progressive rollouts**  
  Gradually expose new features to users to minimize risk and catch issues early.

- **Access and permissions management**  
  Control which users or groups can access certain functionality without changing the app code.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flipt | `flipt/flipt:latest` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Flipt | 8080 | - |
| `FLIPT_CACHE_TTL` | Flipt | 60s | - |
| `FLIPT_LOG_LEVEL` | Flipt | debug | - |
| `FLIPT_CACHE_BACKEND` | Flipt | redis | - |
| `FLIPT_CACHE_ENABLED` | Flipt | true | - |
| `FLIPT_CACHE_REDIS_PASSWORD` | Flipt | (secret) | - |
| `FLIPT_CACHE_REDIS_USERNAME` | Flipt | (secret) | - |
| `FLIPT_META_TELEMETRY_ENABLED` | Flipt | false | - |
| `FLIPT_AUTHENTICATION_REQUIRED` | Flipt | false | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/opt/flipt`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/template/TSv4bp)
