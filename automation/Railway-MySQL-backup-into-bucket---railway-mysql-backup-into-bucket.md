# Deploy Railway MySQL backup into bucket on Railway

Dumps a Railway MySQL service backup straight into a Railway bucket.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-mysql-backup-into-bucket)

## About

Railway MySQL backup into bucket is a scheduled job that dumps a Railway MySQL service straight into a Railway bucket. It streams `mysqldump` through gzip with no temp files, refuses to store an empty or truncated dump, verifies the stored size, files each backup under a folder named after the database, and prunes old copies. Nothing leaves Railway.

The job runs as a Railway cron service next to your database. On each run it wakes the database if it is sleeping, connects over the private network, and pipes the dump into your bucket as a multipart upload. A run only succeeds when `mysqldump` exits cleanly, the dump ends with MySQL's completion trailer, and the object in the bucket matches the bytes sent. Anything else aborts the upload and shows up as a failed deployment with the error in the logs. There is no always-on process and no third-party cloud account: the template provisions the bucket and wires its credentials in through variable references, so you only point it at your database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql-backup | [davidahill/railway-mysql-backup](https://github.com/davidahill/railway-mysql-backup) (branch: master) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BUCKET_NAME` | - | Provided by the template's bucket. |
| `BUCKET_REGION` | - | Provided by the template's bucket. |
| `BUCKET_ENDPOINT` | - | Provided by the template's bucket. |
| `BACKUP_SOURCE_NAME` | - | Folder inside the bucket. Empty derives it from the host, e.g. mysql-8832.railway.internal → mysql-8832. Or use ${{MySQL.RAILWAY_SERVICE_NAME}}. |
| `BACKUP_DATABASE_HOST` | - | Your MySQL host. Use a reference such as ${{MySQL.MYSQLHOST}}, replacing MySQL with your database service's name. |
| `BACKUP_DATABASE_NAME` | - | Schema to dump, e.g. ${{MySQL.MYSQL_DATABASE}}. Empty dumps every non-system schema. |
| `BACKUP_DATABASE_PORT` | 3306 | Or ${{MySQL.MYSQLPORT}} |
| `BACKUP_DATABASE_USER` | (secret) | Same idea: ${{MySQL.MYSQLUSER}} |
| `BUCKET_ACCESS_KEY_ID` | - | Provided by the template's bucket. |
| `BACKUP_RETENTION_DAYS` | 30 | Optional. Delete backups older than this many days. 0 keeps everything. |
| `BACKUP_DATABASE_PASSWORD` | (secret) | Same idea: ${{MySQL.MYSQLPASSWORD}} |
| `BUCKET_SECRET_ACCESS_KEY` | (secret) | Provided by the template's bucket. |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/railway-mysql-backup-into-bucket)
