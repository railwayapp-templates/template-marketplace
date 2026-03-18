# Deploy Honeypot - The Discord Bot on Railway

An anti-spam discord bot that helps you deal with server spammers!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/honeypot-the-discord-bot)

## About

Honeypot is a spam prevention bot for discord, primarily aimed at preventing the "flood all channels" style of spammer that we've seen a surge in recently.

The bot allows you to create "Honeypot" channels, which can be configured to take action when someone sends a message in them. This prevents the all-too-common hassle of needing a server moderator to deal with the spammers themselves, and prevents them doing as much damage to your community.

Hosting Honeypot is as simple as entering the discord token of the bot you'd like to run your instance on! All other configuration can be done inside the app. There is no limit on the number of servers you can add your honeypot to.

You can view the full guide to using the bot on our website, at https://honeypotbot.com/guide.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2.1` | Database |
| honeypot | [MaskdDev/honeypot](https://github.com/MaskdDev/honeypot) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `CACHE_URL` | honeypot | - | The URL of the Redis Cache to use for the bot. |
| `DATABASE_URL` | honeypot | - | The URL of the Postgres database to use for the bot. |
| `SQLX_OFFLINE` | honeypot | true | Whether to run sqlx in offline mode. |
| `DISCORD_TOKEN` | honeypot | (secret) | The token of the discord bot you'd like to run the bot on. |
| `RAILPACK_RUST_VERSION` | honeypot | 1.89.0 | The Rust version to be used by this deploy. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/honeypot-the-discord-bot)
