# Deploy django on Railway

Django starter with PostgreSQL for simple and efficient setup

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/django-w-postgres)

## About

A simple Django starter bundled with PostgreSQL, built for an efficient and beginner-friendly setup.

This template offers a straightforward way to run a Django application with PostgreSQL as its database. It focuses on clarity and effectiveness by providing the essential configuration needed to connect the application and database without unnecessary complexity. With this setup, developers can start building features immediately, making it suitable for experimentation, learning, and gradual scaling as the project grows.

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
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| django | [railwayapp-templates/django](https://github.com/railwayapp-templates/django) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | django | 8000 | - |
| `DISABLE_COLLECTSTATIC` | django | 1 | PostgreSQL (from Postgres service) |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Python

[View on Railway →](https://railway.com/deploy/django-w-postgres)
