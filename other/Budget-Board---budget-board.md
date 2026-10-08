# Deploy Budget Board on Railway

Self-hosted personal finance and budgeting with bank sync and PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/budget-board)

## About

Budget Board is an open-source, self-hosted personal finance app: track accounts, transactions and net worth, set
monthly budgets by category, plan goals, and pull in bank data automatically through SimpleFIN or LunchFlow. This
template deploys it ready for the internet: your owner account is created from the email you enter and a
generated password, and public sign-up is closed. It is a community-maintained template and is not affiliated with
the Budget Board project.

Budget Board is three pieces: an ASP.NET Core API server, a React web app served by nginx (which also proxies
`/api` to the server), and PostgreSQL. Only the web app gets a public domain; the API server and the database stay
on Railway's private network. All your financial data lives in PostgreSQL on a Railway volume.

A stock Budget Board on a public URL lets anyone who finds it create an account. Its only switch against that,
`DISABLE_NEW_USERS`, also blocks the very first account. This template solves both: on an empty database the server
first starts on loopback only, registers your owner account, then restarts with sign-up disabled, so registration
is never reachable from the network. The web app's nginx is also set to look up the API server at request time, so
it keeps working when the server is redeployed and its private address changes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| server | `ghcr.io/youssefsiam38/budget-board-railway:1.0.0@sha256:357cc3d11f323cf1ae947515ec348a307786076f97c79e556f398425802464fb` | Worker |
| db | `postgres:16.15@sha256:65b16a8b326e0cfbdf33fa7e783f2a0cb352a61448616ccccfd616ef42aa0f65` | Database |
| client | `ghcr.io/youssefsiam38/budget-board-railway-client:1.0.0@sha256:b0f93ec3a7fe1b08e56baeeb53ae2cb052f83e05b22d0d3a0c829e76a67694af` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | server | UTC | Server time zone. |
| `PORT` | server | 8080 | Port Railway health-checks (the API's 8080). Keep it. |
| `OIDC_ISSUER` | server | - | Optional. OIDC issuer URL. |
| `OWNER_EMAIL` | server | - | Your email. The owner account is created with it on the first start; you sign in with it. |
| `EMAIL_SENDER` | server | - | Optional. From address for e-mail (password resets). Enabling e-mail requires confirmed addresses. |
| `OIDC_ENABLED` | server | - | Optional. true enables OIDC single sign-on. |
| `POSTGRES_HOST` | server | - | The bundled PostgreSQL on Railway's private network. |
| `POSTGRES_PORT` | server | 5432 | PostgreSQL port. |
| `POSTGRES_USER` | server | (secret) | Database user, from the db service. |
| `CLIENT_ADDRESS` | server | - | The web app's address (CORS origin). Change it if you add a custom domain to client. |
| `OIDC_CLIENT_ID` | server | - | Optional. OIDC client id. |
| `OWNER_PASSWORD` | server | (secret) | The owner's initial password, generated. Copy it to sign in; change it in Budget Board later. |
| `EMAIL_SMTP_HOST` | server | - | Optional. SMTP host. |
| `EMAIL_SMTP_PORT` | server | - | Optional. SMTP port (default 587). |
| `DISABLE_NEW_USERS` | server | true | true closes public sign-up (the owner is still created). Set false briefly to let someone else register. |
| `POSTGRES_DATABASE` | server | - | Database name, from the db service. |
| `POSTGRES_PASSWORD` | server | (secret) | Database password, from the db service. |
| `DISABLE_LOCAL_AUTH` | server | - | Optional. true allows OIDC login only (requires OIDC_ENABLED=true). |
| `OIDC_CLIENT_SECRET` | server | (secret) | Optional. OIDC client secret. |
| `SYNC_INTERVAL_HOURS` | server | 8 | How often SimpleFIN/LunchFlow bank sync runs, in hours (minimum 1). |
| `ASPNETCORE_HTTP_PORTS` | server | 8080 | Port the API listens on (all interfaces, IPv6 dual-stack). Keep it equal to PORT. |
| `EMAIL_SENDER_PASSWORD` | server | (secret) | Optional. SMTP password. |
| `EMAIL_SENDER_USERNAME` | server | (secret) | Optional. SMTP user name. |
| `POSTGRES_DB` | db | budgetboard | PostgreSQL database. |
| `POSTGRES_USER` | db | (secret) | PostgreSQL user. |
| `POSTGRES_PASSWORD` | db | (secret) | PostgreSQL password, generated. |
| `PORT` | client | 6253 | Port the web app (nginx) listens on; the public domain targets it. |
| `VITE_SERVER_PORT` | client | 8080 | The API server's port. |
| `VITE_OIDC_ENABLED` | client | false | true shows the OIDC login button (configure OIDC_* on server and VITE_OIDC_* here). |
| `VITE_OIDC_PROVIDER` | client | - | Optional. OIDC issuer URL (same as OIDC_ISSUER on server). |
| `VITE_OIDC_CLIENT_ID` | client | - | Optional. OIDC client id (same as OIDC_CLIENT_ID on server). |
| `VITE_SERVER_ADDRESS` | client | - | The API server's private host name; nginx proxies /api to it. |
| `VITE_DISABLE_NEW_USERS` | client | true | Hides the sign-up form. Keep it in step with DISABLE_NEW_USERS on server. |
| `VITE_DISABLE_LOCAL_AUTH` | client | false | true hides email/password login (OIDC only; set DISABLE_LOCAL_AUTH on server too). |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/budget-board)
