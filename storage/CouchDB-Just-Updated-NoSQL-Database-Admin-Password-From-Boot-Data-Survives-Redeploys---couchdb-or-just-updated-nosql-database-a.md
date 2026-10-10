# Deploy CouchDB | (Just Updated) NoSQL Database, Admin Password From Boot, Data Survives Redeploys on Railway

CouchDB 3.5 that deploys. Locked from boot, data survives redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/couchdb-or-just-updated-nosql-database-a)

## About

Apache CouchDB is the document database that speaks plain HTTP and JSON, with a built-in web
console (Fauxton) and master-master replication. It is the usual backend for offline-first apps
that sync with PouchDB, and for anything that wants a database reachable with nothing but `curl`.

This template runs CouchDB 3.5 as a single service from a digest-pinned official image: the HTTP
API and Fauxton on a Railway domain, an admin account whose password exists from the first boot,
and all data on a Railway volume.

CouchDB is a document database that speaks HTTP and replicates between nodes and PouchDB clients. It runs as one container with its data on a Railway volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| couchdb | `couchdb:3.5.2.1@sha256:5fc596110eac7f412173a7d9de14f70aa5d3e816790fb6e70642755d4a4cf464` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `COUCHDB_SECRET` | (secret) |
| `COUCHDB_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); Q=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max 2>/dev/null || echo max); if [ "$Q" != max ]; then CORES=$(( (Q + 99999) / 100000 )); else CORES=$(nproc); fi; [ "$CORES" -lt 1 ] && CORES=1; D=/opt/couchdb/data; mkdir -p "$D"; if [ ! -s "$D/.railway-uuid" ]; then tr -d - < /proc/sys/kernel/random/uuid > "$D/.railway-uuid"; fi; UUID=$(cat "$D/.railway-uuid"); if [ "$(cat /proc/sys/net/ipv6/conf/all/disable_ipv6 2>/dev/null || echo 1)" = 0 ]; then BIND=::; else BIND=any; fi; export COUCHDB_USER=admin ERL_FLAGS="+S $CORES:$CORES"; printf "[couchdb]\nsingle_node = true\nuuid = %s\n\n[chttpd]\nport = %s\nbind_address = %s\nrequire_valid_user_except_for_up = true\n" "$UUID" "${PORT:-5984}" "$BIND" > /opt/couchdb/etc/local.d/10-railway.ini; echo "[railway] couchdb port=${PORT:-5984} bind=$BIND schedulers=$CORES uuid=$UUID memory.max=$M owner=$(stat -c %u:%g $D)"; exec tini -- /docker-entrypoint.sh /opt/couchdb/bin/couchdb'`
- **Healthcheck:** `/_up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/couchdb/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/couchdb-or-just-updated-nosql-database-a)
