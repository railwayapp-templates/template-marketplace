# Deploy Growi on Railway

Confluence Alternative. Markdown wiki, real-time editing, full-text search

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/growi)

## About

GROWI is an open source team wiki and knowledge base built around markdown. Pages live in a tree, several people can edit one page at once, and everything is searchable full-text — a natural fit for runbooks, onboarding guides and internal documentation that would otherwise scatter across chat threads. It is MIT licensed, at [github.com/growilabs/growi](https://github.com/growilabs/growi).

Deploy GROWI on Railway and the pieces it needs are already wired together: the application (`growilabs/growi`) alongside a MongoDB replica set, an Elasticsearch node carrying the analysis plugins GROWI's search index requires, and a managed Redis for sessions. Self-host GROWI the usual way and you assemble those four yourself; here the app reaches its databases over private networking, the first administrator is created on the initial boot, and only the wiki gets a public URL.

![GROWI Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786823359/9256fb60-9a9d-4af5-a801-3f01aab1a82b.png)

GROWI is a Node.js application storing pages, revisions, users and permissions in MongoDB. Teams self-host it when documentation must stay on infrastructure they control.

- Hierarchical markdown pages with live side-by-side preview
- Real-time collaborative editing
- Full-text search across bodies and titles, including Japanese
- Per-page and per-group access control, plus guest restrictions
- LDAP, Active Directory, OAuth and SAML single sign-on
- Slack and Mattermost integration, audit log, plugin system

Four services make up the template. **GROWI** serves the web UI and API. **MongoDB** is the system of record, run as a single-node replica set because GROWI v8 reads change streams for its audit log and bulk-export jobs. **Elasticsearch** backs full-text search. **Redis** holds sessions, so a redeploy does not sign everyone out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| growi | `growilabs/growi:latest` | Web service |
| Redis | `redis:8.2` | Database |
| mongodb | [gridalpha/growi-railway](https://github.com/gridalpha/growi-railway) (root: mongodb) | Database |
| elasticsearch | [gridalpha/growi-railway](https://github.com/gridalpha/growi-railway) (root: elasticsearch) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | growi | 3000 | HTTP server listening port |
| `MONGO_URI` | growi | - | MongoDB replica set connection |
| `REDIS_URI` | growi | - | Session store connection |
| `FILE_UPLOAD` | growi | local | Attachments written to the volume |
| `APP_SITE_URL` | growi | - | Public-facing wiki URL |
| `SECRET_TOKEN` | growi | (secret) | Session cookie signing key |
| `PASSWORD_SEED` | growi | (secret) | Salt for stored password hashes |
| `AUDIT_LOG_ENABLED` | growi | true | Record admin actions to audit log |
| `ELASTICSEARCH_URI` | growi | - | Search endpoint and index name |
| `ELASTICSEARCH_VERSION` | growi | 9 | Search backend major version |
| `AUTO_INSTALL_ADMIN_NAME` | growi | Admin | First administrator display name |
| `AUTO_INSTALL_ADMIN_EMAIL` | growi | admin@example.dev | First administrator email address |
| `AUTO_INSTALL_GLOBAL_LANG` | growi | en_US | Default interface language |
| `AUTO_INSTALL_ADMIN_PASSWORD` | growi | (secret) | First administrator password |
| `AUTO_INSTALL_ADMIN_USERNAME` | growi | (secret) | First administrator username |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `MONGODB_DATABASE` | mongodb | growi | Database name for the wiki |
| `MONGODB_PORT_NUMBER` | mongodb | 27017 | MongoDB listening port |
| `MONGODB_APP_PASSWORD` | mongodb | (secret) | Application user password |
| `MONGODB_APP_USERNAME` | mongodb | (secret) | Least-privilege application user |
| `MONGODB_ROOT_PASSWORD` | mongodb | (secret) | Root user password |
| `MONGODB_REPLICA_SET_NAME` | mongodb | rs0 | Single-node replica set name |
| `PORT` | elasticsearch | 9200 | HTTP port used for health checks |
| `ES_JAVA_OPTS` | elasticsearch | -Xms1g -Xmx1g | JVM heap size for search node |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data/db`
- **Healthcheck:** `/`
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/growi)
