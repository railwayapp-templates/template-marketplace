# Deploy Shelf Asset Management on Railway

Asset tracking with QR codes and bookings, on a self-hosted Supabase

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/shelf-asset-management)

## About

Shelf (shelf.nu) is open-source asset management. Teams track equipment and inventory with photos, custom
fields, categories, tags and locations, print QR codes that open an asset's page when scanned, record who
has what with custody, and reserve items with bookings and a calendar. Workspaces keep each team's
inventory separate. This is a community-maintained template; it is not affiliated with Shelf Asset
Management Inc.

Shelf is a React Router app on Node with a PostgreSQL database, using Supabase for sign-in and file storage.
Upstream's self-hosting guides expect a Supabase Cloud project configured by hand: migrations run by the
operator, four storage buckets created in the dashboard, e-mail templates rewritten to send one-time codes,
and the code length changed.

This template runs everything on Railway instead, in one project: a self-hosted Supabase (Postgres, Auth,
Storage and the Kong gateway) and Shelf's official image, five services with every secret generated and no
Supabase account. The first start applies Shelf's migrations, creates the buckets with the visibility
Shelf's guide specifies, configures sign-up e-mails with 6-digit codes, and creates your owner account with
a personal workspace through Shelf's own sign-up code, so you can sign in straight away.

Sign-up is closed by default and enforced in the database: the owner, the addresses or domains you list,
and people invited to a workspace get accounts; nobody else. Premium plans belong to Shelf's hosted
service, so every feature is on.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storage | `ghcr.io/youssefsiam38/shelf-railway-storage:1.0.0` | Database |
| app | `ghcr.io/youssefsiam38/shelf-railway-app:1.0.0` | Web service |
| auth | `supabase/gotrue:v2.196.0` | Database |
| kong | `ghcr.io/youssefsiam38/shelf-railway-kong:1.0.0` | Web service |
| db | `ghcr.io/youssefsiam38/shelf-railway-db:1.0.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | storage | 5000 | - |
| `JWT_SECRET` | storage | (secret) | - |
| `PORT` | app | 8080 | - |
| `APP_NAME` | app | Shelf | Name shown in e-mails. |
| `SMTP_PWD` | app | - | SMTP password, if your server needs one. |
| `SMTP_HOST` | app | - | Your SMTP server. Shelf sends invitations, sign-in codes and password resets by e-mail. |
| `SMTP_PORT` | app | 465 | 465 for TLS; other ports use plain SMTP with STARTTLS when the server offers it. |
| `SMTP_USER` | app | (secret) | SMTP user, if your server needs one. |
| `JWT_SECRET` | app | (secret) | - |
| `OWNER_EMAIL` | app | - | Your e-mail address. It becomes the owner account you sign in with. |
| `MAPTILER_TOKEN` | app | (secret) | MapTiler key for location maps (free tier available). |
| `OWNER_PASSWORD` | app | (secret) | The owner's first password, generated. Copy it from here to sign in. |
| `SESSION_SECRET` | app | (secret) | - |
| `SHELF_SIGNUP_MODE` | app | closed | closed admits only the owner, SHELF_ALLOWED_SIGNUPS and invited people; open lets anyone sign up. |
| `SMTP_FROM_ADDRESS` | app | - | The address e-mails are sent from, e.g. inventory@yourcompany.com. |
| `INVITE_TOKEN_SECRET` | app | (secret) | - |
| `SHELF_ALLOWED_SIGNUPS` | app | - | Comma-separated e-mail addresses and @domain entries that may sign up on their own. |
| `PORT` | auth | 9999 | - |
| `JWT_SECRET` | auth | (secret) | Signs sessions, signed photo URLs and the Supabase API keys, generated. |
| `GOTRUE_JWT_AUD` | auth | authenticated | - |
| `GOTRUE_JWT_EXP` | auth | 3600 | - |
| `GOTRUE_API_HOST` | auth | :: | - |
| `GOTRUE_API_PORT` | auth | 9999 | - |
| `GOTRUE_DB_DRIVER` | auth | postgres | - |
| `GOTRUE_SMTP_USER` | auth | (secret) | - |
| `GOTRUE_JWT_SECRET` | auth | (secret) | - |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | - |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | - |
| `GOTRUE_MAILER_OTP_LENGTH` | auth | 6 | - |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | false | - |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | - |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | - |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | - |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | - |
| `PORT` | kong | 8000 | - |
| `JWT_SECRET` | kong | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | Password of the Supabase database roles, generated. |

## Configuration

- **Volume:** `/var/lib/storage`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/shelf-asset-management)
