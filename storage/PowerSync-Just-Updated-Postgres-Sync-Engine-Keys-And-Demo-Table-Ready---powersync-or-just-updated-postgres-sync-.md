# Deploy PowerSync | (Just Updated) Postgres Sync Engine, Keys And Demo Table Ready on Railway

PowerSync sync engine + Postgres, keys and demo table ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/powersync-or-just-updated-postgres-sync-)

## About

PowerSync is an open-source sync engine that streams a Postgres database into SQLite on your users' devices. Apps read and write a local database, work offline, and the engine keeps every client consistent with the server using sync rules you define.

The upstream project asks you to supply a replication-ready Postgres, a second database for bucket storage, a publication, a JWT key set, an API token and a YAML config before the service will start. Most hosting attempts fail on the first one: the source database needs `wal_level=logical`, and the service refuses to run without it.

This template deploys two services with all of that already wired:

- **`postgres`** runs with `wal_level=logical`, a volume at `/var/lib/postgresql`, a `powersync_storage` database for bucket storage, a demo `lists` table and a `powersync` publication.
- **`powersync`** is the sync service pinned to `1.26.1`. It is the only service with a public URL. Its config is generated at boot from variables: the database password is shared with Postgres, the JWT signing key (`PS_JWKS_KEY`) and the admin API token (`PS_API_TOKEN`) are generated per deploy, and a global bucket syncs the `lists` table.

Verified on a live deploy: `/probes/liveness` and `/probes/readiness` return 200, the diagnostics API reports the connection `connected: true`, initial replication done, and `public.lists` replicating with zero lag.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:18.4-alpine` | Database |
| powersync | `journeyapps/powersync-service:1.26.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `PS_API_TOKEN` | powersync | (secret) |
| `PS_PG_PASSWORD` | powersync | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /docker-entrypoint-initdb.d; cat > /docker-entrypoint-initdb.d/10-powersync.sql <<'\''SQL'\''
CREATE DATABASE powersync_storage;
CREATE TABLE lists (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
INSERT INTO lists (name) VALUES ('\''Welcome to PowerSync'\'');
CREATE PUBLICATION powersync FOR ALL TABLES;
SQL
export POSTGRES_USER=postgres POSTGRES_DB=powersync; exec docker-entrypoint.sh postgres -c wal_level=logical -c max_wal_senders=4 -c max_replication_slots=4'`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'H="$PS_PG_HOST"; P="$PS_PG_PASSWORD"
CFG=$(cat <<YAML
telemetry:
  disable_telemetry_sharing: true
replication:
  connections:
    - type: postgresql
      uri: postgresql://postgres:$P@$H:5432/powersync
      sslmode: disable
storage:
  type: postgresql
  uri: postgresql://postgres:$P@$H:5432/powersync_storage
  sslmode: disable
port: ${PORT:-8080}
sync_rules:
  content: |
    bucket_definitions:
      global:
        data:
          - SELECT * FROM lists
client_auth:
  jwks:
    keys:
      - kty: oct
        alg: HS256
        kid: powersync-dev
        k: $PS_JWKS_KEY
  audience: ["powersync"]
api:
  tokens:
    - $PS_API_TOKEN
YAML
)
export POWERSYNC_CONFIG_B64=$(printf '\''%s\n'\'' "$CFG" | base64 -w0)
until node -e "require('\''net'\'').connect(5432,process.env.PS_PG_HOST).on('\''connect'\'',()=>process.exit(0)).on('\''error'\'',()=>process.exit(1))"; do echo "[railway] waiting for postgres"; sleep 3; done
sleep 8
exec node service/lib/entry.js start -r unified'`
- **Healthcheck:** `/probes/liveness`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/powersync-or-just-updated-postgres-sync-)
