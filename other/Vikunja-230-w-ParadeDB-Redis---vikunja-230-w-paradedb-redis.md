# Deploy Vikunja 2.3.0 (w/ ParadeDB, Redis) on Railway

Solid task manager with mobile app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vikunja-230-w-paradedb-redis)

## About

Vikunja is an open source, self-hosted task management application for individuals and teams with lists, Kanban and Gantt + mobile app for Android & iOS.

The template provisions Vikunja with a PostgreSQL database for persistent data with ParadeDB extension for full-text search, persistent storage for file uploads and a Redis for caching and background task queuing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vikunja | `vikunja/vikunja:2.3.0` | Web service |
| Redis | `redis:8.2.1` | Database |
| ParadeDB | `paradedb/paradedb:0.23.0-pg17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Vikunja | 3456 | Port |
| `VIKUNJA_REDIS_DB` | Vikunja | 0 | 0 means default database |
| `VIKUNJA_REDIS_HOST` | Vikunja | - | The host of the redis server including its port. |
| `VIKUNJA_MAILER_HOST` | Vikunja | - | SMTP Host |
| `VIKUNJA_MAILER_PORT` | Vikunja | 587 | SMTP Host port. NOTE: If you're unable to send mail and the only error you see in the logs is an EOF, try setting the port to 25. |
| `VIKUNJA_SERVICE_MOTD` | Vikunja | Hello | Set the motd message, available from the /info endpoint |
| `VIKUNJA_DATABASE_HOST` | Vikunja | - | Database and Port |
| `VIKUNJA_DATABASE_TYPE` | Vikunja | postgres | Database type |
| `VIKUNJA_DATABASE_USER` | Vikunja | (secret) | Database user |
| `VIKUNJA_REDIS_ENABLED` | Vikunja | true | Whether to enable redis or not |
| `VIKUNJA_MAILER_ENABLED` | Vikunja | false | Whether to enable the mailer or not. If it is disabled, all users are enabled right away and password reset is not possible. |
| `VIKUNJA_REDIS_PASSWORD` | Vikunja | (secret) | The password used to authenticate against the redis server |
| `VIKUNJA_SERVICE_SECRET` | Vikunja | (secret) | 32-character secret |
| `VIKUNJA_MAILER_AUTHTYPE` | Vikunja | plain | SMTP Auth Type. Can be either plain, login or cram-md5. |
| `VIKUNJA_MAILER_FORCESSL` | Vikunja | false | By default, Vikunja will try to connect with starttls, use this option to force it to use ssl. |
| `VIKUNJA_MAILER_PASSWORD` | Vikunja | (secret) | SMTP password |
| `VIKUNJA_MAILER_USERNAME` | Vikunja | (secret) | SMTP username |
| `VIKUNJA_MAILER_FROMEMAIL` | Vikunja | - | The default from address when sending emails |
| `VIKUNJA_SERVICE_TIMEZONE` | Vikunja | GMT | The time zone all timestamps are in.  Time zones have to use offical tz database name. |
| `VIKUNJA_DATABASE_DATABASE` | Vikunja | - | Database name |
| `VIKUNJA_DATABASE_PASSWORD` | Vikunja | (secret) | Database user password |
| `VIKUNJA_SERVICE_INTERFACE` | Vikunja | :3456 | Port on which to run the webserver |
| `VIKUNJA_SERVICE_PUBLICURL` | Vikunja | - | Railway Public Domain |
| `VIKUNJA_SERVICE_ENABLETOTP` | Vikunja | true | Whether Time-based one-time password (TOTP) is enabled. |
| `VIKUNJA_MAILER_SKIPTLSVERIFY` | Vikunja | false | Whether to skip verification of the tls certificate on the server |
| `VIKUNJA_SERVICE_ENABLECALDAV` | Vikunja | true | Enable the caldav endpoint |
| `VIKUNJA_SERVICE_CUSTOMLOGOURL` | Vikunja | https://s3-eu-west-1.amazonaws.com/tpd/logos/4ab0af560000640005005a5a/0x0.png | Allow using a custom logo via external URL. |
| `VIKUNJA_SERVICE_MAXITEMSPERPAGE` | Vikunja | 50 | The max number of items which can be returned per page |
| `VIKUNJA_SERVICE_CUSTOMLOGOURLDARK` | Vikunja | https://s3-eu-west-1.amazonaws.com/tpd/logos/4ab0af560000640005005a5a/0x0.png | Allow using a custom logo for dark mode via external URL. If not set, the regular logo will be used for both light and dark modes. |
| `VIKUNJA_SERVICE_ENABLELINKSHARING` | Vikunja | true | Enable sharing of project via a link |
| `VIKUNJA_SERVICE_ENABLEPUBLICTEAMS` | Vikunja | false | Enables the public team feature. If enabled, it is possible to configure teams to be public, which makes them discoverable when sharing a project, therefore not only showing teams the user is member of. |
| `VIKUNJA_SERVICE_ENABLEREGISTRATION` | Vikunja | true | Whether to let new users registering themselves or not |
| `VIKUNJA_SERVICE_ENABLETASKCOMMENTS` | Vikunja | true | Whether task comments should be enabled or not |
| `VIKUNJA_SERVICE_ENABLEUSERDELETION` | Vikunja | true | If true, will allow users to request the complete deletion of their account. |
| `VIKUNJA_SERVICE_ENABLEEMAILREMINDERS` | Vikunja | true | If enabled, Vikunja will send an email to everyone who is either assigned to a task or created it when a task reminder is due. |
| `VIKUNJA_SERVICE_ENABLETASKATTACHMENTS` | Vikunja | true | Whether to enable task attachments or not |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | ParadeDB | railway | Default database created when image is started. |
| `DATABASE_URL` | ParadeDB | - | URL to connect to Postgres database |
| `POSTGRES_USER` | ParadeDB | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | ParadeDB | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/vikunja/files`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/vikunja-230-w-paradedb-redis)
