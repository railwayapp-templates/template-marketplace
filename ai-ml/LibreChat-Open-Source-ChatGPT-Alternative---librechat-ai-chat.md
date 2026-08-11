# Deploy LibreChat | Open Source ChatGPT Alternative on Railway

5-service LibreChat with search and RAG. ~1.5 GB RAM, about $25/month

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/librechat-ai-chat)

## About

LibreChat is an open-source chat interface for every major model provider at once — OpenAI, Anthropic, Google, and two dozen more — with conversations, agents, file search and full-text history in one place. This template deploys the whole stack, configured and working.

Five services, all from official upstream images:

- **LibreChat** — the web interface and API. Public domain, healthcheck, and a volume for uploads and generated images.
- **MongoDB** — conversations, messages, accounts and agents, on a volume.
- **Meilisearch** — full-text search across your conversation history, on a volume.
- **RAG** — the file-search sidecar that reads uploaded documents and answers from them.
- **VectorDB** — PostgreSQL with pgvector, holding the document embeddings, on a volume.

All 106 variables are filled in and described on the deploy screen. There is nothing you have to type to get a working deployment; sign in and it works. Adding your own model provider key is one variable.

Four things this template does that are worth knowing about:

**File search actually reaches the RAG service.** That sidecar is a Python server, and Python servers bind IPv4 by default while Railway's private network is IPv6 — so left alone it is simply unreachable from the chat container, and file search fails without an obvious reason. Here it binds `::` and the two talk over the private network, which the deploy log confirms in as many words: `RAG API is running and reachable`. The alternative other deployments settle on is giving the RAG service a public domain, which puts your document store on the open internet.

**Uploads and generated images survive a deploy.** LibreChat writes avatars, uploaded files and generated images to disk. Without a volume they are gone after the next restart — the database still lists them, and every one of them 404s. The app container has a volume here, with both directories on it, and it is verified: upload, redeploy, the file is still byte-identical.

**It pins released versions.** The image is `librechat:v0.8.7`, the newest release. That is a different image from the `librechat-dev:latest` that upstream's compose file and the existing deployments use — `dev` is built from the main branch and `latest` moves under you. Meilisearch is on the version upstream currently pins, twenty-four minor releases ahead of what the other templates ship, and Meilisearch changes its on-disk index format between minors.

