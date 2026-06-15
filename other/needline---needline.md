# Deploy needline on Railway

Open source self-hostable customer portal built on Linear

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/needline)

## About

Open source self-hostable customer portal built on Linear.

### 1. Create Linear app 
a. Choose your name, enter other fields

b. In `Linear -> Setttings -> API` you can create application, with redirect URI - `{base_url}/callback`

c. Enable client credentials

d. After app creation, save `Client ID` and `Client Secret`, they will go under `PUBLIC_CLIENT_ID`, `CLIENT_TOKEN` as environment variables respectively.

### 2. Create encryption keys
a. Keys for encryption of cookies and file can be generated with 
```bash
openssl rand -hex 32
```
(you need 2 32 bytes keys), they will go under `COKIE_ENCRYPTION_KEY` and `STORE_FILE_ENCRYPTION_KEY` as environment variables respectively.

b. For JWT encryption you can run 
```bash

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| needline | [princhman/needline](https://github.com/princhman/needline) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LABEL_NAME` | "needline" |
| `CLIENT_TOKEN` | (secret) |

## Configuration

- **Volume:** `/app/data`

**Category:** Other · **Languages:** TypeScript, Svelte, CSS, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/needline)
