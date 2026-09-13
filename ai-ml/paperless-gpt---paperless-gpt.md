# Deploy paperless-gpt on Railway

Add AI OCR, titles and tags to your paperless-ngx, behind a password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/paperless-gpt)

## About

paperless-gpt reads the documents in a paperless-ngx archive you already run and fills in what is
missing: a real title instead of a scanner filename, the correspondent, the document type, tags, and
better OCR for scans that plain text extraction could not handle. It sends pages to a language model
you choose and writes the results back. This is a community-maintained template; it is not
affiliated with the paperless-gpt project.

It is small to host: a Go binary serving its own web interface, one modest database of jobs and
settings, no companion services. Your documents stay where they are, in paperless-ngx; this service
fetches them per request.

The part that needs care is authentication, because paperless-gpt has none. It defines around thirty
API routes and not one of them checks a credential, since the project is designed to sit on a
private network beside the archive it talks to. On a platform that gives every service a public
address, that assumption stops being true the moment the deploy finishes, and what is behind those
routes is not a blank application: it is read and write access to contracts, invoices and
correspondence, plus the ability to spend the model key you configured.

This template puts a password in front of the application and binds the application itself to
loopback. The password is generated for you. One route stays open, a health route that belongs to
the template rather than the application, so the platform can watch the service without a route
existing that reaches your documents.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gpt | `ghcr.io/youssefsiam38/paperless-gpt-railway:1.0.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone used for timestamps. |
| `PORT` | 8080 | Port the front door listens on. Railway probes its healthcheck here, so keep it equal to the domain's target port. |
| `LLM_MODEL` | gpt-4o-mini | Model used for titles, tags and OCR. |
| `LLM_PROVIDER` | openai | Model provider: openai, anthropic, googleai, ollama or azure. |
| `OPENAI_API_KEY` | (secret) | Your key for the chosen provider. Use the matching variable if you picked another one. |
| `PAPERLESS_BASE_URL` | https://paperless.example.com | Address of the paperless-ngx you already run. Until you replace this placeholder the service shows a setup page instead of starting. |
| `PAPERLESS_API_TOKEN` | (secret) | A token from that instance: Settings, My Profile, API Auth Token. Leave it empty on the first deploy; the service shows a setup page until it is filled in. |
| `PAPERLESS_GPT_AUTH_PASSWORD` | (secret) | Password for that prompt. paperless-gpt has no login of its own, so this is what stops strangers reading and rewriting your documents. |
| `PAPERLESS_GPT_AUTH_USERNAME` | (secret) | Username for the password prompt that protects this instance. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/db`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/paperless-gpt)
