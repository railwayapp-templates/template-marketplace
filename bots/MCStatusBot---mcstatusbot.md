# Deploy MCStatusBot on Railway

A simple Discord.js bot that displays the status of Minecraft servers. 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mcstatusbot)

## About

Official Railway Template for https://github.com/RahulR100/mcstatusbot

**View Source Code** [Here](https://github.com/RahulR100/mcstatusbot)

**Join our Discord Server!** [Here](https://discord.gg/FVuSmQx5tJ).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| Redis | `redis:8.2.1` | Database |
| mcpingserver | `rar1871/mcpingserver` | Worker |
| mcstatusbot | `rar1871/mcstatusbot` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | mcpingserver | 8000 | DO NOT EDIT. Listening Port |
| `REDIS_URL` | mcpingserver | - | DO NOT EDIT. Connection to Redis |
| `TOKEN` | mcstatusbot | (secret) | Discord Bot Token |
| `PING_URL` | mcstatusbot | - | DO NOT EDIT. Connection to Ping Server |
| `CLIENT_ID` | mcstatusbot | - | Discord Bot Client ID |
| `DATABASE_URL` | mcstatusbot | - | DO NOT EDIT. Connection to Database |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/template/mcstatusbot)
