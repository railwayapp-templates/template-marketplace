# Deploy Apache HertzBeat on Railway

Real-time monitoring for websites, APIs, databases and servers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-hertzbeat)

## About

[Apache HertzBeat](https://hertzbeat.apache.org) is an open-source, real-time monitoring
system. It watches websites, APIs, databases, operating systems, middleware and cloud services
without installing an agent on the target, shows the results on a live dashboard, and raises
alerts through email, webhooks, Slack, Discord, Telegram and more.

HertzBeat needs two kinds of storage, and this template provides both rather than falling back
to the embedded defaults: PostgreSQL holds its configuration, monitors and alert history, and
VictoriaMetrics holds the collected metrics with three months of retention. The template
deploys three services, gives HertzBeat a public HTTPS domain, keeps the two data stores on
Railway's private network with a volume each, and generates every credential. Nothing needs to
be filled in before deploying. HertzBeat builds its own database schema with Flyway on first
start, so there is no migration step, and its built-in collector runs inside the same service,
so a single deployment monitors everything you point it at.

One thing is specific to hosting it: HertzBeat reads its login accounts from a file inside its
image rather than from the database, and upstream ships a well-known default password. This
template generates an admin password instead and writes it into that file at every start, so
the deployment is not publicly accessible with a default credential.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| victoria-metrics | [RockinPaul/hertzbeat_railway_template](https://github.com/RockinPaul/hertzbeat_railway_template) (root: victoria-metrics) | Database |
| hertzbeat | [RockinPaul/hertzbeat_railway_template](https://github.com/RockinPaul/hertzbeat_railway_template) (root: hertzbeat) | Web service |
| postgres | [RockinPaul/hertzbeat_railway_template](https://github.com/RockinPaul/hertzbeat_railway_template) (root: postgres) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `HERTZBEAT_ADMIN_PASSWORD` | hertzbeat | (secret) |
| `SPRING_DATASOURCE_PASSWORD` | hertzbeat | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |

## Configuration

- **Volume:** `/vmdata`
- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/apache-hertzbeat)
