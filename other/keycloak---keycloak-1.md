# Deploy keycloak on Railway

Railway template for keycloak

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keycloak-1)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/keycloak)

Keycloak is an open-source identity and access management (IAM) solution developed by Red Hat. It provides single sign-on (SSO), social login, OIDC/OAuth 2.0/SAML authentication, and centralized user management — all in a single Docker container on Railway.

Keycloak gives you enterprise-grade authentication without the complexity of managing a dedicated identity infrastructure:

- **Single Sign-On** — authenticate once across all your applications
- **Protocol Support** — OIDC, OAuth 2.0, SAML 2.0, and LDAP integration
- **Social Login** — built-in support for Google, GitHub, Facebook, and more
- **User Federation** — sync users from LDAP/Active Directory
- **Centralized Management** — admin console for users, roles, and permissions
- **Railway-native** — one-click deploy with auto-generated secrets and PostgreSQL companion

Deploying on Railway means automatic HTTPS, zero-config storage via volume mounts, and a PostgreSQL database provisioned alongside Keycloak — no infrastructure setup required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| keycloak | [INAPP-Mobile/keycloak](https://github.com/INAPP-Mobile/keycloak) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PG_USERNAME` | (secret) |
| `KEYCLOAK_ADMIN_USERNAME` | (secret) |

**Category:** Other · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/keycloak-1)
