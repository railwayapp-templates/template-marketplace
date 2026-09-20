# Deploy Fleetbase on Railway

Self-hosted Fleetbase logistics platform with MySQL, Redis and realtime

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fleetbase)

## About

Fleetbase is an open-source logistics and supply-chain operating system: dispatch and order
management, fleet operations, live driver and vehicle tracking, a storefront/commerce module, a REST
API and an extension system. This template deploys the whole stack — MySQL, Redis, a realtime socket
server, the API, a queue/scheduler worker and the console UI — with your administrator account
created from the deploy variables at first boot and public self-signup closed. It is a
community-maintained template based on Fleetbase; it is not affiliated with, endorsed by, or an
official offering of the Fleetbase project, and it does not use the Fleetbase logo.

Fleetbase is not a single container: the Laravel API, a queue worker with a scheduler, an Ember
console, MySQL, Redis and a SocketCluster realtime bus all have to be wired together, and the API's
first boot has to migrate, seed and initialise permissions and the extension registry before anyone
can log in. This template does that wiring for you and keeps your business data on a MySQL volume
and uploaded files on a storage volume, so redeploys and upgrades do not lose anything.

It also closes a real exposure. Fleetbase's onboarding endpoint has no "already onboarded" guard, so
on a public URL anyone who reaches the API could create an account and an organisation on your
instance. This template blocks that endpoint at the API's front door and instead creates the owner
account once, at first boot, over the container's loopback interface, from the email you supply and
a password Railway generates. Everyone else is invited by the owner from inside the console.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| socket | `socketcluster/socketcluster:v17.4.0@sha256:3cd5c2dde94eab1d4b4dde7d35a6eb8e5a109e7cb491c6f3964111144557b085` | Web service |
| worker | `fleetbase/fleetbase-api:v0.7.63@sha256:b712ca37fda0a72d65beb3bbfef5fad9783e01a212f5f544f704af941af5a17d` | Worker |
| api | `ghcr.io/youssefsiam38/fleetbase-railway-api:1.0.1@sha256:b69dee37a09d7b9cd5f20d88de9303047801997c6208c996155722877ba321da` | Web service |
| database | `mysql:8.0-oracle@sha256:7dcddc01f13bab2f15cde676d44d01f61fc9f99fe7785e86196dfc07d358ae2b` | Database |
| console | `ghcr.io/youssefsiam38/fleetbase-railway-console:1.0.1@sha256:46180b6f72eaadef2275c0c174433191bff78c4e4e4941d8c966bc1c63964c11` | Web service |
| cache | `redis:7-alpine@sha256:520775a41a63e77e06c73e35d2fd9cc15921a609516818796b4ecbb813078bc7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | socket | 8000 | - |
| `SOCKETCLUSTER_PORT` | socket | 8000 | - |
| `SOCKETCLUSTER_BROKERS` | socket | 2 | - |
| `SOCKETCLUSTER_WORKERS` | socket | 2 | - |
| `APP_ENV` | worker | production | - |
| `APP_NAME` | worker | Fleetbase | - |
| `APP_DEBUG` | worker | false | - |
| `OSRM_HOST` | worker | https://router.project-osrm.org | - |
| `CACHE_PATH` | worker | /fleetbase/api/storage/framework/cache | - |
| `LOG_CHANNEL` | worker | stdout | - |
| `MAIL_MAILER` | worker | log | - |
| `CACHE_DRIVER` | worker | redis | - |
| `REGISTRY_HOST` | worker | https://registry.fleetbase.io | - |
| `MAIL_FROM_NAME` | worker | Fleetbase | - |
| `BROADCAST_DRIVER` | worker | socketcluster | - |
| `QUEUE_CONNECTION` | worker | redis | - |
| `SOCKETCLUSTER_PORT` | worker | 443 | - |
| `SOCKETCLUSTER_SECURE` | worker | true | - |
| `PORT` | api | 8080 | - |
| `APP_ENV` | api | production | - |
| `APP_KEY` | api | - | Laravel application key, generated for this deployment. |
| `APP_NAME` | api | Fleetbase | - |
| `APP_DEBUG` | api | false | - |
| `MAIL_PORT` | api | - | 587 |
| `OSRM_HOST` | api | https://router.project-osrm.org | Routing engine used for distance and route estimates. Defaults to the public OSRM demo server. |
| `CACHE_PATH` | api | /fleetbase/api/storage/framework/cache | - |
| `OWNER_NAME` | api | Fleet Owner | Display name of the first administrator. |
| `LOG_CHANNEL` | api | stdout | - |
| `MAIL_MAILER` | api | log | Set to smtp and fill the MAIL_* variables to send real email; log keeps notifications in the logs. |
| `OWNER_EMAIL` | api | - | Email address of the first administrator. You sign in to the console with it. |
| `OWNER_PHONE` | api | +12025550123 | Phone number of the first administrator (E.164). Change it to your own in the console. |
| `CACHE_DRIVER` | api | redis | - |
| `FORWARD_PROTO` | api | https | - |
| `MAIL_PASSWORD` | api | (secret) | - |
| `MAIL_USERNAME` | api | (secret) | - |
| `REGISTRY_HOST` | api | https://registry.fleetbase.io | - |
| `IPINFO_API_KEY` | api | (secret) | - |
| `MAIL_FROM_NAME` | api | Fleetbase | - |
| `OWNER_PASSWORD` | api | (secret) | Password for the first administrator, generated for this deployment. Copy it before deploying. |
| `MAIL_ENCRYPTION` | api | - | tls |
| `BROADCAST_DRIVER` | api | socketcluster | - |
| `QUEUE_CONNECTION` | api | redis | - |
| `ORGANIZATION_NAME` | api | Fleet Operations | Name of the organization created on first boot. |
| `PUBLIC_ONBOARDING` | api | false | Keep false to block public self-signup. Set true only if you want anyone to create organizations. |
| `SOCKETCLUSTER_PORT` | api | 443 | - |
| `SOCKETCLUSTER_SECURE` | api | true | - |
| `MYSQL_DATABASE` | database | fleetbase | - |
| `MYSQL_ROOT_PASSWORD` | database | (secret) | MySQL password, generated for this deployment. |
| `PORT` | console | 4200 | - |
| `API_HOST` | console | - | Public URL of the API service this console talks to. |
| `OSRM_HOST` | console | https://router.project-osrm.org | - |
| `SOCKETCLUSTER_PORT` | console | 443 | - |
| `SOCKETCLUSTER_SECURE` | console | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'go-crond --verbose root:./crontab & exec php artisan queue:work --tries=3 --timeout=120'`
- **Healthcheck:** `/healthz`
- **Volume:** `/fleetbase/api/storage/app`
- **Start command:** `docker-entrypoint.sh mysqld --datadir=/var/lib/mysql/data --bind-address='*'`
- **Volume:** `/var/lib/mysql`
- **Start command:** `redis-server --protected-mode no --appendonly no`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fleetbase)
