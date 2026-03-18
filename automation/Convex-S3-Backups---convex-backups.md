# Deploy Convex S3 Backups on Railway

Automated self hosted convex backups to s3 providers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convex-backups)

## About

Simply deploy the template after setting up the env variables.

Set these env vars and you will be good to go;

CONVEX_SELF_HOSTED_ADMIN_KEY: - Your self hosted instance's admin key.

CONVEX_SELF_HOSTED_URL - Your self hosted instance's url (api).

CONVEX_URL: Your selfhosted instance's url (api).

AWS_ACCESS_KEY_ID - S3 access key ID.

AWS_SECRET_ACCESS_KEY - S3  secret access key, sometimes also called an application key.

AWS_S3_BUCKET - The name of the bucket that the access key ID and secret access key are authorized to access.

AWS_S3_REGION - The name of the region your bucket is located in, set to auto if unknown.

BACKUP_CRON_SCHEDULE - The cron schedule to run the backup on. Example: 0 5 * * *

AWS_S3_ENDPOINT - The S3 custom endpoint you want to use. Applicable for 3-rd party S3 services such as Cloudflare R2 or Backblaze R2.

AWS_S3_FORCE_PATH_STYLE - Use path style for the endpoint instead of the default subdomain style, useful for MinIO. Default false

RUN_ON_STARTUP - Run a backup on startup of this application then proceed with making backups on the set schedule.

BACKUP_FILE_PREFIX - Add a prefix to the file name.

BUCKET_SUBFOLDER - Define a subfolder to place the backup files in.

SINGLE_SHOT_MODE - Run a single backup on start and exit when completed. Useful with the platform's native CRON schedular.

SUPPORT_OBJECT_LOCK - Enables support for buckets with object lock by providing an MD5 hash with the backup file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| convex-backups | [orenaksakal/convex-self-hosted-backups](https://github.com/orenaksakal/convex-self-hosted-backups) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RUN_ON_STARTUP` | true |
| `SINGLE_SHOT_MODE` | false |
| `BACKUP_CRON_SCHEDULE` | 0 5 * * * |
| `AWS_SECRET_ACCESS_KEY` | (secret) |

**Category:** Automation · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/convex-backups)
