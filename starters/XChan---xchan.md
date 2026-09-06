# Deploy XChan on Railway

Pair two devices and send an ephemeral encrypted secret.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xchan)

## About

XChan is a web app for pairing two devices and sending an ephemeral secret (for example a password from a computer you already have to a machine you are setting up). Each browser creates a non-exportable P-256 key pair. Pairing exchanges public keys through the server. Messages are ECIES-encrypted. The server is a relay only.

Hosting XChan is a single Node process. Pairing is one FIFO queue for everyone on that instance, so use one replica and do not run a public multi-tenant deployment. There is no database: identity keys and channels live in the browser, and the server does not store keys, channels, or messages. No environment variables are required. Railway should attach a public HTTP domain. The included Dockerfile builds with npm ci / npm run build and starts with npm start.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| xchan | [saldoukhov/xchan](https://github.com/saldoukhov/xchan) (branch: master) | Worker |

**Category:** Starters · **Languages:** Svelte, TypeScript, CSS, JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/xchan)
