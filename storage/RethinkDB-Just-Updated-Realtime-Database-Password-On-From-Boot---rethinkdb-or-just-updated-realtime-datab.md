# Deploy RethinkDB | (Just Updated) Realtime Database, Password On From Boot on Railway

RethinkDB realtime DB. Password on from boot, data kept, TCP proxy ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rethinkdb-or-just-updated-realtime-datab)

## About

RethinkDB is the open-source realtime document database: JSON documents, joins, and changefeeds
that push every change to your app the moment it happens. It backs live dashboards, collaborative
apps, multiplayer state and anything that would otherwise poll.

This template runs RethinkDB 2.4 as a single service from a digest-pinned official image: the
client driver port on a Railway TCP proxy, the admin web UI kept off the public internet, and all
data on a Railway volume.

RethinkDB runs on Railway only after a few things are handled for you:

- **The admin account has a password from the first boot.** A stock `rethinkdb` container starts
  with the `admin` user and an empty password, so anyone who can reach the driver port can read and
  write everything. Here a password is generated per deploy and anonymous connections are rejected.
- **The web UI is not published.** The admin console has no login of its own, so it is not given a
  public domain. It listens on the private network only; use the driver over the TCP proxy, or
  reach the console from another service in the same project.
- **Data survives redeploys.** The data directory is a subfolder of the volume, so the volume's
  `lost+found` never reaches RethinkDB (it refuses to start on a directory it did not create).
  Tables, users and the password live on the attached volume.
- **The cache and thread count follow your plan.** RethinkDB sizes its cache from the machine and
  its threads from the CPU count, and Railway containers report the host's. The start command reads
  the container's memory and CPU limits and passes `--cache-size` (half the memory limit) and
  `--cores`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rethinkdb | `rethinkdb:2.4.4@sha256:3a767c147d234096995415fdcfd50622d70715de1132fa7c26e444f0d263567e` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RETHINKDB_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); Q=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max 2>/dev/null || echo max); if [ "$M" != max ]; then CACHE=$((M / 2097152)); else CACHE=1024; fi; if [ "$Q" != max ]; then CORES=$(( (Q + 99999) / 100000 )); else CORES=$(nproc); fi; D=/data/rethinkdb_data; echo "[railway] cache-size=${CACHE}MB cores=${CORES} directory=$D owner=$(stat -c %u:%g /data)"; exec rethinkdb --bind all --directory "$D" --cache-size "$CACHE" --cores "$CORES" --initial-password "$RETHINKDB_PASSWORD"'`
- **TCP Proxies:** 28015
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/rethinkdb-or-just-updated-realtime-datab)
