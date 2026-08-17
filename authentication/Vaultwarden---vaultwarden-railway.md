# Deploy Vaultwarden on Railway

Open-source password manager server that works with all Bitwarden apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vaultwarden-railway)

## About

Vaultwarden is a lightweight, unofficial Bitwarden-compatible server written in Rust. It speaks the same API as Bitwarden's own backend, so the official browser extensions, desktop apps, mobile apps and `bw` CLI connect to it unchanged — point them at your URL instead of bitwarden.com. Items are encrypted and decrypted in the client, so the server stores ciphertext it cannot read. Teams self-host Vaultwarden to keep credentials on infrastructure they control, and because it unlocks what Bitwarden gates behind paid plans: TOTP codes, attachments, Bitwarden Send, organisations and collections.

Deploy Vaultwarden on Railway and you get the server plus a managed PostgreSQL database behind a generated HTTPS domain. The Vaultwarden service serves the web vault, the client API and the WebSocket channel that pushes vault updates to signed-in devices, all on one port. Vault contents live in PostgreSQL, while a volume at `/data` holds the RSA key that signs every session token, attachments, Send payloads and the icon cache — so redeploys never sign your users out or lose their files.

![Vaultwarden Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786896353/265a9d96-072d-4915-8273-10b3cfa49f0f.png)

Bitwarden's official self-hosted server is a large stack — historically eleven containers around Microsoft SQL Server, with 2 GB of RAM as the documented floor. Vaultwarden reimplements the same API as one Rust binary idling in the tens of megabytes, which is why it became the usual way to run a Bitwarden-compatible server on a Raspberry Pi or a small VPS. It is a community project under AGPL-3.0, not a Bitwarden Inc. product.

Key features:

- Works with every official Bitwarden client: extensions, desktop, iOS, Android and CLI
- Zero-knowledge encryption — items are encrypted and decrypted client-side
- Built-in TOTP authenticator, file attachments and Bitwarden Send at no cost
- Organisations, collections and per-user permissions for team sharing
- Two-factor auth via authenticator apps, WebAuthn/passkeys, YubiKey, Duo and email
- Optional OpenID Connect SSO, emergency access and password-health reports
- An admin panel for invites, settings and diagnostics

The template runs two services. **Vaultwarden** is the application: web vault, API, admin panel and the WebSocket endpoint clients subscribe to for sync. **PostgreSQL** stores accounts, encrypted vault items, organisations and audit events; SQLite and MySQL also work, but Postgres is sturdier once the database has its own container. The `/data` volume is not optional — losing it regenerates the token-signing key and logs every device out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vaultwarden | `vaultwarden/server` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | vaultwarden | 8080 | Port the platform health-checks |
| `DOMAIN` | vaultwarden | - | Public base URL of the server |
| `IP_HEADER` | vaultwarden | X-Forwarded-For | Real client IP behind the proxy |
| `LOG_LEVEL` | vaultwarden | info | Log verbosity |
| `ADMIN_TOKEN` | vaultwarden | (secret) | Password for the /admin panel |
| `DATA_FOLDER` | vaultwarden | /data | Volume path for keys and files |
| `ROCKET_PORT` | vaultwarden | 8080 | Port Vaultwarden listens on |
| `DATABASE_URL` | vaultwarden | - | PostgreSQL connection string |
| `ICON_CACHE_TTL` | vaultwarden | 2592000 | Favicon cache lifetime, seconds |
| `SIGNUPS_ALLOWED` | vaultwarden | false | Public self-registration disabled |
| `EVENTS_DAYS_RETAIN` | vaultwarden | 90 | Days of audit events retained |
| `ORG_EVENTS_ENABLED` | vaultwarden | true | Organisation audit logging |
| `INVITATIONS_ALLOWED` | vaultwarden | true | Admin panel may invite users |
| `INVITATION_ORG_NAME` | vaultwarden | Vaultwarden | Name shown in invitation emails |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Start command:** `/bin/sh -c 'Q=$(printf "\047"); D=$(printf "\044"); T="$ADMIN_TOKEN"; case "$T" in "") echo "[railway] ADMIN_TOKEN unset - admin panel disabled" ;; "$D"argon2*) echo "[railway] ADMIN_TOKEN already an Argon2 PHC string - used as supplied" ;; *) L=$(printf "%s\n%s\n" "$T" "$T" | script -qec "/vaultwarden hash --preset owasp" /dev/null 2>&1 | tr -d "\r" | grep "^ADMIN_TOKEN="); H=${L#ADMIN_TOKEN=$Q}; H=${H%$Q}; case "$H" in "$D"argon2*) ADMIN_TOKEN="$H"; export ADMIN_TOKEN; echo "[railway] ADMIN_TOKEN hashed to an Argon2id PHC string (owasp preset)" ;; *) echo "[railway] WARNING: could not derive an Argon2 hash (script=$(command -v script)); using ADMIN_TOKEN as supplied" ;; esac ;; esac; exec /start.sh'`
- **Healthcheck:** `/alive`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/vaultwarden-railway)
