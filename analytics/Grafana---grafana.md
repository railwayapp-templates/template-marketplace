# Deploy Grafana on Railway

The open and composable observability and data visualisation platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana)

## About

# Grafana for railway.app

![Template Header](./template-header.svg)


Deploy Grafana  Community Edition on railway with one click.
Grafana is a multi-platform, feature rich metrics dashboard and graph editor for Graphite, InfluxDB &amp; Prometheus. It is most commonly used for visualizing time series data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anURAt?referralCode=2_sIT9&amp;utm_medium=integration&amp;utm_source=template&amp;utm_campaign=generic)

Long-form template copy for Railway (description / **Deploy and Host** sections): [RAILWAY.md](RAILWAY.md).

## ✨ Features

* Grafana with automated setup
* Grafana UI
* Password Authentication (Set username &amp; password in environment variables)
* Railway config as code via `railway.toml`

## 🏗️ Architecture

```mermaid
flowchart LR
    Client(["🌐 Client"]) --&gt;|HTTPS| Domain["Railway Public Domain"]
    Domain --&gt;|"$PORT → GF_SERVER_HTTP_PORT"| App["Container\ngrafana/grafana-oss"]
    App --&gt; Volume[("Volume\n/var/lib/grafana")]
```

## Production recommendations (Railway)

* Set strong `GF_SECURITY_ADMIN_PASSWORD` in Railway Variables
* Persist `/var/lib/grafana` with a Railway volume
* Keep healthcheck path at `/api/health`
* Restrict plugin list in `GF_INSTALL_PLUGINS` to required plugins only

## 💾 Volume permissions

Railway mounts volumes as `root:root`, while the upstream Grafana image runs as
UID 472. A plain `grafana/grafana-oss` deployment therefore fails on first boot
with:

```log
mkdir: can't create directory '/var/lib/grafana/plugins': Permission denied
GF_PATHS_DATA='/var/lib/grafana' is not writable.
```

This template handles it in [`docker-entrypoint.sh`](docker-entrypoint.sh): the
container starts as root, takes ownership of the mount, and then `exec`s into
UID 472. Since it is an `exec` rather than a fork, no root process survives into
runtime — the Grafana process itself stays unprivileged.

You do **not** need to set `RAILWAY_RUN_UID=0`. That variable is the common
workaround for this class of error, but it leaves Grafana running as root for the
entire lifetime of the container.

The recursive `chown` only runs when the mount root is still misowned, so it
costs one pass on the first boot after attaching a volume and nothing on
subsequent restarts.

## 🖼️ Image rendering (`grafana-image-renderer`)

Adding `grafana-image-renderer` to `GF_INSTALL_PLUGINS` does **not** work on the
default image and fails at startup with `exit status 127`:

```log
Error: ✗ *rendering.RenderingService run error: Unrecognized remote plugin message
```

