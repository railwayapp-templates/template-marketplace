# Deploy Musebot on Railway

AI secretary bot: 8 platforms, MCP, RAG, admin UI (start admin/admin)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/musebot)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/deploy/musebot)

**MuseBot Lite** — [MuseBot](https://github.com/yincongcyincong/MuseBot) (1.6k★, MIT, Go 1.24) — is a lightweight open-source AI Secretary that speaks **8 messaging platforms from a single Go binary**: Telegram, Discord, Slack, Lark/Feishu, DingDing, Work WeChat (企业微信), QQ (OneBot), and personal WeChat — with **LLM tool-calling (MCP)**, **RAG over your documents**, **cron-triggered briefings**, **streaming replies**, **image/voice/video generation**, and a built-in **admin dashboard**.

This Lite template ships the whole system in **one container** (the official `jackyin0822/musebot:v1.0.41` image plus a small Railway-volume compatibility shim): the bot server on **:36060**, the admin dashboard on **:18080**, the SQLite database, the RAG knowledge directory, and every generated media file all live on **one persistent volume** — no companion database service required, and every conversation survives redeploys.

- 8 messaging platforms from one binary — pick one or wire up several at the same time (fill the matching tokens)
- LLM-agnostic: DeepSeek, OpenAI, Gemini, OpenRouter, OrcaRouter, 302.AI, Volc, Aliyun, chatAnyWhere, or any OpenAI-compatible endpoint — set `TYPE` + matching token
- **RAG**: drop markdown/PDF/text into `KNOWLEDGE_PATH` and the bot grounds replies in *your* documents
- **Cron**: schedule "good morning" briefings or any LLM prompt on a crontab expression via the admin API
- **MCP tools**: point the MCP config at an MCP server and MuseBot exposes its tools to the LLM as function calls
- **Voice in / voice + image + video out** on Volc / Gemini / OpenAI / Aliyun / 302.AI engines
- **Admin dashboard** at port 18080 — manage users, tokens, records, RAG, cron, MCP, logs, and restart the bot remotely (`ADMIN_USER`/`ADMIN_PASSWORD` set the login)

| Item | Value |
|---|---|
| Runtime | Go 1.24 single binary + admin server, both under supervisord |
| Image | `jackyin0822/musebot:v1.0.41` (~228 MB compressed) + 2 files of wrapper code |
| Container user | `appuser` (uid 1000) — the wrapper entrypoint is root for the ~1 s chown step only |
| Persistence | one Railway volume at `/app/data` (SQLite DB + RAG corpus + generated media) |
| LLM providers | DeepSeek, OpenAI, Gemini, OpenRouter/OrcaRouter, 302.AI, Volc, Aliyun, chatAnyWhere, or any OpenAI-compatible endpoint — pick one via `TYPE` |
| Messaging platforms | Telegram, Discord, Slack, Lark/Feishu, DingDing, Work WeChat, QQ (OneBot), personal WeChat |
| Admin surface | port 18080 (login via `ADMIN_USER`/`ADMIN_PASSWORD`, default admin/admin) |
| Cost profile | Hobby $3 / 256 MB or 512 MB instance is comfortable; no companion services |
| Egress | LLM + bot APIs over outbound HTTPS; optional `LLM_PROXY` / `ROBOT_PROXY` for region-restricted endpoints |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| musebot | [mc9max/musebot](https://github.com/mc9max/musebot) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LANG` | en | Bot reply language: en, zh, ja, ko, or a 2-letter ISO code. |
| `TYPE` | deepseek | LLM provider. One of: deepseek, openai, gemini, vol, 302-ai, aliyun, openrouter, orcarouter, chatanywhere. Use the matching *_TOKEN below. |
| `DB_CONF` | /app/data/muse_bot.db | SQLite file path (DB_TYPE=sqlite3). Must sit on the /app/data volume. For mysql use a DSN: user:pass@tcp(host:3306)/db?parseTime=true |
| `DB_TYPE` | sqlite3 | Database backend: sqlite3 (default, single container) or mysql (companion MySQL service). |
| `BOT_NAME` | musebot | Bot display name shown to users. |
| `CHARACTER` | - | Optional. A persona / system prompt that shapes every reply. Empty = neutral secretary. |
| `HTTP_HOST` | :36060 | HTTP listen address. :36060 for a local health endpoint, or :$(PORT) to use the Railway-injected port. |
| `LLM_PROXY` | - | Optional. HTTP proxy for LLM API calls (useful when a provider endpoint is region-blocked). e.g. http://host:port |
| `USE_TOOLS` | true | Enable MCP function-calling / tools. true = on. |
| `ADMIN_USER` | (secret) | Optional. Dashboard admin username (default: admin). Set together with ADMIN_PASSWORD to override the built-in admin/admin login. |
| `MEDIA_TYPE` | - | Optional. Image/video-gen provider for /photo & /video (e.g. vol, aliyun, gemini). Empty = provider default from TYPE. |
| `SMART_MODE` | true | Smart reply mode (context-aware). true = on. |
| `LARK_APP_ID` | - | Lark / Feishu app ID (enables the Lark platform). |
| `MAX_QA_PAIR` | 100 | Max chat-history QA pairs retained per user. |
| `ALIYUN_TOKEN` | (secret) | Aliyun / DashScope API key (required when TYPE=aliyun — drives the Qwen models). |
| `GEMINI_TOKEN` | (secret) | Google Gemini API key (required when TYPE=gemini). |
| `IS_STREAMING` | true | Stream replies in real time. true = on. |
| `OPENAI_TOKEN` | (secret) | OpenAI API key (required when TYPE=openai). Optional when using an OpenAI-compatible gateway via LLM_PROXY. |
| `DEFAULT_MODEL` | - | Optional. Override the default model for the provider. Empty = provider default. |
| `ADMIN_PASSWORD` | (secret) | Optional. Dashboard admin password (default: admin). Set together with ADMIN_USER. Minimum 6 characters recommended. This replaces the insecure admin/admin default on first boot. |
| `DEEPSEEK_TOKEN` | (secret) | DeepSeek API key (required when TYPE=deepseek). Get one at platform.deepseek.com. |
| `DING_CLIENT_ID` | - | DingTalk client ID (enables the DingTalk platform). |
| `KNOWLEDGE_PATH` | /app/data/knowledge | RAG knowledge base directory — drop markdown/PDF docs here; '/search <query>' searches them. On the /app/data volume. |
| `TOKEN_PER_USER` | (secret) | Per-user rolling token budget per context window. |
| `LARK_APP_SECRET` | (secret) | Lark / Feishu app secret (with LARK_APP_ID). |
| `SLACK_BOT_TOKEN` | (secret) | Slack bot token (enables the Slack platform). |
| `COM_WECHAT_SECRET` | (secret) | Enterprise WeChat secret (with COM_WECHAT_CORP_ID). |
| `DISCORD_BOT_TOKEN` | (secret) | Discord bot application token (enables the Discord platform). |
| `OPEN_ROUTER_TOKEN` | (secret) | OpenRouter API key (required when TYPE=openrouter). |
| `COM_WECHAT_CORP_ID` | - | Enterprise WeChat corp ID (enables the Work WeChat platform). |
| `DING_CLIENT_SECRET` | (secret) | DingTalk client secret (with DING_CLIENT_ID). |
| `TELEGRAM_BOT_TOKEN` | (secret) | Telegram bot token from @BotFather (enables the Telegram platform). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Bots · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/musebot)
