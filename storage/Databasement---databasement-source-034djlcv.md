# Deploy Databasement on Railway

Database backup and restore dashboard, ready to self-host on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/databasement-source-034djlcv)

## About

Deploy Databasement, the open-source web interface for database backup and restore operations. This template runs the upstream `davidcrty/databasement:1.7.3` image with its application data persisted on a Railway Volume.

Databasement provides a dashboard for scheduling, monitoring, and restoring database backups. The application supports common database engines including MySQL, PostgreSQL, MariaDB, SQL Server, SQLite, MongoDB, Redis, and Firebird. This Railway deployment exposes only the Databasement web application and keeps its SQLite metadata and locally created backups in `/data`.

- Upstream project: https://github.com/David-Crty/databasement
- Upstream Docker guide: https://david-crty.github.io/databasement/self-hosting/docker
- Upstream versioning policy: https://david-crty.github.io/databasement/self-hosting/versioning
- License: https://github.com/David-Crty/databasement/blob/v1.7.3/LICENSE

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Databasement | `davidcrty/databasement:1.7.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 2226 |
| `APP_ENV` | production |
| `APP_DEBUG` | false |
| `ADMIN_EMAIL` | admin@databasement.local |
| `DB_DATABASE` | /data/database.sqlite |
| `SERVER_NAME` | :2226 |
| `DB_CONNECTION` | sqlite |
| `ADMIN_PASSWORD` | (secret) |
| `ENABLE_QUEUE_WORKER` | true |

## Configuration

- **Start command:** `sh -c "php artisan migrate --force && mkdir -p /data/backups && php artisan tinker --execute='if (app(\"db\")->table(\"users\")->count() === 0) { app(\"App\".chr(92).\"Actions\".chr(92).\"Fortify\".chr(92).\"CreateNewUser\")->create([\"name\" => \"Administrator\", \"email\" => getenv(\"ADMIN_EMAIL\"), \"password\" => getenv(\"ADMIN_PASSWORD\"), \"password_confirmation\" => getenv(\"ADMIN_PASSWORD\")]); } app(\"App\".chr(92).\"Services\".chr(92).\"CurrentOrganization\")->set(app(\"App\".chr(92).\"Models\".chr(92).\"Organization\")::default()); if (app(\"db\")->table(\"volumes\")->where(\"name\",\"Local Backups\")->count() === 0) { app(\"App\".chr(92).\"Services\".chr(92).\"DemoBackupService\")->createDemoBackup(); }' && exec /usr/local/bin/start.sh"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/databasement-source-034djlcv)
