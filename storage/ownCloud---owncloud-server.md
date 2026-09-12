# Deploy ownCloud on Railway

File sync and share server with a web UI, WebDAV and sync clients

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/owncloud-server)

## About

Self-host ownCloud and you get the file sync and sharing layer Dropbox and Google Drive provide, on infrastructure you control. Teams keep documents in one place, sync them to desktops and phones through the official clients, hand out expiring public links, and mount the tree over WebDAV from scripts and backup tools. Because the files stay under your own credentials, it answers data-residency requirements a public cloud drive cannot.

Deploy ownCloud on Railway and the supporting stack comes with it. The `owncloud` service runs ownCloud Server 11 on Apache with PHP 8.3, plus its background-job daemon in the same container. `MySQL` stores accounts, shares, tags and file metadata. `Redis` carries the distributed cache and the transactional locks that stop two sync clients writing one file at once. A Railway object-storage bucket is wired in as ownCloud's *primary* storage, so uploads go straight to durable storage and the volume holds only configuration, sessions and installed apps.

![Diagram of the ownCloud, MySQL and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1789013339/owncloud-architecture.png)

ownCloud is an open-source content collaboration platform under the AGPLv3. One server presents a single file tree through a web UI, WebDAV and sync clients for Windows, macOS, Linux, iOS and Android, with sharing, versioning, a trash bin, tags and add-on apps around it.

Key features:

- Desktop and mobile sync clients, plus a standards-compliant WebDAV endpoint
- Public links with expiry dates, passwords and read-only or upload rights
- Sharing with users and groups, and federated sharing between servers
- File versioning, a restorable trash bin, and per-user or per-group quotas
- LDAP and OpenID Connect authentication, and external storage mounts

The multi-service shape matters: ownCloud keeps file *content* separately from file *metadata*. MySQL owns the metadata, so it must be durable and backed up. Redis is not optional in practice — without it ownCloud falls back to database locking, which slows every concurrent write. Object storage holds the file bodies, letting the deployment grow past any single disk.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2` | Database |
| owncloud | [gridalpha/owncloud-railway](https://github.com/gridalpha/owncloud-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the server |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | owncloud | 8080 | Port Railway health-checks |
| `OWNCLOUD_DOMAIN` | owncloud | - | Base domain for generated URLs |
| `OWNCLOUD_DB_HOST` | owncloud | - | Private database endpoint |
| `OWNCLOUD_DB_NAME` | owncloud | owncloud | Database created at boot |
| `OWNCLOUD_DB_TYPE` | owncloud | mysql | Database driver |
| `OWNCLOUD_LOG_FILE` | owncloud | /dev/stdout | Send the app log to the deploy log |
| `OWNCLOUD_PROTOCOL` | owncloud | https | Scheme used in generated URLs |
| `OWNCLOUD_REDIS_HOST` | owncloud | - | Private Redis hostname |
| `OWNCLOUD_REDIS_PORT` | owncloud | - | Redis port |
| `OWNCLOUD_APPS_ENABLE` | owncloud | files_primary_s3 | Enable the S3 storage app |
| `OWNCLOUD_DB_PASSWORD` | owncloud | (secret) | Password for that scoped role |
| `OWNCLOUD_DB_USERNAME` | owncloud | (secret) | Scoped role ownCloud connects as |
| `OWNCLOUD_MYSQL_UTF8MB4` | owncloud | true | Four-byte Unicode support |
| `OWNCLOUD_REDIS_ENABLED` | owncloud | true | Use Redis for cache and locking |
| `OWNCLOUD_ADMIN_PASSWORD` | owncloud | (secret) | First administrator's password |
| `OWNCLOUD_ADMIN_USERNAME` | owncloud | (secret) | First administrator's login name |
| `OWNCLOUD_REDIS_PASSWORD` | owncloud | (secret) | Redis auth password |
| `OWNCLOUD_OBJECTSTORE_KEY` | owncloud | - | Bucket access key |
| `OWNCLOUD_TRUSTED_DOMAINS` | owncloud | - | Hostnames the server answers on |
| `OWNCLOUD_DB_ADMIN_PASSWORD` | owncloud | (secret) | Superuser password |
| `OWNCLOUD_DB_ADMIN_USERNAME` | owncloud | (secret) | Superuser used only to create the role |
| `OWNCLOUD_OVERWRITE_CLI_URL` | owncloud | - | Base URL for background jobs |
| `OWNCLOUD_OBJECTSTORE_BUCKET` | owncloud | - | Bucket holding file bodies |
| `OWNCLOUD_OBJECTSTORE_REGION` | owncloud | - | Bucket placement region |
| `OWNCLOUD_OBJECTSTORE_SECRET` | owncloud | (secret) | Bucket secret key |
| `OWNCLOUD_OVERWRITE_PROTOCOL` | owncloud | https | Force https behind the edge |
| `OWNCLOUD_OBJECTSTORE_ENABLED` | owncloud | true | Use object storage as primary storage |
| `OWNCLOUD_OBJECTSTORE_ENDPOINT` | owncloud | - | S3 API endpoint |
| `OWNCLOUD_HTACCESS_REWRITE_BASE` | owncloud | / | Clean URLs without index.php |
| `OWNCLOUD_OBJECTSTORE_PATHSTYLE` | owncloud | true | Path-style S3 addressing |
| `AWS_REQUEST_CHECKSUM_CALCULATION` | owncloud | when_required | Skip flexible upload checksums |
| `AWS_RESPONSE_CHECKSUM_VALIDATION` | owncloud | when_required | Skip hashing streamed downloads |
| `OWNCLOUD_INTEGRITY_EXCLUDED_FILES` | owncloud | s3storage.php | Exclude the patched file from code checks |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mnt/data`

**Category:** Storage · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/owncloud-server)
