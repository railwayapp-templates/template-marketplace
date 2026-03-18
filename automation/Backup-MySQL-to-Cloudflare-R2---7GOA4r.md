# Deploy Backup MySQL to Cloudflare R2 on Railway

Run a single backup of a MySQL database to Cloudflare R2

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/7GOA4r)

## About

This container runs a single time, backing up a MySQL database to [Cloudflare R2](https://developers.cloudflare.com/r2/). To set up properly:

- Disable restarts
- Set a Cron schedule to back up as often as you'd like in settings

Internally, this uses [mydumper](https://github.com/mydumper/mydumper) to dump the database quickly (saving you compute cost over `mysqldump`) and [rclone](https://rclone.org/) to sync the data with a folder in an R2 bucket.

You can modify the [generated rclone config](https://github.com/dbanty/rclone-mysql-backup/blob/06174cac3204c2e1e7b992d8f4ff112aa801561c/entrypoint.sh#L7-L16) to support virtually any other target for the backup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rclone-mysql-backup | [dbanty/rclone-mysql-backup](https://github.com/dbanty/rclone-mysql-backup) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `R2_PATH` | - | A folder within the R2 bucket to upload to, defaults to "mysql-backup" |
| `R2_BUCKET` | - | The name of the bucket to upload to |
| `MYSQL_HOST` | - | The host to connect to, you probably want a Railway variable |
| `MYSQL_PORT` | - | The port that MySQL is running on |
| `MYSQL_USER` | (secret) | The user name for MySQL |
| `R2_ENDPOINT` | - | The S3 API URL for your R2 account |
| `MYSQL_DATABASE` | - | The database within MySQL to back up |
| `MYSQL_PASSWORD` | (secret) | The password for MySQL |
| `R2_ACCESS_KEY_ID` | - | An S3-compatible access key for Cloudflare R2 |
| `R2_SECRET_ACCESS_KEY` | (secret) | An S3-compatible access key for Cloudflare R2 |

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/7GOA4r)
