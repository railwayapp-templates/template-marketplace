# Deploy Strapi 5 on Railway

A popular self-hosted "headless" CMS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/e10OW1)

## About

<h1><p align="center">NEWEST V5.11.3 VERSION!!!</p></h1>

<p align="center"><a href="https://strapi.io"><img border="0" alt="strapi" src="https://i.ibb.co/D4Ybtss/b9c0be14-400f-4629-8650-6b7cf97d6731-1666088467120.png"></a></p>

The Railway.app Strapi template streamlines the process of getting Strapi up and running on the Railway platform. Whether you're a solo developer or working in a team, this template allows you to focus on building your content and services rather than worrying about deployment complexity.

Key Features:

Instant Deployment: The template allows you to deploy Strapi on Railway with a single click. This makes the setup process fast and effortless, perfect for developers who want to start building immediately.

Fully Configurable: You can modify the Strapi project to suit your specific needs, whether it's creating custom APIs, managing data, or adding new functionalities through plugins.

Scalable: Built on Railway's infrastructure, the template ensures that your Strapi instance can scale as your project grows. You can adjust resources like CPU, memory, and storage on the go, making it a versatile solution for projects of all sizes.

Database Integration: Strapi needs a database, and Railway makes it easy to set up PostgreSQL or MySQL, depending on your preference. Database configuration is handled automatically, so you can spend more time developing.

CI/CD Friendly: The template integrates with Railway’s continuous deployment features, ensuring that every change is automatically pushed live with zero downtime.


In summary, the Railway.app Strapi template provides a seamless and efficient way to manage content and applications, making it an ideal choice for developers who value simplicity and scalability in their development workflow.

<p><strong>NOTES</strong></p>
<ul>
<li>When this template is running on Railway Strapi will connect to the Postgres Database through the <a href="https://docs.railway.app/reference/private-networking#how-it-works">private network</a>, saving you on database <a href="https://docs.railway.app/reference/pricing#usage-pricing">egress fees</a></li>
</ul>
<h3>Developing locally</h3>
<p>When developing locally this Strapi template will connect to the Postgres server from its public <a href="https://docs.railway.app/deploy/exposing-your-app#tcp-proxying">TCP Proxy</a></p>
<ul>
<li>Enable the feature flag <code>Template Service Eject</code> in the <a href="https://railway.app/account/feature-flags">Feature Flags</a> menu</li>
<li>Within the service settings of the Strapi service click the <code>Eject</code> button on the upstream repository</li>
<li>Clone that newly created repository locally</li>
<li>Install Strapi's dependencies with <code>yarn install</code> or <code>npm install</code></li>
<li>Install the Railway CLI
<ul>
<li>Instructions for that can be found <a href="https://docs.railway.app/develop/cli#installation">here</a></li>
<li>If this is your first time using the CLI make sure to login with <code>railway login</code></li>
</ul>
</li>
<li>Within the local repository run <code>railway link</code> to link the local repository to the Strapi service on Railway</li>
<li>Start Strapi for development with <code>railway run yarn run develop</code> or <code>railway run npm run develop</code>
<ul>
<li>This command will run Strapi in development mode with the service variables available locally</li>
</ul>
</li>
<li>Open your browser to <code>http://127.0.0.1:1337/admin</code></li></ul>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| railway.app-strapi | [szilardkoppel/railway.app-strapi](https://github.com/szilardkoppel/railway.app-strapi) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | railway.app-strapi | :: | - |
| `BROWSER` | railway.app-strapi | false | - |
| `JWT_SECRET` | railway.app-strapi | (secret) | - |
| `API_TOKEN_SALT` | railway.app-strapi | (secret) | - |
| `DATABASE_CLIENT` | railway.app-strapi | postgres | - |
| `ADMIN_JWT_SECRET` | railway.app-strapi | (secret) | - |
| `CLOUDINARY_SECRET` | railway.app-strapi | (secret) | - |
| `TRANSFER_TOKEN_SALT` | railway.app-strapi | (secret) | - |
| `STRAPI_TELEMETRY_DISABLED` | railway.app-strapi | false | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/e10OW1)
