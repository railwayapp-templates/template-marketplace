# Deploy Listmonk | (Just Updated) Mailchimp Alternative Nobody Else Can Claim Before You Do on Railway

Newsletter manager that seeds its own admin and fixes unsubscribe links

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/listmonk-or-just-updated-mailchimp-alter)

## About

Listmonk is a self-hosted newsletter and mailing-list manager — subscriber lists, segmentation
with SQL queries, campaign templates, transactional mail, bounce processing, analytics and a
full REST API — in a single Go binary backed by Postgres. It is the open-source alternative to
Mailchimp, Sendinblue and Campaign Monitor, and it runs comfortably on a small Railway plan.

This template deploys Listmonk **v6.2.0** with a super admin account already created, its public
URL already configured, and a login rate limit in front of it.

Listmonk stores everything except uploaded media in Postgres, so a working deployment is the app
plus a database plus a volume for `/listmonk/uploads`. Two things about it are easy to get wrong
on any platform and are wrong on most published Railway templates:

**Nobody is logged in until somebody claims the instance.** `listmonk --install` only creates an
administrator when `LISTMONK_ADMIN_USER` and `LISTMONK_ADMIN_PASSWORD` are set; without them it
prints `no superadmin user created. Visit webpage to create user.` and the login page turns into
a first-time-setup form. Any visitor who submits it becomes Super Admin. The older
`app.admin_username` / `app.admin_password` settings do **not** prevent this — since Listmonk v3
those values are cached as a legacy *API* credential, which cannot sign in to the dashboard at
all. This template seeds a real dashboard account from a generated password before the service
is reachable, and re-applies it on every boot, so a redeploy is a working password reset.

**`app.root_url` is a database setting, not an environment variable.** It defaults to
`http://localhost:9000`, and it is the address that every unsubscribe link, view-in-browser link,
tracking pixel, archive URL and password-reset mail is built from. A newsletter sent from a fresh
install carries dead links and an unsubscribe URL that resolves to nothing. This template writes
the deployment's own domain into that setting on boot, and leaves it alone once you point the
instance at a custom domain.

The template also runs nginx in front of Listmonk with a 10-per-minute login limit keyed on the
first address in `X-Forwarded-For` — Listmonk itself contains no login throttle of any kind, and
Railway's edge appends a hop that rotates between requests, so a limiter keyed on the whole
header never fires.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17-alpine` | Database |
| listmonk | `ghcr.io/bon5co/listmonk-railway:6.2.0` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `LISTMONK_db__user` | listmonk | (secret) |
| `LISTMONK_ADMIN_USER` | listmonk | (secret) |
| `LISTMONK_db__password` | listmonk | (secret) |
| `LISTMONK_ADMIN_PASSWORD` | listmonk | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/listmonk/uploads`

**Category:** Other

[View on Railway →](https://railway.com/deploy/listmonk-or-just-updated-mailchimp-alter)
