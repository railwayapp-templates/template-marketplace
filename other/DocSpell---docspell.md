# Deploy DocSpell on Railway

Template for a basic DocSpell installation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/docspell)

## About

Docspell aims to be a simple yet effective document organizer that makes stowing documents away very quick and finding them later reliable (and also fast). It is a bit opinionated and more targeted for home use and small/medium organizations.

The main focus is to extract and attach metadata from each document, so it is really easy to find a document later. Automatic document processing is available. It is also possible to add custom properties and arbitrary tags. Docspell analyzes the text to find metadata automatically. It can learn from existing data and can apply NLP techniques to support this. This metadata must be maintained manually in the application. 

Everything is available via a REST or HTTP api and can be easily used within your own scripts and tools, for example using curl. There are also features for "advanced use" and many configuration options.

Docspell consists of multiple components that run in separate processes:
- REST server
- JOEX, short for job executor
- Fulltext Search Index (optional, Apache SOLR or PostgreSQL; not included in this installation)
The REST server provides the api and the web application. The web application is a SPA written in Elm and is a client to the REST api. All features are available via a http/rest api.

The joex is the component that does the “heavy work”, executing long-running tasks, like processing files or importing your mails periodically. While the joex component also exposes a small REST api for controlling it, the main user interface is all inside the rest server api.

The rest server and the job executor can be started multiple times in order to scale out. It must be ensured, that all connect to the same database. And it is also recommended (though not strictly required), that all components can reach each other.

The fulltext search index is another separate component, where currently SOLR and PostgreSQL is supported. Fulltext search is optional, this component is not required if docspell is run without fulltext search support. (This deployment does not include fulltext search by default.)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| docspell-joex | `ghcr.io/docspell/joex:v0.43` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| docspell-restserver | `ghcr.io/docspell/restserver:v0.43` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | docspell-joex | - | Time zone (same as REST server by default) |
| `DOCSPELL_JOEX_APP__ID` | docspell-joex | joex1 | Job executor instance ID (must be unique per instance) |
| `DOCSPELL_JOEX_JDBC_URL` | docspell-joex | - | Database URL |
| `DOCSPELL_JOEX_BASE__URL` | docspell-joex | http://docspell-joex:7878 | Job executor base URL |
| `DOCSPELL_JOEX_JDBC_USER` | docspell-joex | (secret) | Database UserID |
| `DOCSPELL_JOEX_BIND_ADDRESS` | docspell-joex | 0.0.0.0 | Set bind address |
| `DOCSPELL_JOEX_JDBC_PASSWORD` | docspell-joex | (secret) | Database password |
| `DOCSPELL_JOEX_SCHEDULER_NAME` | docspell-joex | joex1 | Job executor scheduler name |
| `DOCSPELL_JOEX_CONVERT_HTML__CONVERTER` | docspell-joex | weasyprint | Select HTML converter |
| `DOCSPELL_JOEX_PERIODIC__SCHEDULER_NAME` | docspell-joex | joex1 | Job executor periodic scheduler name |
| `DOCSPELL_JOEX_FULL__TEXT__SEARCH_ENABLED` | docspell-joex | false | Job executor full text search enabled |
| `DOCSPELL_JOEX_FULL__TEXT__SEARCH_SOLR_URL` | docspell-joex | http://docspell-solr:8983/solr/docspell | Solr URL for full text search |
| `DOCSPELL_JOEX_ADDONS_EXECUTOR__CONFIG_RUNNER` | docspell-joex | docker,trivial | Misc add-ons info |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TZ` | docspell-restserver | Europe/Berlin | Time zone |
| `DOCSPELL_SERVER_BIND_ADDRESS` | docspell-restserver | 0.0.0.0 | Set bind address |
| `DOCSPELL_SERVER_INTERNAL__URL` | docspell-restserver | http://docspell-restserver:7880 | REST server internal URL |
| `DOCSPELL_SERVER_BACKEND_JDBC_URL` | docspell-restserver | - | Database URL |
| `DOCSPELL_SERVER_BACKEND_JDBC_USER` | docspell-restserver | (secret) | Database UserID |
| `DOCSPELL_SERVER_AUTH_SERVER__SECRET` | docspell-restserver | (secret) | Auth server secret |
| `DOCSPELL_SERVER_BACKEND_SIGNUP_MODE` | docspell-restserver | open | Allow signups from login page (open/closed) |
| `DOCSPELL_SERVER_BACKEND_JDBC_PASSWORD` | docspell-restserver | (secret) | Database password |
| `DOCSPELL_SERVER_ADMIN__ENDPOINT_SECRET` | docspell-restserver | (secret) | Admin endpoint secret |
| `DOCSPELL_SERVER_BACKEND_ADDONS_ENABLED` | docspell-restserver | false | REST server backend addons enabled |
| `DOCSPELL_SERVER_FULL__TEXT__SEARCH_ENABLED` | docspell-restserver | false | REST server full text search enabled |
| `DOCSPELL_SERVER_FULL__TEXT__SEARCH_SOLR_URL` | docspell-restserver | http://docspell-solr:8983/solr/docspell | Solr URL for full text search |
| `DOCSPELL_SERVER_INTEGRATION__ENDPOINT_ENABLED` | docspell-restserver | true | Integration endpoint enabled |
| `DOCSPELL_SERVER_BACKEND_SIGNUP_NEW__INVITE__PASSWORD` | docspell-restserver | (secret) | New invite password (required if signups are closed) |
| `DOCSPELL_SERVER_INTEGRATION__ENDPOINT_HTTP__HEADER_ENABLED` | docspell-restserver | true | Integration endpoint HTTP headers enabled |
| `DOCSPELL_SERVER_INTEGRATION__ENDPOINT_HTTP__HEADER_HEADER__VALUE` | docspell-restserver | - | Integration endpoint HTTP header |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/docspell)
