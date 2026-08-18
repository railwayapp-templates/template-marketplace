# Deploy Netbox on Railway

IP address and data centre management

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/netbox)

## About

NetBox is the open-source source of truth for network infrastructure. It combines IP address management (IPAM) and data centre infrastructure management (DCIM) in one modelled database, so racks, devices, cables, circuits, VLANs and prefixes live in a single system with a documented REST and GraphQL API. Network engineers use it to replace the spreadsheets and stale wiki pages that pass for network documentation, and automation teams use it as the inventory Ansible, Terraform and Nornir read before touching a device.

You can self-host NetBox on Railway with this template, which deploys the full production shape rather than a single container. Traffic reaches a Granian-served Django application over a public HTTPS domain; that application uses a managed PostgreSQL database, one managed Redis as its task queue and a second as its cache, and a managed bucket for uploaded files. A separate worker service consumes the queue, running custom scripts, webhooks and the daily housekeeping job. Deploy NetBox on Railway and the whole set is wired together before you open the URL.

![NetBox Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786975195/f54da5f5-eeb6-4655-86a3-363529c4e8c0.png)

NetBox models a network the way it actually exists rather than storing free text about it. A prefix knows which VLAN and site it belongs to; an interface knows which cable connects it to which patch panel port. Because the model is enforced, NetBox answers questions a wiki cannot: which addresses in this subnet are free, what breaks if this switch loses power. Teams self-host it because the inventory is sensitive and is usually what automation reads first.

Key capabilities:

- IPAM for IPv4 and IPv6 — prefixes, ranges, addresses, VRFs, aggregates and live utilisation
- DCIM for racks, devices, modules, interfaces, cables, power feeds and rack elevations
- Circuits, VPN tunnels, wireless links, VLANs and virtualisation inventory
- REST and GraphQL APIs, with change logging on every object
- Custom fields, scripts, export templates, webhooks and a plugin framework

The Railway architecture splits the work across five services. **NetBox** runs the Django application under Granian and serves the web UI and both APIs. **PostgreSQL** holds every object, plus the change log and sessions. **Redis** backs the task queue so jobs survive a restart, while a second **Redis-Cache** handles caching only, keeping cache growth from competing with queued work. **NetBox Worker** executes scripts, delivers webhooks and runs the daily housekeeping pass. **Object storage** holds uploaded images and custom scripts, so both services read the same content.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis-Cache | `redis:8.2` | Database |
| netbox | [gridalpha/netbox-railway](https://github.com/gridalpha/netbox-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| netbox-worker | [gridalpha/netbox-railway](https://github.com/gridalpha/netbox-railway) | Worker |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis-Cache | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis-Cache | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis-Cache | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis-Cache | - | Private connection string |
| `REDISPASSWORD` | Redis-Cache | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis-Cache | (secret) | Auth password, read by the server |
| `PORT` | netbox | 8080 | HTTP port Granian binds |
| `DB_HOST` | netbox | - | Postgres private hostname |
| `DB_NAME` | netbox | - | Postgres database name |
| `DB_PORT` | netbox | - | Postgres port |
| `DB_USER` | netbox | (secret) | Postgres username |
| `S3_BUCKET` | netbox | - | Object storage bucket name |
| `S3_REGION` | netbox | - | Object storage region |
| `TIME_ZONE` | netbox | UTC | Display timezone |
| `REDIS_HOST` | netbox | - | Task queue Redis hostname |
| `REDIS_PORT` | netbox | - | Task queue Redis port |
| `SECRET_KEY` | netbox | (secret) | Django signing key, must stay stable |
| `DB_PASSWORD` | netbox | (secret) | Postgres password |
| `S3_ENDPOINT` | netbox | - | Object storage endpoint URL |
| `REDIS_DATABASE` | netbox | 0 | Task queue Redis database index |
| `REDIS_PASSWORD` | netbox | (secret) | Task queue Redis password |
| `SKIP_SUPERUSER` | netbox | false | Create the first administrator on boot |
| `SUPERUSER_NAME` | netbox | admin | First administrator username |
| `GRAPHQL_ENABLED` | netbox | true | Enable the GraphQL API |
| `SUPERUSER_EMAIL` | netbox | admin@example.com | First administrator email |
| `MAX_DB_WAIT_TIME` | netbox | 180 | Seconds to wait for the database |
| `REDIS_CACHE_HOST` | netbox | - | Cache Redis hostname |
| `REDIS_CACHE_PORT` | netbox | - | Cache Redis port |
| `S3_ACCESS_KEY_ID` | netbox | - | Object storage access key |
| `RELEASE_CHECK_URL` | netbox | https://api.github.com/repos/netbox-community/netbox/releases | New release notice source |
| `API_TOKEN_PEPPER_1` | netbox | (secret) | Peppers stored API token hashes |
| `SUPERUSER_PASSWORD` | netbox | (secret) | First administrator password |
| `SECURE_HSTS_SECONDS` | netbox | 31536000 | HSTS max-age on responses |
| `REDIS_CACHE_DATABASE` | netbox | 1 | Cache Redis database index |
| `REDIS_CACHE_PASSWORD` | netbox | (secret) | Cache Redis password |
| `S3_SECRET_ACCESS_KEY` | netbox | (secret) | Object storage secret key |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `DB_HOST` | netbox-worker | - | Postgres private hostname |
| `DB_NAME` | netbox-worker | - | Postgres database name |
| `DB_PORT` | netbox-worker | - | Postgres port |
| `DB_USER` | netbox-worker | (secret) | Postgres username |
| `S3_BUCKET` | netbox-worker | - | Object storage bucket name |
| `S3_REGION` | netbox-worker | - | Object storage region |
| `REDIS_HOST` | netbox-worker | - | Task queue Redis hostname |
| `REDIS_PORT` | netbox-worker | - | Task queue Redis port |
| `SECRET_KEY` | netbox-worker | (secret) | Must match the web service |
| `DB_PASSWORD` | netbox-worker | (secret) | Postgres password |
| `S3_ENDPOINT` | netbox-worker | - | Object storage endpoint URL |
| `REDIS_DATABASE` | netbox-worker | 0 | Task queue Redis database index |
| `REDIS_PASSWORD` | netbox-worker | (secret) | Task queue Redis password |
| `SKIP_SUPERUSER` | netbox-worker | true | Web service owns administrator creation |
| `GRAPHQL_ENABLED` | netbox-worker | true | Enable the GraphQL API |
| `REDIS_CACHE_HOST` | netbox-worker | - | Cache Redis hostname |
| `REDIS_CACHE_PORT` | netbox-worker | - | Cache Redis port |
| `S3_ACCESS_KEY_ID` | netbox-worker | - | Object storage access key |
| `API_TOKEN_PEPPER_1` | netbox-worker | (secret) | Must match the web service |
| `REDIS_CACHE_DATABASE` | netbox-worker | 1 | Cache Redis database index |
| `REDIS_CACHE_PASSWORD` | netbox-worker | (secret) | Cache Redis password |
| `S3_SECRET_ACCESS_KEY` | netbox-worker | (secret) | Object storage secret key |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/login/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/usr/bin/tini -- /opt/netbox/railway/worker.sh`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/netbox)
