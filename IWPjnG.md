# Deploy Database Backup + Restore on Railway

highly configurable solution for automated database backup and restore

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/IWPjnG)

## About

#### For Influx DB2:
Your Organization will be mapped to `DB_USER` and your root token will need to be mapped to `DB_PASS`. You may use `DB_NAME=ALL` to backup the entire set of databases. For `DB_HOST` use syntax of `http(s)://db-name`

### Scheduling Options
| Parameter                | Description                                                                                                                                                                                        | Default                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `DB_DUMP_FREQ`           | How often to do a dump, in minutes after the first backup. Defaults to 1440 minutes, or once per day.                                                                                              | `1440`                       |
| `DB_DUMP_BEGIN`          | What time to do the first dump. Defaults to immediate. Must be in one of two formats                                                                                                               |                              |
|                          | Absolute HHMM, e.g. `2330` or `0415`                                                                                                                                                               |                              |
|                          | Relative +MM, i.e. how many minutes after starting the container, e.g. `+0` (immediate), `+10` (in 10 minutes), or `+90` in an hour and a half                                                     |                              |
| `DB_DUMP_TARGET`         | Directory where the database dumps are kept.                                                                                                                                                       | `${DB_DUMP_TARGET}/archive/` |
| `DB_DUMP_TARGET_ARCHIVE` | Optional Directory where the database dumps archives are kept.                                                                                                                                     |                              |
| `DB_CLEANUP_TIME`        | Value in minutes to delete old backups (only fired when dump freqency fires). 1440 would delete anything above 1 day old. You don't need to set this variable if you want to hold onto everything. | `FALSE`                      |
| `DB_ARCHIVE_TIME`        | Value in minutes to move all files files older than (x) from `DB_DUMP_TARGET` to `DB_DUMP_TARGET_ARCHIVE` - which is useful when pairing against an external backup system.                        |                              |

- You may need to wrap your `DB_DUMP_BEGIN` value in quotes for it to properly parse. There have been reports of backups that start with a `0` get converted into a different format which will not allow the timer to start at the correct time.

### Backup Options
| Parameter                      | Description                                                                                                                  | Default                   | `_FILE` |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------- |
| `COMPRESSION`                  | Use either Gzip `GZ`, Bzip2 `BZ`, XZip `XZ`, ZSTD `ZSTD` or none `NONE`                                                      | `ZSTD`                    |         |
| `COMPRESSION_LEVEL`            | Numberical value of what level of compression to use, most allow `1` to `9` except for `ZSTD` which allows for `1` to `19` - | `3`                       |         |
| `ENABLE_PARALLEL_COMPRESSION`  | Use multiple cores when compressing backups `TRUE` or `FALSE`                                                                | `TRUE`                    |         |
| `PARALLEL_COMPRESSION_THREADS` | Maximum amount of threads to use when compressing - Integer value e.g. `8`                                                   | `autodetected`            |         |
| `GZ_RSYNCABLE`                 | Use `--rsyncable` (gzip only) for faster rsync transfers and incremental backup deduplication. e.g. `TRUE`                   | `FALSE`                   |         |
| `ENABLE_CHECKSUM`              | Generate either a MD5 or SHA1 in Directory, `TRUE` or `FALSE`                                                                | `TRUE`                    |         |
| `CHECKSUM`                     | Either `MD5` or `SHA1`                                                                                                       | `MD5`                     |         |
| `EXTRA_OPTS`                   | If you need to pass extra arguments to the backup command, add them here e.g. `--extra-command`                              |                           |         |
| `MYSQL_MAX_ALLOWED_PACKET`     | Max allowed packet if backing up MySQL / MariaDB                                                                             | `512M`                    |         |
| `MYSQL_SINGLE_TRANSACTION`     | Backup in a single transaction with MySQL / MariaDB                                                                          | `TRUE`                    |         |
| `MYSQL_STORED_PROCEDURES`      | Backup stored procedures with MySQL / MariaDB                                                                                | `TRUE`                    |         |
| `MYSQL_ENABLE_TLS`             | Enable TLS functionality for MySQL client                                                                                    | `FALSE`                   |         |
| `MYSQL_TLS_VERIFY`             | (optional) If using TLS (by means of MYSQL_TLS_* variables) verify remote host                                               | `FALSE`                   |         |
| `MYSQL_TLS_VERSION`            | What TLS `v1.1` `v1.2` `v1.3` version to utilize                                                                             | `TLSv1.1,TLSv1.2,TLSv1.3` |         |
| `MYSQL_TLS_CA_FILE`            | Filename to load custom CA certificate for connecting via TLS                                                                | `/etc/ssl/cert.pem`       | x       |
| `MYSQL_TLS_CERT_FILE`          | Filename to load client certificate for connecting via TLS                                                                   |                           | x       |
| `MYSQL_TLS_KEY_FILE`           | Filename to load client key for connecting via TLS                                                                           |                           | x       |

