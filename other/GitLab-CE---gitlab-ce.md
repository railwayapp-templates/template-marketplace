# Deploy GitLab CE on Railway

Deploy a self-hosted GitLab CE instance on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitlab-ce)

## About

# GitLab CE

![Template Header](./template-header.svg)


Deploy a self-hosted GitLab CE instance on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vGH4ea?referralCode=2_sIT9&amp;utm_medium=integration&amp;utm_source=template&amp;utm_campaign=generic)

## Files in this template

- `Dockerfile` uses the official `gitlab/gitlab-ce` image.
- `docker-entrypoint.sh` injects Railway domain and dynamic `$PORT`.
- `railway.toml` configures health checks and restart policy.

## Environment variables

```bash
GITLAB_ROOT_PASSWORD=replace-with-strong-password
```

`RAILWAY_PUBLIC_DOMAIN` and `PORT` are provided by Railway.

## First login

- Username: `root`
- Password: value from `GITLAB_ROOT_PASSWORD`

## Persistent storage

Attach a Railway volume and mount these paths:

- `/var/opt/gitlab`
- `/etc/gitlab`
- `/var/log/gitlab`

## Notes

- GitLab needs significant RAM and CPU. Use a larger Railway plan for production.
- First boot can take several minutes.
- Keep at least one persistent volume attached before storing projects.




---
[![Airbyte](https://img.shields.io/badge/Airbyte-615EFF?style=for-the-badge&amp;logo=airbyte&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-airbyte) [![Apache Airflow](https://img.shields.io/badge/Apache%20Airflow-017CEE?style=for-the-badge&amp;logo=apacheairflow&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-airflow) [![CodiMD](https://img.shields.io/badge/CodiMD-0F766E?style=for-the-badge&amp;logo=markdown&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-codimd) [![Email Service](https://img.shields.io/badge/Email%20Service-2563EB?style=for-the-badge&amp;logo=maildotru&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-email) [![GitLab CE](https://img.shields.io/badge/GitLab%20CE-FC6D26?style=for-the-badge&amp;logo=gitlab&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-gitlab) [![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&amp;logo=grafana&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-grafana) [![Home Assistant](https://img.shields.io/badge/Home%20Assistant-18BCF2?style=for-the-badge&amp;logo=homeassistant&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-homeassistant) [![InfluxDB](https://img.shields.io/badge/InfluxDB-22ADF6?style=for-the-badge&amp;logo=influxdb&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-influxdb) [![Mosquitto MQTT](https://img.shields.io/badge/Mosquitto%20MQTT-3C5280?style=for-the-badge&amp;logo=eclipsemosquitto&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-mqtt) [![Node-RED](https://img.shields.io/badge/Node--RED-8F0000?style=for-the-badge&amp;logo=nodered&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-nodered) [![OpenSearch](https://img.shields.io/badge/OpenSearch-005EB8?style=for-the-badge&amp;logo=opensearch&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-opensearch) [![TYPO3 CMS](https://img.shields.io/badge/TYPO3%20CMS-FF8700?style=for-the-badge&amp;logo=typo3&amp;logoColor=white)](https://github.com/vergissberlin/railwayapp-typo3)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railwayapp-gitlab | [vergissberlin/railwayapp-gitlab](https://github.com/vergissberlin/railwayapp-gitlab) | Worker |

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/gitlab-ce)
