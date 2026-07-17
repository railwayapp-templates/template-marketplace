# Deploy arbitrage on Railway

Arbitrage monitor: Vue3 + SpringBoot + MySQL + Redis

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/arbitrage)

## About

Full-stack sports betting arbitrage monitoring platform. Compare real-time odds between Kalshi and Polymarket to discover arbitrage opportunities. Deploy instantly on Railway with auto-configured MySQL and Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| MySQL | `mysql:9.4` | Database |
| arbitrage | [HiGoalAI/vibe_gaming_solo](https://github.com/HiGoalAI/vibe_gaming_solo) (root: /arbitrage) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `DB_PASSWORD` | arbitrage | (secret) |
| `DB_USERNAME` | arbitrage | (secret) |
| `REDIS_PASSWORD` | arbitrage | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** TypeScript, Python, Java, CSS, Vue, Shell, JavaScript, SCSS, Dockerfile, Makefile, Mako, HTML

[View on Railway →](https://railway.com/deploy/arbitrage)
