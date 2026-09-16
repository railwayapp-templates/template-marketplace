# Deploy CTFd on Railway

Capture-the-flag platform for running security competitions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ctfd)

## About

CTFd is the capture-the-flag framework most security competitions are built on. It gives you a challenge board grouped by category, static and regex flag checking, purchasable hints, file attachments, a live scoreboard, user or team modes, and an admin panel for writing challenges and freezing the board before the finish. University clubs, corporate red teams and conference villages all run it. Self-host CTFd when the event data — flags, submissions, accounts — should stay on infrastructure you control.

Deploy CTFd on Railway and this template wires up the production shape: a **ctfd** web service running gunicorn behind Railway's TLS edge, a managed **MySQL** database for challenges, users and submissions, a managed **Redis** instance serving as both cache and session store, and a **ctfd-uploads** bucket for attachments. Players hit the public domain, CTFd reads and writes MySQL over the private network, sessions live in Redis so the web tier keeps no local state, and every file attached to a challenge is written to the bucket and handed back through a signed, time-limited link.

![Diagram of the CTFd, MySQL and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789282599/ctfd-architecture.webp)

CTFd is a Flask application that turns a set of puzzles into a scored competition. Organisers write challenges in the admin panel; players register, submit flags and climb a board everyone can watch. The event data — flags, solve times, the participant list — is sensitive until the competition ends, which is why self-hosting is the norm.

Key features:

- Standard and dynamic-scoring challenges, whose value decays as more teams solve them
- Static, case-insensitive and regex flags, with per-challenge attempt limits
- Point-costed hints, and attachments served through expiring links
- Users or teams mode, a freeze time that hides late solves, and brackets for separate fields
- A REST API, plugin and theme APIs, and full event export and import

The architecture splits across four pieces. **ctfd** runs gunicorn with gevent workers, so long-polling notifications do not block requests. **MySQL** is the system of record. **Redis** is both cache and session store, which keeps the web tier stateless and notifications consistent across workers. **ctfd-uploads** holds every challenge file, keeping large attachments off the container. Registration visibility, a registration code and challenge visibility are all set in **Config → Visibility**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ctfd | [gridalpha/ctfd-railway](https://github.com/gridalpha/ctfd-railway) | Web service |
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ctfd | 8000 | Port Railway health-checks; gunicorn binds 8000 |
| `WORKERS` | ctfd | 4 | gunicorn worker processes |
| `CTF_NAME` | ctfd | CTFd | Event name, seeded on first boot |
| `ERROR_LOG` | ctfd | - | gunicorn error log to stdout |
| `REDIS_URL` | ctfd | - | Cache and session store connection |
| `ACCESS_LOG` | ctfd | - | gunicorn access log to stdout |
| `LOG_FOLDER` | ctfd | /var/log/CTFd | Submission and login log directory |
| `SECRET_KEY` | ctfd | (secret) | Signs session cookies, must stay stable |
| `UPDATE_CHECK` | ctfd | false | Do not phone home for version checks |
| `WORKER_CLASS` | ctfd | gevent | gunicorn worker class |
| `AWS_S3_BUCKET` | ctfd | - | Attachment bucket name |
| `AWS_S3_REGION` | ctfd | - | Bucket region |
| `CTF_USER_MODE` | ctfd | users | users or teams, first boot only |
| `DATABASE_HOST` | ctfd | - | Private MySQL hostname |
| `DATABASE_NAME` | ctfd | - | MySQL database name |
| `DATABASE_PORT` | ctfd | - | MySQL port |
| `DATABASE_USER` | ctfd | (secret) | MySQL username |
| `REVERSE_PROXY` | ctfd | 2,1,1,1,0 | ProxyFix hops: real client IP behind the edge |
| `CTF_DESCRIPTION` | ctfd | A capture the flag event. | Event description, first boot |
| `UPLOAD_PROVIDER` | ctfd | s3 | Store challenge files in object storage |
| `AWS_ACCESS_KEY_ID` | ctfd | - | Bucket access key |
| `DATABASE_PASSWORD` | ctfd | (secret) | MySQL password |
| `DATABASE_PROTOCOL` | ctfd | mysql+pymysql | SQLAlchemy driver for MySQL |
| `PRESET_ADMIN_NAME` | ctfd | admin | Administrator display name |
| `PRESET_ADMIN_EMAIL` | ctfd | admin@example.com | Administrator email, change this |
| `AWS_S3_ENDPOINT_URL` | ctfd | - | S3-compatible endpoint |
| `AWS_SECRET_ACCESS_KEY` | ctfd | (secret) | Bucket secret key |
| `PRESET_ADMIN_PASSWORD` | ctfd | (secret) | Administrator password |
| `AWS_S3_ADDRESSING_STYLE` | ctfd | path | Path-style addressing, required for browsers |
| `EXTRA_CONFIGS_FORCE_TYPES` | ctfd | PRESET_ADMIN_PASSWORD=str,PRESET_ADMIN_NAME=str | Keep credentials as strings |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the server |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/ctfd)
