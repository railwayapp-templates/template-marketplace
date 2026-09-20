# Deploy wazuh-template on Railway

Wazuh SIEM (manager + indexer + dashboard) - deploy-time TLS, one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wazuh-template)

## About

This template provisions three services on Railway: the Wazuh manager (agent
ingestion/enrolment over TCP proxies 1514/1515, API on private port 55000), the Wazuh
indexer (OpenSearch fork with 1 GB JVM heap, TLS, private networking only), and the Wazuh
dashboard (public HTTPS domain, login with the deploy-generated `admin` password). TLS
certificates for all internal hops are generated at deploy time from the shared
`WAZUH_CA_SEED` secret, matched to Railway's `*.railway.internal` private hostnames.
Persistent state lives in one volume per service (Railway's limit) — alerts, enrolled agent
keys and inventory indices survive restarts. Expect 4–6 GB RAM in actual use (~$25–50/mo);
the first boot takes 3–5 minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wazuh-indexer | [lNamelessl/wazuh-railway-template](https://github.com/lNamelessl/wazuh-railway-template) (root: indexer) | Database |
| wazuh-manager | [lNamelessl/wazuh-railway-template](https://github.com/lNamelessl/wazuh-railway-template) (root: manager) | Database |
| wazuh-dashboard | [lNamelessl/wazuh-railway-template](https://github.com/lNamelessl/wazuh-railway-template) (root: dashboard) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `API_PASSWORD` | wazuh-indexer | (secret) |
| `INDEXER_PASSWORD` | wazuh-indexer | (secret) |
| `DASHBOARD_PASSWORD` | wazuh-indexer | (secret) |
| `API_PASSWORD` | wazuh-manager | (secret) |
| `INDEXER_PASSWORD` | wazuh-manager | (secret) |
| `API_PASSWORD` | wazuh-dashboard | (secret) |
| `INDEXER_PASSWORD` | wazuh-dashboard | (secret) |
| `DASHBOARD_PASSWORD` | wazuh-dashboard | (secret) |

## Configuration

- **Volume:** `/var/lib/wazuh-indexer`
- **TCP Proxies:** 1514, 1515
- **Volume:** `/var/ossec/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Python, Smarty, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/wazuh-template)
