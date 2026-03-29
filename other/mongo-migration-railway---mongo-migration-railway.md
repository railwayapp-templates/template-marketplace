# Deploy mongo-migration-railway on Railway

Deploy and Host mongo-migration-railway with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mongo-migration-railway)

## About

**mongo-migration-railway** is a robust shell-based utility designed to migrate MongoDB databases using compressed archive files. By leveraging `mongodump` and `mongorestore` with Gzip compression and wildcard namespace mapping, it ensures that data is safely backed up to an intermediate file before being projected into a target destination, regardless of database naming differences.

Hosting this utility on Railway involves deploying a container that executes a multi-step Bash script. Unlike a simple stream, this implementation captures a point-in-time snapshot in a `/data` directory before initiating the restore. This is particularly useful for Railway users who need to move data between databases with different names, as the script uses `--nsFrom='*'` and `--nsTo='*'` to force the data into the target's specific schema. When deploying, ensure the Railway service has sufficient **ephemeral disk space** to hold the compressed archive. Most importantly, set the **Restart Policy** to **"Never"** to prevent the script from re-running and overwriting your data once the migration is successful.

-----

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongo-migration-railway | [iqbalexperience/mongo-backup-tool-railway](https://github.com/iqbalexperience/mongo-backup-tool-railway) | Database |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SOURCE_URL` | "${{Mongo.MONGO_PRIVATE_URL}}/mydb" Reference variable or add database url of source |
| `DESTINATION_URL` | "${{Mongo.MONGO_PRIVATE_URL}}/mydb" Reference variable or add database url of destination |

## Configuration

- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mongo-migration-railway)
