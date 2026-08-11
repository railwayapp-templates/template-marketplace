# Deploy LLDAP directory server on Railway

Lightweight LDAP identity management with durable SQLite data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lldap-directory-server)

## About

LLDAP is a lightweight identity directory with a familiar web console and standards-based LDAP access for self-hosted applications.

The template runs the immutable LLDAP 0.6.3 image with generated administrator, JWT, and encryption credentials. A 5 GB volume preserves the complete SQLite-backed directory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LLDAP | `lldap/lldap:v0.6.3@sha256:2a8454b668c1aba7157e832eab0e242e1e7eb5fb7591d7e7774ba05286511ca8` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone used in LLDAP logs and directory operations. |
| `PORT` | 17170 | Public web administration listener. |
| `LLDAP_HTTP_URL` | - | Public HTTPS origin used by LLDAP. |
| `LLDAP_KEY_SEED` | - | Generated seed used to encrypt directory secrets. |
| `LLDAP_HTTP_PORT` | 17170 | HTTP port for the web administration console. |
| `LLDAP_LDAP_PORT` | 3890 | Private LDAP listener for project services. |
| `LLDAP_JWT_SECRET` | (secret) | Generated secret used to sign web sessions. |
| `LLDAP_LDAP_BASE_DN` | dc=example,dc=com | Root distinguished name for the directory. |
| `LLDAP_LDAP_USER_DN` | admin | Initial administrator login name. |
| `LLDAP_LDAP_USER_PASS` | - | Generated initial administrator password. |
| `LLDAP_LDAP_USER_EMAIL` | admin@example.com | Initial administrator email address. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/lldap-directory-server)
