# Deploy tbb-site on Railway

Исполнитель ботов Telegram Bot Builder с Redis и PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tbb-site)

## About

Площадка для ботов конструктора [Telegram Bot Builder](https://github.com/fedorabakumets/telegram-bot-builder): исполнитель, Redis и PostgreSQL в вашем аккаунте Railway.

- **Runner** — исполнитель: получает команды панели (запуск, остановка, перезапуск ботов) и запускает ботов.
- **Redis** — канал связи панели с исполнителем и кеш ботов. Доступен снаружи через TCP Proxy.
- **Postgres** — база ботов: пользователи, сообщения, переменные.

После развёртывания откройте сервис **Redis** → Variables, скопируйте `REDIS_PUBLIC_URL` и вставьте его в панели при подключении площадки. Адреса базы панель узнает сама: исполнитель записывает их в Redis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Runner | `ghcr.io/fedorabakumets/telegram-bot-builder-runner:latest` | Worker |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/tbb-site)
