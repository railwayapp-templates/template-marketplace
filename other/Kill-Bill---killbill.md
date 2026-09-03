# Deploy Kill Bill on Railway

Subscription billing and invoicing platform with an admin console

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/killbill)

## About

Kill Bill is an open-source subscription billing and payments platform. It owns the parts of a business that are painful to build twice: a versioned product catalog, subscription entitlements with trials and upgrades, invoicing, dunning, and payment orchestration across gateways through plugins. Teams reach for it when their pricing has outgrown Stripe Billing, or when they cannot hand customer and revenue data to a vendor. Open source since 2010: [github.com/killbill/killbill](https://github.com/killbill/killbill).

Deploy Kill Bill on Railway with the stack wired together. `killbill` runs the REST API from `killbill/killbill:0.24.21` behind a Railway domain; `kaui` runs the back-office console from `killbill/kaui:4.0.25`; `mariadb` runs upstream's `killbill/mariadb:0.24`, which ships the Kill Bill, Kaui, Stripe and Analytics schemas and applies them on first boot; `Redis` backs the distributed cache. Self-host Kill Bill without writing a schema loader or a Tomcat config — it creates its own first tenant and comes up ready for calls.

![Kill Bill, Kaui, MariaDB and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788384827/killbill-architecture.png)

Kill Bill separates the billing decision from the money movement. The catalog describes products, plans, phases and price lists; the subscription engine tracks where each customer sits in it over time; the invoice engine turns those transitions into line items; the payment layer hands the charge to a gateway plugin. Every layer is an API, so it sits behind your product.

- Versioned catalogs with trials, add-ons, price overrides and multi-currency plans
- Subscription lifecycle: upgrades, downgrades, pauses and cancellations with proration
- Invoicing, credits, adjustments, refunds, chargebacks and dunning
- Payment plugins for Stripe, Adyen, Braintree, PayPal and CyberSource
- Multi-tenancy, RBAC and an audit trail on every object

`killbill` is the API plus the notification queue that fires scheduled billing work. `kaui` is a Rails console reaching it over the private network. `mariadb` holds both schemas on a volume, and `Redis` caches tenant, account and authorization lookups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `killbill/mariadb:0.24` | Database |
| Redis | `redis:8.2` | Database |
| killbill | [gridalpha/killbill-railway](https://github.com/gridalpha/killbill-railway) | Web service |
| kaui | [gridalpha/killbill-railway](https://github.com/gridalpha/killbill-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PRIVATE_URL` | mariadb | mariadb.railway.internal:3306 | Private address the apps dial |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Runs mariadb-upgrade after a server bump |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Superuser password, read by the entrypoint |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | killbill | 8080 | Port Railway health-checks |
| `PRIVATE_URL` | killbill | killbill.railway.internal:8080 | Private address Kaui dials |
| `TOMCAT_PORT` | killbill | 8080 | Tomcat connector port |
| `KILLBILL_API_KEY` | killbill | (secret) | First tenant's API key |
| `KILLBILL_DAO_URL` | killbill | - | Kill Bill schema |
| `KB_ADMIN_PASSWORD` | killbill | (secret) | Password for the admin account |
| `KILLBILL_DAO_USER` | killbill | (secret) | MariaDB user |
| `KILLBILL_API_SECRET` | killbill | (secret) | First tenant's API secret |
| `KILLBILL_DAO_PASSWORD` | killbill | (secret) | MariaDB password |
| `KILLBILL_CACHE_CONFIG_REDIS` | killbill | true | Use Redis for the shared cache |
| `KB_org_killbill_cache_disabled` | killbill | tenant-catalog,overridden-plan | Caches Redis cannot serialize |
| `KB_org_killbill_server_baseUrl` | killbill | - | Public API base URL |
| `KILLBILL_CACHE_CONFIG_REDIS_URL` | killbill | - | Redis address |
| `KILLBILL_CACHE_CONFIG_REDIS_PASSWORD` | killbill | (secret) | Redis password |
| `PORT` | kaui | 8080 | Port Railway health-checks |
| `JAVA_OPTS` | kaui | -Dcom.sun.management.jmxremote.host=127.0.0.1 -Djava.rmi.server.hostname=127.0.0.1 | Keeps JMX on loopback |
| `TOMCAT_PORT` | kaui | 8080 | Tomcat connector port |
| `JVM_JDWP_PORT` | kaui | 127.0.0.1:12345 | Keeps the debugger on loopback |
| `KAUI_KILLBILL_URL` | kaui | - | Kill Bill API over private network |
| `KAUI_ROOT_USERNAME` | kaui | (secret) | Kill Bill account Kaui treats as root |
| `KAUI_CONFIG_DAO_URL` | kaui | - | Kaui schema |
| `KAUI_CONFIG_DAO_USER` | kaui | (secret) | MariaDB user |
| `KAUI_SECRET_KEY_BASE` | kaui | (secret) | Rails session signing key |
| `KAUI_KILLBILL_API_KEY` | kaui | (secret) | Default tenant API key |
| `KAUI_CONFIG_DAO_PASSWORD` | kaui | (secret) | MariaDB password |
| `KAUI_KILLBILL_API_SECRET` | kaui | (secret) | Default tenant API secret |
| `KAUI_DISABLE_SIGN_UP_LINK` | kaui | true | Refuses self-registration |

## Configuration

- **Start command:** `/bin/sh -c 'M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null); case "$M" in ""|max) P=1024;; *) P=$((M/1048576/2));; esac; echo "innodb_buffer_pool_size=${P}M"; exec docker-entrypoint.sh mariadbd --secure-file-priv=/tmp --datadir=/var/lib/mysql/data --innodb-buffer-pool-size=${P}M'`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/killbill/plugins`
- **Healthcheck:** `/health`

**Category:** Other · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/killbill)
