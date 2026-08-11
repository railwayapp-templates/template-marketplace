# Deploy Plane | Open Source Jira and Linear Alternative on Railway

Self-hosted Jira alternative: full production split, ~1.1 GB RAM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/plane-project-management)

## About

Plane is an open-source project management tool — work items, cycles, modules, sub-projects and public roadmaps — and a self-hosted alternative to Jira and Linear. This template deploys the full production split that upstream recommends: eight application services, PostgreSQL, Valkey, RabbitMQ and managed object storage, wired to each other and reachable on one domain.

Eleven services and a bucket, all from official upstream images, pinned to `v1.4.1`:

- **Proxy** — Caddy, the only service with a domain. Plane is six HTTP apps sharing one origin by path, and Railway routes by service, so this is what puts them back together.
- **Web** — the app itself. **Space** — public project boards. **Admin** — the instance console at `/god-mode`.
- **Live** — collaborative page editing over WebSocket.
- **Api** — Django and the REST API. Also runs the migration on boot, which is the job upstream gives to a one-shot `migrator` container that Railway has no equivalent for.
- **Worker** and **Beat** — Celery. Notifications, webhooks, exports, and the daily cleanups.
- **Postgres** — work items, projects, members and history, on a volume.
- **Valkey** — cache, sessions and the live server's fan-out. Deliberately without a volume: nothing here is authoritative.
- **RabbitMQ** — Celery's broker. Also without a volume; the queue is not a record of anything.
- **Bucket** — Railway object storage for attachments, avatars and exports.

Every one of the 139 variables is filled in and described on the deploy screen. **There is nothing you have to supply** — open the URL, create your admin account, and the workspace is ready.

Four things this template does that are worth knowing about:

**Uploads go to managed object storage, not to a MinIO container.** Every other Plane template in this marketplace runs MinIO on a volume — a single-container object store holding all your attachments, that nobody backs up. Here they go to a Railway bucket. Getting that right took one measurement worth repeating: Railway's storage answers both S3 URL shapes, but only the `host/bucket/key` form sends CORS headers, so with the other one the browser silently refuses every upload and every image while `curl` reports 200. boto3 takes that choice from a config file rather than the environment, and this template writes it at boot.

**The admin console does not send you to a dead port.** Plane's `web` and `admin` images are static builds behind nginx, and nginx answers `/god-mode` with `Location: http://your-host:3000/god-mode/` — a container-internal port that the browser then tries to open and hangs on. That is upstream issue #8814, open since March with two unmerged fixes. Both of them are four lines of nginx config, applied here at boot: the redirect comes back relative.

**The background worker actually runs.** RabbitMQ 4 refuses transient non-exclusive queues, and Celery's remote-control mailbox is exactly one of those — on a stock RabbitMQ 4 the worker cannot declare its queue and never executes a single job, while every service still reports healthy. Upstream and both competing templates avoid this by shipping RabbitMQ 3.13, which reached end of life in 2025. This template uses a supported broker and its own documented transition switch instead. Verified by creating a work item and watching the activity row the worker wrote for it.

