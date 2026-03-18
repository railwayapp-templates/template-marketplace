# Deploy MAS and Synapse on Railway

we use mas and synapse for homeserver

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mas-and-synapse)

## About

Matrix Authentication Service (MAS) is an identity provider that enables secure login and account management for Matrix clients. Synapse is the reference homeserver implementation for the Matrix protocol, powering decentralized communication. Together, they provide authentication and messaging infrastructure for Matrix-based applications.

Hosting MAS and Synapse on Railway involves deploying two tightly integrated services: Synapse as the homeserver and MAS as the authentication provider. Each service requires its own PostgreSQL database and a set of environment variables for secrets, endpoints, and client configuration. Railway simplifies this process by auto-injecting service domains and database credentials, reducing manual setup. With MAS handling OIDC flows and Synapse managing communication, you can run a full Matrix stack with minimal effort. This setup is ideal for developers, communities, or organizations wanting to host secure, scalable, and decentralized communication infrastructure without managing servers directly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| synapse | [Penghuot/ess-helm](https://github.com/Penghuot/ess-helm) (root: /to-test-with-railway/synapse) | Web service |
| mas-service | [Penghuot/ess-helm](https://github.com/Penghuot/ess-helm) (root: /to-test-with-railway/mas) | Web service |
| synapse-db | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| mas-db | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | synapse | - | Port Synapse listens on inside the container. Example: 8008 |
| `MAS_CLIENT_ID` | synapse | - | OIDC client ID registered for Synapse with MAS. Example: 0000000000000000000SYNAPSE |
| `MAS_PUBLIC_URL` | synapse | - | Public URL of MAS service. Example: https://mas-service-production-6c0a.up.railway.app |
| `SYNAPSE_DB_HOST` | synapse | - | Host for Synapse PostgreSQL database, auto-injected by Railway. Example: containers-us-west-123.railway.app |
| `SYNAPSE_DB_NAME` | synapse | - | Name of Synapse PostgreSQL database, auto-injected by Railway. Example: railway |
| `SYNAPSE_DB_PORT` | synapse | - | Port for Synapse PostgreSQL database, auto-injected by Railway. Example: 5432 |
| `SYNAPSE_DB_USER` | synapse | (secret) | Username for Synapse PostgreSQL database, auto-injected by Railway. Example: postgres |
| `MAS_CLIENT_SECRET` | synapse | (secret) | OIDC client secret registered for Synapse with MAS. Example: 7XG6t2DaxVLtk81T3JaPRO9c3GBsfhapSutjnn/ieGE= |
| `MAS_MATRIX_ENDPOINT` | synapse | - | Public endpoint of MAS service. Example: https://mas-service-production-6c0a.up.railway.app |
| `SYNAPSE_DB_PASSWORD` | synapse | (secret) | Password for Synapse PostgreSQL database, auto-injected by Railway. Example: auto-generated |
| `SYNAPSE_FORM_SECRET` | synapse | (secret) | Secret used for CSRF protection in Synapse forms. Example: 574308507c1054af6354fcfe02d580120f01349e5b5abd6e0194e69beb531983 |
| `SYNAPSE_SERVER_NAME` | synapse | - | The server name for your Synapse homeserver, auto-injected by Railway. Example: synape-production-7433.up.railway.app |
| `SYNAPSE_PUBLIC_BASEURL` | synapse | - | Public base URL for Synapse, auto-injected by Railway. Example: https://synape-production-7433.up.railway.app/ |
| `MAS_MATRIX_SHARED_SECRET` | synapse | (secret) | Shared secret for secure communication with MAS. Must match MAS side. Example: 95946d21b1ae4cf8aef0c801b44dd35226d7a5f1ca500c08563151e128a89398 |
| `SYNAPSE_MACAROON_SECRET_KEY` | synapse | (secret) | Secret key used to sign macaroons (auth tokens). Example: 8f8f25f9a17fa9a7b495f8e8f44b9344ca47081f5defb0416b57b241c5d56284 |
| `MAS_CLIENT_ID` | mas-service | - | OIDC client ID registered for Synapse. Example: 0000000000000000000SYNAPSE |
| `MAS_PUBLIC_URL` | mas-service | - | Full public URL for MAS, auto-injected by Railway. Example: https://mas-service-production-6c0a.up.railway.app |
| `ELEMENT_WEB_URL` | mas-service | - | Public URL of your Element Web client. Example: https://web-element-production-1fad.up.railway.app |
| `MAS_LISTEN_ADDR` | mas-service | 0.0.0.0:8080 | Network address and port MAS listens on inside the container. Example: 0.0.0.0:8080 |
| `MAS_PUBLIC_BASE` | mas-service | - | Base public URL for MAS, auto-injected by Railway. Example: https://mas-service-production-6c0a.up.railway.app |
| `MAS_SIGNING_KEY` | mas-service | - | RSA private key used by MAS to sign tokens. Example: -----BEGIN RSA PRIVATE KEY----- ... -----END RSA PRIVATE KEY----- |
| `MAS_DATABASE_URI` | mas-service | - | Connection string for MAS PostgreSQL database, auto-injected by Railway. Example: postgres://user:password@host:5432/dbname |
| `MAS_EMAIL_DOMAIN` | mas-service | - | Domain used for email addresses issued by MAS. Example: matrix.synape-production-7433.up.railway.app |
| `MAS_CLIENT_SECRET` | mas-service | (secret) | OIDC client secret registered for Synapse. Example: 7XG6t2DaxVLtk81T3JaPRO9c3GBsfhapSutjnn/ieGE= |
| `MAS_ENCRYPTION_KEY` | mas-service | - | Key used by MAS for encrypting sensitive data. Example: e30ced82286c06d0d873277811e4d004afb200744080969cad9cebbbda4d0149 |
| `MAS_MATRIX_ENDPOINT` | mas-service | - | Public endpoint MAS uses to reach Synapse. Example: https://synape-production-7433.up.railway.app |
| `ELEMENT_WEB_CLIENT_ID` | mas-service | - | OIDC client ID registered for Element Web. Example: 00000000000000000000SEC0ND |
| `MAS_MATRIX_HOMESERVER` | mas-service | - | The domain name of the homeserver. Example: synape-production-7433.up.railway.app |
| `MAS_MATRIX_SERVER_NAME` | mas-service | - | The internal server name for your Matrix homeserver. Example: synape-production-7433.up.railway.app |
| `MAS_CLIENT_REDIRECT_URI` | mas-service | - | Redirect URI Synapse uses for OIDC callback. Example: https://synape-production-7433.up.railway.app/_synapse/client/oidc/callback |
| `MAS_MATRIX_SHARED_SECRET` | mas-service | (secret) | Shared secret for secure communication between MAS and Synapse. Example: 95946d21b1ae4cf8aef0c801b44dd35226d7a5f1ca500c08563151e128a89398 |
| `MAS_MATRIX_PUBLIC_ENDPOINT` | mas-service | - | The public HTTPS endpoint MAS uses to reach Synapse. Example: https://synape-production-7433.up.railway.app |
| `DATABASE_URL` | synapse-db | postgresql://${PGUSER}:${POSTGRES_PASSWORD}@${RAILWAY_PRIVATE_DOMAIN}:5432/${PGDATABASE} | Internal connection string for PostgreSQL. Example: postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway |
| `POSTGRES_PASSWORD` | synapse-db | (secret) | Generates a random 32-character password for PostgreSQL. Example: auto-generated secret like AbCdEfGhIjKlMnOpQrStUvWxYz123456 |
| `DATABASE_PUBLIC_URL` | synapse-db | postgresql://${PGUSER}:${POSTGRES_PASSWORD}@${RAILWAY_TCP_PROXY_DOMAIN}:${RAILWAY_TCP_PROXY_PORT}/${PGDATABASE} | Public connection string for PostgreSQL via Railway TCP proxy. Example: postgresql://postgres:password@proxy.railway.app:5432/railway |
| `DATABASE_URL` | mas-db | postgresql://${PGUSER}:${POSTGRES_PASSWORD}@${RAILWAY_PRIVATE_DOMAIN}:5432/${PGDATABASE} | Internal connection string for MAS PostgreSQL. Example: postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway |
| `POSTGRES_PASSWORD` | mas-db | (secret) | Generates a random 32-character password for MAS PostgreSQL. Example: auto-generated secret like AbCdEfGhIjKlMnOpQrStUvWxYz123456 |
| `DATABASE_PUBLIC_URL` | mas-db | postgresql://${PGUSER}:${POSTGRES_PASSWORD}@${RAILWAY_TCP_PROXY_DOMAIN}:${RAILWAY_TCP_PROXY_PORT}/${PGDATABASE} | Public connection string for MAS PostgreSQL via Railway TCP proxy. Example: postgresql://postgres:password@proxy.railway.app:5432/railway |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Python, Go Template, Go, Jinja, Shell, Dockerfile, HCL

[View on Railway →](https://railway.com/template/mas-and-synapse)
