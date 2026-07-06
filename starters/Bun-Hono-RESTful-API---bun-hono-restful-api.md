# Deploy Bun Hono RESTful API 🔥 on Railway

[Jul'26] A minimal & blazing fast Bun Hono API 🔥

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bun-hono-restful-api)

## About

Bun Hono RESTful API 🔥 is a lightweight, production-ready template for building HTTP/JSON APIs using the Bun runtime and the Hono web framework. It compiles your TypeScript server into a single, fast binary, includes basic routing, health checks, and environment-based configuration, and is optimized for container-based deployments such as Railway.

Hosting Bun Hono RESTful API 🔥 on Railway means running a compact, compiled Bun binary inside a minimal container image. The provided Dockerfile handles installing dependencies, compiling `src/server.ts` into a standalone `server` binary, and defining the container entrypoint. On Railway, you typically connect your GitHub repository, enable automatic builds from the Dockerfile, and configure environment variables like `PORT` and `NODE_ENV`. Railway will then build the image, run the container, and expose your API over HTTPS, taking care of scaling, logs, and restarts for you.

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
| bun-hono | [codestorm-official/bun-hono](https://github.com/codestorm-official/bun-hono) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NODE_ENV` | development |

**Category:** Starters · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/bun-hono-restful-api)
