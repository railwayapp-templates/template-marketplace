# Deploy Code Reviewer (Mira + MCP) on Railway

Always-on AI GitHub PR reviewer with dashboard, MCP, and your own LLM keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-reviewer-mira-mcp)

## About

Code Reviewer is a community Mira fork that runs as an always-on pull request reviewer. After a GitHub App webhook hits your public URL, it inspects the diff, writes review comments, and can take `@your-app review` mentions. A web dashboard shows installs and settings. The same service exposes Streamable HTTP MCP at `POST /mcp`, so Cursor, VS Code, Claude, and Windsurf can list repos and request a review without leaving the editor. You supply one LLM vendor key and your own GitHub App. It is not an official CodeRabbit product.

The template starts two services on a private network: Mira, built from the GitHub Dockerfile, and PostgreSQL with a persistent volume. Mira reads `DATABASE_URL` from the Postgres private URL. Health checks probe `/health` before Railway routes traffic.

After the first deploy, generate a public domain on Mira. Create a GitHub App, set the webhook to `https:///github/webhook`, and paste the App ID, full PEM private key, webhook secret, and App slug (`MIRA_BOT_NAME`). Pick a vendor with `MIRA_LLM` (`anthropic`, `openai`, `google`, `deepseek`, or `openrouter`) and fill only that vendor’s API key. `ADMIN_PASSWORD`, `MCP_API_KEY`, and `MIRA_WEBHOOK_SECRET` are generated with `${{secret()}}`. Install the App on the repositories you want reviewed, sign in to the dashboard as `admin`, then copy the MCP snippet from Settings → MCP into your IDE. Leave the replica running so GitHub webhooks are not dropped on a cold start.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mira | [D-Lite/mira-mcp](https://github.com/D-Lite/mira-mcp) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MIRA_LLM` | mira | - | LLM vendor: anthropic, openai, google, deepseek, or openrouter. Leave empty to default to OpenRouter. Fill only the matching API key below. |
| `MIRA_MODEL` | mira | - | Optional model id, e.g. anthropic/claude-sonnet-4-6. Leave empty for the vendor default. |
| `MCP_API_KEY` | mira | (secret) | Bearer token IDEs send to POST /mcp. Generated per deploy; copy it into your MCP client. |
| `DATABASE_URL` | mira | - | Private Postgres URL from the Postgres service. Do not replace with a public URL. |
| `MIRA_BOT_NAME` | mira | - | GitHub App slug for @mentions, e.g. code-reviewer-railway. Must match the App name. |
| `ADMIN_PASSWORD` | mira | (secret) | Dashboard password for user admin. Generated per deploy; copy it from Variables after deploy. |
| `GEMINI_API_KEY` | mira | (secret) | Optional. Google Gemini key if MIRA_LLM=google. Leave empty if you use another vendor. |
| `OPENAI_API_KEY` | mira | (secret) | Optional. OpenAI key (sk-…) if MIRA_LLM=openai. Leave empty if you use another vendor. |
| `DEEPSEEK_API_KEY` | mira | (secret) | Optional. DeepSeek key if MIRA_LLM=deepseek. Leave empty if you use another vendor. |
| `ANTHROPIC_API_KEY` | mira | (secret) | Optional. Claude key (sk-ant-…) if MIRA_LLM=anthropic. Leave empty if you use OpenAI, Gemini, DeepSeek, or OpenRouter instead. |
| `MIRA_GITHUB_APP_ID` | mira | - | Numeric GitHub App ID from github.com/settings/apps. Required for GitHub PR reviews. |
| `OPENROUTER_API_KEY` | mira | (secret) | Optional. OpenRouter key (sk-or-…) if MIRA_LLM=openrouter or MIRA_LLM is unset. Leave empty if you use Anthropic, OpenAI, Gemini, or DeepSeek. |
| `MIRA_WEBHOOK_SECRET` | mira | (secret) | GitHub App webhook secret. Generated per deploy; paste the same value into the GitHub App. |
| `MIRA_GITHUB_PRIVATE_KEY` | mira | - | Full GitHub App private key PEM, including BEGIN/END lines. Multiline; not a file path. |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot. Mira reads this via DATABASE_URL. Change only before the first deploy. |
| `DATABASE_URL` | Postgres | - | Private connection URL for services in this project. Mira should reference ${{Postgres.DATABASE_URL}}. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot. Change only before the first deploy. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, generated per deploy. Do not hardcode. Mira gets it through DATABASE_URL. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Python, TypeScript, Jinja, CSS, Shell, Dockerfile, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/code-reviewer-mira-mcp)
