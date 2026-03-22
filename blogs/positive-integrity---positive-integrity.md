# Deploy positive-integrity on Railway

Deploy and Host positive-integrity with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/positive-integrity)

## About

**positive-integrity** — это аналитическая платформа для авиатрекинга, позволяющая отслеживать данные о воздушных судах и управлять персональными записями о полетах. Проект объединяет мощный CLI-инструмент для скрапинга данных с веб-интерфейсом для визуализации истории перемещений самолетов и логбуков.

Развертывание **positive-integrity** на Railway превращает локальный Python-инструмент в масштабируемое облачное приложение. Railway берет на себя управление инфраструктурой: автоматически собирает проект из приватного репозитория, устанавливает зависимости и запускает асинхронный сервер Uvicorn. Основная сложность хостинга авиатрекера — работа с базой данных и внешними запросами — здесь решается через автоматическую оркестрацию PostgreSQL. Система сама управляет SSL-сертификатами для твоего домена и обеспечивает внутреннюю защищенную сеть между бэкендом и БД, исключая доступ к данным извне.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| skyprint | [malyushkin/skyprint](https://github.com/malyushkin/skyprint) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SKYPRINT_SECRET_KEY` | skyprint | (secret) | - |
| `RAILPACK_PYTHON_VERSION` | skyprint | 3.12.2 | - |
| `SKYPRINT_ADMIN_PASSWORD` | skyprint | (secret) | - |
| `SKYPRINT_ADMIN_USERNAME` | skyprint | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `python main.py serve --host 0.0.0.0 --port $PORT`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Blogs · **Languages:** Python, HTML, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/positive-integrity)
