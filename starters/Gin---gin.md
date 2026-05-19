# Deploy Gin on Railway

A minimal Gin RESTful API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gin)

## About

Hosting and deploying this Gin API involves compiling the Go source code into a lightweight binary. This template is optimized for cloud platforms like Railway, utilizing `godotenv` for flexible configuration and a **Graceful Shutdown** mechanism to ensure zero-downtime deployments. By default, the server listens on port 3000 (configurable via environment variables) and operates in `ReleaseMode` to maximize throughput. Deployment on Railway is seamless, as the platform automatically detects the Go environment, manages your `PORT` variables, and provides a secure runtime for your high-performance service.

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
| GIn | [codestorm-official/go-gin](https://github.com/codestorm-official/go-gin) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

**Category:** Starters · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/gin)
