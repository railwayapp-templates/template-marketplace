# Deploy OpenBao on Railway

OpenBao 2.7 secrets manager with auto-unseal, admin login and KV store.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openbao-1)

## About

OpenBao is an open-source secrets manager and a Linux Foundation fork of HashiCorp Vault under the MPL license. It stores and encrypts secrets, issues dynamic database credentials, signs certificates, encrypts data as a service and controls access with policies. Existing Vault clients, SDKs and the Vault API work with it.

This template deploys OpenBao v2.7.0 from the official image with integrated Raft storage on a Railway volume. It unseals itself on every start with a generated static key, and self-initializes on first boot: it enables username and password login with an `admin` user, creates an admin policy, mounts a KV v2 engine at `secret/` and revokes the root token. The web UI and API run on your Railway domain. OpenBao is light and fits the Hobby plan. Keep `BAO_UNSEAL_KEY` safe, because without it the stored data cannot be decrypted. Back up the volume regularly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openbao | `openbao/openbao:2.7.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8200 |
| `BAO_LOCAL_CONFIG` | {"ui":true,"disable_mlock":true,"storage":{"raft":{"path":"/openbao/file","node_id":"openbao-1"}},"listener":[{"tcp":{"address":"[::]:8200","cluster_address":"[::]:8201","tls_disable":true}}],"seal":{"static":{"current_key_id":"railway-1","current_key":"env://BAO_UNSEAL_KEY"}},"initialize":[{"admin":{"request":[{"enable-userpass":{"operation":"update","path":"sys/auth/userpass","data":{"type":"userpass"}}},{"admin-policy":{"operation":"update","path":"sys/policies/acl/admin","data":{"policy":"path \"*\" { capabilities = [\"create\", \"read\", \"update\", \"delete\", \"list\", \"sudo\", \"patch\"] }"}}},{"admin-user":{"operation":"update","path":"auth/userpass/users/admin","data":{"password":{"eval_type":"string","eval_source":"env","env_var":"BAO_ADMIN_PASSWORD","require_present":true},"token_policies":["admin"]}}}]}},{"secrets":{"request":[{"enable-kv":{"operation":"update","path":"sys/mounts/secret","data":{"type":"kv","options":{"version":"2"}}}}]}}],"cluster_addr":"http://127.0.0.1:8201"} |
| `BAO_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh server`
- **Healthcheck:** `/v1/sys/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/openbao/file`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/openbao-1)
