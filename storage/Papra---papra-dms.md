# Deploy Papra on Railway

Document archive that makes scans and PDFs searchable by their text

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/papra-dms)

## About

Papra is a minimalistic document management and archiving platform — a digital shelf for paperwork you want to keep but never think about again. Receipts, warranties, contracts, scanned letters: you drop the file in, Papra pulls the text out of it, and months later you find it by typing a word from inside the page rather than recalling what you named the file. It is open source under AGPL-3.0, for households, freelancers and small teams who want a searchable archive without handing their documents to a filing service.

Self-host Papra on Railway and this template pre-configures it all: the `papra` service running the API and web client from one container, a `papra-documents` bucket holding every uploaded file, a volume carrying the SQLite database and its full-text index, and a `mailpit` service so invitations and password resets go somewhere you can read. Documents are written to the bucket encrypted and streamed back through the app, never through public storage URLs, so nothing is reachable without a session.

![Papra and Mailpit services with volumes on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789493853/papra-architecture.webp)

Papra is deliberately small. There is no workflow designer, no sign-off chain, no taxonomy to build before you file your first receipt. You upload documents, Papra makes them findable, and it stays out of the way — which fits the job most document managers over-serve: a household or a two-person business that would rather run one container than administer an enterprise ECM.

Key features:

- **Full-text search across document content**, not just file names, via SQLite FTS5
- **Automatic text extraction** from PDFs, images and scans, with Tesseract OCR as the fallback
- **Organizations** so several people share one archive, with invitations and roles
- **Tags and tagging rules** that classify new uploads from their content
- **Email and folder ingestion**, so a scanner or forwarded message files itself
- **API, SDK, webhooks and a CLI**, so the archive is programmable

`papra` serves the web client, the REST API and the background task worker from one process, keeping its database on a volume. `papra-documents` is the bucket every uploaded file is written to, keeping the volume small and letting the archive grow. `mailpit` is a capture-only SMTP server on the private network, holding what Papra sends until you point the template at a real relay.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| papra | [gridalpha/papra-railway](https://github.com/gridalpha/papra-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Web inbox port |
| `SMTP_USER` | mailpit | (secret) | SMTP username Papra authenticates with |
| `MP_UI_AUTH` | mailpit | - | Basic auth on the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailpit | - | Credentials the SMTP listener accepts |
| `SMTP_PASSWORD` | mailpit | (secret) | SMTP password Papra authenticates with |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailpit | true | Allow auth on the plaintext private listener |
| `PORT` | papra | 1221 | HTTP port the app listens on |
| `SMTP_HOST` | papra | - | Private mail host |
| `SMTP_PORT` | papra | 1025 | Mailpit SMTP port |
| `SMTP_USER` | papra | (secret) | SMTP username |
| `AUTH_SECRET` | papra | (secret) | Session signing secret, 32+ chars |
| `SMTP_SECURE` | papra | false | Plain connection on the private network |
| `APP_BASE_URL` | papra | - | Public URL for links and cookies |
| `DATABASE_URL` | papra | file:/app/app-data/db/db.sqlite | SQLite database on the volume |
| `NODE_OPTIONS` | papra | --max-old-space-size=3072 | Node heap ceiling for the container |
| `EMAILS_DRIVER` | papra | smtp | Send mail over SMTP |
| `SMTP_PASSWORD` | papra | (secret) | SMTP password |
| `PAPRA_ADMIN_NAME` | papra | Admin | Display name for that account |
| `PAPRA_ADMIN_EMAIL` | papra | admin@example.com | First admin account, seeded at boot |
| `EMAILS_FROM_ADDRESS` | papra | - | From address on outgoing mail |
| `SERVER_CORS_ORIGINS` | papra | - | Origins allowed to call the API |
| `PAPRA_ADMIN_PASSWORD` | papra | (secret) | Its password, at least 8 characters |
| `DOCUMENTS_OCR_LANGUAGES` | papra | eng | Tesseract language codes |
| `DOCUMENT_STORAGE_DRIVER` | papra | s3 | Store documents in object storage |
| `DOCUMENT_STORAGE_S3_REGION` | papra | - | Bucket region |
| `AUTH_IS_REGISTRATION_ENABLED` | papra | false | Public sign-up, closed by default |
| `DOCUMENT_STORAGE_S3_ENDPOINT` | papra | - | Bucket endpoint, scheme included |
| `AUTH_IS_PASSWORD_RESET_ENABLED` | papra | (secret) | Password reset emails |
| `DOCUMENT_STORAGE_S3_BUCKET_NAME` | papra | - | Bucket holding document files |
| `DOCUMENT_STORAGE_MAX_UPLOAD_SIZE` | papra | 26214400 | Per-file upload ceiling in bytes |
| `DOCUMENT_STORAGE_S3_ACCESS_KEY_ID` | papra | - | Bucket access key |
| `DOCUMENT_STORAGE_S3_FORCE_PATH_STYLE` | papra | true | Path-style addressing, required here |
| `DOCUMENT_STORAGE_S3_SECRET_ACCESS_KEY` | papra | (secret) | Bucket secret key |
| `DOCUMENT_STORAGE_ENCRYPTION_IS_ENABLED` | papra | true | Encrypt documents at rest |
| `DOCUMENT_STORAGE_DOCUMENT_KEY_ENCRYPTION_KEYS` | papra | - | Key wrapping each document key |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Volume:** `/app/app-data`

**Category:** Storage · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/papra-dms)