- When using compression with MongoDB, only `GZ` compression is possible.

#### Backing Up to S3 Compatible Services

If `BACKUP_LOCATION` = `S3` then the following options are used.

| Parameter             | Description                                                                               | Default | `_FILE` |
| --------------------- | ----------------------------------------------------------------------------------------- | ------- | ------- |
| `S3_BUCKET`           | S3 Bucket name e.g. `mybucket`                                                            |         | x       |
| `S3_KEY_ID`           | S3 Key ID (Optional)                                                                      |         | x       |
| `S3_KEY_SECRET`       | S3 Key Secret (Optional)                                                                  |         | x       |
| `S3_PATH`             | S3 Pathname to save to (must NOT end in a trailing slash e.g. '`backup`')                 |         | x       |
| `S3_REGION`           | Define region in which bucket is defined. Example: `ap-northeast-2`                       |         | x       |
| `S3_HOST`             | Hostname (and port) of S3-compatible service, e.g. `minio:8080`. Defaults to AWS.         |         | x       |
| `S3_PROTOCOL`         | Protocol to connect to `S3_HOST`. Either `http` or `https`. Defaults to `https`.          | `https` | x       |
| `S3_EXTRA_OPTS`       | Add any extra options to the end of the `aws-cli` process execution                       |         | x       |
| `S3_CERT_CA_FILE`     | Map a volume and point to your custom CA Bundle for verification e.g. `/certs/bundle.pem` |         | x       |
| _*OR*_                |                                                                                           |         |         |
| `S3_CERT_SKIP_VERIFY` | Skip verifying self signed certificates when connecting                                   | `TRUE`  |         |

- When `S3_KEY_ID` and/or `S3_KEY_SECRET` is not set, will try to use IAM role assigned (if any) for uploading the backup files to S3 bucket.


## See Full Config:
https://github.com/JamesWRC/db-backup

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Database Backup + Restore | [JamesWRC/db-backup](https://github.com/JamesWRC/db-backup) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port used for file server. Don't change this, unless Dockerfile is updated. |
| `DB_HOST` | - | Server Host. Example: containers-us-west-xxx.railway.app |
| `DB_NAME` | - | Schema Name. Example: railway |
| `DB_PASS` | - | (optional if DB doesn't require it) password for the database |
| `DB_PORT` | - | Port used by your database. |
| `DB_TYPE` | pgsql | Type of DB Server to backup. See types: https://github.com/tiredofit/docker-db-backup#database-specific-options |
| `DB_USER` | (secret) | Username for the database |
| `S3_HOST` | - | Hostname of S3-compatible service |
| `S3_PATH` | backup | S3 Pathname to save to (must NOT end in a trailing slash e.g. 'backup') |
| `CHECKSUM` | SHA1 | Either MD5 or SHA1 |
| `SPLIT_DB` | TRUE | For each backup, create a new archive. TRUE or FALSE (MySQL and Postgresql Only) |
| `S3_BUCKET` | - | S3 Bucket name e.g. mybucket |
| `S3_KEY_ID` | - | S3 Key ID |
| `S3_REGION` | - | Define region in which bucket is defined. Example: ap-northeast-2 |
| `SIZE_VALUE` | megabytes | Useful in logging |
| `COMPRESSION` | ZSTD | https://github.com/tiredofit/docker-db-backup#backup-options |
| `FB_PASSWORD` | (secret) | The admin account username. Used to log in and view, download and upload database backups |
| `FB_USERNAME` | (secret) | The admin account username. Used to log in and view, download and upload database backups |
| `DB_DUMP_FREQ` | 1440 | How often to do a dump, in minutes after the first backup. Defaults to 1440 minutes, or once per day. |
| `S3_KEY_SECRET` | (secret) | S3 Key Secret  |
| `BACKUP_LOCATION` | S3 | https://github.com/tiredofit/docker-db-backup#container-options |
| `DB_CLEANUP_TIME` | 43200 | Value in minutes to delete old backups (only fired when dump freqency fires). 1440 would delete anything above 1 day old. You don't need to set this variable if you want to hold onto everything. 43200 = 30 days. Backups after 30 days will be deleted. LOCAL ONLY. Wont remove any S3 backups |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/db_backup`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/IWPjnG)
