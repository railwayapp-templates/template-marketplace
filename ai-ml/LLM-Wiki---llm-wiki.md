# Deploy LLM Wiki on Railway

Karpathy's LLM wiki, self-hosted: Claude builds your wiki over MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llm-wiki)

## About

LLM Wiki is an open-source take on Andrej Karpathy's LLM wiki idea: a personal Wikipedia that an AI builds
and maintains for you. Upload papers, notes, PDFs, Word and PowerPoint files, connect Claude (or Codex, or
any MCP client), and let it compile interlinked wiki pages with citations back to your sources, then keep
them current as you add more. This is a community-maintained template; it is not affiliated with the LLM
Wiki project.

LLM Wiki's hosted mode is a Next.js web app, a FastAPI API, an MCP server and a document converter
(LibreOffice and opendataloader), on Supabase Auth and Postgres with S3 storage. Claude and other MCP
clients sign in through Supabase Auth's OAuth 2.1 server. Upstream runs it on Supabase Cloud and AWS and
documents only its local desktop mode.

This template runs the whole hosted stack on Railway, in one project, eight services with every secret
generated: a self-hosted Supabase (Postgres, Auth with the OAuth server, and its gateway), RustFS object
storage, the converter, and LLM Wiki's API, MCP server and web app, built from a pinned upstream commit.
No Supabase account and no AWS.

The first start does the setup for you: it applies LLM Wiki's database migrations, creates the storage
bucket with a CORS policy for your web app, creates your owner account from the e-mail you enter, and only
then starts the API. Signup is closed by default and enforced in the database: only the owner and the
addresses or domains you list get accounts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | `ghcr.io/youssefsiam38/llmwiki-railway-api:1.0.1` | Web service |
| storage | `ghcr.io/youssefsiam38/llmwiki-railway-storage:1.0.1` | Web service |
| kong | `ghcr.io/youssefsiam38/llmwiki-railway-kong:1.0.1` | Web service |
| web | `ghcr.io/youssefsiam38/llmwiki-railway-web:1.0.1` | Web service |
| db | `ghcr.io/youssefsiam38/llmwiki-railway-db:1.0.1` | Database |
| converter | `ghcr.io/youssefsiam38/llmwiki-railway-converter:1.0.1` | Worker |
| auth | `ghcr.io/youssefsiam38/llmwiki-railway-auth:1.0.1` | Worker |
| mcp | `ghcr.io/youssefsiam38/llmwiki-railway-mcp:1.0.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | api | 8000 | - |
| `S3_BUCKET` | api | llmwiki-documents | - |
| `JWT_SECRET` | api | (secret) | - |
| `OWNER_EMAIL` | api | - | Your e-mail address. It becomes the owner account you sign in with. |
| `PDF_BACKEND` | api | - | opendataloader (default, runs in the converter) or mistral. |
| `OWNER_PASSWORD` | api | (secret) | The owner's first password, generated. Copy it from here to sign in. |
| `MISTRAL_API_KEY` | api | (secret) | Mistral key for higher-quality PDF OCR; also set PDF_BACKEND=mistral. |
| `CONVERTER_SECRET` | api | (secret) | - |
| `LLMWIKI_PAGE_LIMIT` | api | - | Document pages each account may store (default 100000). |
| `LLMWIKI_SIGNUP_MODE` | api | closed | closed admits only the owner and LLMWIKI_ALLOWED_SIGNUPS; open lets anyone sign up. |
| `AWS_SECRET_ACCESS_KEY` | api | (secret) | - |
| `LLMWIKI_ALLOWED_SIGNUPS` | api | - | Comma-separated e-mail addresses and @domain entries that may create accounts. |
| `LLMWIKI_STORAGE_LIMIT_BYTES` | api | - | Bytes of uploads each account may store (default 10 GiB). |
| `PORT` | storage | 9000 | - |
| `RUSTFS_ACCESS_KEY` | storage | - | S3 access key for the document store, generated. |
| `RUSTFS_SECRET_KEY` | storage | (secret) | S3 secret key for the document store, generated. |
| `PORT` | kong | 8000 | - |
| `JWT_SECRET` | kong | (secret) | - |
| `PORT` | web | 3000 | - |
| `JWT_SECRET` | web | (secret) | - |
| `POSTGRES_PASSWORD` | db | (secret) | Password of the Supabase database roles, generated. |
| `PORT` | converter | 8000 | - |
| `S3_BUCKET` | converter | llmwiki-documents | - |
| `CONVERTER_SECRET` | converter | (secret) | Shared secret between the API and the document converter, generated. |
| `PORT` | auth | 9999 | - |
| `JWT_SECRET` | auth | (secret) | Signs the Supabase API keys, generated. |
| `GOTRUE_SMTP_HOST` | auth | - | SMTP host for password-reset e-mails. |
| `GOTRUE_SMTP_PASS` | auth | - | SMTP password. |
| `GOTRUE_SMTP_PORT` | auth | - | SMTP port. |
| `GOTRUE_SMTP_USER` | auth | (secret) | SMTP user. |
| `GOTRUE_SMTP_ADMIN_EMAIL` | auth | - | Sender address for account e-mails. |
| `LLMWIKI_SIGNING_KEY_SEED` | auth | - | Seed of the ES256 key that signs sessions and MCP tokens, generated. Changing it signs everyone out. |
| `GOTRUE_PASSWORD_MIN_LENGTH` | auth | (secret) | - |
| `GOTRUE_EXTERNAL_GOOGLE_SECRET` | auth | (secret) | Google OAuth client secret. |
| `GOTRUE_MAILER_URLPATHS_INVITE` | auth | /auth/v1/verify | - |
| `GOTRUE_EXTERNAL_GOOGLE_ENABLED` | auth | - | true to enable the Sign in with Google button. |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | auth | /auth/v1/verify | - |
| `GOTRUE_EXTERNAL_GOOGLE_CLIENT_ID` | auth | - | Google OAuth client id. |
| `GOTRUE_EXTERNAL_GOOGLE_REDIRECT_URI` | auth | - | Set to https://KONG-DOMAIN/auth/v1/callback, using the kong service's public domain. |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | auth | /auth/v1/verify | - |
| `GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE` | auth | /auth/v1/verify | - |
| `PORT` | mcp | 8080 | - |
| `S3_BUCKET` | mcp | llmwiki-documents | - |
| `AWS_SECRET_ACCESS_KEY` | mcp | (secret) | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/login`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/llm-wiki)
