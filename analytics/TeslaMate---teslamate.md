# Deploy TeslaMate on Railway

Data logger for Tesla cars, with Grafana dashboards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teslamate)

## About

TeslaMate is an open source data logger for Tesla vehicles. It polls the Tesla API for your car, records every drive, charge, software update and sleep period into PostgreSQL, and turns that history into Grafana dashboards covering efficiency, battery degradation, charging cost and vampire drain. Owners use it to prove range loss under warranty, split home and public charging costs, and own their data rather than rent it.

Self-host TeslaMate on Railway and what normally takes an evening of Docker Compose is already wired together: `teslamate` runs the app, `Postgres` stores the history, `grafana` serves the bundled dashboards against that database, `mosquitto` publishes live vehicle state over MQTT, and `teslamate-proxy` puts a password in front of the web interface. That last piece matters — TeslaMate has no login of its own, so running it without a gateway would leave your car's location on the open internet.

![TeslaMate, Grafana, Mosquitto and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1789009507/teslamate-architecture.png)

TeslaMate is an Elixir application that adapts its polling rate to what the car is doing — seconds apart while driving or charging, nothing once the car sleeps, so it adds no measurable vampire drain. Everything it records is yours, in your own database, with no retention limit.

- High-resolution drive and charge logging, with GPS traces and per-session energy
- Battery health and projected-range tracking over the life of the car
- Charging cost tracking, with per-geo-fence pricing rules
- Geo-fencing, so home, work and favourite superchargers are named rather than plotted
- MQTT publishing for Home Assistant, Node-RED and other automation tools
- Import from TeslaFi and tesla-apiscraper

TeslaMate writes to Postgres over Railway's private network, Grafana reads that same database and never talks to the app, and the gateway terminates the password prompt so only authenticated traffic reaches the app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| teslamate-proxy | [gridalpha/teslamate-railway](https://github.com/gridalpha/teslamate-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| grafana | `teslamate/grafana:latest` | Web service |
| mosquitto | [gridalpha/teslamate-railway](https://github.com/gridalpha/teslamate-railway) | Database |
| teslamate | `teslamate/teslamate:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | teslamate-proxy | 8080 | Gateway listener port |
| `PROXY_PASSWORD` | teslamate-proxy | (secret) | Password for the web interface prompt |
| `PROXY_USERNAME` | teslamate-proxy | (secret) | Username for the web interface prompt |
| `TESLAMATE_UPSTREAM` | teslamate-proxy | teslamate.railway.internal:4000 | Private address of the app |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | grafana | 3000 | Health-check port |
| `DATABASE_HOST` | grafana | - | Private database hostname |
| `DATABASE_NAME` | grafana | - | Datasource database |
| `DATABASE_PASS` | grafana | - | Datasource password |
| `DATABASE_PORT` | grafana | 5432 | Private database port |
| `DATABASE_USER` | grafana | (secret) | Datasource role |
| `GF_SERVER_ROOT_URL` | grafana | - | Public Grafana URL |
| `GF_SERVER_HTTP_PORT` | grafana | 3000 | Grafana listener port |
| `GF_SECURITY_ADMIN_USER` | grafana | (secret) | Grafana admin username |
| `GF_SECURITY_ADMIN_PASSWORD` | grafana | (secret) | Grafana admin password |
| `PORT` | mosquitto | 8083 | Management API port, health-checked |
| `MQTT_PASSWORD` | mosquitto | (secret) | Broker password, both listeners |
| `MQTT_USERNAME` | mosquitto | (secret) | Broker username |
| `TZ` | teslamate | Etc/UTC | Local time zone for logs and dashboards |
| `PORT` | teslamate | 4000 | HTTP listener port |
| `MQTT_HOST` | teslamate | - | Private broker hostname |
| `MQTT_IPV6` | teslamate | true | Required; same reason as the database |
| `MQTT_PORT` | teslamate | 1883 | Plaintext broker port, private network only |
| `CHECK_ORIGIN` | teslamate | true | Pins the accepted WebSocket Origin |
| `SIGNING_SALT` | teslamate | - | LiveView signing salt |
| `VIRTUAL_HOST` | teslamate | - | Public hostname used in generated URLs |
| `DATABASE_HOST` | teslamate | - | Private database hostname |
| `DATABASE_IPV6` | teslamate | true | Required; the client is IPv4-only otherwise |
| `DATABASE_NAME` | teslamate | - | Database name |
| `DATABASE_PASS` | teslamate | - | Postgres password |
| `DATABASE_PORT` | teslamate | 5432 | Private database port |
| `DATABASE_USER` | teslamate | (secret) | Postgres role |
| `MQTT_PASSWORD` | teslamate | (secret) | Broker password |
| `MQTT_USERNAME` | teslamate | (secret) | Broker username |
| `ENCRYPTION_KEY` | teslamate | - | Encrypts the stored Tesla API tokens |
| `TINI_SUBREAPER` | teslamate | 1 | tini is not PID 1 on Railway |
| `SECRET_KEY_BASE` | teslamate | (secret) | Phoenix session signing key |
| `TINI_KILL_PROCESS_GROUP` | teslamate | 1 | Propagate SIGTERM to children |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/grafana`
- **Healthcheck:** `/api/v1/version`
- **TCP Proxies:** 8883
- **Volume:** `/mosquitto/data`
- **Healthcheck:** `/sign_in`
- **Volume:** `/opt/app/import`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/teslamate)
