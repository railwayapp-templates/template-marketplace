# Deploy Laravel on Railway

[Jul'26] It works! Laravel boilerplate with PostgreSQL 🐘✨

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/laravel)

## About

Laravel is a sophisticated PHP web framework designed for building high-end web applications with elegant syntax. It streamlines common tasks like authentication, routing, sessions, and caching. By providing a rich set of tools and a robust ecosystem, Laravel allows developers to focus on creating features rather than repetitive boilerplate code.

Hosting and deploying Laravel requires an environment capable of running PHP and managing a relational database—in this case, PostgreSQL. The process involves configuring a web server (like Nginx or Apache), managing environment variables via `.env` files, and setting up a task scheduler (Cron) for background jobs. Modern deployment on platforms like Railway leverages containerization (Docker) or Nixpacks to automate the build process. Key steps include running database migrations, optimizing the configuration cache, and ensuring secure SSL/TLS termination, all of which Railway handles seamlessly through its automated CI/CD pipeline integrated with GitHub.

### How to Use

After deploying this template, the app is already running on Railway. You can open the generated Railway domain to test the starter app immediately.

If you want to customize the source code, use one of the workflows below.

#### Via Railway CLI

Use this workflow if you want to edit the project locally and redeploy changes directly from your machine using Railway CLI.

1. Deploy the template.
2. Clone the repository from **Source Repo** or **Upstream Repo** in the Railway dashboard.
3. Enter the project directory:

```bash
cd 
```

4. Link your local project directory to the deployed Railway project:

```bash
railway link
```

5. Check the linked project, environment, service, and repository information:

```bash
railway status
```

6. Edit the code locally.
7. Redeploy your local changes to Railway:

```bash
railway up
```

Railway will upload the current local directory and deploy it to the linked service.

#### Via Git / GitHub

Use this workflow if you want to manage changes through GitHub and let Railway automatically redeploy after every push.

1. Deploy the template.
2. Open **Source Repo** or **Upstream Repo** from the Railway dashboard.
3. Fork the repository to your own GitHub account.
4. Clone your fork locally:

```bash
git clone 
cd 
```

5. Edit the code locally.
6. Commit and push your changes to your fork:

```bash
git add .
git commit -m "Customize Node.js starter"
git push origin main
```

7. In Railway, change the service **Source Repo** to your fork if Railway does not automatically create or link it.
8. After the service is connected to your fork, future pushes to the repository can trigger automatic redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| laravel | [railwayapp-templates/laravel](https://github.com/railwayapp-templates/laravel) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_NAME` | laravel | Laravel | - |
| `APP_DEBUG` | laravel | true | - |
| `LOG_LEVEL` | laravel | debug | - |
| `LOG_STACK` | laravel | single | - |
| `MAIL_HOST` | laravel | 127.0.0.1 | - |
| `MAIL_PORT` | laravel | 2525 | - |
| `APP_LOCALE` | laravel | en | - |
| `REDIS_HOST` | laravel | 127.0.0.1 | - |
| `REDIS_PORT` | laravel | 6379 | - |
| `CACHE_STORE` | laravel | database | - |
| `DB_PASSWORD` | laravel | (secret) | - |
| `DB_USERNAME` | laravel | (secret) | - |
| `LOG_CHANNEL` | laravel | errorlog | - |
| `MAIL_MAILER` | laravel | log | - |
| `CACHE_PREFIX` | laravel | laravel_ | - |
| `REDIS_CLIENT` | laravel | phpredis | - |
| `SESSION_PATH` | laravel | / | - |
| `BCRYPT_ROUNDS` | laravel | 12 | - |
| `DB_CONNECTION` | laravel | pgsql | - |
| `MAIL_PASSWORD` | laravel | (secret) | - |
| `MAIL_USERNAME` | laravel | (secret) | - |
| `VITE_APP_NAME` | laravel | ${APP_NAME} | - |
| `MAIL_FROM_NAME` | laravel | ${APP_NAME} | - |
| `MEMCACHED_HOST` | laravel | 127.0.0.1 | - |
| `REDIS_PASSWORD` | laravel | (secret) | - |
| `SESSION_DOMAIN` | laravel | null | - |
| `SESSION_DRIVER` | laravel | database | - |
| `FILESYSTEM_DISK` | laravel | local | - |
| `MAIL_ENCRYPTION` | laravel | null | - |
| `SESSION_ENCRYPT` | laravel | false | - |
| `APP_FAKER_LOCALE` | laravel | en_US | - |
| `QUEUE_CONNECTION` | laravel | database | - |
| `SESSION_LIFETIME` | laravel | 120 | - |
| `MAIL_FROM_ADDRESS` | laravel | hello@example.com | - |
| `APP_FALLBACK_LOCALE` | laravel | en | - |
| `BROADCAST_CONNECTION` | laravel | log | - |
| `APP_MAINTENANCE_DRIVER` | laravel | file | - |
| `LOG_DEPRECATIONS_CHANNEL` | laravel | null | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** PHP, Blade, JavaScript

[View on Railway →](https://railway.com/deploy/laravel)
