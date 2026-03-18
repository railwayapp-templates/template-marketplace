# Deploy Redis Migrator on Railway

Migrate data from a source Redis to a target Redis database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-migrator)

## About

This is a service that will migrate data from the source Redis database to the target Redis database.

## Required Variables

- `SOURCE_REDIS_URL`: The Redis URL of the source database.
- `TARGET_REDIS_URL`: The Redis URL of the target database.

## Process

- Uses Redis Riot to replicate the data.

**No data is ever deleted from the source**

## Caveats

- You should stop writing to the source database while the migration is in progress to avoid data not being migrated
- You should manually update your application to point to the target URL once the migration is done

**If you want to avoid egress charges, you should use the private URL of the target database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis Migrator | `riotx/riot` | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SOURCE_REDIS_URL` | The `REDIS_URL` of the Redis database to copy data from |
| `TARGET_REDIS_URL` | The `REDIS_URL` of the Redis database to copy data to |

## Configuration

- **Start command:** `/bin/sh -c "exec riot replicate --mode live --progress=LOG --debug --info $SOURCE_REDIS_URL $TARGET_REDIS_URL 2>&1"`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-migrator)
