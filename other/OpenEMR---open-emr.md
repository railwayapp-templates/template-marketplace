# Deploy OpenEMR on Railway

Electronic health records and practice management for clinics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-emr)

## About

OpenEMR is the most widely deployed open-source electronic health record and practice management system in the world, used by clinics and community health centres in over a hundred countries. It covers the whole clinical day: appointment calendar, patient charts, encounter notes, prescriptions, lab results, insurance and claims, and reporting on top. It is ONC-certified, ships a FHIR R4 and OAuth2 API, and speaks the formats other health systems expect (C-CDA, HL7, X12), so a practice can run it as its only clinical system.

Deploy OpenEMR on Railway and you get three services wired together: **OpenEMR**, running Apache and PHP 8.5 behind a public HTTPS domain; **MariaDB**, holding every patient record on its own volume; and **Redis**, holding PHP sessions so clinicians stay signed in across restarts. Browser traffic reaches OpenEMR over the public domain while the database and cache stay on the private network with no public address. The installer runs on first boot, creates the schema and the first administrator account, and every later boot compares the code's schema revision against the database and migrates it when a new release has landed.

![Diagram of the OpenEMR, MariaDB and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789487835/openemr-architecture.webp)

OpenEMR is a PHP application backed by MySQL or MariaDB. Self-hosting means you own the patient data outright — no per-seat licence, no vendor deciding what you can export. Practices choose it when a commercial EHR's per-provider pricing does not fit, when they need to customise forms and workflows, or when data residency rules out a hosted service.

- Appointment calendar with per-provider views, recurring slots and recall lists
- Demographics, insurance and a full encounter-based clinical chart
- Prescriptions with interaction checking, plus lab and imaging results
- Billing: fee sheets, superbills, X12 837 claims and ERA posting
- Patient portal, FHIR R4 and OAuth2 API, C-CDA import/export, HL7 interfaces
- Immunisation registries, decision rules, reports, 30+ languages

Each concern gets its own service. **OpenEMR** serves every browser request and holds a volume at its `sites/` directory, where the site configuration and all uploaded documents live — scanned referrals, consent forms, imported reports. **MariaDB** holds the relational data on its own volume, with its InnoDB buffer pool sized from the container's memory limit rather than the 128 MB default. **Redis** keeps PHP sessions outside the container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:12.3` | Database |
| Redis | `redis:8.2` | Database |
| OpenEMR | [gridalpha/openemr-railway](https://github.com/gridalpha/openemr-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_AUTO_UPGRADE` | MariaDB | 1 | Run mariadb-upgrade on an older data directory |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Superuser password, read by the entrypoint |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | OpenEMR | 80 | Apache listening port |
| `OE_PASS` | OpenEMR | - | First administrator password |
| `OE_USER` | OpenEMR | (secret) | First administrator username |
| `MYSQL_HOST` | OpenEMR | - | Private database hostname |
| `MYSQL_PASS` | OpenEMR | - | Password for that account |
| `MYSQL_PORT` | OpenEMR | 3306 | Database port |
| `MYSQL_USER` | OpenEMR | (secret) | Scoped account OpenEMR runs as |
| `REDIS_PORT` | OpenEMR | 6379 | Session store port |
| `OE_USER_NAME` | OpenEMR | Administrator | First administrator display name |
| `REDIS_SERVER` | OpenEMR | - | Session store host, bare hostname |
| `MYSQL_DATABASE` | OpenEMR | openemr | Database created at install |
| `REDIS_PASSWORD` | OpenEMR | (secret) | Session store password |
| `MYSQL_ROOT_PASS` | OpenEMR | - | Creates the app database and role |
| `MYSQL_ROOT_USER` | OpenEMR | (secret) | Admin role used once at install |
| `SESSION_STORAGE_MODE` | OpenEMR | redis | Tells the health endpoint where sessions live |
| `OPENEMR_SETTING_site_addr_oath` | OpenEMR | - | Base URL for OAuth2 and FHIR |

## Configuration

- **Start command:** `/bin/sh -c 'M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$M" in max|"") M=2147483648;; esac; P=$((M/1024/1024/4)); if [ "$P" -lt 128 ]; then P=128; fi; echo "[railway] innodb-buffer-pool-size=${P}M (memory.max=$M)"; exec docker-entrypoint.sh mariadbd --character-set-server=utf8mb4 --datadir=/var/lib/mysql/data --innodb-buffer-pool-size=${P}M'`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/meta/health/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/localhost/htdocs/openemr/sites`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/open-emr)
