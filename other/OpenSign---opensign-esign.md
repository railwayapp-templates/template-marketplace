# Deploy OpenSign on Railway

Electronic signature platform for sending and signing PDF documents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opensign-esign)

## About

OpenSign is an open-source electronic signature platform — a self-hosted alternative to DocuSign, Dropbox Sign and PandaDoc. Upload a PDF, drag signature, initial, date and text fields onto it, and send it to whoever needs to sign. Every completed document is sealed with a real PKCS#7 digital signature and an audit trail recording who signed, when, and from which IP address. Legal, HR and procurement teams use it when contracts cannot leave their own infrastructure; developers use its REST API to fold signing into a product.

Deploy OpenSign on Railway and the whole stack arrives wired together. A Caddy gateway named `opensign` holds the single public domain, routing `/api/*` to the backend and serving the React app for everything else. `opensign-server` runs the API, the signing engine and DOCX conversion against a volume holding every uploaded and signed document. `opensign-client` serves the single-page app, `MongoDB` stores documents, templates, contacts and the audit trail, and `mailpit` captures signature e-mails. The signing certificate OpenSign requires is generated on first boot.

![Diagram of the OpenSign services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789268078/opensign-architecture.webp)

Self-hosting OpenSign matters when the documents are themselves the sensitive asset. Contracts, NDAs and patient forms pass through a signing platform in full, so a hosted service means handing that content — and everyone who signed it — to a third party. Running it yourself keeps the PDFs on storage you control and removes per-envelope pricing.

- Drag-and-drop signature, initials, stamp, name, date, text, checkbox and image fields
- Multiple signers with optional signing order, expiry dates and reminders
- Reusable templates for documents sent repeatedly
- PKCS#7 signing, a completion certificate and a per-event audit trail
- Optional per-document one-time-password verification, plus a REST API and webhooks

`opensign` is a Caddy gateway giving the app one origin — OpenSign builds the signing links it e-mails from the request host, so API and UI must answer on the same domain. `opensign-client` learns its API address at runtime, so no rebuild is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| opensign | `caddy:2-alpine` | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |
| opensign-server | [gridalpha/opensign-railway](https://github.com/gridalpha/opensign-railway) | Database |
| opensign-client | `opensign/opensign:main` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGOHOST` | MongoDB | - | Data panel alias, not read by the server |
| `MONGOPORT` | MongoDB | 27017 | Data panel alias, not read by the server |
| `MONGOUSER` | MongoDB | - | Data panel alias, not read by the server |
| `MONGO_URL` | MongoDB | - | Private connection string |
| `MONGOPASSWORD` | MongoDB | (secret) | Data panel alias, not read by the server |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Superuser password |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Superuser created on first boot |
| `PORT` | opensign | 8080 | Gateway listening port |
| `CADDY_CONFIG` | opensign | {"admin":{"disabled":true},"logging":{"logs":{"default":{"level":"INFO"}}},"apps":{"http":{"servers":{"srv0":{"listen":[":{env.PORT}"],"automatic_https":{"disable":true},"trusted_proxies":{"source":"static","ranges":["100.64.0.0/10","fd00::/8","152.233.0.0/17"]},"routes":[{"match":[{"path":["/healthz"]}],"handle":[{"handler":"static_response","status_code":200,"body":"ok"}],"terminal":true},{"match":[{"path":["/api/*"]}],"handle":[{"handler":"rewrite","strip_path_prefix":"/api"},{"handler":"reverse_proxy","upstreams":[{"dial":"opensign-server.railway.internal:8080"}]}],"terminal":true},{"handle":[{"handler":"reverse_proxy","upstreams":[{"dial":"opensign-client.railway.internal:3000"}]}],"terminal":true}]}}}}} | Caddy JSON config: /api to the backend, everything else to the SPA |
| `PORT` | mailpit | 8025 | Inbox port Railway health-checks |
| `MP_UI_AUTH` | mailpit | - | Username and password for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Inbox listen address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | SMTP listen address for private peers |
| `PORT` | opensign-server | 8080 | HTTP listening port |
| `APP_ID` | opensign-server | opensign | Parse application id, baked into the frontend |
| `NODE_ENV` | opensign-server | production | Node environment |
| `SMTP_HOST` | opensign-server | - | Mail server hostname |
| `SMTP_PASS` | opensign-server | - | Optional: SMTP password for a real relay |
| `SMTP_PORT` | opensign-server | 1025 | Mail server port |
| `USE_LOCAL` | opensign-server | true | Keep uploaded documents on the volume |
| `MASTER_KEY` | opensign-server | - | Parse master key; also signs document download URLs |
| `PFX_BASE64` | opensign-server | - | Optional: your own base64 PKCS#12 signing keystore |
| `SERVER_URL` | opensign-server | - | Public API base URL |
| `MONGODB_URI` | opensign-server | - | Private MongoDB connection string |
| `PARSE_MOUNT` | opensign-server | /app | Path the Parse API is mounted on |
| `PASS_PHRASE` | opensign-server | - | Optional: passphrase for that keystore |
| `SMTP_ENABLE` | opensign-server | true | Send mail over SMTP rather than Mailgun |
| `NODE_OPTIONS` | opensign-server | --max-old-space-size=3072 | Heap ceiling, sized to the container |
| `SMTP_USERNAME` | opensign-server | (secret) | Optional: SMTP username for a real relay |
| `SMTP_USER_EMAIL` | opensign-server | - | From address on outgoing mail |
| `OPENSIGN_ADMIN_NAME` | opensign-server | OpenSign Administrator | Display name for that administrator |
| `OPENSIGN_ADMIN_EMAIL` | opensign-server | admin@opensign.dev | First administrator, created at first boot |
| `OPENSIGN_OPEN_SIGNUP` | opensign-server | false | true re-enables self-service organisation signup |
| `OPENSIGN_ADMIN_COMPANY` | opensign-server | OpenSign | Organisation name created with it |
| `OPENSIGN_ADMIN_PASSWORD` | opensign-server | (secret) | Password for that administrator |
| `HOST` | opensign-client | :: | Dual-stack bind so the gateway can reach it |
| `PORT` | opensign-client | 3000 | Static server listening port |
| `REACT_APP_SERVERURL` | opensign-client | - | API address the browser calls |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c 'printf %s "$CADDY_CONFIG" > /etc/caddy/config.json; caddy validate --config /etc/caddy/config.json || exit 1; exec caddy run --config /etc/caddy/config.json'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/livez`
- **Volume:** `/data`
- **Healthcheck:** `/app/health`
- **Volume:** `/usr/src/app/files`
- **Healthcheck:** `/`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/opensign-esign)
