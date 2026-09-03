# Deploy Leantime on Railway

Project management for goals, tasks, time and docs in one place

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/leantime-pm)

## About

Leantime is an open-source project management system for the people who end up running projects without ever having trained as project managers — founders, designers, small agencies and internal teams. It keeps strategy, planning and execution in one place: goals and a business model canvas on one side, kanban boards, milestones, timesheets and a wiki on the other. Its interface is designed with ADHD, dyslexia and autism in mind, which in practice means a personal "My Work" view that hides everything you are not doing today. It is AGPL-3.0 licensed and published as `leantime/leantime` on Docker Hub.

Self-host Leantime on Railway and this template wires up everything it expects in production. The **leantime** service runs the app, its nginx front end and its scheduler. **MySQL** stores every project, task, timesheet and wiki page. **Redis** holds the cache and, in a separate database, sessions, so a redeploy never signs anyone out. An object storage bucket takes every upload, served back through signed URLs. **mailpit** captures the invitations Leantime sends, so you can add teammates without owning an SMTP relay. The app installs itself on first boot, so no setup wizard is ever exposed.

![Diagram of the Leantime, MySQL, Redis and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788394882/leantime-architecture.png)

Leantime sits between the "one board and nothing else" tools and the enterprise suites: as approachable as Trello, but carrying most of what teams eventually need from Jira, and a credible replacement for ClickUp, Monday or Asana when you would rather own the data.

Key features:

- Kanban, table, list, calendar and Gantt views over the same tasks, with subtasks and dependencies
- Milestones, sprints, goals with metric tracking, and project status reports
- Time tracking and timesheets tied directly to tasks
- Wiki, idea boards, retrospectives, and lean/business model, SWOT and risk canvases
- Comments and attachments on everything, plus screen and webcam recording
- Roles and per-project permissions, two-factor authentication, LDAP and OpenID Connect

The **leantime** container bundles nginx, PHP-FPM and a supervised scheduler, so recurring background work needs no second service. **MySQL** is the only durable store, and the app connects with a least-privilege account scoped to its own database rather than the superuser. **Redis** carries the cache and sessions in separate logical databases, which keeps a cache flush from logging everyone out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| leantime | [gridalpha/leantime-railway](https://github.com/gridalpha/leantime-railway) | Web service |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias for the superuser, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Superuser password, read by the entrypoint |
| `TZ` | mailpit | UTC | Timestamps in the inbox |
| `PORT` | mailpit | 8025 | Inbox web UI port |
| `SMTP_HOST` | mailpit | mailpit.railway.internal | Private SMTP hostname for Leantime |
| `SMTP_PORT` | mailpit | 1025 | Private SMTP port for Leantime |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Web UI listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listener, dual-stack for private callers |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Recipient cap per message |
| `PORT` | leantime | 8080 | Port Railway health-checks and the domain targets |
| `LEAN_DEBUG` | leantime | 0 | Debug flag, keep off in production |
| `LEAN_S3_KEY` | leantime | - | Bucket access key |
| `LEAN_USE_S3` | leantime | true | Store uploads in object storage |
| `LEAN_APP_URL` | leantime | - | Public base URL for links and email |
| `LEAN_DB_HOST` | leantime | - | Private MySQL hostname |
| `LEAN_DB_PORT` | leantime | - | MySQL port |
| `LEAN_DB_USER` | leantime | (secret) | Least-privilege application role |
| `LEAN_LANGUAGE` | leantime | en-US | Default interface language |
| `LEAN_REDIS_DB` | leantime | 0 | Redis database for the cache |
| `LEAN_SITENAME` | leantime | Leantime | Instance name shown in the UI |
| `LEAN_S3_BUCKET` | leantime | - | Bucket name |
| `LEAN_S3_REGION` | leantime | - | Bucket region |
| `LEAN_S3_SECRET` | leantime | (secret) | Bucket secret key |
| `LEAN_USE_REDIS` | leantime | true | Use Redis for cache and sessions |
| `LEAN_REDIS_HOST` | leantime | - | Private Redis hostname |
| `LEAN_REDIS_PORT` | leantime | - | Redis port |
| `LEAN_DB_DATABASE` | leantime | leantime | Application database name |
| `LEAN_DB_PASSWORD` | leantime | (secret) | Password for that role |
| `LEAN_EMAIL_RETURN` | leantime | - | From address on outgoing mail |
| `LEAN_LOG_CHANNELS` | leantime | stderr | Send app logs to the container log |
| `LEAN_REDIS_SCHEME` | leantime | tcp | Plaintext private network, not TLS |
| `LEAN_S3_END_POINT` | leantime | - | S3-compatible endpoint URL |
| `LEAN_EMAIL_USE_SMTP` | leantime | true | Send mail over SMTP rather than PHP mail() |
| `LEAN_REDIS_PASSWORD` | leantime | (secret) | Redis auth password |
| `LEAN_SESSION_SECURE` | leantime | true | Mark the session cookie Secure |
| `LEANTIME_ADMIN_EMAIL` | leantime | admin@example.com | First admin, created on first boot |
| `LEAN_EMAIL_SMTP_AUTH` | leantime | false | No auth on the bundled inbox |
| `LEAN_EMAIL_SMTP_PORT` | leantime | - | SMTP port |
| `LEAN_TRUSTED_PROXIES` | leantime | 0.0.0.0/0,::/0 | Trust Railway's edge, resolve real client IP |
| `LEANTIME_COMPANY_NAME` | leantime | Leantime | Company name recorded at install |
| `LEAN_DEFAULT_TIMEZONE` | leantime | UTC | Default timezone for new users |
| `LEAN_EMAIL_SMTP_HOSTS` | leantime | - | SMTP host |
| `LEAN_REDIS_SESSION_DB` | leantime | 1 | Separate Redis database for sessions |
| `LEAN_SESSION_PASSWORD` | leantime | (secret) | Session signing key, must stay stable |
| `LEANTIME_DB_ADMIN_HOST` | leantime | - | Superuser host, role provisioning only |
| `LEANTIME_DB_ADMIN_PORT` | leantime | - | Superuser port, role provisioning only |
| `LEANTIME_DB_ADMIN_USER` | leantime | (secret) | Superuser name, role provisioning only |
| `LEANTIME_ADMIN_PASSWORD` | leantime | (secret) | First admin password, change after login |
| `LEAN_SESSION_EXPIRATION` | leantime | 480 | Idle session timeout in minutes |
| `LEANTIME_ADMIN_LAST_NAME` | leantime | User | First admin's last name |
| `LEAN_EMAIL_SMTP_AUTO_TLS` | leantime | false | The bundled inbox advertises no STARTTLS |
| `LEANTIME_ADMIN_FIRST_NAME` | leantime | Admin | First admin's first name |
| `LEANTIME_DB_ADMIN_PASSWORD` | leantime | (secret) | Superuser password, provisioning only |
| `LEAN_S3_USE_PATH_STYLE_ENDPOINT` | leantime | true | Path-style addressing, required here |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Volume:** `/railway`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile, Vim Snippet

[View on Railway →](https://railway.com/deploy/leantime-pm)
