# Deploy Fleet on Railway

Open device management for everyone 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wTPHPC)

## About

Deploy __Fleet__ - The Open-Source Device Management Platform

This template allows you to quickly deploy Fleet, a comprehensive device management solution that helps organizations maintain visibility and control over their entire fleet of devices.

Key Features:

- Cross-platform support: Manage Linux, macOS, Windows, Chromebooks, and iOS devices
- BYOD & corporate device management
- Real-time device inventory
- Security monitoring and compliance checks
- Centralized device control

Deploy now to start managing your device fleet with this enterprise-grade, open-source solution.

Documentation: [fleetdm.com/docs](https://fleetdm.com/docs/get-started/why-fleet)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| MySQL | `mysql:9` | Database |
| Fleet | `fleetdm/fleet:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Fleet | 8080 | - |
| `FLEET_SERVER_TLS` | Fleet | false | - |
| `FLEET_MYSQL_PASSWORD` | Fleet | (secret) | - |
| `FLEET_MYSQL_USERNAME` | Fleet | (secret) | - |
| `FLEET_REDIS_PASSWORD` | Fleet | (secret) | - |
| `FLEET_REDIS_USERNAME` | Fleet | (secret) | - |
| `FLEET_SOFTWARE_INSTALLER_STORE_DIR` | Fleet | /opt/fleet/installers | - |

## Configuration

- **Volume:** `/bitnami`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/fleet/installers`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/wTPHPC)
