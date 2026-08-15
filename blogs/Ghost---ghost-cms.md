# Deploy Ghost on Railway

Substack alternative. Publishing, email newsletters and Stripe memberships

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-cms)

## About

Ghost is an open source publishing platform combining a writing-first CMS, a native email newsletter and paid memberships in one application. Writers, journalists and companies running an engineering blog use it as a self-hosted alternative to Substack, Medium and a plugin-laden WordPress install: you keep the content, the subscriber list and the payment relationship, with no revenue share on paid subscriptions.

Deploy Ghost on Railway and this template wires up the three pieces a production install needs. The Ghost container serves both the public site and the admin app on port 2368 behind Railway's TLS edge. A MySQL 8.4 service holds every post, member and setting, reached over the private network so the database has no public address. A volume at `/var/lib/ghost/content` stores uploaded images, media and themes, so files survive every redeploy, and Redis backs Ghost's asynchronous caches. Schema migrations run automatically on first boot, so the site is ready as soon as the deploy goes green.

![Ghost Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786745732/efb846e4-7fe4-486c-8228-3d6883d238d3.png)

Ghost is a Node.js application that owns both a database schema and a content directory. Self-host it when you want the subscriber list and payment relationship in your own infrastructure, when you need themes or routes a hosted plan restricts, or when you want to drive the site headlessly.

- Writing-first editor with cards for images, galleries, embeds and code
- Native newsletters to segmented member lists, with open/click analytics
- Paid memberships through a direct Stripe connection, with no platform fee
- Handlebars themes, custom routing via `routes.yaml`, theme upload from the admin
- Content API and Admin API with key-based auth, plus webhooks

The **Ghost** service is the whole application — public site, admin, API and background jobs in one process. **MySQL** is the system of record for posts, members and settings. The **volume** holds everything that is a file rather than a row. **Redis** caches values Ghost reads asynchronously, such as remote image dimensions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Ghost | `ghost:6` | Web service |
| MySQL | `mysql:8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `url` | Ghost | - | Public base URL of the site |
| `PORT` | Ghost | 2368 | Port Railway routes traffic to |
| `mail__from` | Ghost | - | Default from address |
| `NODE_OPTIONS` | Ghost | --max-old-space-size=3072 | Cap the Node heap |
| `server__host` | Ghost | :: | Dual-stack listen address |
| `server__port` | Ghost | 2368 | Application listen port |
| `logging__level` | Ghost | info | Log verbosity |
| `database__client` | Ghost | mysql | Mapped to the mysql2 driver |
| `database__pool__max` | Ghost | 10 | Maximum pooled connections |
| `database__pool__min` | Ghost | 0 | Minimum pooled connections |
| `logging__transports` | Ghost | ["stdout"] | Send logs to stdout, not a file |
| `adapters__cache__active` | Ghost | Redis | Async caches use Redis |
| `database__connection__host` | Ghost | - | Private MySQL hostname |
| `database__connection__port` | Ghost | 3306 | MySQL port |
| `database__connection__user` | Ghost | (secret) | Database-scoped MySQL user |
| `adapters__cache__Redis__ttl` | Ghost | 3600 | Cache entry lifetime in seconds |
| `adapters__cache__Redis__host` | Ghost | - | Private Redis hostname |
| `adapters__cache__Redis__port` | Ghost | - | Redis port |
| `database__connection__database` | Ghost | ghost | Database name |
| `database__connection__password` | Ghost | (secret) | Password for the ghost user |
| `adapters__cache__Redis__password` | Ghost | (secret) | Redis password |
| `adapters__cache__Redis__username` | Ghost | (secret) | Redis username |
| `adapters__cache__Redis__keyPrefix` | Ghost | ghost: | Namespace for cache keys |
| `adapters__cache__settings__adapter` | Ghost | MemoryCache | Settings cache must stay in-process |
| `adapters__cache__Redis__getTimeoutMilliseconds` | Ghost | 1000 | Slow reads degrade to a cache miss |
| `MYSQL_USER` | MySQL | (secret) | Database-scoped application user |
| `MYSQL_DATABASE` | MySQL | ghost | Database created on first boot |
| `MYSQL_PASSWORD` | MySQL | (secret) | Password for the ghost user |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | MySQL superuser password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`
- **Start command:** `/bin/sh -c 'M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null); expr "$M" + 0 >/dev/null 2>&1 || M=2147483648; B=$(expr $M / 2); if [ $B -lt 134217728 ]; then B=134217728; fi; echo "boot: cgroup_mem=$M innodb_buffer_pool_size=$B"; exec docker-entrypoint.sh mysqld --innodb-buffer-pool-size=$B'`
- **Volume:** `/var/lib/mysql`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/ghost-cms)
