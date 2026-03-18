# Deploy NetBox on Railway

The cornerstone of every automated network

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cLm4kn)

## About

<p align="center">
    <a href="https://netbox.dev/">
        <img alt="netbox logo" src="https://docs.netbox.dev/en/stable/netbox_logo.svg" style="width: 500px;">
    </a>
</p>

<h3 align="center">The Premier Network Source of Truth</h3>

NetBox is the leading solution for modeling and documenting modern networks. By combining the traditional disciplines of IP address management (IPAM) and datacenter infrastructure management (DCIM) with powerful APIs and extensions, NetBox provides the ideal "source of truth" to power network automation. Read on to discover why thousands of organizations worldwide put NetBox at the heart of their infrastructure.

<img src="https://github.com/netbox-community/netbox/blob/develop/docs/media/screenshots/home-dark.png?raw=true" style="border-radius: 5px;">


### Built for Networks

Unlike general-purpose CMDBs, NetBox has curated a data model which caters specifically to the needs of network engineers and operators. It delivers a wide assortment of object types carefully crafted to best serve the needs of infrastructure design and documentation. These cover all facets of network technology, from IP address managements to cabling to overlays and more:

- Hierarchical regions, sites, and locations
- Racks, devices, and device components
- Cables and wireless connections
- Power distribution tracking
- Data circuits and providers
- Virtual machines and clusters
- IP prefixes, ranges, and addresses
- VRFs and route targets
- FHRP groups (VRRP, HSRP, etc.)
- AS numbers
- VLANs and scoped VLAN groups
- L2VPN overlays
- Tenancy assignments
- Contact management


### Customizable &amp; Extensible

In addition to its expansive and robust data model, NetBox offers myriad mechanisms through - which it can be customized and extended. Its powerful plugins architecture enables users to extend the application to meet their needs with minimal development effort.

- Custom fields
- Custom model validation
- Export templates
- Event rules
- Plugins
- REST &amp; GraphQL APIs


### Always Open

Because NetBox is an open source application licensed under Apache 2, its entire code base is completely accessible to the end user, and there's never a risk of vendor lock-in. Additionally, NetBox development is an entirely public, community-driven process to which everyone can provide input.


### Powered by Python

NetBox is built on the enormously popular Django framework for the Python programming language, already a favorite among network engineers. Users can leverage their existing skills coding Python tools to extend NetBox's already vast functionality via custom scripts and plugins.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NetBox | `netboxcommunity/netbox` | Web service |
| Redis | `bitnami/redis` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | NetBox | 8080 | Internal port |
| `DEBUG` | NetBox | False | Run in production mode |
| `DB_HOST` | NetBox | - | Private database host |
| `DB_NAME` | NetBox | - | Database name |
| `DB_PORT` | NetBox | - | Private database port |
| `DB_USER` | NetBox | (secret) | Database user |
| `EMAIL_FROM` | NetBox | - | Set email from address to the same as email username |
| `EMAIL_PORT` | NetBox | - | SMTP email server port |
| `MEDIA_ROOT` | NetBox | - | Use volume mount as media storage |
| `REDIS_HOST` | NetBox | - | Private Redis host |
| `REDIS_PORT` | NetBox | - | Private Redis port |
| `SECRET_KEY` | NetBox | (secret) | Django secret key |
| `DB_PASSWORD` | NetBox | (secret) | Database password |
| `EMAIL_SERVER` | NetBox | - | SMTP email host |
| `EMAIL_USE_SSL` | NetBox | True | Use SSL auth by default |
| `EMAIL_USE_TLS` | NetBox | False | Disable TLS auth, using SSL auth |
| `EMAIL_PASSWORD` | NetBox | (secret) | SMTP email password |
| `EMAIL_USERNAME` | NetBox | (secret) | SMTP email username |
| `LOGIN_REQUIRED` | NetBox | (secret) | Require a login |
| `REDIS_PASSWORD` | NetBox | (secret) | Redis password |
| `REDIS_USERNAME` | NetBox | (secret) | Redis username |
| `SUPERUSER_NAME` | NetBox | - | Initial superuser username to create |
| `TINI_SUBREAPER` | NetBox | 1 | Allow the container init process to subreap |
| `SUPERUSER_EMAIL` | NetBox | - | Email address to use for the initial superuser account |
| `REDIS_CACHE_HOST` | NetBox | - | Private Redis host |
| `REDIS_CACHE_PORT` | NetBox | - | Private Redis port |
| `SUPERUSER_PASSWORD` | NetBox | (secret) | Initial superuser password to create |
| `SUPERUSER_API_TOKEN` | NetBox | (secret) | Superuser api token |
| `REDIS_CACHE_PASSWORD` | NetBox | (secret) | Redis password |
| `REDIS_CACHE_USERNAME` | NetBox | (secret) | Redis username |
| `REDISHOST` | Redis | - | Public host |
| `REDISPORT` | Redis | - | Public port |
| `REDISUSER` | Redis | default | Default user |
| `REDIS_URL` | Redis | - | Public URL |
| `REDISPASSWORD` | Redis | (secret) | Default password |
| `REDIS_PASSWORD` | Redis | (secret) | Default password |
| `REDISHOST_PRIVATE` | Redis | - | Private host |
| `REDISPORT_PRIVATE` | Redis | 6379 | Private port |
| `REDIS_PRIVATE_URL` | Redis | - | Private URL |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_DSN` | Postgres | - | Public DSN |
| `DATABASE_URL` | Postgres | - | Public URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private Port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_DSN` | Postgres | - | Private DSN |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL |

## Configuration

- **Healthcheck:** `/api/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/media`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/cLm4kn)
