# Deploy Zitadel on Railway

Zitadel on Railway with PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Msn-6E)

## About

### 🚀 ZITADEL on Railway

**Login:**
🔗 `https://zitadel..railway.app`
📧 `zitadel-admin@zitadel..railway.app`
🔒 `Password1!`

---

### ✅ Post-Deployment

* [ ] Change default password
* [ ] Set up custom domains
* [ ] Enable HTTPS (handled by Railway)
* [ ] Configure SMTP (optional)

---

### 📘 Docs

[ZITADEL Documentation](https://zitadel.com/docs/guides/overview)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| zitadel | [DuanTranHuy/zitadel](https://github.com/DuanTranHuy/zitadel) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | zitadel | 8080 |
| `ZITADEL_EXTERNALPORT` | zitadel | 443 |
| `ZITADEL_DATABASE_POSTGRES_USER_PASSWORD` | zitadel | (secret) |
| `ZITADEL_DATABASE_POSTGRES_USER_SSL_MODE` | zitadel | disable |
| `ZITADEL_DATABASE_POSTGRES_USER_USERNAME` | zitadel | (secret) |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_PASSWORD` | zitadel | (secret) |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_SSL_MODE` | zitadel | disable |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_USERNAME` | zitadel | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/Msn-6E)
