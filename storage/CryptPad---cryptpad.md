# Deploy CryptPad on Railway

Encrypted office suite for shared documents and spreadsheets

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cryptpad)

## About

CryptPad is an end-to-end encrypted collaborative office suite: spreadsheets, documents, presentations, rich text, code, kanban boards, whiteboards, forms and diagrams, edited in the browser by several people at once. What separates it from every other online office suite is that the server never holds a key — documents are encrypted and decrypted in the browser, and the decryption key rides in the fragment of the share link, which browsers never send to the server. Journalists, legal teams and schools self-host it in place of Google Docs. It is built by XWiki SAS under the AGPL-3.0.

Deploy CryptPad on Railway and this template pre-configures both services the suite needs. The `cryptpad` service runs the application from a public source repository layered on the official `cryptpad/cryptpad` image, with the ONLYOFFICE editors already bundled so spreadsheets, documents and presentations work on the first click, and a persistent volume holding every encrypted document. The `sandbox` service is a small Caddy proxy providing the second public origin CryptPad requires — editors render in an iframe from a different domain under a strict Content Security Policy, out of reach of the keys on the parent page. Both get a Railway domain and are wired together for you.

![Diagram of the CryptPad and Caddy sandbox services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787809733/cryptpad-architecture.png)

Most "private" document tools encrypt in transit and at rest, which still leaves the operator holding the keys. CryptPad removes the operator from that equation: the server stores ciphertext it cannot read and relays edits between clients that decrypt locally. Self-hosting adds the rest — where that ciphertext lives and who may open an account.

- Eleven apps: Sheet, Document, Presentation, Rich Text, Code, Markdown Slides, Kanban, Whiteboard, Form, Poll and Diagram
- CryptDrive with folders, tags, search, sharing and a trash bin
- Teams — shared drives with owner, admin, member and viewer roles
- Anonymous, password-protected and expiring pads
- Real-time co-editing with presence, cursors and chat
- Per-user quotas, retention policies and admin usage statistics
- Import and export of `.xlsx`, `.docx`, `.pptx` and OpenDocument files

The architecture is deliberately small. `cryptpad` is the whole application: an HTTP tier serving the client, a websocket tier relaying encrypted edits, and workers handling storage. There is no database, because documents are kept as encrypted files rather than in a table nothing could index. `sandbox` only publishes a second hostname pointing at that same application, which is what makes the iframe isolation real.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sandbox | [gridalpha/cryptpad-railway](https://github.com/gridalpha/cryptpad-railway) (root: sandbox) | Web service |
| cryptpad | [gridalpha/cryptpad-railway](https://github.com/gridalpha/cryptpad-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | sandbox | 3000 | HTTP port Railway probes and serves |
| `CPAD_UPSTREAM` | sandbox | - | Private address of the application |
| `PORT` | cryptpad | 3000 | HTTP port Railway probes and serves |
| `NODE_OPTIONS` | cryptpad | --max-old-space-size=1024 | Node heap ceiling per process |
| `CPAD_DATA_DIR` | cryptpad | /cryptpad/persistent | Volume mount holding all encrypted data |
| `CPAD_LOGIN_SALT` | cryptpad | (secret) | Salt for password key derivation, fixed forever |
| `CPAD_MAIN_DOMAIN` | cryptpad | - | Public URL users visit |
| `CPAD_MAX_WORKERS` | cryptpad | 2 | HTTP and database workers per pool |
| `CPAD_MAX_UPLOAD_MB` | cryptpad | 20 | Largest single file upload |
| `CPAD_SANDBOX_DOMAIN` | cryptpad | - | Second origin for editor iframes |
| `CPAD_DEFAULT_STORAGE_MB` | cryptpad | 50 | Storage quota per registered account |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cryptpad/persistent`

**Category:** Storage · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/cryptpad)
