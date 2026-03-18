# Deploy Flagr on Railway

Feature flagging, A/B testing, and dynamic configuration microservice in Go

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/BZOvXb)

## About

<p align="center">
    <a href="https://openflagr.github.io/flagr/#/">
        <img alt="flagr logo" src="https://avatars.githubusercontent.com/u/49816112" style="border-radius: 5px; width: 100px;">
    </a>
</p>

Flagr is an open source Go service that delivers the right experience to the right entity and monitors the impact. It provides feature flags, experimentation (A/B testing), and dynamic configuration. It has clear swagger REST APIs for flags management and flag evaluation.

## Flagr Concepts

The definitions of the following concepts are in [API doc](https://openflagr.github.io/flagr/api_docs).

- **Flag**. It can be a feature flag, an experiment, or a configuration.
- **Tag**. This is a descriptive label attached to a flag for easy lookup and evaluation.
- **Variant** represents the possible variation of a flag. For example, control/treatment, green/yellow/red, etc.
- **Variant Attachment** represents the dynamic configuration of a variant. For example, if you have a variant for the `green` button, you can dynamically control what's the hex color of green you want to use (e.g. `{"hex_color": "#42b983"}`).
- **Segment** represents the segmentation, i.e. the set of audience we want to target. Segment is the smallest unit of a component we can analyze in Flagr Metrics.
- **Constraint** represents rules that we can use to define the audience of the segment. In other words, the audience in the segment is defined by a set of constraints. Specifically, in Flagr, the constraints are connected with `AND` in a segment.
- **Distribution** represents the distribution of variants in a segment.
- **Entity** represents the context of what we are going to assign the variant on. Usually, Flagr expects the context coming with the entity, so that one can define constraints based on the context of the entity.
- **Rollout** and deterministic random logic. The goal here is to ensure deterministic and persistent evaluation result for entities. Steps to evaluating a flag given an entity context:
    - Take the unique ID from the entity, hash it using a hash function that has a uniform distribution (e.g. CRC32, MD5).
    - Take the hash value (base 10) and mod 1000. 1000 is the total number of buckets used in Flagr.
    - Consider the distribution. For example, 50/50 split for control and treatment means 0-499 for control and 500-999 for treatment.
    - Consider the rollout percentage. For example, 10% rollout means only the first 10% of the control buckets (again, use the previous step example, 0-49 out of 0-499 will be rolled out to control experience).

For more details, see the full [Flagr Overview](https://openflagr.github.io/flagr/#/flagr_overview)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |
| Flagr | `ghcr.io/openflagr/flagr` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_DSN` | Postgres | - | Public DSN |
| `DATABASE_URL` | Postgres | - | Public URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private Port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_DSN` | Postgres | - | Private DSN |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL |
| `PORT` | Flagr | 18000 | Internal port |
| `FLAGER_HOST` | Flagr | - | Public host |
| `FLAGR_BASE_PATH` | Flagr | - | Public base path |
| `FLAGR_DB_DBDRIVER` | Flagr | postgres | Use Postgres database |
| `FLAGER_PRIVATE_HOST` | Flagr | - | Private host:port |
| `FLAGR_LOGRUS_FORMAT` | Flagr | json | Enable JSON logging |
| `FLAGR_BASE_PATH_PRIVATE` | Flagr | - | Private base path |
| `FLAGR_BASIC_AUTH_ENABLED` | Flagr | true | Enable basic auth |
| `FLAGR_DB_DBCONNECTIONSTR` | Flagr | - | Private database URL |
| `FLAGR_BASIC_AUTH_PASSWORD` | Flagr | (secret) | Basic auth password |
| `FLAGR_BASIC_AUTH_USERNAME` | Flagr | (secret) | Basic auth username<br>**used for authenticating with the Web UI and the API** |
| `FLAGR_CORS_ALLOWED_ORIGINS` | Flagr | - | Allowed origin |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Flagr | true | <a href="https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |
| `FLAGR_BASIC_AUTH_WHITELIST_PATHS` | Flagr | /api/v1/health | Leave the health check unsecure |
| `FLAGR_DB_DBCONNECTION_RETRY_DELAY` | Flagr | 250ms | 250 millisecond delay between retry attempts |
| `FLAGR_DB_DBCONNECTION_RETRY_ATTEMPTS` | Flagr | 25 | 25 connection attempts |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/BZOvXb)
