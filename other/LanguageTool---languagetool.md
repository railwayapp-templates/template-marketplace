# Deploy LanguageTool on Railway

Grammar, style and spell checking API for more than 30 languages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/languagetool)

## About

LanguageTool is an open-source proofreading engine that finds grammar, style, punctuation and spelling mistakes in more than 30 languages, and it powers the LanguageTool browser add-ons, the LibreOffice integration and dozens of editor plugins. Unlike a spell checker it reasons about context, catching confused words, agreement errors and awkward phrasing a dictionary lookup never will. Teams self-host LanguageTool to get that quality without sending drafts or customer documents to a third-party writing service.

Deploy LanguageTool on Railway and you get the complete HTTP API, not a trimmed demo. The template runs three services: `languagetool` is the Java API server on the private network, `MySQL` stores API keys and per-account dictionaries, and `gateway` is the public entry point — a Caddy reverse proxy that serves a browser console and rewrites `X-Forwarded-For` so the per-IP rate limiter sees real callers rather than the platform edge. Self-host LanguageTool this way and the API starts closed: anonymous requests are rejected.

![Diagram of the LanguageTool, gateway and MySQL services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788480840/languagetool-architecture.png)

LanguageTool combines a rule engine, hand-written grammar patterns and morphological dictionaries into one JVM service that answers `POST /v2/check` with a JSON list of matches. Self-hosting matters when the text is confidential, when you need volume without per-seat pricing, or when you want your own terminology.

- More than 30 languages, including variants such as `en-US`, `en-GB`, `de-DE` and `pt-BR`
- Context-aware grammar and style rules, with a stricter `picky` level
- Automatic language detection via a bundled fastText model
- Per-account dictionaries through `/v2/words`, `/v2/words/add` and `/v2/words/delete`
- API-key authentication, per-IP request limits and a maximum text length

`languagetool` does the analysis and holds no local state, so it restarts without losing anything. `MySQL` holds the two tables the server reads: accounts with their API keys, and the words each account told the checker to ignore. `gateway` is the only service with a public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| gateway | [gridalpha/languagetool-railway](https://github.com/gridalpha/languagetool-railway) | Web service |
| languagetool | [gridalpha/languagetool-railway](https://github.com/gridalpha/languagetool-railway) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on image startup |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |
| `PORT` | gateway | 8080 | Port Caddy listens on |
| `LT_UPSTREAM` | gateway | - | Where /v2/* is proxied |
| `PORT` | languagetool | 8010 | Port the API server listens on |
| `MYSQLHOST` | languagetool | - | Database host for the schema bootstrap |
| `MYSQLPORT` | languagetool | - | Database port for the schema bootstrap |
| `MYSQLUSER` | languagetool | - | Database user for the schema bootstrap |
| `LT_API_KEY` | languagetool | (secret) | Secret callers send as `apiKey` |
| `MYSQLDATABASE` | languagetool | - | Database name for the schema bootstrap |
| `MYSQLPASSWORD` | languagetool | (secret) | Database password for the schema bootstrap |
| `langtool_dbUrl` | languagetool | - | JDBC connection string |
| `LT_API_USERNAME` | languagetool | (secret) | Username callers send as `username` |
| `langtool_dbDriver` | languagetool | org.mariadb.jdbc.Driver | Only JDBC driver the server bundles |
| `langtool_cacheSize` | languagetool | 1000 | Results cached in memory |
| `langtool_dbPassword` | languagetool | (secret) | JDBC password |
| `langtool_dbUsername` | languagetool | (secret) | JDBC user |
| `langtool_requestLimit` | languagetool | 60 | Requests per client IP per period |
| `langtool_maxTextLength` | languagetool | 50000 | Maximum characters per request |
| `langtool_cacheTTLSeconds` | languagetool | 300 | Lifetime of a cached result |
| `langtool_pipelineCaching` | languagetool | true | Reuse analysis pipelines between requests |
| `langtool_maxCheckTimeMillis` | languagetool | 60000 | Maximum time spent on one check |
| `langtool_maxPipelinePoolSize` | languagetool | 10 | Cached pipelines held per language |
| `langtool_anonymousAccessAllowed` | languagetool | false | Reject checks with no API key |
| `langtool_trustXForwardForHeader` | languagetool | true | Read the client IP the gateway sets |
| `langtool_requestLimitPeriodInSeconds` | languagetool | 60 | Length of the rate-limit window |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/v2/languages`

**Category:** Other · **Languages:** JavaScript, Shell, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/languagetool)