**The services can find each other.** Every image here is Alpine, the private network is IPv6, and the frontend images listen on IPv4 only out of the box. Both halves of that are fixed in the template rather than discovered later, which is why the proxy reaches all five upstreams on the first deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Space | `makeplane/plane-space:v1.4.1` | Worker |
| Worker | `makeplane/plane-backend:v1.4.1` | Worker |
| Postgres | `postgres:18.4-alpine` | Database |
| Web | `makeplane/plane-frontend:v1.4.1` | Worker |
| RabbitMQ | `rabbitmq:4.3.4-alpine` | Database |
| Proxy | `caddy:2.11.4-alpine` | Web service |
| Beat | `makeplane/plane-backend:v1.4.1` | Worker |
| Live | `makeplane/plane-live:v1.4.1` | Worker |
| Admin | `makeplane/plane-admin:v1.4.1` | Worker |
| Api | `makeplane/plane-backend:v1.4.1` | Worker |
| Valkey | `valkey/valkey:9.1.1-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | Space | :: | Listen address. IPv6 wildcard stays dual-stack under Node, so the proxy reaches it over the private network and the health check still works. |
| `PORT` | Space | 3000 | Port Railway routes traffic and health checks to. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Space | true | Railway's switch that makes *.railway.internal resolve inside Alpine-based images. Every image in this template is Alpine, and without it the services cannot find each other. |
| `PORT` | Worker | 8000 | Not served — this container runs Celery, not a web server. Kept so the worker reads the same configuration as the API. |
| `DEBUG` | Worker | 0 | Django debug mode. Leave at 0 — turning it on serves tracebacks and settings to anyone who can reach the API. |
| `WEB_URL` | Worker | - | Public address of this deployment. Used in invitation and notification emails and in links the API generates. |
| `AMQP_URL` | Worker | - | RabbitMQ connection string. This is Celery's broker: every background job passes through it. |
| `REDIS_URL` | Worker | - | Valkey connection string — cache, sessions and the live server's bus. |
| `USE_MINIO` | Worker | 0 | Upstream's flag for running MinIO next door and signing upload URLs against this app's own host. This template uses Railway object storage instead, so the browser talks to the bucket directly — set it to 1 and every upload URL points at a service that does not exist here. |
| `APP_DOMAIN` | Worker | - | Host part of the public address. |
| `AWS_REGION` | Worker | - | Bucket region. |
| `SECRET_KEY` | Worker | (secret) | Must be the same value the API uses — this is the same Django project. |
| `DATABASE_URL` | Worker | - | Postgres connection string, wired to the database in this project. |
| `DB_WAIT_HOST` | Worker | - | Read by the start command, which waits for Postgres before running migrations. Railway starts services in parallel, so on a cold deploy the database is usually not up yet. |
| `DB_WAIT_PORT` | Worker | 5432 | Port the start command waits on before starting Django. |
| `MQ_WAIT_HOST` | Worker | - | Read by the start command, which waits for RabbitMQ before booting. |
| `MQ_WAIT_PORT` | Worker | 5672 | Port the start command waits on for RabbitMQ. |
| `ENABLE_SIGNUP` | Worker | 1 | Whether anyone who reaches the URL can register. Read once, on the very first boot, and stored in the database — after that it is changed in the admin UI at /god-mode, not here. Turn it off there once your team has joined. |
| `AWS_CONFIG_FILE` | Worker | /code/aws-config | Where the start command writes the two-line boto3 config below. boto3 takes the addressing style from a file, not from the environment. |
| `FILE_SIZE_LIMIT` | Worker | 5242880 | Largest upload accepted, in bytes (5 MB). The proxy enforces the same number, so raise both together. |
| `REDIS_WAIT_HOST` | Worker | - | Read by the start command, which waits for Valkey before booting. |
| `REDIS_WAIT_PORT` | Worker | 6379 | Port the start command waits on for Valkey. |
| `GUNICORN_WORKERS` | Worker | 1 | Unused here; the worker runs Celery. Kept for configuration parity. |
| `AWS_ACCESS_KEY_ID` | Worker | - | Bucket access key. |
| `MACHINE_SIGNATURE` | Worker | - | Shared with the API. |
| `API_KEY_RATE_LIMIT` | Worker | (secret) | Per-key limit on the public REST API. |
| `AWS_S3_BUCKET_NAME` | Worker | - | Bucket holding uploads. |
| `CELERY_CONCURRENCY` | Worker | 2 | Background job workers. Celery's own default is one per CPU the container can see, which on a shared host is a lot of idle processes. |
| `AWS_S3_ENDPOINT_URL` | Worker | - | Object storage endpoint. Attachments, avatars and exports live here. |
| `CORS_ALLOWED_ORIGINS` | Worker | - | Browser origins allowed to call the API, and also the CSRF trusted origins. Leaving it empty does not fail loudly — it switches CORS to allow-all instead. |
| `AWS_SECRET_ACCESS_KEY` | Worker | (secret) | Bucket secret key. |
| `ENABLE_EMAIL_PASSWORD` | Worker | (secret) | Email and password sign-in. Also first-boot only; the admin UI owns it afterwards. |
| `SIGNED_URL_EXPIRATION` | Worker | 3600 | How long an upload or download link stays valid, in seconds. |
| `LIVE_SERVER_SECRET_KEY` | Worker | (secret) | Shared with the API and the live server. |
| `AWS_S3_ADDRESSING_STYLE` | Worker | path | Whether signed URLs are host/bucket/key or bucket.host/key. Railway's storage answers both, but only the path form sends CORS headers — with the other one the browser refuses every upload and every image while curl reports 200. |
| `ENABLE_MAGIC_LINK_LOGIN` | Worker | (secret) | Magic-link sign-in. Off because it needs working SMTP, which is configured in the admin UI at /god-mode. |
| `AUTHENTICATION_RATE_LIMIT` | Worker | 10/minute | Per-IP limit on sign-in and sign-up, which is what makes password guessing expensive. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Railway's switch that makes *.railway.internal resolve inside Alpine-based images. Every image in this template is Alpine, and without it the services cannot find each other. |
| `PORT` | Postgres | 5432 | Port Postgres listens on inside the private network. |
| `POSTGRES_DB` | Postgres | plane | Database name. It is baked into the API's connection string — renaming it here alone breaks every service. |
| `POSTGRES_USER` | Postgres | (secret) | Database user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once for this deployment. Letters and digits only, because it is embedded in a connection URL. |
| `PORT` | Web | 3000 | Port Railway routes traffic and health checks to. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Web | true | Railway's switch that makes *.railway.internal resolve inside Alpine-based images. Every image in this template is Alpine, and without it the services cannot find each other. |
| `PORT` | RabbitMQ | 5672 | Port RabbitMQ listens on inside the private network. |
| `RABBITMQ_NODENAME` | RabbitMQ | rabbit@localhost | Pinned. The default is rabbit@$HOSTNAME and Railway hands out a new hostname on every deploy, so the broker would log a fresh node identity each boot. |
| `RABBITMQ_EXTRA_CONF` | RabbitMQ | deprecated_features.permit.transient_nonexcl_queues = true | Written into the broker's conf.d at boot. RabbitMQ 4 refuses transient non-exclusive queues by default and Celery's remote-control mailbox is exactly one of those, so without this the worker cannot declare its queue and never runs a single job. |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Generated once for this deployment. |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | Broker user. It is baked into the API's AMQP URL. |
| `RABBITMQ_DEFAULT_VHOST` | RabbitMQ | plane | Broker virtual host, also baked into the AMQP URL. |
| `PORT` | Proxy | 8080 | Port Railway routes traffic and health checks to. |
| `CADDYFILE` | Proxy | {
	admin off
	auto_https off
	servers {
		max_header_size 25MB
		client_ip_headers X-Forwarded-For X-Real-IP
		trusted_proxies static 0.0.0.0/0 ::/0
	}
}

:{$PORT} {
	request_body {
		max_size {$FILE_SIZE_LIMIT}
	}

	handle /healthz {
		respond "ok" 200
	}

	redir /spaces /spaces/ permanent
	redir /god-mode /god-mode/ permanent

	handle /spaces/* {
		reverse_proxy {$SPACE_UPSTREAM}
	}
	handle /god-mode/* {
		reverse_proxy {$ADMIN_UPSTREAM}
	}
	handle /live/* {
		reverse_proxy {$LIVE_UPSTREAM}
	}
	handle /api/* {
		reverse_proxy {$API_UPSTREAM}
	}
	handle /auth/* {
		reverse_proxy {$API_UPSTREAM}
	}
	handle /static/* {
		reverse_proxy {$API_UPSTREAM}
	}
	handle {
		reverse_proxy {$WEB_UPSTREAM}
	}
}
 | The whole routing table. Plane is six HTTP apps sharing one origin by path and Railway routes by service, so this file is what puts them back together: /god-mode to the admin app, /spaces to public boards, /live to collaborative editing, /api and /auth to the backend, everything else to the web app. |
| `API_UPSTREAM` | Proxy | - | Private address of the API. |
| `WEB_UPSTREAM` | Proxy | - | Private address of the web app. |
| `LIVE_UPSTREAM` | Proxy | - | Private address of the collaborative editing server. |
| `ADMIN_UPSTREAM` | Proxy | - | Private address of the admin app. |
| `SPACE_UPSTREAM` | Proxy | - | Private address of the public-boards app. |
| `FILE_SIZE_LIMIT` | Proxy | 5242880 | Largest request body the proxy accepts, in bytes. Keep it equal to the API's FILE_SIZE_LIMIT or uploads fail at whichever limit is lower. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Proxy | true | Railway's switch that makes *.railway.internal resolve inside Alpine-based images. Every image in this template is Alpine, and without it the services cannot find each other. |
| `PORT` | Beat | 8000 | Not served — this container runs the Celery scheduler. Kept so it reads the same configuration as the API. |
| `DEBUG` | Beat | 0 | Django debug mode. Leave at 0 — turning it on serves tracebacks and settings to anyone who can reach the API. |
| `WEB_URL` | Beat | - | Public address of this deployment. Used in invitation and notification emails and in links the API generates. |
| `AMQP_URL` | Beat | - | RabbitMQ connection string. This is Celery's broker: every background job passes through it. |
| `REDIS_URL` | Beat | - | Valkey connection string — cache, sessions and the live server's bus. |
| `USE_MINIO` | Beat | 0 | Upstream's flag for running MinIO next door and signing upload URLs against this app's own host. This template uses Railway object storage instead, so the browser talks to the bucket directly — set it to 1 and every upload URL points at a service that does not exist here. |
| `APP_DOMAIN` | Beat | - | Host part of the public address. |
| `AWS_REGION` | Beat | - | Bucket region. |
| `SECRET_KEY` | Beat | (secret) | Must be the same value the API uses — this is the same Django project. |
| `DATABASE_URL` | Beat | - | Postgres connection string, wired to the database in this project. |
| `DB_WAIT_HOST` | Beat | - | Read by the start command, which waits for Postgres before running migrations. Railway starts services in parallel, so on a cold deploy the database is usually not up yet. |
| `DB_WAIT_PORT` | Beat | 5432 | Port the start command waits on before starting Django. |
| `MQ_WAIT_HOST` | Beat | - | Read by the start command, which waits for RabbitMQ before booting. |
| `MQ_WAIT_PORT` | Beat | 5672 | Port the start command waits on for RabbitMQ. |
| `ENABLE_SIGNUP` | Beat | 1 | Whether anyone who reaches the URL can register. Read once, on the very first boot, and stored in the database — after that it is changed in the admin UI at /god-mode, not here. Turn it off there once your team has joined. |
| `AWS_CONFIG_FILE` | Beat | /code/aws-config | Where the start command writes the two-line boto3 config below. boto3 takes the addressing style from a file, not from the environment. |
| `FILE_SIZE_LIMIT` | Beat | 5242880 | Largest upload accepted, in bytes (5 MB). The proxy enforces the same number, so raise both together. |
| `REDIS_WAIT_HOST` | Beat | - | Read by the start command, which waits for Valkey before booting. |
| `REDIS_WAIT_PORT` | Beat | 6379 | Port the start command waits on for Valkey. |
| `GUNICORN_WORKERS` | Beat | 1 | Unused here; this container runs the Celery scheduler. |
| `AWS_ACCESS_KEY_ID` | Beat | - | Bucket access key. |
| `MACHINE_SIGNATURE` | Beat | - | Shared with the API. |
| `API_KEY_RATE_LIMIT` | Beat | (secret) | Per-key limit on the public REST API. |
| `AWS_S3_BUCKET_NAME` | Beat | - | Bucket holding uploads. |
| `CELERY_CONCURRENCY` | Beat | 2 | Unused here; the scheduler queues work rather than running it. |
| `AWS_S3_ENDPOINT_URL` | Beat | - | Object storage endpoint. Attachments, avatars and exports live here. |
| `CORS_ALLOWED_ORIGINS` | Beat | - | Browser origins allowed to call the API, and also the CSRF trusted origins. Leaving it empty does not fail loudly — it switches CORS to allow-all instead. |
| `AWS_SECRET_ACCESS_KEY` | Beat | (secret) | Bucket secret key. |
| `ENABLE_EMAIL_PASSWORD` | Beat | (secret) | Email and password sign-in. Also first-boot only; the admin UI owns it afterwards. |
| `SIGNED_URL_EXPIRATION` | Beat | 3600 | How long an upload or download link stays valid, in seconds. |
| `LIVE_SERVER_SECRET_KEY` | Beat | (secret) | Shared with the API and the live server. |
| `AWS_S3_ADDRESSING_STYLE` | Beat | path | Whether signed URLs are host/bucket/key or bucket.host/key. Railway's storage answers both, but only the path form sends CORS headers — with the other one the browser refuses every upload and every image while curl reports 200. |
| `ENABLE_MAGIC_LINK_LOGIN` | Beat | (secret) | Magic-link sign-in. Off because it needs working SMTP, which is configured in the admin UI at /god-mode. |
| `AUTHENTICATION_RATE_LIMIT` | Beat | 10/minute | Per-IP limit on sign-in and sign-up, which is what makes password guessing expensive. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Beat | true | Railway's switch that makes *.railway.internal resolve inside Alpine-based images. Every image in this template is Alpine, and without it the services cannot find each other. |
| `PORT` | Live | 3000 | Port Railway routes traffic and health checks to. |
| `REDIS_URL` | Live | - | Valkey connection, used to fan document updates out between connections. |
| `API_BASE_URL` | Live | - | Private address of the API, which this server calls to authorise each editing session. |
| `LIVE_BASE_PATH` | Live | /live | Path this server is mounted on. The proxy routes /live/* here and the health check lives at /live/health, so changing it means changing both. |
| `CORS_ALLOWED_ORIGINS` | Live | - | Browser origins allowed to open an editing session. This server defaults it to the empty string and then reads that as a one-entry allowlist containing "" — which refuses every browser. |
| `LIVE_SERVER_SECRET_KEY` | Live | (secret) | Shared secret with the API. If the two differ, opening a page for editing fails to authenticate. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Live | true | Railway's switch that makes *.railway.internal resolve inside Alpine-based images. Every image in this template is Alpine, and without it the services cannot find each other. |
| `PORT` | Admin | 3000 | Port Railway routes traffic and health checks to. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Admin | true | Railway's switch that makes *.railway.internal resolve inside Alpine-based images. Every image in this template is Alpine, and without it the services cannot find each other. |
| `PORT` | Api | 8000 | Port Railway routes traffic and health checks to. Gunicorn binds [::] on this port, which is dual-stack, so both the health check and the private network are answered. |
| `DEBUG` | Api | 0 | Django debug mode. Leave at 0 — turning it on serves tracebacks and settings to anyone who can reach the API. |
| `WEB_URL` | Api | - | Public address of this deployment. Used in invitation and notification emails and in links the API generates. |
| `AMQP_URL` | Api | - | RabbitMQ connection string. This is Celery's broker: every background job passes through it. |
| `REDIS_URL` | Api | - | Valkey connection string — cache, sessions and the live server's bus. |
| `USE_MINIO` | Api | 0 | Upstream's flag for running MinIO next door and signing upload URLs against this app's own host. This template uses Railway object storage instead, so the browser talks to the bucket directly — set it to 1 and every upload URL points at a service that does not exist here. |
| `APP_DOMAIN` | Api | - | Host part of the public address. |
| `AWS_REGION` | Api | - | Bucket region. |
| `SECRET_KEY` | Api | (secret) | Django's signing key: sessions, password reset links and the encrypted instance configuration. Changing it logs everyone out and makes the stored admin configuration unreadable. Generated once for this deployment. |
| `DATABASE_URL` | Api | - | Postgres connection string, wired to the database in this project. |
| `DB_WAIT_HOST` | Api | - | Read by the start command, which waits for Postgres before running migrations. Railway starts services in parallel, so on a cold deploy the database is usually not up yet. |
| `DB_WAIT_PORT` | Api | 5432 | Port the start command waits on before starting Django. |
| `MQ_WAIT_HOST` | Api | - | Read by the start command, which waits for RabbitMQ before booting. |
| `MQ_WAIT_PORT` | Api | 5672 | Port the start command waits on for RabbitMQ. |
| `ENABLE_SIGNUP` | Api | 1 | Whether anyone who reaches the URL can register. Read once, on the very first boot, and stored in the database — after that it is changed in the admin UI at /god-mode, not here. Turn it off there once your team has joined. |
| `AWS_CONFIG_FILE` | Api | /code/aws-config | Where the start command writes the two-line boto3 config below. boto3 takes the addressing style from a file, not from the environment. |
| `FILE_SIZE_LIMIT` | Api | 5242880 | Largest upload accepted, in bytes (5 MB). The proxy enforces the same number, so raise both together. |
| `REDIS_WAIT_HOST` | Api | - | Read by the start command, which waits for Valkey before booting. |
| `REDIS_WAIT_PORT` | Api | 6379 | Port the start command waits on for Valkey. |
| `GUNICORN_WORKERS` | Api | 1 | API worker processes. Two or three suit a busy team; each one costs roughly 150 MB. |
| `AWS_ACCESS_KEY_ID` | Api | - | Bucket access key. |
| `MACHINE_SIGNATURE` | Api | - | Identifies this installation on first boot. Upstream derives it from the container's hostname, CPU and disk, which on Railway is a new value on every deploy; this is a stable one. |
| `API_KEY_RATE_LIMIT` | Api | (secret) | Per-key limit on the public REST API. |
| `AWS_S3_BUCKET_NAME` | Api | - | Bucket holding uploads. |
| `CELERY_CONCURRENCY` | Api | 2 | Background job workers. Celery's own default is one per CPU the container can see, which on a shared host is a lot of idle processes. |
| `AWS_S3_ENDPOINT_URL` | Api | - | Object storage endpoint. Attachments, avatars and exports live here. |
| `CORS_ALLOWED_ORIGINS` | Api | - | Browser origins allowed to call the API, and also the CSRF trusted origins. Leaving it empty does not fail loudly — it switches CORS to allow-all instead. |
| `AWS_SECRET_ACCESS_KEY` | Api | (secret) | Bucket secret key. |
| `ENABLE_EMAIL_PASSWORD` | Api | (secret) | Email and password sign-in. Also first-boot only; the admin UI owns it afterwards. |
| `SIGNED_URL_EXPIRATION` | Api | 3600 | How long an upload or download link stays valid, in seconds. |
| `LIVE_SERVER_SECRET_KEY` | Api | (secret) | Shared secret between the API and the live collaboration server. The two must match or page editing fails to authenticate. |
| `AWS_S3_ADDRESSING_STYLE` | Api | path | Whether signed URLs are host/bucket/key or bucket.host/key. Railway's storage answers both, but only the path form sends CORS headers — with the other one the browser refuses every upload and every image while curl reports 200. |
| `ENABLE_MAGIC_LINK_LOGIN` | Api | (secret) | Magic-link sign-in. Off because it needs working SMTP, which is configured in the admin UI at /god-mode. |
| `AUTHENTICATION_RATE_LIMIT` | Api | 10/minute | Per-IP limit on sign-in and sign-up, which is what makes password guessing expensive. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Api | true | Railway's switch that makes *.railway.internal resolve inside Alpine-based images. Every image in this template is Alpine, and without it the services cannot find each other. |
| `PORT` | Valkey | 6379 | Port Valkey listens on inside the private network. |

## Configuration

- **Start command:** `bash -c 'set -e; for i in $(seq 1 90); do (echo > /dev/tcp/$DB_WAIT_HOST/$DB_WAIT_PORT) 2>/dev/null && break; echo "waiting for postgres ($i/90)"; sleep 2; done; printf "[default]\ns3 =\n    addressing_style = %s\n" "$AWS_S3_ADDRESSING_STYLE" > "$AWS_CONFIG_FILE"; python manage.py wait_for_db; python manage.py wait_for_migrations; exec celery -A plane worker -l info --concurrency "$CELERY_CONCURRENCY"'`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `sh -c 'sed -i -e "s/^worker_processes .*/worker_processes 2;/" -e "s|listen 3000;|listen 3000;\n    listen [::]:3000;\n    absolute_redirect off;\n    port_in_redirect off;|" /etc/nginx/nginx.conf; nginx -t; exec nginx -g "daemon off;"'`
- **Healthcheck:** `/`
- **Start command:** `sh -c 'printf "%s\n" "$RABBITMQ_EXTRA_CONF" > /etc/rabbitmq/conf.d/30-plane.conf; exec /usr/local/bin/docker-entrypoint.sh rabbitmq-server'`
- **Start command:** `sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile; caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile; exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bash -c 'set -e; for i in $(seq 1 90); do (echo > /dev/tcp/$DB_WAIT_HOST/$DB_WAIT_PORT) 2>/dev/null && break; echo "waiting for postgres ($i/90)"; sleep 2; done; printf "[default]\ns3 =\n    addressing_style = %s\n" "$AWS_S3_ADDRESSING_STYLE" > "$AWS_CONFIG_FILE"; python manage.py wait_for_db; python manage.py wait_for_migrations; exec celery -A plane beat -l info'`
- **Healthcheck:** `/live/health`
- **Healthcheck:** `/god-mode/`
- **Start command:** `bash -c 'set -e; for i in $(seq 1 90); do (echo > /dev/tcp/$DB_WAIT_HOST/$DB_WAIT_PORT) 2>/dev/null && break; echo "waiting for postgres ($i/90)"; sleep 2; done; for i in $(seq 1 90); do (echo > /dev/tcp/$REDIS_WAIT_HOST/$REDIS_WAIT_PORT) 2>/dev/null && break; echo "waiting for valkey ($i/90)"; sleep 2; done; for i in $(seq 1 90); do (echo > /dev/tcp/$MQ_WAIT_HOST/$MQ_WAIT_PORT) 2>/dev/null && break; echo "waiting for rabbitmq ($i/90)"; sleep 2; done; printf "[default]\ns3 =\n    addressing_style = %s\n" "$AWS_S3_ADDRESSING_STYLE" > "$AWS_CONFIG_FILE"; python manage.py wait_for_db; python manage.py migrate; python manage.py register_instance "$MACHINE_SIGNATURE"; python manage.py configure_instance; python manage.py create_bucket; python manage.py clear_cache; python manage.py collectstatic --noinput; exec gunicorn -w "$GUNICORN_WORKERS" -k uvicorn.workers.UvicornWorker plane.asgi:application --bind "[::]:$PORT" --max-requests 1200 --max-requests-jitter 1000 --access-logfile -'`

**Category:** Other

[View on Railway →](https://railway.com/deploy/plane-project-management)