**Boot logs stay readable.** LibreChat prints its whole resolved configuration at info level on every start, and the bundled model catalogue makes that about 114 KB — enough to blow through Railway's per-deployment log limit and drop the one line that explains a failed boot. The console level is not configurable, so this template uses the structured log transport, which is the one that truncates. A restart now costs about forty log lines instead of six hundred.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RAG | `ghcr.io/danny-avila/librechat-rag-api-dev-lite:v0.9.0` | Worker |
| MongoDB | `mongo:8.0.28` | Database |
| VectorDB | `pgvector/pgvector:0.8.6-pg17-trixie` | Database |
| Meilisearch | `getmeili/meilisearch:v1.35.1` | Database |
| LibreChat | `ghcr.io/danny-avila/librechat:v0.8.7` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | RAG | 8000 | Port Railway associates with this service. The application itself reads RAG_PORT and never looks at PORT — both are set, to the same number. |
| `DB_HOST` | RAG | - | PostgreSQL host, over the private network. |
| `DB_PORT` | RAG | 5432 | PostgreSQL port. |
| `RAG_HOST` | RAG | :: | Bind address, and the single setting that decides whether file search works. Railway's private network is IPv6, and this Python server defaults to IPv4 only — left alone it is unreachable from the chat service, which is why other deployments give it a public domain instead. There is no healthcheck on this service for the same reason: Railway probes over IPv4. |
| `RAG_PORT` | RAG | 8000 | Port the application actually binds. |
| `JWT_SECRET` | RAG | (secret) | Must match the chat service's secret — it is what authenticates the requests between them. |
| `POSTGRES_DB` | RAG | - | Database holding the embeddings. |
| `DEBUG_RAG_API` | RAG | false | Verbose logging plus a set of extra debugging routes. |
| `POSTGRES_USER` | RAG | (secret) | PostgreSQL role. |
| `VECTOR_DB_TYPE` | RAG | pgvector | Vector store backend. pgvector keeps the embeddings in the PostgreSQL service next door. |
| `EMBEDDINGS_MODEL` | RAG | text-embedding-3-small | Embedding model. Changing it after documents are indexed makes the existing vectors incomparable. |
| `POSTGRES_PASSWORD` | RAG | (secret) | PostgreSQL password, referenced from the database service. |
| `RAG_OPENAI_API_KEY` | RAG | (secret) | Replace with a real OpenAI key to turn on file search. It is a placeholder rather than an empty value on purpose: the embeddings client is built when the process starts and an empty key crashes it in a loop, so the service would be down instead of merely feature-less. |
| `SCARF_NO_ANALYTICS` | RAG | true | Stops the document-parsing library from phoning home on startup. |
| `EMBEDDINGS_PROVIDER` | RAG | openai | Who computes the embeddings. This is the lightweight image, so remote providers only; the local-model build is several gigabytes. |
| `PORT` | MongoDB | 27017 | Port MongoDB listens on inside the private network. There is no public proxy pointed at it. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Generated once on deploy. Changing it here does not change it inside the database. The alphabet is restricted on purpose — a `/` or `@` would break the connection string. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Root user created on first boot. |
| `PORT` | VectorDB | 5432 | Port PostgreSQL listens on inside the private network. |
| `POSTGRES_DB` | VectorDB | vectordb | Database created on first boot, holding the document embeddings. |
| `POSTGRES_USER` | VectorDB | (secret) | Superuser role created on first boot. |
| `POSTGRES_PASSWORD` | VectorDB | (secret) | Generated once on deploy. Changing it here does not change it inside the database. |
| `PORT` | Meilisearch | 7700 | Port Meilisearch listens on inside the private network. |
| `MEILI_ENV` | Meilisearch | production | Production mode. The `development` value exposes an unauthenticated web interface. |
| `MEILI_DB_PATH` | Meilisearch | /meili_data/data.ms | Index location, on the volume. |
| `MEILI_HTTP_ADDR` | Meilisearch | [::]:7700 | Bind address. Railway's private network is IPv6, and this socket stays dual-stack, so both sides are covered. |
| `MEILI_MASTER_KEY` | Meilisearch | - | Shared with the chat service — nothing else may query the index. |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Stops Meilisearch from sending usage data home. |
| `HOST` | LibreChat | 0.0.0.0 | Bind address. Nothing needs to reach this service over the private network, so IPv4 is enough and is what upstream documents. |
| `PORT` | LibreChat | 3080 | Port the app listens on and Railway routes public traffic and healthchecks to. |
| `SEARCH` | LibreChat | true | Full-text search over conversations, served by the Meilisearch service. Turning it off makes that service dead weight. |
| `CREDS_IV` | LibreChat | - | Initialisation vector for the same encryption. Exactly 32 hexadecimal characters, same warning as CREDS_KEY. |
| `NO_INDEX` | LibreChat | true | Asks search engines not to index this deployment. |
| `APP_TITLE` | LibreChat | LibreChat | Name shown in the browser tab and on the login screen. |
| `CREDS_KEY` | LibreChat | - | AES-256 key encrypting the API keys users paste in. Exactly 64 hexadecimal characters. Nothing validates it at startup, so a malformed value surfaces much later as an unrelated-looking decryption error — and changing it makes every stored key unreadable. |
| `ENDPOINTS` | LibreChat | openAI,agents,assistants,google,anthropic,custom | Which built-in endpoints appear. `custom` is what enables the two dozen providers from the config file above. |
| `LOGIN_MAX` | LibreChat | (secret) | Failed logins allowed inside the window below. |
| `MONGO_URI` | LibreChat | - | Connection string. The database name (`/LibreChat`) and `authSource=admin` belong together: the root user lives in the `admin` database, so naming a database without the auth source breaks the login, and omitting both puts every conversation in mongo's default `test` database. |
| `GOOGLE_KEY` | LibreChat | user_provided | Gemini models. Replace with a real key to provide them for everyone. |
| `JWT_SECRET` | LibreChat | (secret) | Signs session tokens, and signs the requests to the file-search service — which is why that service carries the same value. |
| `MEILI_HOST` | LibreChat | - | Meilisearch address on the private network. There is no public port pointed at it. |
| `CONFIG_PATH` | LibreChat | https://raw.githubusercontent.com/LibreChat-AI/librechat-config-yaml/main/librechat-env-l.yaml | The endpoint and model catalogue, maintained by the LibreChat organisation and regenerated daily — which is why it points at a branch rather than a pinned commit: pin it and the model lists stop at the day you deployed. Replace with your own URL or file path to take control of it. |
| `LOG_TO_FILE` | LibreChat | false | Writes rotating log files inside the container. Railway already captures stdout, so this only consumes disk. |
| `RAG_API_URL` | LibreChat | - | The file-search sidecar, over the private network. It answers there because RAG_HOST on that service is set to `::` — a Python server left on its default binds IPv4 only and is unreachable inside Railway, which is why other deployments end up giving it a public domain. |
| `TITLE_CONVO` | LibreChat | true | Lets the model name each conversation. Costs one short extra request per conversation. |
| `TRUST_PROXY` | LibreChat | 1 | Number of proxies in front of the app. Railway terminates TLS one hop away; without this the rate limiter and the login ban see the proxy instead of the visitor and treat everyone as one person. |
| `XAI_API_KEY` | LibreChat | (secret) | xAI, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `BAN_DURATION` | LibreChat | 7200000 | How long a ban lasts, in milliseconds (2 hours). |
| `BAN_INTERVAL` | LibreChat | 20 | Score at which a ban is issued. |
| `CONSOLE_JSON` | LibreChat | true | Structured JSON logs. This is not cosmetic: the app prints its whole resolved config at info level on every boot, which the model catalogue makes about 114 KB, and the JSON transport is the only one that truncates it. Without this a single restart floods the log rate limit. |
| `GITHUB_TOKEN` | LibreChat | (secret) | GitHub Models, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `GROQ_API_KEY` | LibreChat | (secret) | Groq, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `LOGIN_WINDOW` | LibreChat | (secret) | Login window, in minutes. |
| `REGISTER_MAX` | LibreChat | 5 | Registrations allowed from one address inside the window below. |
| `AI302_API_KEY` | LibreChat | (secret) | 302AI, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `DEBUG_CONSOLE` | LibreChat | false | Debug-level console output, even noisier than the above. |
| `DEBUG_LOGGING` | LibreChat | false | Verbose application logging. Upstream ships it on; on Railway that hits the per-deployment log rate limit and drops the lines a failed boot needs. |
| `DOMAIN_CLIENT` | LibreChat | - | Public address of the app. It is also a hard requirement: an empty or malformed value stops the server from starting at all. |
| `DOMAIN_SERVER` | LibreChat | - | Public address the API advertises, used for OAuth callbacks and links in emails. |
| `UNIFY_API_KEY` | LibreChat | (secret) | Unify, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `APIPIE_API_KEY` | LibreChat | (secret) | APIpie, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `BAN_VIOLATIONS` | LibreChat | true | Temporarily bans an account or address that trips the scores below. Worth knowing before you script against the API: a request with no browser user-agent scores 20 and bans on the spot, and the ban is stored in MongoDB, so restarting does not clear it. |
| `COHERE_API_KEY` | LibreChat | (secret) | Cohere, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `MESSAGE_IP_MAX` | LibreChat | 40 | Messages allowed per address inside the window below. |
| `NVIDIA_API_KEY` | LibreChat | (secret) | Nvidia, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `OPENAI_API_KEY` | LibreChat | (secret) | `user_provided` means each person enters their own key in the interface. Replace with a real key to serve the whole deployment from one account — the same applies to every provider key below. |
| `OPENROUTER_KEY` | LibreChat | user_provided | OpenRouter, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `SESSION_EXPIRY` | LibreChat | 900000 | Access token lifetime in milliseconds (15 minutes). |
| `KLUSTER_API_KEY` | LibreChat | (secret) | Kluster, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `MISTRAL_API_KEY` | LibreChat | (secret) | Mistral, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `NANOGPT_API_KEY` | LibreChat | (secret) | NanoGPT, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `REGISTER_WINDOW` | LibreChat | 60 | Registration window, in minutes. |
| `DEEPSEEK_API_KEY` | LibreChat | (secret) | DeepSeek, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `LIMIT_MESSAGE_IP` | LibreChat | true | Rate-limits messages per address. |
| `MEILI_MASTER_KEY` | LibreChat | - | Shared secret between this service and Meilisearch — the same value has to appear on both, which the reference on the Meilisearch side takes care of. |
| `MESSAGE_USER_MAX` | LibreChat | 40 | Messages per account, when the limit above is on. |
| `ALLOW_EMAIL_LOGIN` | LibreChat | (secret) | Email and password sign-in. |
| `ANTHROPIC_API_KEY` | LibreChat | (secret) | Claude models. Replace with a real key to provide them for everyone. |
| `FIREWORKS_API_KEY` | LibreChat | (secret) | Fireworks AI, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `HUGGINGFACE_TOKEN` | LibreChat | (secret) | Hugging Face, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `MESSAGE_IP_WINDOW` | LibreChat | 1 | That window, in minutes. |
| `OPENAI_MODERATION` | LibreChat | false | Runs messages through OpenAI's moderation endpoint first. Needs OPENAI_MODERATION_API_KEY. |
| `SAMBANOVA_API_KEY` | LibreChat | (secret) | SambaNova, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `ALLOW_REGISTRATION` | LibreChat | true | Open sign-up. The first account created becomes the administrator — so leave this on, register, then set it to false. The domain is public and the API keys are yours. |
| `ALLOW_SOCIAL_LOGIN` | LibreChat | (secret) | OAuth sign-in. Needs the client id and secret of a provider (Google, GitHub, Discord, OpenID) added as variables. |
| `ASSISTANTS_API_KEY` | LibreChat | (secret) | OpenAI Assistants API. Replace with a real key to provide it for everyone. |
| `HYPERBOLIC_API_KEY` | LibreChat | (secret) | Hyperbolic, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `JWT_REFRESH_SECRET` | LibreChat | (secret) | Signs refresh tokens. Changing it logs everyone out. |
| `LIMIT_MESSAGE_USER` | LibreChat | (secret) | Rate-limits messages per account as well. Off, because the per-address limit already covers the usual case. |
| `MEILI_NO_ANALYTICS` | LibreChat | true | Stops Meilisearch from sending usage data home. |
| `PERPLEXITY_API_KEY` | LibreChat | (secret) | Perplexity, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `TOGETHERAI_API_KEY` | LibreChat | (secret) | Together.ai, one of the providers defined in the config file. `user_provided` asks each person for their own key; a real key here serves everyone. |
| `MESSAGE_USER_WINDOW` | LibreChat | 1 | That window, in minutes. |
| `ALLOW_PASSWORD_RESET` | LibreChat | (secret) | Password reset by email. Off because it needs an SMTP server configured; without one the reset link is never sent. |
| `REFRESH_TOKEN_EXPIRY` | LibreChat | (secret) | Refresh token lifetime in milliseconds (7 days) — how long a browser stays signed in. |
| `LOGIN_VIOLATION_SCORE` | LibreChat | (secret) | Score added per failed login. |
| `CONCURRENT_MESSAGE_MAX` | LibreChat | 2 | That cap. |
| `MESSAGE_VIOLATION_SCORE` | LibreChat | 1 | Score added for exceeding a message rate limit. |
| `ALLOW_SOCIAL_REGISTRATION` | LibreChat | false | Lets an OAuth sign-in create an account that does not exist yet. |
| `LIMIT_CONCURRENT_MESSAGES` | LibreChat | true | Caps how many answers one user can have in flight. |
| `CONCURRENT_VIOLATION_SCORE` | LibreChat | 1 | Score added for exceeding the concurrent-message limit. |
| `CONSOLE_JSON_STRING_LENGTH` | LibreChat | 500 | Where the JSON transport cuts a long log string. Raise it if a truncated line hides something you need. |
| `NON_BROWSER_VIOLATION_SCORE` | LibreChat | 20 | Score added for a request without a browser user-agent — on its own enough to trigger a ban. Set to 0 if you intend to drive the REST API from scripts. |
| `REGISTRATION_VIOLATION_SCORE` | LibreChat | 1 | Score added per rejected registration. |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **Volume:** `/data/db`
- **Volume:** `/var/lib/postgresql`
- **Volume:** `/meili_data`
- **Start command:** `sh -c 'mkdir -p /data/uploads /data/images && rm -rf /app/uploads /app/client/public/images && ln -sfn /data/uploads /app/uploads && ln -sfn /data/images /app/client/public/images && exec npm run backend'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/librechat-ai-chat)
