# Deploy Next.js on Railway

[Jun'26] A minimal NextJS application with Prisma ORM and PostgreSQL ▲🐘

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nextjs)

## About

Next.js is a React-based web framework that enables developers to build fast, production-ready applications with features such as server-side rendering, static site generation, API routes, and optimized performance out of the box. It is commonly used for modern web applications that require both frontend and backend capabilities in a single framework.

Hosting Next.js involves building the application, serving pre-rendered pages, and optionally running server-side logic such as API routes or middleware. Depending on the configuration, Next.js can run as a static site or as a full server-rendered application. A proper hosting setup must handle environment variables, build-time compilation, runtime execution, and scalability. Railway simplifies this by handling the build and runtime separation automatically, allowing developers to focus on application logic instead of infrastructure setup.

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
| Next.js x Prisma | [codestorm-official/nextjs-prisma](https://github.com/codestorm-official/nextjs-prisma) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `POSTGRES_DB` | railway | Default database created when image is started. |
| `DATABASE_URL` | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, CSS

[View on Railway →](https://railway.com/deploy/nextjs)
