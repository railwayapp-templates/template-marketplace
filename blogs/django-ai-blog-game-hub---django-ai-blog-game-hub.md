# Deploy django-ai-blog-game-hub on Railway

Django for Feed, AI, Game Custom

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/django-ai-blog-game-hub)

## About

django-ai-blog-game-hub is a Django-based web application combining feeds, blogs, academic posts, AI assistants, and custom JavaScript games. It features user authentication with email verification, customizable profiles, SEO support, and an admin dashboard. Ideal for tech communities, hackathons, and creative hubs wanting content, AI tools, and interactive experiences in one platform.

Hosting django-ai-blog-game-hub on Railway provides a quick and reliable way to launch a production-ready Django application. The setup uses Gunicorn as the WSGI server, WhiteNoise for serving static files, and PostgreSQL via Railway’s built-in plugin. Optional Redis support can be added for caching and background tasks, and AI features can integrate with providers like OpenAI. Deployment is automated—Railway runs migrations, collects static files, configures HTTPS, and scales resources vertically or horizontally as needed. All sensitive data, such as secret keys, database credentials, and API keys, are managed through environment variables, ensuring security and flexibility without complex server configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| netalith0django | [nguyenlong1019/netalith0django](https://github.com/nguyenlong1019/netalith0django) | Database |
| MySQL | `mysql:9` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_MODE` | netalith0django | production | - |
| `DB_USER` | netalith0django | (secret) | - |
| `TEST_IP` | netalith0django | 116.96.46.226,14.232.211.180 | - |
| `DEBUG_MODE` | netalith0django | True | - |
| `EMAIL_HOST` | netalith0django | smtp.gmail.com | - |
| `EMAIL_PORT` | netalith0django | 587 | - |
| `JWT_SECRET` | netalith0django | (secret) | - |
| `ADMIN_ROUTE` | netalith0django | dashboard | - |
| `DB_PASSWORD` | netalith0django | (secret) | - |
| `EMAIL_BACKEND` | netalith0django | django.core.mail.backends.smtp.EmailBackend | - |
| `MAX_AGE_ACCESS` | netalith0django | 7200 | - |
| `EMAIL_HOST_USER` | netalith0django | (secret) | - |
| `MAX_AGE_REFRESH` | netalith0django | 5184000 | - |
| `PROJECT_SECRET_KEY` | netalith0django | (secret) | ^o!+&dt(qygnq-&d_7l |
| `EMAIL_HOST_PASSWORD` | netalith0django | (secret) | - |
| `OPEN_API_API_SECRET_KEY` | netalith0django | (secret) | - |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_PUBLIC_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |

## Configuration

- **Volume:** `/app/media`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** Blogs · **Languages:** HTML, Python, JavaScript, Dockerfile, CSS, Procfile

[View on Railway →](https://railway.com/template/django-ai-blog-game-hub)
