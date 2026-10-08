# Deploy mentor-scaffold on Railway

A voice-first AI mentor, deployed into your own hosting with your own keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mentor-scaffold)

## About

mentor-scaffold is a template for a voice-first AI mentor that any creator, school or agency deploys into their own hosting, under their own name, with their own keys. The source is public; the instance you deploy is yours alone: your database, your model vendor key, your mail relay, your domain.

The template deploys three services: Railway Postgres 18, a one-shot migrator that applies the schema and sets up the database roles, and the instance itself, which serves the operator console on its generated domain. The migrator and the instance build from the repository Dockerfile. At deploy you are asked for six values: your model vendor API key, the address the console sends your sign-in code to, and your mail relay host, user name, password and from address. Everything else is set by the template. After the first deploy, the setup guide in the repository walks the three steps that make the project your own: eject both services to your GitHub, switch on Wait for CI, and protect your default branch.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| migrate | [bird66-coach/bird66-template](https://github.com/bird66-coach/bird66-template) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18.6@sha256:359787d899063c1e3bdae85e8999230d251ffbb937e8256195cd81f482cdfc95` | Database |
| instance | [bird66-coach/bird66-template](https://github.com/bird66-coach/bird66-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DATABASE_URL` | migrate | - | The database superuser's URL. Only the migrator holds it. |
| `INSTANCE_SECRET` | migrate | (secret) | The instance secret: every database role's password and the key that seals stored keys derive from it. Generated once at deploy. Never change this value first: see "Rotating the secret". |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | instance | 8080 | The port Railway routes to and checks. The image listens on 8080; change both or neither. |
| `INSTANCE_SECRET` | instance | (secret) | The instance secret, the migrator's until the first rotation. |
| `INSTANCE_MAIL_FROM` | instance | - | The address the console's mail is sent from. |
| `INSTANCE_MAIL_HOST` | instance | - | Your mail relay's host name. The relay is used over TLS only. |
| `INSTANCE_DATABASE_URL` | instance | - | The database, with no user or password: the instance logs in as each database role itself. |
| `INSTANCE_MAIL_PASSWORD` | instance | (secret) | Your mail relay's password. |
| `INSTANCE_MAIL_USERNAME` | instance | (secret) | Your mail relay's user name. |
| `INSTANCE_CONSOLE_ORIGIN` | instance | - | The console's origin: this service's generated domain until your own domain is set. |
| `INSTANCE_OPERATOR_EMAIL` | instance | - | The address the console sends your sign-in code to. |
| `INSTANCE_VENDOR_API_KEY` | instance | (secret) | Your model vendor's API key. |

## Configuration

- **Start command:** `/migrate`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Go, Swift, Kotlin, HTML, Python, Svelte, PLpgSQL, TypeScript, CSS, Groovy, Shell, Dockerfile, Standard ML, JavaScript

[View on Railway →](https://railway.com/deploy/mentor-scaffold)
