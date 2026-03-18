# Deploy devjournal on Railway

Deploy and Host devjournal with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/devjournal)

## About

devjournal is designed to be **cloud-deployable from day one**.
Railway is an ideal hosting platform because it supports:

* Go backend services
* Environment variable management
* PostgreSQL and other managed databases
* Automatic builds and deployments from GitHub
* Simple scaling and logs for debugging

The frontend (Angular) and backend (Go API) can be deployed as:

* **Separate services** (recommended for learning real-world architecture), or
* A **combined deployment** if the Angular app is served as static files from the Go server.

Railway’s developer-friendly workflow aligns well with devjournal’s educational goals.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| angular | [sefatanam/devjournal](https://github.com/sefatanam/devjournal) | Web service |
| go | [sefatanam/devjournal](https://github.com/sefatanam/devjournal) | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `JWT_SECRET` | angular | (secret) |
| `DB_URL` | go | Postgess DB rul |
| `API_URL` | go | deployed api url |
| `MONGO_DB` | go | database name |
| `GRPC_PORT` | go | only GRPC port |
| `MONGO_URL` | go | Mongo DB url |
| `JWT_SECRET` | go | (secret) |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Other · **Languages:** TypeScript, Go, SCSS, HTML, Shell, JavaScript, PLpgSQL

[View on Railway →](https://railway.com/deploy/devjournal)
