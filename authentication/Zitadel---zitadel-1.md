# Deploy Zitadel on Railway

A fully configured Zitadel instance with an optional V2 Login UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zitadel-1)

## About

From Zitadel's [website](https://zitadel.com/docs):

&gt; ZITADEL is the Identity Infrastructure for Developers.

&gt; We provide a hardened, extensible turnkey solution for all your authentication and authorization needs. Instead of building your own login system, use ZITADEL to accelerate your project with features that work out of the box:

- Secure Login: Multi-factor authentication (OTP, U2F, Passkeys) and single sign-on (OIDC, SAML, OAuth2).
- B2B Ready: First-class multi-tenancy with branding customization and self-service.
- Auditable: Exhaustive audit trail of all events.
- Extensible: Execute custom code on events (Actions) to fit your unique workflows.

V1 login UI should work right of the box. you can fetch the initial username and password from the env vars in your zitadel instance:
`FULL_ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME`
`ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORD`

If you want to use the Login V2 UI, do the following:
- Login via the Zitadel instance above
- Go to `/ui/console/users/create-machine` and create a machine / service user
- Create a personal access token (PAT) for that user.
- Go to `/ui/console/instance/members` and assign them the `Instance Login Client` role (aka `IAM_LOGIN_CLIENT`)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zitadel | `ghcr.io/zitadel/zitadel:latest` | Web service |
| zitadel-login | `ghcr.io/zitadel/zitadel-login:v4.11.0` | Web service |
| zitadel-pg | `ghcr.io/railwayapp-templates/postgres-ssl:17.7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ZITADEL_PORT` | zitadel | 8080 | - |
| `ZITADEL_TLS_ENABLED` | zitadel | false | - |
| `ZITADEL_EXTERNALPORT` | zitadel | 443 | - |
| `ZITADEL_METRICS_TYPE` | zitadel | otel | - |
| `ZITADEL_EXTERNALSECURE` | zitadel | true | - |
| `ZITADEL_OIDC_DEFAULTLOGINURLV2` | zitadel | (secret) | - |
| `ZITADEL_DATABASE_POSTGRES_USER_PASSWORD` | zitadel | (secret) | - |
| `ZITADEL_DATABASE_POSTGRES_USER_SSL_MODE` | zitadel | require | - |
| `ZITADEL_DATABASE_POSTGRES_USER_USERNAME` | zitadel | (secret) | - |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_PASSWORD` | zitadel | (secret) | - |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_SSL_MODE` | zitadel | require | - |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_USERNAME` | zitadel | (secret) | - |
| `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_PASSWORD` | zitadel | (secret) | - |
| `ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME` | zitadel | (secret) | - |
| `FULL_ZITADEL_FIRSTINSTANCE_ORG_HUMAN_USERNAME` | zitadel | (secret) | - |
| `ZITADEL_DEFAULTINSTANCE_FEATURES_LOGINV2_BASEURI` | zitadel | (secret) | - |
| `ZITADEL_DEFAULTINSTANCE_FEATURES_LOGINV2_REQUIRED` | zitadel | (secret) | - |
| `NEXT_PUBLIC_BASE_PATH` | zitadel-login | /ui/v2/login | This is the "subpath" for the login domain. This allows both services to live on the same domain without conflict. |
| `ZITADEL_SERVICE_USER_TOKEN` | zitadel-login | (secret) | If you want to use the V2 UI, you must login to the other instance and make a "machine user" called login-client and then give it the "LOGIN_CLIENT" role. You can then generate a PAT token for this machine user and you must copy+paste it here. |
| `POSTGRES_DB` | zitadel-pg | railway | - |
| `POSTGRES_USER` | zitadel-pg | (secret) | - |
| `POSTGRES_PASSWORD` | zitadel-pg | (secret) | - |

## Configuration

- **Start command:** `/app/zitadel start-from-init  --masterkeyFromEnv  --tlsMode external`
- **Healthcheck:** `/debug/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/template/zitadel-1)
