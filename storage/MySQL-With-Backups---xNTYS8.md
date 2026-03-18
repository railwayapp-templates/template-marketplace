# Deploy MySQL With Backups on Railway

The standard MySQL database plus backups to Cloudflare R2

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xNTYS8)

## About

Deploys the standard [Railway MySQL](https://docs.railway.app/guides/mysql) plus a container which backs up that database to [Cloudflare R2](https://developers.cloudflare.com/r2/).

To set up properly, modify the backups service to:

- Disable restarts
- Set a Cron schedule to back up as often as you'd like in settings

Internally, this uses [mydumper](https://github.com/mydumper/mydumper) to dump the database quickly (saving you compute cost over mysqldump) and [rclone](https://rclone.org/) to sync the data with a folder in an R2 bucket.

You can modify the [generated rclone config](https://github.com/dbanty/rclone-mysql-backup/blob/06174cac3204c2e1e7b992d8f4ff112aa801561c/entrypoint.sh#L7-L16) to support virtually any other target for the backup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql` | Database |
| Backup MySQL to R2 | [dbanty/rclone-mysql-backup](https://github.com/dbanty/rclone-mysql-backup) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway TCP Proxy Domain. |
| `MYSQLPORT` | MySQL | - | MySQL TCP Proxy port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PRIVATE_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `R2_PATH` | Backup MySQL to R2 | - | A folder within the R2 bucket to upload to, defaults to "mysql-backup" |
| `R2_BUCKET` | Backup MySQL to R2 | - | The name of the bucket to upload to |
| `MYSQL_HOST` | Backup MySQL to R2 | - | The MySQL host to connect to |
| `MYSQL_PORT` | Backup MySQL to R2 | - | The port to connect to |
| `MYSQL_USER` | Backup MySQL to R2 | (secret) | Username for MySQL |
| `R2_ENDPOINT` | Backup MySQL to R2 | - | The S3 API URL for your R2 account |
| `MYSQL_DATABASE` | Backup MySQL to R2 | - | The name of the database to dump |
| `MYSQL_PASSWORD` | Backup MySQL to R2 | (secret) | Password for MySQL |
| `R2_ACCESS_KEY_ID` | Backup MySQL to R2 | - | An S3-compatible access key |
| `R2_SECRET_ACCESS_KEY` | Backup MySQL to R2 | (secret) | An S3-compatible access key |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/xNTYS8)
