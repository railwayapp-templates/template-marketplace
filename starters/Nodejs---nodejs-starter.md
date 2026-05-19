# Deploy Node.js on Railway

A minimal Node.js web app built with Express.js — it just works.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nodejs-starter)

## About

Node.js Starter is a minimal web application built with Express.js. It gives you a simple, ready-to-run foundation for building APIs, backend services, landing pages, prototypes, or small production apps. The setup stays lightweight so you can focus on building features instead of configuring infrastructure.

![](https://raw.githubusercontent.com/codestorm-official/nodejs-starter/refs/heads/main/img/homepage.png)

Hosting Node.js Starter means running a Node.js application in a production-ready environment where it can receive traffic, respond to requests, and scale as your project grows. Railway makes this simple by detecting the Node.js project, installing dependencies, and starting the app automatically. You can connect a GitHub repository, deploy with one click, manage environment variables, view logs, and add services like databases whenever your application needs them.

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
| Node.js | [codestorm-official/nodejs-starter](https://github.com/codestorm-official/nodejs-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NODE_ENV` | production |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/nodejs-starter)
