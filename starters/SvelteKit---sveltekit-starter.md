# Deploy SvelteKit on Railway

[Jul'26] Deploy SvelteKit in 1-click. It just works. 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sveltekit-starter)

## About

SvelteKit is a modern web application framework built on Svelte. It provides routing, server-side rendering, build optimization, and flexible rendering modes out of the box, making it a great choice for fast, interactive, production-ready web apps with a simple developer experience.

![](https://raw.githubusercontent.com/codestorm-official/sveltekit-starter/refs/heads/main/docs/assets/sveltekit-hp.png)

Hosting a SvelteKit app usually involves building the application for production, choosing the correct adapter, and running the generated server output on a Node-compatible runtime. This template uses `@sveltejs/adapter-node`, which makes it suitable for Railway and other Node.js hosting environments. Railway can deploy the app from GitHub, through the Railway CLI, or with the included Dockerfile. For production, the app is built with `npm run build` and started with `npm run start`. Railway can also provide a public domain, environment variables, logs, and optional services like databases or Redis.

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
| sveltekit-starter | [codestorm-official/sveltekit-starter](https://github.com/codestorm-official/sveltekit-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Svelte, TypeScript, CSS, JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/sveltekit-starter)
