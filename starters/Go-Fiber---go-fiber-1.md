# Deploy Go Fiber on Railway

[Jul'26] A minimal Go Fiber RESTful API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/go-fiber-1)

## About

Go Fiber is a fast, minimalist web framework built on top of Fasthttp for Go. It focuses on performance, developer ergonomics, and a familiar Express-like API. This starter template provides a small, production-ready base with health checks, logging, graceful shutdown, and environment-based configuration using `PORT`, making it ideal for quick deployments.

Hosting a Go Fiber application typically involves building a small statically-linked binary, exposing an HTTP port, and wiring environment variables for configuration. Because Go compiles to a single executable, deployment is usually a matter of running that binary behind a reverse proxy or on a platform that handles networking and scaling for you. On Railway, you can build and run the Docker image defined in this repo, configure the `PORT` environment variable, and let Railway manage the underlying infrastructure, logs, and scaling with minimal manual setup.

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
| go-fiber | [codestorm-official/go-fiber](https://github.com/codestorm-official/go-fiber) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

**Category:** Starters · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/go-fiber-1)
