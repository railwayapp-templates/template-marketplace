# Deploy Overleaf on Railway

Collaborative LaTeX in the cloud — one-click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/overleaf)

## About

Overleaf Community Edition is a self-hosted online LaTeX editor for writing, compiling, and collaborating on scientific documents in the browser. It gives you the Overleaf editing experience on your own infrastructure, with projects, real-time preview, and history stored under your control.

Hosting Overleaf means running the web app alongside MongoDB and Redis. Project files live on disk, document metadata lives in MongoDB, and sessions plus real-time collaboration state live in Redis. MongoDB must run as a replica set so Overleaf's change history works. This template wires the three services over Railway's private network, generates database passwords, attaches volumes so data survives redeploys, and publishes only the Overleaf UI. After deploy, create the first admin account at `/launchpad`, then sign in and start a project. Set `OVERLEAF_SITE_LANGUAGE` if you want a UI language other than English.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Overleaf | `sharelatex/sharelatex:6.1.2` | Web service |
| Redis | `redis:8.2.1` | Database |
| Mongo Init | `mongo:8.0` | Database |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `TEXMFVAR` | Overleaf | /var/lib/overleaf/tmp/texmf-var |
| `REDIS_PASSWORD` | Overleaf | (secret) |
| `OVERLEAF_APP_NAME` | Overleaf | Overleaf Community Edition |
| `ENABLE_CONVERSIONS` | Overleaf | true |
| `OVERLEAF_LISTEN_IP` | Overleaf | 0.0.0.0 |
| `OVERLEAF_BEHIND_PROXY` | Overleaf | true |
| `OVERLEAF_SITE_LANGUAGE` | Overleaf | en |
| `ENABLED_LINKED_FILE_TYPES` | Overleaf | project_file,project_output_file |
| `EMAIL_CONFIRMATION_DISABLED` | Overleaf | true |
| `OVERLEAF_INVITE_TOKEN_SECRET` | Overleaf | (secret) |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `MONGOPASSWORD` | Mongo Init | (secret) |
| `MONGOPORT` | MongoDB | 27017 |
| `MONGOPASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/overleaf`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `sh -c 'for i in $(seq 1 90); do mongosh -u "$MONGOUSER" -p "$MONGOPASSWORD" --host "$MONGOHOST" --authenticationDatabase admin --quiet --eval "db.adminCommand({ping:1})" && break; sleep 2; done; mongosh -u "$MONGOUSER" -p "$MONGOPASSWORD" --host "$MONGOHOST" --authenticationDatabase admin --eval "try { rs.status().ok } catch (e) { rs.initiate({_id: \"rs0\", members:[{_id:0, host: process.env.MONGOHOST + \":27017\"}]}) }"; echo INIT_DONE'`
- **Start command:** `sh -c 'mkdir -p /data/configdb /data/db; if [ ! -s /data/configdb/keyfile ]; then openssl rand -base64 756 > /data/configdb/keyfile; chown mongodb:mongodb /data/configdb/keyfile; chmod 400 /data/configdb/keyfile; fi; exec docker-entrypoint.sh mongod --replSet rs0 --keyFile /data/configdb/keyfile --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false'`

**Category:** Other

[View on Railway →](https://railway.com/deploy/overleaf)
