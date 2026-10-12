# Deploy MariaDB | (Just Updated) Official 11.8 LTS, Root Password Set, Data Survives Redeploys on Railway

Official MariaDB 11.8 LTS. Root password set, data survives redeploys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mariadb-or-just-updated-official-118-lts)

## About

MariaDB is the open-source MySQL-compatible relational database behind WordPress, Nextcloud, Matomo and a long list of PHP and Python applications. This template runs the official MariaDB 11.8 LTS image as a single service from a digest-pinned image, with the database port on a Railway TCP proxy and a Railway volume holding the data files.

- **A root password is set from the first boot.** `MARIADB_ROOT_PASSWORD` is generated per deploy, and a database named `railway` is created for you. Clients with the wrong password are refused.
- **Your data survives redeploys.** The volume is mounted at `/var/lib/mysql` and the data directory is a subdirectory of it (`/var/lib/mysql/data`), so the `lost+found` folder Railway puts at the volume root never lands inside the data directory. The start command runs the server as root so the root-owned volume is writable, and prints the user id and mount owner in the deploy log so you can confirm it.
- **Buffer pool follows your plan.** The InnoDB buffer pool is set from the container's memory limit (half of it), not from the host's RAM, so the server does not size itself for a machine it cannot use.
- **utf8mb4 by default.** The server character set is `utf8mb4` with the `utf8mb4_unicode_ci` collation, so emoji and non-Latin text store correctly.
- **Two ways in.** Services in the same project use the private URL; clients elsewhere use the TCP proxy URL.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb:11.8@sha256:6422478cb8e159f080fb1d8ccf65101e26fe51385787fde7d16c3b165a331f15` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MARIADB_ROOT_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); if [ "$M" != max ]; then B=$((M / 2 / 1048576)); [ "$B" -lt 128 ] && B=128; else B=512; fi; export MARIADB_DATABASE=railway; echo "[railway] uid=$(id -u) innodbBufferPoolMB=$B owner=$(stat -c %u:%g /var/lib/mysql)"; exec docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data --innodb-buffer-pool-size=${B}M --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci'`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/mariadb-or-just-updated-official-118-lts)
