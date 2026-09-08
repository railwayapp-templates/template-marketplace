# Deploy property-radar on Railway

A self-hosted MCP server for discovering properties for sale or rent.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/property-radar)

## About

Property Radar is a self-hosted MCP server for discovering and monitoring
properties for sale or rent. It crawls listings into your own Postgres database
and remembers how you reacted to each one, so Claude or ChatGPT can pick your
home search back up in a new conversation instead of starting from zero. The
server never calls a model itself; the LLM you connect does the judging.

GitHub: https://github.com/davidteather/property-radar

Setup Video: https://www.youtube.com/watch?v=kGgKUymeSzc

Property Radar is five services that this template provisions together: `mcpd`
(one URL serving MCP, a REST API, interactive docs, and a `/connect` setup
page), an always-on `crawler` worker, a small web `console`, Postgres for
listings and taste state, and `versitygw`, an S3-compatible thumbnail cache on
a volume. You type zero secrets: the MCP bearer token, the image-proxy key, and
the storage key are generated per deploy. After the build, open `/connect` on
the `mcpd` domain and paste the one `claude mcp add` line it shows. The only
optional input is a residential Webshare proxy key on the crawler; without it
the cloud crawler idles and you can crawl from your own machine into the same
database. Typical cost is a few dollars a month.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| console | [davidteather/property-radar](https://github.com/davidteather/property-radar) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mcpd | [davidteather/property-radar](https://github.com/davidteather/property-radar) | Web service |
| versitygw | [davidteather/property-radar](https://github.com/davidteather/property-radar) | Database |
| crawler | [davidteather/property-radar](https://github.com/davidteather/property-radar) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_BASE_URL` | console | - | Public URL of the mcpd service; the console calls its REST API and mints photo links from it. Leave as is. |
| `CONSOLE_WRITE` | console | delete | Delete this variable: nothing reads it. (If it must stay: unused, safe to remove.) |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first start. |
| `DATABASE_URL` | Postgres | - | Connection string the other services reference. Leave as is. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first start. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password. Generated per deploy. |
| `S3_BUCKET` | mcpd | thumbs | Bucket that holds cached listing thumbnails. Must match the crawler. |
| `S3_REGION` | mcpd | us-east-1 | This doesn't really matter we host s3 compatible app |
| `S3_USE_SSL` | mcpd | false | false: versitygw is reached over Railway's private network. |
| `CONSOLE_URL` | mcpd | - | Public URL of the console service; what get_console_url hands the user. Leave as is. |
| `S3_ENDPOINT` | mcpd | - | host:port of the versitygw service on the private network, no scheme. Leave as is. |
| `DATABASE_URL` | mcpd | - | Postgres connection string, referenced from the Postgres service. Leave as is. |
| `S3_ACCESS_KEY` | mcpd | - | Storage access key, referenced from versitygw. Leave as is. |
| `S3_SECRET_KEY` | mcpd | (secret) | Storage secret, referenced from versitygw. Leave as is. |
| `URL_TOKEN_AUTH` | mcpd | (secret) | Also accept the bearer as ?token= in the URL, for connectors that cannot set headers (claude.ai, ChatGPT). |
| `STORAGE_BACKEND` | mcpd | s3 | Thumbnail storage backend. s3 points at the versitygw service. |
| `MCP_BEARER_TOKEN` | mcpd | (secret) | Client credential for MCP and the REST API. Generated per deploy; copy it from here into your MCP client. |
| `PUBLIC_IMG_TOKEN` | mcpd | (secret) | Access key that gates the public /img photo proxy. Generated per deploy; the tools append it to image URLs for you. |
| `GOGC` | versitygw | 50 | Go garbage-collector aggressiveness; lower trades CPU for less memory. |
| `GODEBUG` | versitygw | madvdontneed=1 | madvdontneed=1 returns freed memory to the OS promptly. |
| `GOMEMLIMIT` | versitygw | 64MiB | Go heap ceiling so the store stays small on a shared box. |
| `ROOT_ACCESS_KEY` | versitygw | radar | S3 access key for the thumbnail store; mcpd and the crawler reference it. |
| `ROOT_SECRET_KEY` | versitygw | (secret) | S3 secret for the thumbnail store. Generated per deploy. |
| `S3_BUCKET` | crawler | thumbs | Bucket that holds cached listing thumbnails. Must match mcpd. |
| `S3_REGION` | crawler | us-east-1 | Region label versitygw expects; any value works, us-east-1 by convention. |
| `S3_USE_SSL` | crawler | false | false: versitygw is reached over Railway's private network. |
| `S3_ENDPOINT` | crawler | - | host:port of the versitygw service on the private network, no scheme. Leave as is. |
| `DATABASE_URL` | crawler | - | Postgres connection string, referenced from the Postgres service. Leave as is. |
| `S3_ACCESS_KEY` | crawler | - | Storage access key, referenced from versitygw. Leave as is. |
| `S3_SECRET_KEY` | crawler | (secret) | Storage secret, referenced from versitygw. Leave as is. |
| `PHOTO_TTL_DAYS` | crawler | 30 | Rolling thumbnail cache window in days; photos not re-verified within it are evicted. 0 keeps everything. |
| `STORAGE_BACKEND` | crawler | s3 | Thumbnail storage backend. s3 points at the versitygw service. |
| `WEBSHARE_API_KEY` | crawler | (secret) | API key from go.dteather.com/webshare using residential proxies |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Go, HTML, CSS, TypeScript, Makefile, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/property-radar)
