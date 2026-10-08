# Deploy otari on Railway

OpenAI-compatible LLM gateway: virtual keys, budgets, usage tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/otari)

## About

[Otari](https://github.com/mozilla-ai/otari) is an open-source, OpenAI-compatible LLM gateway you run yourself. Put one endpoint in front of providers like OpenAI, Anthropic, Mistral, and Gemini, then issue virtual API keys, enforce budgets, and track usage and cost in one place. It speaks the OpenAI Chat Completions and Responses APIs plus the Anthropic Messages API.

This template runs two services and a storage bucket: the Otari gateway from its published Docker image (`mzdotai/otari:0.15.0`, pinned to a release), a managed PostgreSQL database, and a Railway bucket for uploaded files. Otari keeps no state on its own disk. Postgres holds your keys, users, budgets, and usage; the bucket holds the files you upload through the Files API, so they survive a redeploy and every replica reads the same files.

On first boot Otari runs its database migrations and prints a first-use API key in the deploy logs, so the gateway is usable right away. The template generates the master key, the key that encrypts stored provider credentials, and the provider account pepper for you. The gateway listens on port `8000`, with a healthcheck at `/api/v1/health/readiness`, so a deploy that cannot reach its database does not go live.

After the deploy:

1. Open the otari service's public domain.
2. Sign in with the master key (`OTARI_MASTER_KEY` on the Variables tab).
3. Add at least one provider on the Providers page.

Then make a request:

```bash
curl "https://YOUR_DOMAIN/api/v1/chat/completions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "openai:gpt-4o-mini", "messages": [{"role": "user", "content": "Say hello."}]}'
```

### What the template sets

| Variable | Value | Notes |
| --- | --- | --- |
| `OTARI_DATABASE_URL` | `${{Postgres.DATABASE_URL}}` | Pre-wired; leave as-is. |
| `OTARI_MASTER_KEY` | auto-generated | Signs you in to the dashboard and the management API. |
| `OTARI_SECRET_KEY` | auto-generated | Encrypts the provider credentials you add. Keep it: losing it makes them unrecoverable. |
| `OTARI_PROVIDER_ACCOUNT_PEPPER` | auto-generated | Required at startup while provider file copies are on. |
| `OTARI_REQUIRE_PRICING` | `false` | Serves models that have no configured pricing. |
| `OTARI_DEFAULT_PRICING` | `true` | Meters common models from community-maintained rates. Prices you set on the Models page always win. |
| `OTARI_FORWARDED_ALLOW_IPS` | `*` | Lets per-IP sign-in limits see the real client, not Railway's ingress. |
| `OTARI_PUBLIC_BASE_URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` | Your service's public URL, for sign-in redirects, passkeys and email links. Change it if you attach a custom domain. |
| `OTARI_FILES_BACKEND` | `s3` | Keeps uploaded files in the bucket, not on the container's disk. |
| `OTARI_FILES_S3_BUCKET` | `${{otari-files.BUCKET}}` | Pre-wired to the bucket's S3 name. |
| `OTARI_FILES_S3_ENDPOINT_URL` | `${{otari-files.ENDPOINT}}` | Pre-wired to the bucket's S3 endpoint. |
| `OTARI_FILES_S3_REGION` | `${{otari-files.REGION}}` | Pre-wired to the bucket's region. |
| `AWS_ACCESS_KEY_ID` | `${{otari-files.ACCESS_KEY_ID}}` | Pre-wired to the bucket's access key. |
| `AWS_SECRET_ACCESS_KEY` | `${{otari-files.SECRET_ACCESS_KEY}}` | Pre-wired to the bucket's secret key. |
| `PORT` | `8000` | The port Railway's healthcheck probes. Keep it equal to the target port. |

To keep provider keys in Railway variables instead of the dashboard, declare the providers through `OTARI_CONFIG_YAML`; see [Full config via environment](https://github.com/mozilla-ai/otari/blob/main/docs/configuration.md#full-config-via-environment).

### Upgrading

The image is pinned to a release, so a redeploy never migrates your schema by surprise. To upgrade, back up Postgres, read the [release notes](https://github.com/mozilla-ai/otari/releases), add any variable they say a release now requires (an existing deploy never gets new template variables), then change the image tag under Settings → Source. To take patch releases automatically, turn on Image Auto Updates with **Patches only**.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| otari | `mzdotai/otari:0.15.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Name of the database Otari uses. |
| `DATABASE_URL` | Postgres | - |  Private connection string. Otari reads it as OTARI_DATABASE_URL; leave as-is. |
| `POSTGRES_USER` | Postgres | (secret) | Name of the database superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password. Generated on deploy; leave as-is. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string through the TCP proxy, for backups or pg_dump. Leave as-is. |
| `PORT` | otari | 8000 | The port Railway's deploy-time healthcheck probes. Otari listens on OTARI_PORT (8000, pinned in the image) and never reads PORT, so without this the healthcheck probes nothing and the deploy fails after its timeout. Keep it equal to the target port. |
| `OTARI_MASTER_KEY` | otari | - | Master key for the management endpoints (/api/v1/keys, /api/v1/users, /api/v1/budgets, ...). Auto-generated on deploy; read it from this service's Variables tab, or override with your own value. |
| `OTARI_SECRET_KEY` | otari | (secret) | Fernet key that encrypts the provider credentials you add on the dashboard's Providers page. Auto-generated on deploy (43 url-safe characters plus '='); keep it, since losing it makes stored credentials unrecoverable. |
| `AWS_ACCESS_KEY_ID` | otari | - | Access key of the otari-files bucket, under the name boto3 reads. This is the bucket's key, not an AWS account key. Wired to the bucket; leave as-is. |
| `OTARI_DATABASE_URL` | otari | - | Postgres connection string. Wired to the managed Postgres service; leave as-is. Otari normalizes postgresql:// to the async driver automatically. |
| `OTARI_FILES_BACKEND` | otari | s3 | Keep uploaded files in the otari-files bucket rather than on the container's disk, which Railway discards on every redeploy and does not share between replicas. Leave as-is. |
| `AWS_SECRET_ACCESS_KEY` | otari | (secret) | Secret key of the otari-files bucket, under the name boto3 reads. Wired to the bucket; leave as-is. |
| `OTARI_DEFAULT_PRICING` | otari | true | Fall back to community-maintained default pricing (the bundled genai-prices dataset) for models you have not priced explicitly. The image default is false; pre-set to true here so a fresh deploy meters common models out of the box. Prices you set in the dashboard or via /api/v1/pricing always override the fallback. |
| `OTARI_FILES_S3_BUCKET` | otari | - | S3 name of the otari-files bucket. Wired to the bucket; leave as-is. |
| `OTARI_FILES_S3_REGION` | otari | - | S3 region of the otari-files bucket (Railway reports auto). Wired to the bucket; leave as-is. |
| `OTARI_PUBLIC_BASE_URL` | otari | - | This deployment's public URL, with no trailing slash. Builds OAuth redirect URIs, the passkey relying-party ID and the links in outgoing email. Pre-wired to the service's Railway domain; change it if you attach a custom domain. |
| `OTARI_REQUIRE_PRICING` | otari | false | Set to false so a fresh deploy serves models that have no configured pricing. The image default is true (fail-closed), which would reject every model until pricing is configured. |
| `OTARI_FORWARDED_ALLOW_IPS` | otari | * | Trust X-Forwarded-For from any peer, so the per-IP sign-in and public-catalog limits see the real client instead of Railway's ingress. Safe here because the ingress is the only path to the container. Without it every visitor shares a few ingress addresses, and ten wrong passwords from anyone lock the dashboard for everyone for a minute. |
| `OTARI_FILES_S3_ENDPOINT_URL` | otari | - | S3 endpoint of the otari-files bucket. Wired to the bucket; leave as-is. |
| `OTARI_PROVIDER_ACCOUNT_PEPPER` | otari | - | Key that names the provider account a copy of an attached file is in. Otari refuses to start without it while provider copies are on. Auto-generated on deploy, independent of OTARI_SECRET_KEY; losing it only makes the next request copy each file again. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/health/readiness`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/otari)
