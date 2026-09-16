# Deploy GLPI on Railway

IT asset inventory and service desk in one application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/glpi)

## About

GLPI is a free, open-source IT asset management and service desk platform, maintained for over twenty years by Teclib' and a large community. It inventories the hardware, software, licences and contracts an organisation owns, and puts an ITIL-shaped helpdesk on top, so a ticket points at the exact laptop, printer or switch it is about. IT departments, managed service providers and schools use it as the one place where "what do we own" and "what is broken" live together.

Deploy GLPI on Railway and this template wires up three services. The `glpi` service runs the official image behind Apache, with its scheduled-task worker alongside it, on a public domain. `MySQL` stores every asset, ticket and setting; `Redis` backs the application cache. A volume at `/var/glpi` holds documents, plugins and logs. Self-host GLPI this way and the database and cache stay on the private network, with only the web interface reachable from the internet.

![Diagram of the GLPI, MySQL and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789382473/glpi-architecture.webp)

GLPI solves a problem most IT teams meet past a few dozen machines: the asset list and the support queue drift apart. Here both live in one database, so a ticket attaches to a configuration item carrying its warranty, contract, licences and history. Teams self-host it when the inventory is sensitive, when a regulator wants the data on infrastructure they control, or because the software is free.

- Inventory of computers, monitors, printers, network devices, phones and racks
- ITIL service desk with incidents, requests, problems and changes
- SLAs, escalation rules, business hours and reminders
- Software licence and contract tracking, with financial and warranty data
- Knowledge base, service catalogue and a self-service portal
- LDAP and Active Directory authentication, plus OAuth and CAS single sign-on
- A REST API and a plugin marketplace with several hundred extensions

The `glpi` service is the whole application: Apache with mod_php serving the interface, plus a worker running GLPI's scheduled tasks each minute. `MySQL` is the system of record; `Redis` holds the cache GLPI would otherwise write to disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| glpi | [gridalpha/glpi-railway](https://github.com/gridalpha/glpi-railway) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `TZ` | glpi | UTC | Server timezone, also PHP's date.timezone |
| `PORT` | glpi | 8080 | Apache listening port |
| `GLPI_DB_NAME` | glpi | glpi | Schema GLPI owns |
| `GLPI_DB_USER` | glpi | (secret) | Scoped role GLPI connects as |
| `GLPI_URL_BASE` | glpi | - | Public base URL for links and API |
| `GLPI_CACHE_DSN` | glpi | - | Redis application cache |
| `GLPI_DB_PASSWORD` | glpi | (secret) | Password for that scoped role |
| `GLPI_DB_ADMIN_URL` | glpi | - | Used once to create schema and role |
| `GLPI_ADMIN_PASSWORD` | glpi | (secret) | Initial password for the glpi super-admin |
| `GLPI_CRONTAB_ENABLED` | glpi | 1 | Run GLPI's scheduled-task worker |
| `GLPI_DEMO_DASHBOARDS` | glpi | 0 | Hide GLPI's sample dashboard figures |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/glpi`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/glpi)
