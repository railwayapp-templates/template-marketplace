# Deploy MariaDB — Open Source MySQL-Compatible Database on Railway

Self-host MariaDB — the open-source MySQL-compatible database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mariadb-database)

## About

MariaDB is the open-source relational database created by MySQL's original developers — a high-performance, drop-in MySQL replacement that powers Wikipedia, WordPress.com, and countless production applications. This template provisions the official MariaDB image with auto-generated credentials, a persistent volume, and a private connection URL ready to use immediately, so your app has a MySQL-compatible database on your own infrastructure in minutes — without exposing it to the internet.

---

MariaDB is straightforward to run, but a couple of specifics keep your data safe and your app connected — both handled here.

**The volume at `/var/lib/mysql` is your entire database — persist it.** MariaDB writes all data to `/var/lib/mysql`. Without a mounted volume, everything is lost when the container restarts or redeploys. This template mounts a persistent volume there, so your databases, tables, and rows survive deployments. On Railway's volumes, the template also handles the `lost+found` directory that can otherwise interfere with first-time initialization, so the database initializes cleanly.

**Connect over the private network — don't expose 3306.** Your application should connect using the private connection URL over Railway's internal network, keeping port `3306` off the public internet. This is faster (internal traffic is free and low-latency) and far safer than a publicly reachable database. Expose a public endpoint only if you specifically need external access.

**Credentials are auto-generated on first deploy.** The root password and an application user and password are created as cryptographically random values on first boot, via `MARIADB_ROOT_PASSWORD`, `MARIADB_USER`, `MARIADB_PASSWORD`, and `MARIADB_DATABASE`. Pull them from your Railway variables to connect. Note the MariaDB image uses `MARIADB_`-prefixed variables (not `MYSQL_`), a common source of confusion when adapting other guides.

**It's a MySQL-compatible drop-in.** MariaDB speaks the MySQL protocol and works with MySQL clients, ORMs, and tooling, so applications expecting MySQL connect without changes. Choose MariaDB for a fully open-source, community-driven database with no Oracle dependency; choose MySQL only if you need MySQL 8.0-specific features or Oracle support contracts.

**Back up and upgrade deliberately.** Because all state lives on the volume, regular backups (mysqldump or volume snapshots) protect your data. When upgrading major versions, follow MariaDB's upgrade path rather than swapping images blindly, since schema compatibility needs the proper upgrade step.

Typical cost: **~$5/month** on Railway for the service plus volume storage, scaling with your data size. MariaDB Community Server is free and open source under the GPL — you pay only for infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MARIADB_PORT` | 3306 |
| `MARIADB_USER` | (secret) |
| `MARIADB_DATABASE` | railway |
| `MARIADB_PASSWORD` | (secret) |
| `MARIADB_ROOT_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mariadb-database)