The plugin binary is linked against glibc, while `grafana/grafana-oss` is
Alpine-based and ships musl. Grafana closed the corresponding upstream report
([grafana-image-renderer#475](https://github.com/grafana/grafana-image-renderer/issues/475))
as *not planned*, so there is no fix to wait for. Two options work:

| Option | How | Trade-off |
| --- | --- | --- |
| Ubuntu image variant | Set `VERSION=latest-ubuntu` (build arg / Railway variable) | glibc-compatible, single service — but a noticeably larger image and rendering competes with Grafana for the same CPU/memory |
| Separate renderer service | Deploy `grafana/grafana-image-renderer` as its own Railway service, then point Grafana at it via `GF_RENDERING_SERVER_URL=http://:8081/render` and `GF_RENDERING_CALLBACK_URL=http://:3000/` | Scales independently and keeps Chromium out of the Grafana container — but a second service to run and pay for |

For anything beyond occasional PDF or panel exports, the separate service is the
better fit: rendering is CPU- and memory-spiky, and isolating it keeps those
spikes away from the dashboards themselves.

## 🐍 How to Deploy

1. Click Deploy on Railway and setup your credentials in the environment variables

```bash
GF_DEFAULT_INSTANCE_NAME=my-instance
GF_SECURITY_ADMIN_USER=yourusername
GF_SECURITY_ADMIN_PASSWORD=yourpassword
GF_INSTALL_PLUGINS=grafana-piechart-panel,grafana-worldmap-panel,grafana-clock-panel,grafana-simple-json-datasource
GF_LOG_MODE=console
GF_VERSION=latest
PORT=3000
```

2. Wait for Build &amp; Deployment to Finish
3. Open the custom URL an enter your credentials

## 👩‍💻 How to Use

1. When you configure your Grafana connection, use your custom URL as the host.
2. Use the token in the environment variables to authenticate
3. Setup bucket name and organization name in the environment variables
4. Use grafana version 2.0 or above

## 🪲 Bug Reporting

If you find a bug in the template for railway, you can [submit an issue](https://github.com/vergissberlin/railwayapp-grafana/issues/new) to the GitHub Repository. Even better you can submit a Pull Request with a fix.

## 🐳  Local Development

```bash
docker compose build
docker compose up -d
```

Connect to http://localhost:3000 use setup username &amp; password from docker-compose file to login to grafana.


---

[![Airbyte](https://img.shields.io/badge/Airbyte-615EFF?style=for-the-badge&amp;logo=airbyte&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-airbyte) [![Apache Airflow](https://img.shields.io/badge/Apache%20Airflow-017CEE?style=for-the-badge&amp;logo=apacheairflow&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-airflow) [![CloudBeaver](https://img.shields.io/badge/CloudBeaver-382923?style=for-the-badge&amp;logo=dbeaver&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-cloudbeaver-ce) [![CodiMD](https://img.shields.io/badge/CodiMD-0F766E?style=for-the-badge&amp;logo=markdown&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-codimd) [![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&amp;logo=django&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-django) [![Email Service](https://img.shields.io/badge/Email%20Service-2563EB?style=for-the-badge&amp;logo=maildotru&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-email) [![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&amp;logo=fastapi&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-fastapi) [![Flask](https://img.shields.io/badge/Flask-3fad48?style=for-the-badge&amp;logo=flask&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-flask) [![Flowise](https://img.shields.io/badge/Flowise-4F46E5?style=for-the-badge&amp;logo=nodedotjs&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-flowise) [![GitLab CE](https://img.shields.io/badge/GitLab%20CE-FC6D26?style=for-the-badge&amp;logo=gitlab&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-gitlab) [![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&amp;logo=grafana&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-grafana) [![Home Assistant](https://img.shields.io/badge/Home%20Assistant-18BCF2?style=for-the-badge&amp;logo=homeassistant&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-homeassistant) [![InfluxDB](https://img.shields.io/badge/InfluxDB-22ADF6?style=for-the-badge&amp;logo=influxdb&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-influxdb) [![MJML](https://img.shields.io/badge/MJML-F45E43?style=for-the-badge&amp;logo=mjml&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-mjml) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-mongodb) [![Mosquitto MQTT](https://img.shields.io/badge/Mosquitto%20MQTT-3C5280?style=for-the-badge&amp;logo=eclipsemosquitto&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-mqtt) [![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&amp;logo=mysql&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-mysql) [![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&amp;logo=n8n&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-n8n) [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&amp;logo=nodedotjs&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-nodejs) [![Node-RED](https://img.shields.io/badge/Node-RED-8F0000?style=for-the-badge&amp;logo=nodered&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-nodered) [![OpenSearch](https://img.shields.io/badge/OpenSearch-005EB8?style=for-the-badge&amp;logo=opensearch&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-opensearch) [![Open WebUI](https://img.shields.io/badge/Open%20WebUI-D68E42?style=for-the-badge&amp;logo=ollama&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-openwebui) [![Outerbase Studio](https://img.shields.io/badge/Outerbase%20Studio-000000?style=for-the-badge&amp;logo=outerbase&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-outerbase-studio) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-postgresql) [![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&amp;logo=redis&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-redis) [![TYPO3 CMS](https://img.shields.io/badge/TYPO3%20CMS-FF8700?style=for-the-badge&amp;logo=typo3&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-typo3)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grafana | [vergissberlin/railwayapp-grafana](https://github.com/vergissberlin/railwayapp-grafana) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Please don't change it! |
| `VERSION` | latest | Setup the Grafana version to your needs, or leave it as latest to get the latest version. |
| `GF_LOG_MODE` | console | How to log |
| `GF_INSTALL_PLUGINS` | grafana-piechart-panel,grafana-worldmap-panel,grafana-clock-panel,grafana-simple-json-datasource | Add more plugins to your wish. Take a look to https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/ |
| `GF_SECURITY_ADMIN_USER` | (secret) | Enter the name of your admin user |
| `GF_DEFAULT_INSTANCE_NAME` | - | Name your Grafana instance! |
| `GF_SECURITY_ADMIN_PASSWORD` | (secret) | Your secure password for the admin user |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/grafana)
