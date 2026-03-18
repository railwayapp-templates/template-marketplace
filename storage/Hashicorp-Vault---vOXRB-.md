# Deploy Hashicorp Vault on Railway

Vault container in Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/vOXRB-)

## About

Once the project deployed, you must init it : 
 
1- Generate a domain to access it outside of railway. 

2- Download `vault` cli

3- Run : $env:VAULT_ADDR="https://${{GENERATED_DOMAIN}}"

4- Run : vault operator init

5- Store unseal keys securly ! For more information: https://developer.hashicorp.com/vault/docs/concepts/seal

6- Run $env:VAULT_TOKEN="${{GENERATED_TOKEN}}"

7- Mount services you need (Kvv1, Kvv2, etc...)

8- Create tokens for your services as you need

9- Everything you want...

10- Revoke root token (You can regenerate one using unseal keys, see: https://developer.hashicorp.com/vault/tutorials/operations/generate-root)

11- Remove generated domain (use private network in your railway project)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vault-railway-template | [FournyP/vault-railway-template](https://github.com/FournyP/vault-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ENV` | prod | Use "dev" for a development server |
| `PORT` | 8200 | Port of listener address |
| `UI_ENABLED` | false | Enables the built-in web UI, which is available on all listeners (address + port) at the /ui path. |
| `STORAGE_PATH` | /vault/file | Configures the storage backend where Vault data is stored. |
| `MAX_LEASE_TTL` | 730h | Specifies the maximum possible lease duration for tokens and secrets. |
| `DEFAULT_LEASE_TTL` | 168h | Specifies the default lease duration for tokens and secrets. |
| `DEV_ROOT_TOKEN_ID` | (secret) | Setup in case of ENV = "dev" |

## Configuration

- **Volume:** `/vault/file`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/vOXRB-)
