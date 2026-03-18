# Deploy Hashicorp Vault on Railway

Deploy and Host Hashicorp Vault with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hashicorp-vault)

## About

HashiCorp Vault is an open-source secrets management platform that securely stores and manages sensitive data such as API keys, database credentials, tokens, certificates, and encryption keys. With dynamic secrets, encryption-as-a-service, and policy-based access control, Vault provides centralized security for modern applications.

This template deploys Vault on Railway using a single-node Raft storage backend, ready for horizontal scaling into a multi-node HA cluster.

This Vault template uses:

- A single-node Raft backend for durable storage

- TLS-enabled Vault API for secure interactions

- Railway persistent volumes for Raft data

- Private networking for future cluster members
  - Note: Public networking is also possible for clustering with additional configuration. (e.g. using a custom domain or a tunnel, etc...)

Railway handles networking, secret injection, volumes, and scaling, allowing you to run Vault securely without complex infrastructure overhead. You can later add additional nodes to the Raft cluster simply by duplicating the Vault service and adjusting environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vault | [jratienza65/vault-railway](https://github.com/jratienza65/vault-railway) | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ENV` | prod |
| `PORT` | 8200 |
| `LOG_LEVEL` | info |
| `UI_ENABLED` | true |
| `CLUSTER_NAME` | vault |
| `TLS_DISABLED` | true |
| `TLS_KEY_PATH` | /vault/tls/vault-key.pem |
| `TLS_CERT_PATH` | /vault/tls/vault.pem |
| `DEV_ROOT_TOKEN_ID` | (secret) |
| `RAFT_STORAGE_PATH` | /vault/data |
| `TLS_CLIENT_CERTS_DISABLED` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8201
- **Volume:** `/vault/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hashicorp-vault)
