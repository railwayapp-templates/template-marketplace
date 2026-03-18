# Deploy SIWE-OIDC on Railway

Sign In With Ethereum OpenID Connect Provider

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/siwe-oidc)

## About

### Deploy and Host SIWE-OIDC on Railway

SIWE-OIDC is an OpenID Connect Identity Provider that enables web3 authentication using Sign-In with Ethereum (SIWE). It allows users to authenticate with their Ethereum wallets instead of traditional username/password systems, providing a decentralized identity solution for modern applications.

### About Hosting SIWE-OIDC

Hosting SIWE-OIDC involves running a Rust-based OpenID Connect provider that bridges Ethereum wallet authentication with standard OIDC flows. The service handles wallet signature verification, session management, and OIDC token issuance. It requires Redis for session storage and can be deployed as either a standalone binary or Cloudflare Worker. The service provides standard OIDC endpoints for integration with existing authentication systems while enabling web3-native user experiences.

### Common Use Cases

- Enable Ethereum wallet login for existing web applications using OIDC
- Integrate web3 authentication into enterprise identity management systems
- Provide decentralized identity for dApps that need traditional OAuth compatibility
- Bridge web3 users to web2 services without requiring separate account creation

### Dependencies for SIWE-OIDC Hosting

- Redis database (for session and state management)
- RSA private key (for JWT signing, auto-generated if not provided)

### Deployment Dependencies

- [Docker image available on GitHub Container Registry](https://github.com/signinwithethereum/siwe-oidc/pkgs/container/oidc)
- [WalletConnect Project ID](https://cloud.walletconnect.com/) (required for frontend functionality)

### Why Deploy SIWE-OIDC on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying SIWE-OIDC on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| siwe-oidc-provider | `ghcr.io/signinwithethereum/oidc:latest` | Web service |
| Redis | `railwayapp/redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PROJECT_ID` | siwe-oidc-provider | - | Wallet Connect Project ID |
| `SIWEOIDC_PORT` | siwe-oidc-provider | 8000 | - |
| `SIWEOIDC_ADDRESS` | siwe-oidc-provider | 0.0.0.0 | - |
| `SIWEOIDC_BASE_URL` | siwe-oidc-provider | https://oidc.example.com | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/bitnami`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/siwe-oidc)
