# Deploy ion-agent on Railway

Deploy and Host ion-agent with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ion-agent)

## About

Ion is a persistent, self-hosted general agent with encrypted memory, provider-neutral AI model access, browser and computer control, document editing, software-development tools, and a web operator interface. This Railway template packages Ion, Ion Computer, Chromium, and ONLYOFFICE into one appliance running as a single Railway service.

Railway builds the root Dockerfile into one self-contained appliance that supervises Ion, Ion Computer, Chromium, and ONLYOFFICE. Only Ion’s web interface is publicly exposed through Railway’s generated HTTPS domain; the Computer and document services remain internal. Deployment requires one persistent volume mounted at `/data`, protected authentication credentials, and a vault encryption key. The appliance automatically uses Railway’s assigned port, exposes `/readyz` for health checks, and persists agent state, encrypted memory, Computer identity, and documents. Run one replica because the durable databases and Computer state use a single-writer architecture.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ion-agent | [paxlabs-inc/ion-agent](https://github.com/paxlabs-inc/ion-agent) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LLM_MODEL` | - | eg. mimo-v2.5-pro-ultraspeed |
| `ION_VAULT_KEK` | - | Random Base64 String |
| `PROVIDER_NAME` | - | Name od your LLM provider we reccomend Xiaomi |
| `PROVIDER_API_KEY` | (secret) | - |
| `ION_AUTH_PASSWORD` | (secret) | Passwoed to Access App |
| `ION_AUTH_USERNAME` | (secret) | Username to Access App |
| `PROVIDER_BASE_URL` | - | API base URL eg. https://api.xiaomimimo.com/v1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Go, TypeScript, PureBasic, TeX, Python, CSS, BibTeX Style, HTML, Shell, Rust, JavaScript, Makefile, Dockerfile, Go Template

[View on Railway →](https://railway.com/deploy/ion-agent)
