# Deploy Plane on Railway

Open-source project management that unlocks customer value

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/MrCqPF)

## About

<br><br>

<p align="center">
<a href="https://plane.so">
  <img width="70" alt="Plane Logo" src="https://plane-marketing.s3.ap-south-1.amazonaws.com/plane-readme/plane_logo_.webp">
</a>
</p>

<h3 align="center"><b>Plane</b></h3>
<p align="center"><b>Open-source project management that unlocks customer value.</b></p>

<p align="center">
    <a href="http://www.plane.so"><b>Website</b></a> •
    <a href="https://github.com/makeplane/plane/releases"><b>Releases</b></a> •
    <a href="https://twitter.com/planepowers"><b>Twitter</b></a> •
    <a href="https://docs.plane.so/"><b>Documentation</b></a>
</p>

<p>
    <a href="https://app.plane.so/#gh-light-mode-only">
      <img style="border-radius: 10px;" width="100%" alt="Plane Screens" src="https://plane-marketing.s3.ap-south-1.amazonaws.com/plane-readme/plane_screen.webp">
    </a>
</p>

Meet [Plane](https://plane.so). An open-source software development tool to manage issues, sprints, and product roadmaps with peace of mind. 🧘‍♀️

## ⚡ Setup

`Instance admin` can configure instance settings using our [God-mode](https://docs.plane.so/instance-admin) feature.

To configure your instance, visit your domain/god-mode and enter your email and chose a password.

## 🚀 Features

- **Issues**: Quickly create issues and add details using a powerful, rich text editor that supports file uploads. Add sub-properties and references to problems for better organization and tracking.

- **Cycles**
  Keep up your team's momentum with Cycles. Gain insights into your project's progress with burn-down charts and other valuable features.

- **Modules**: Break down your large projects into smaller, more manageable modules. Assign modules between teams to track and plan your project's progress easily.

- **Views**: Create custom filters to display only the issues that matter to you. Save and share your filters in just a few clicks.

- **Pages**: Plane pages, equipped with AI and a rich text editor, let you jot down your thoughts on the fly. Format your text, upload images, hyperlink, or sync your existing ideas into an actionable item or issue.

- **Analytics**: Get insights into all your Plane data in real-time. Visualize issue data to spot trends, remove blockers, and progress your work.

- **Drive** (_coming soon_): The drive helps you share documents, images, videos, or any other files that make sense to you or your team and align on the problem/solution.


## 📸 Screenshots

<p>
    <a href="https://plane.so">
      <img style="border-radius: 10px;" width="100%" alt="Plane Views" src="https://ik.imagekit.io/w2okwbtu2/Issues_rNZjrGgFl.png?updatedAt=1709298765880">
    </a>
  </p>
<p>
    <a href="https://plane.so">
      <img style="border-radius: 10px;" width="100%" src="https://ik.imagekit.io/w2okwbtu2/Cycles_jCDhqmTl9.png?updatedAt=1709298780697">
    </a>
  </p>
  <p>
    <a href="https://plane.so">
      <img style="border-radius: 10px;" width="100%" alt="Plane Cycles and Modules" src="https://ik.imagekit.io/w2okwbtu2/Modules_PSCVsbSfI.png?updatedAt=1709298796783">
    </a>
  </p>
  <p>
    <a href="https://plane.so">
      <img style="border-radius: 10px;" width="100%" alt="Plane Analytics" src="https://ik.imagekit.io/w2okwbtu2/Views_uxXsRatS4.png?updatedAt=1709298834522">
    </a>
  </p>
   <p>
    <a href="https://plane.so">
      <img style="border-radius: 10px;" width="100%" alt="Plane Pages" src="https://ik.imagekit.io/w2okwbtu2/Analytics_0o22gLRtp.png?updatedAt=1709298834389">
    </a>
  </p>
<p></p>
   <p>
    <a href="https://plane.so">
      <img style="border-radius: 10px;" width="100%" alt="Plane Command Menu" src="https://ik.imagekit.io/w2okwbtu2/Drive_LlfeY4xn3.png?updatedAt=1709298837917">
    </a>
  </p>
<p></p>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Worker | `makeplane/plane-backend` | Worker |
| Redis | `bitnami/redis` | Database |
| API | `makeplane/plane-backend` | Worker |
| Plane | [railwayapp-templates/plane-caddy-proxy](https://github.com/railwayapp-templates/plane-caddy-proxy) | Web service |
| Space | `makeplane/plane-space` | Worker |
| Web | `makeplane/plane-frontend` | Worker |
| Beat Worker | `makeplane/plane-backend` | Worker |
| Admin | `makeplane/plane-admin` | Worker |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Bucket | `minio/minio:latest` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_URL` | Worker | - | Private Redis URL |
| `SECRET_KEY` | Worker | (secret) | Secret Key from API |
| `DATABASE_URL` | Worker | - | Private Postgres URL |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | <a href="https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | - | Port to connect to Redis, used by the Data panel. |
| `REDISUSER` | Redis | default | Default user to connect to Redis, needed for the Data panel. |
| `REDIS_URL` | Redis | - | URL to connect to Redis, used for Data panel. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis, needed for the Data panel. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PRIVATE_URL` | Redis | - | URL to connect to Redis over private network. |
| `PORT` | API | 8000 | Port for API to listen on |
| `WEB_URL` | API | - | Public domain from Plane service |
| `REDIS_URL` | API | - | Private Redis URL |
| `USE_MINIO` | API | 1 | Use Minio or AWS S3 |
| `MACHINE_ID` | API | - | A unique machine ID |
| `SECRET_KEY` | API | (secret) | Unique Secret Key |
| `DATABASE_URL` | API | - | Private Postgres URL |
| `GUNICORN_WORKERS` | API | 4 | Quantity of Gunicorn Workers |
| `AWS_ACCESS_KEY_ID` | API | - | Minio or S3 Root User |
| `AWS_S3_BUCKET_NAME` | API | uploads | Minio or S3 Bucket |
| `AWS_S3_ENDPOINT_URL` | API | - | Minio or S3 Bucket Endpoint |
| `CORS_ALLOWED_ORIGINS` | API | - | CORS Whitelisted Origins |
| `AWS_SECRET_ACCESS_KEY` | API | (secret) | Minio Root Password or S3 Secret Access Key |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | API | true | Enable Faster Private Network Initialization |
| `BUCKET_NAME` | Plane | - | Minio Bucket Name for Object Storage |
| `API_ENDPOINT` | Plane | - | Private Domain for API |
| `WEB_ENDPOINT` | Plane | - | Private Domain for Frontend |
| `ADMIN_ENDPOINT` | Plane | - | Private Domain for Admin |
| `BUCKET_ENDPOINT` | Plane | - | Private Endpoint for Minio Bucket |
| `SPACES_ENDPOINT` | Plane | - | Private Domain for Spaces |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Plane | true | <a href="https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |
| `PORT` | Space | 3001 | Port for Spaces to listen on |
| `WEB_URL` | Space | - | Public domain from Plane service |
| `HOSTNAME` | Space | :: | IPv6 Hostname |
| `SECRET_KEY` | Space | (secret) | Secret Key from API |
| `PORT` | Web | 3000 | Port for Frontend to Listen on |
| `WEB_URL` | Web | - | Public domain from Plane service |
| `HOSTNAME` | Web | :: | IPv6 Hostname |
| `NEXT_PUBLIC_DEPLOY_URL` | Web | - | Public domain of the Plane service |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Web | true | <a href="https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |
| `REDIS_URL` | Beat Worker | - | Private Redis URL |
| `SECRET_KEY` | Beat Worker | (secret) | Secret Key from API |
| `DATABASE_URL` | Beat Worker | - | Private Postgres URL |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Beat Worker | true | <a href="https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |
| `PORT` | Admin | 3000 | - |
| `HOSTNAME` | Admin | :: | - |
| `USE_MINIO` | Admin | 1 | - |
| `SECRET_KEY` | Admin | (secret) | - |
| `AWS_S3_BUCKET_NAME` | Admin | uploads | - |
| `AWS_SECRET_ACCESS_KEY` | Admin | (secret) | - |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Admin | true | - |
| `PORT` | Console | 9090 | Port for Minio Console to Listen On |
| `Password` | Console | (secret) | Generated Minio Root Password |
| `USERNAME` | Console | (secret) | Generated Minio Root User |
| `CONSOLE_MINIO_SERVER` | Console | - | Private URL for Minio Bucket |
| `PORT` | Bucket | - | Private Port for Minio Bucket to Listen on |
| `MINIO_ROOT_USER` | Bucket | (secret) | Generated Minio Root User |
| `MINIO_PUBLIC_HOST` | Bucket | - | Public URL for Bucket Access |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | Public Port for Minio Bucket to Listen on |
| `MINIO_PRIVATE_HOST` | Bucket | - | Private Domain for Minio Bucket |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | Private Port for Minio Bucket to Listen on |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | Generated Minio Root Password |
| `MINIO_PUBLIC_ENDPOINT` | Bucket | - | Public Minio Bucket Endpoint |
| `MINIO_PRIVATE_ENDPOINT` | Bucket | - | Private Minio Bucket Endpoint |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Start command:** `/bin/sh -c "python manage.py wait_for_db && python manage.py wait_for_migrations && celery -A plane worker -l info --concurrency 4"`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `/bin/sh -c "python manage.py wait_for_db && python manage.py migrate && python manage.py register_instance ${MACHINE_ID} && python manage.py configure_instance && python manage.py create_bucket && python manage.py clear_cache; gunicorn -w ${GUNICORN_WORKERS} -k uvicorn.workers.UvicornWorker plane.asgi:application --bind [::]:${PORT} --max-requests 1200 --max-requests-jitter 1000 --access-logfile -"`
- **Healthcheck:** `/api/instances/`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `node space/server.js space`
- **Healthcheck:** `/spaces/site.webmanifest.json`
- **Start command:** `node web/server.js web`
- **Start command:** `./bin/docker-entrypoint-beat.sh`
- **Start command:** `node admin/server.js admin`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`
- **Start command:** `/bin/sh -c "minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/MrCqPF)
