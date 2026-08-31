# Deploy Ente on Railway

End-to-end encrypted cloud for your photos and 2FA codes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ente)

## About

Ente is an open-source, end-to-end encrypted cloud for the two things people least want a provider to read: their photo library and their two-factor codes. Files, album names and TOTP secrets are encrypted on the device before they leave it, so the server only ever stores ciphertext. Ente Photos is an alternative to Google Photos and iCloud Photos, Ente Auth an alternative to Google Authenticator, and both ship native apps for iOS, Android, macOS, Windows, Linux and the web. Self-host Ente and you keep those clients while owning the storage, database and keys.

Deploy Ente on Railway and the whole stack arrives wired together. **museum** is the Go API server holding accounts, metadata and share links; **photos**, **accounts**, **albums**, **auth** and **cast** are the five web apps, each on its own public URL; **Postgres** stores metadata; a **Railway object storage bucket** holds the encrypted files; and **Mailpit** captures the verification-code emails Ente sends at sign-in. Clients fetch metadata from museum but upload encrypted blobs straight to the bucket through pre-signed URLs, so photo bytes never pass through the API server.

![Diagram of the Ente museum, web app, Postgres and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788060185/ente-architecture.png)

Ente's server is called museum: one Go binary owning accounts, album and file metadata, share links and the pre-signed URLs clients use to read and write objects. It never sees a decryption key, so self-hosting changes who holds the ciphertext, not how the cryptography works. Teams self-host it for a family or organisation library on their own infrastructure, to keep data in a chosen region, or to pay for storage rather than a subscription.

- End-to-end encrypted photo and video backup, with client-side search and albums
- Public album links that stay encrypted — the key rides in the URL fragment, never reaching the server
- Ente Auth: encrypted, synced TOTP codes, importable from Google Authenticator, Aegis and 2FAS
- Collaborative albums with viewer and collaborator roles, plus family sharing
- Cast to a TV or browser with a pairing code and no account on the display device

The web image bundles ten single-page apps on ten ports, each served from the root of its own origin, so every app you expose runs as its own service off that image with a different port. This template runs the five that matter for Photos and Auth; `share`, `embed`, `paste`, `locker` and `memories` add the same way.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cast | `ghcr.io/ente/web:latest` | Web service |
| auth | `ghcr.io/ente/web:latest` | Web service |
| albums | `ghcr.io/ente/web:latest` | Web service |
| photos | `ghcr.io/ente/web:latest` | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| museum | [gridalpha/ente-railway](https://github.com/gridalpha/ente-railway) | Web service |
| accounts | `ghcr.io/ente/web:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | cast | 3004 | Port the cast app is served on |
| `ENTE_API_ORIGIN` | cast | - | museum API base URL |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | cast | 1 | Size nginx workers from the container |
| `PORT` | auth | 3003 | Port the auth app is served on |
| `ENTE_API_ORIGIN` | auth | - | museum API base URL |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | auth | 1 | Size nginx workers from the container |
| `PORT` | albums | 3002 | Port the albums app is served on |
| `ENTE_API_ORIGIN` | albums | - | museum API base URL |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | albums | 1 | Size nginx workers from the container |
| `PORT` | photos | 3000 | Port the photos app is served on |
| `ENTE_API_ORIGIN` | photos | - | museum API base URL |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | photos | 1 | Size nginx workers from the container |
| `TZ` | mailpit | UTC | Timestamp timezone |
| `PORT` | mailpit | 8025 | Port the web inbox is served on |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before pruning |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web inbox listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Private SMTP listen address |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | museum | 8080 | HTTP port museum listens on |
| `ENTE_DB_HOST` | museum | - | Private Postgres hostname |
| `ENTE_DB_NAME` | museum | - | Database name |
| `ENTE_DB_PORT` | museum | - | Postgres port |
| `ENTE_DB_USER` | museum | (secret) | Database user |
| `ENTE_APPS_CAST` | museum | - | Cast app URL |
| `ENTE_LOG_LEVEL` | museum | info | Server log verbosity |
| `ENTE_SMTP_HOST` | museum | - | Mail host for verification codes |
| `ENTE_SMTP_PORT` | museum | 1025 | Mail port |
| `ENTE_DB_SSLMODE` | museum | require | Encrypt without certificate verification |
| `ENTE_SMTP_EMAIL` | museum | - | Envelope sender address |
| `ENTE_DB_PASSWORD` | museum | (secret) | Database password |
| `ENTE_APPS_ACCOUNTS` | museum | - | Accounts app URL |
| `ENTE_WEBAUTHN_RPID` | museum | - | Passkey relying party host |
| `MUSEUM_SECRET_SEED` | museum | (secret) | Seeds encryption, hash and JWT keys |
| `ENTE_S3_B2_EU_CEN_KEY` | museum | - | Bucket access key id |
| `ENTE_SMTP_SENDER_NAME` | museum | Ente | Display name on outgoing mail |
| `ENTE_APPS_PUBLIC_ALBUMS` | museum | - | Public album link host |
| `ENTE_WEBAUTHN_RPORIGINS` | museum | - | Allowed passkey origin |
| `ENTE_S3_B2_EU_CEN_BUCKET` | museum | - | Bucket name |
| `ENTE_S3_B2_EU_CEN_REGION` | museum | - | Object storage region |
| `ENTE_S3_B2_EU_CEN_SECRET` | museum | (secret) | Bucket secret access key |
| `ENTE_S3_ARE_LOCAL_BUCKETS` | museum | false | Keep TLS on for the bucket |
| `ENTE_S3_B2_EU_CEN_ENDPOINT` | museum | - | Object storage endpoint |
| `ENTE_S3_USE_PATH_STYLE_URLS` | museum | true | Required for browser upload CORS |
| `ENTE_INTERNAL_DISABLE_REGISTRATION` | museum | false | Set true once your account exists |
| `PORT` | accounts | 3001 | Port the accounts app is served on |
| `ENTE_API_ORIGIN` | accounts | - | museum API base URL |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | accounts | 1 | Size nginx workers from the container |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/livez`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ente)
