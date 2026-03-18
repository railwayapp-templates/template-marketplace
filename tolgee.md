# Deploy Tolgee on Railway

A translation management platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/tolgee)

## About

Tolgee is an open-source localization platform that helps developers and teams manage translations efficiently. It provides an in-context translation editor, automatic translation via popular APIs, and integration with modern front-end frameworks. With Tolgee, you can streamline how your app handles multilingual content without depending on external translation tools.

Hosting Tolgee involves running its Java-based server alongside a PostgreSQL database. The server manages translation keys, authentication, and machine translation integrations (like Google or DeepL). On Railway, deployment is simplified: the template provisions a Tolgee service and a managed PostgreSQL instance, wiring them together automatically. You just configure environment variables (e.g., database URL, authentication secrets, and optional API keys for machine translation). Within minutes, you’ll have a fully functional Tolgee instance accessible at your Railway domain, ready to connect with your applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| App | `tolgee/tolgee:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | App | 8080 | Where Tolgee listens internally. |
| `TOLGEE_SMTP_AUTH` | App | true | Enables authentication when connecting to your mail server (almost always true). |
| `TOLGEE_SMTP_FROM` | App | Tolgee <no-reply@mydomain.com> | The sender address that appears in emails sent by Tolgee (e.g. invite or password reset emails). |
| `TOLGEE_SMTP_HOST` | App | email-smtp.regional-region.amazonaws.com | The hostname of your SMTP mail provider (e.g. AWS SES, Gmail, etc.). |
| `TOLGEE_SMTP_PORT` | App | 465 | The port used to connect to the SMTP server (465 for SSL, 587 for TLS). |
| `TOLGEE_PUBLIC_URL` | App | - | The base URL where your Tolgee instance is accessible (Railway injects the public domain here). |
| `TOLGEE_SMTP_PASSWORD` | App | (secret) | Password or token for authenticating to the SMTP server. |
| `TOLGEE_SMTP_USERNAME` | App | (secret) | The username for your SMTP login (often the email address or account ID). |
| `SPRING_DATASOURCE_URL` | App | - | The full JDBC connection string that tells Tolgee where your Postgres database is located (host, port, and database name). |
| `TOLGEE_SMTP_SSL_ENABLED` | App | true | Enables SSL encryption when sending mail. Should be true if using port 465. |
| `SPRING_DATASOURCE_PASSWORD` | App | (secret) | Password Tolgee uses to connect to the Postgres database. |
| `SPRING_DATASOURCE_USERNAME` | App | (secret) | onnection URL Tolgee uses to reach the Postgres database (includes host, port, and database name). |
| `TOLGEE_AUTHENTICATION_ENABLED` | App | true | Enables login/authentication in Tolgee (otherwise it runs open, without user accounts). |
| `TOLGEE_AUTHENTICATION_JWT_SECRET` | App | (secret) | Secret key used to sign JSON Web Tokens (JWTs) for user authentication. Must be kept private and random for security. |
| `TOLGEE_POSTGRES_AUTOSTART_ENABLED` | App | false | If set to true, Tolgee will try to start its own embedded Postgres. On Railway you already have a Postgres service, so this should stay false. |
| `TOLGEE_AUTHENTICATION_INITIAL_PASSWORD` | App | (secret) | The admin password for your first Tolgee login. Pick a strong password; you’ll use it to sign in the first time. |
| `TOLGEE_AUTHENTICATION_INITIAL_USERNAME` | App | (secret) | The admin username for your first Tolgee login. Choose something like admin or your email. |
| `TOLGEE_MACHINE_TRANSLATION_DEEPL_API_KEY` | App | (secret) | API key for DeepL Translation. Enter your DeepL API authentication key (from the DeepL console) to enable automatic translations via DeepL. |
| `TOLGEE_MACHINE_TRANSLATION_GOOGLE_API_KEY` | App | (secret) | API key for Google Cloud Translation. Enter your Google Cloud project’s Translation API key to enable automatic translations via Google. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/tolgee)
