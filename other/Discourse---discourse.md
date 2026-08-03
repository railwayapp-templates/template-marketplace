# Deploy Discourse on Railway

Have meaningful conversations and collaborate anytime, anywhere

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/discourse)

## About

Discourse is an open-source discussion platform designed for modern web communities. It provides a rich set of features including real-time discussions, user notifications, and a powerful API, making it an ideal choice for building engaging online forums and communities.

Hosting Discourse involves setting up a server environment utilizing a bash script to create the relevant Docker configurations. Discourse typically requires a complex setup and configuration to get up and running. You'll need to setup web certificates to serve your requests over HTTPS, and secure your server properly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Discourse | `discourse/discourse:2026.7.1` | Web service |
| Mock Email | `maildev/maildev:3.0.0-rc.1` | Web service |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Discourse | 80 | - |
| `DISCOURSE_SMTP_PORT` | Discourse | - | SMTP is required for a proper setup (Mock server is provided for testing). |
| `DISCOURSE_DB_PASSWORD` | Discourse | (secret) | - |
| `DISCOURSE_DB_USERNAME` | Discourse | (secret) | - |
| `DISCOURSE_SMTP_ADDRESS` | Discourse | - | SMTP is required for a proper setup (Mock server is provided for testing). |
| `DISCOURSE_SMTP_PASSWORD` | Discourse | (secret) | SMTP is required for a proper setup (Mock server is provided for testing). |
| `DISCOURSE_REDIS_PASSWORD` | Discourse | (secret) | - |
| `DISCOURSE_REDIS_USERNAME` | Discourse | (secret) | - |
| `DISCOURSE_SMTP_USER_NAME` | Discourse | - | SMTP is required for a proper setup (Mock server is provided for testing). |
| `DISCOURSE_DEVELOPER_EMAILS` | Discourse | - | The email(s), comma separated, that will be made admin and developer on initial signup. e.g. admin@example.com |
| `DISCOURSE_NOTIFICATION_EMAIL` | Discourse | noreply@discourse.example.com | SMTP is required for a proper setup (Mock server is provided for testing). |
| `PORT` | Mock Email | 1234 | The Web UI access port. |
| `SMTP_HOST` | Mock Email | - | The host to send mail to. |
| `SMTP_PORT` | Mock Email | - | The port to send mail to. |
| `MAILDEV_WEB_IP` | Mock Email | :: | IP to listen on. |
| `MAILDEV_WEB_PASS` | Mock Email | - | The password to login to the Web UI with. |
| `MAILDEV_WEB_PORT` | Mock Email | - | The Web UI access port. |
| `MAILDEV_WEB_USER` | Mock Email | (secret) | The user to login to the Web UI with. |
| `MAILDEV_SMTP_PORT` | Mock Email | 25 | The port to receive mail on. |
| `MAILDEV_INCOMING_PASS` | Mock Email | - | Incoming SMTP credentials. |
| `MAILDEV_INCOMING_USER` | Mock Email | (secret) | Incoming SMTP credentials. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Start command:** `/bin/sh -c "rm /etc/nginx/sites-enabled/default && /sbin/boot"`
- **Healthcheck:** `/srv/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/shared`
- **Healthcheck:** `/api/healthz`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/discourse)
