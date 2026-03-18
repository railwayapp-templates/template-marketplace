# Deploy Bucket Sync on Railway

Sync files from one bucket to another, using rclone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bucket-sync)

## About

A service using rclone which runs once and syncs all files from a source bucket to a destination bucket. Can be used once to transfer files to a new bucket, or regularly with a cron to backup buckets.

For a better experience when entering the necessary configuration variables, deploy this template from your existing project (Create -> Template -> Search "Bucket Sync").

This template assumes you have 2 buckets already created:

- a source bucket, where the files are stored
- a target bucket, where the files should be synced to

Create the target bucket before deploying this template, if it doesn't yet exist.

When you configure and deploy this template, it will start to sync your files. You can add a cron schedule if you want to sync it regularly.

⚠️ Files are synced using public networking, so the upload from the service to the new bucket counts as billable service egress.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Sync Buckets | `rclone/rclone:latest` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEST_BUCKET_NAME` | - | Destination bucket: Bucket name from the Credentials Tab |
| `SOURCE_BUCKET_NAME` | - | Source bucket: Bucket name from the Credentials Tab |
| `RCLONE_CONFIG_DEST_TYPE` | s3 | Destination bucket: Storage type (should be s3) |
| `RCLONE_CONFIG_SOURCE_TYPE` | s3 | Source bucket: Storage type (should be s3) |
| `RCLONE_CONFIG_DEST_ENDPOINT` | - | Destination bucket: Endpoint URL |
| `RCLONE_CONFIG_SOURCE_ENDPOINT` | - | Source bucket: Endpoint URL |
| `RCLONE_CONFIG_DEST_ACCESS_KEY_ID` | - | Destination bucket: Access Key ID |
| `RCLONE_CONFIG_SOURCE_ACCESS_KEY_ID` | - | Source bucket: Access Key ID |
| `RCLONE_CONFIG_DEST_SECRET_ACCESS_KEY` | (secret) | Destination bucket: Secret Access Key |
| `RCLONE_CONFIG_SOURCE_SECRET_ACCESS_KEY` | (secret) | Source bucket: Secret Access Key |

## Configuration

- **Start command:** `/bin/sh -c "/usr/local/bin/rclone copy source:$SOURCE_BUCKET_NAME dest:$DEST_BUCKET_NAME --progress"`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/bucket-sync)
