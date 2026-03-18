# Deploy Postgres HTTP (Canary) on Railway

Turns your postgres db into an REST api

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/v4zFIs)

## About

# Postgres HTTP (Canary)

### Beaware this is canary version with. Use the stable one if you dont wanna see bugs: https://railway.com/template/UYtPO2?referralCode=lasse

Turns your postgres db into an http server. Great for beginners or just small projects and testing.

You can find the source code here: github.com/lassejlv/postgres_http

## API reference

```bash
- POST /query
  - body: { query: string, args: any[] }
  - headers: { Authorization: Bearer  }
  - response: { rows: any[] }

- GET /status
   - headers: { Authorization: Bearer  }
   - response: { ok: boolean, ping: number  }
```

## I cant run...

By default you cannot run: `DELETE, DROP, TRUNCATE`.
Update the env variable `ALLOW_DANGEROUS_SQL_COMMANDS` and set it to true if you wanna be doing that.

 ## API key
You will find the api under the variables tab. It's randomly generated under creation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Postgres HTTP (Canary) | `lassejlv/postgres_http:canary` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Postgres HTTP (Canary) | 3000 | The post to listen on |
| `API_KEY` | Postgres HTTP (Canary) | (secret) | The api key for your api |
| `DATABASE_URL` | Postgres HTTP (Canary) | - | You can use any other db url |
| `ALLOW_DANGEROUS_SQL_COMMANDS` | Postgres HTTP (Canary) | false | If you wanna be able to run the following: DROP, DELETE, TRUNCATE |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/v4zFIs)
