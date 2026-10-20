# Deploy World Monitor v2 Global Intelligence Dashboard on Railway

Real-time news, conflict and market signals on one AI-powered map.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/world-monitor-v2-global-intelligence-das)

## About

World Monitor is an open-source global intelligence dashboard: live news, conflict and protest signals, markets, ships, aircraft, natural events and infrastructure on one interactive map. This community template runs the complete self-hosted stack from release v2.11.1 behind a login, with scheduled data jobs and no required API keys.

Self-hosting World Monitor means more than serving the web app. The dashboard reads from your own Redis, which three kinds of processes keep filled: the API sidecar inside the app container, the AIS relay (vessel stream, feed relays and about thirty background loops) and upstream's seed scripts. This template builds the app, relay and Redis REST proxy from the tagged upstream source, runs the seed scripts as five Railway cron jobs on upstream's own cadences, and puts a password-protected gateway in front as the only public endpoint. Secrets are generated at deploy and every internal call stays on Railway's private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worldmonitor | [baranberkay96/worldmonitor-railway](https://github.com/baranberkay96/worldmonitor-railway) (branch: main) (root: /services/worldmonitor) | Worker |
| redis-rest | [baranberkay96/worldmonitor-railway](https://github.com/baranberkay96/worldmonitor-railway) (branch: main) (root: /services/redis-rest) | Worker |
| Redis | `redis:8.2.10` | Database |
| gateway | [baranberkay96/worldmonitor-railway](https://github.com/baranberkay96/worldmonitor-railway) (branch: main) (root: /services/gateway) | Web service |
| seed-live | [baranberkay96/worldmonitor-railway](https://github.com/baranberkay96/worldmonitor-railway) (branch: main) (root: /services/worker) | Worker |
| seed-bundles | [baranberkay96/worldmonitor-railway](https://github.com/baranberkay96/worldmonitor-railway) (branch: main) (root: /services/worker) | Worker |
| seed-daily | [baranberkay96/worldmonitor-railway](https://github.com/baranberkay96/worldmonitor-railway) (branch: main) (root: /services/worker) | Worker |
| ais-relay | [baranberkay96/worldmonitor-railway](https://github.com/baranberkay96/worldmonitor-railway) (branch: main) (root: /services/worker) | Worker |
| seed-4h | [baranberkay96/worldmonitor-railway](https://github.com/baranberkay96/worldmonitor-railway) (branch: main) (root: /services/worker) | Worker |
| seed-hourly | [baranberkay96/worldmonitor-railway](https://github.com/baranberkay96/worldmonitor-railway) (branch: main) (root: /services/worker) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | worldmonitor | 8080 | nginx port inside the image (hardcoded upstream). Railway health-checks PORT, so keep 8080. |
| `LLM_MODEL` | worldmonitor | - | Optional. Model name for LLM_API_URL. |
| `ACLED_EMAIL` | worldmonitor | - | Optional. ACLED account email (free for researchers) for conflict and protest events. Without it the conflict index uses GDELT. |
| `EIA_API_KEY` | worldmonitor | (secret) | Optional. EIA key (free) for US energy and electricity data. |
| `LLM_API_KEY` | worldmonitor | (secret) | Optional. API key for LLM_API_URL. |
| `LLM_API_URL` | worldmonitor | - | Optional. Any OpenAI-compatible chat completions URL (used only together with LLM_API_KEY). |
| `FRED_API_KEY` | worldmonitor | (secret) | Optional. FRED key (free) for US macro series, rates and the economic calendar. |
| `OLLAMA_MODEL` | worldmonitor | - | Optional. Ollama model name (upstream default llama3.1:8b). |
| `VITE_VARIANT` | worldmonitor | full | Dashboard variant baked in at build time: full, tech, finance, commodity, happy or energy. Changing it rebuilds the service. |
| `WS_RELAY_URL` | worldmonitor | - | Private URL of ais-relay (vessels, flights, Telegram, OREF, relay-backed market data). The template patches the API sidecar to trust this one private origin. |
| `ACLED_PASSWORD` | worldmonitor | (secret) | Optional. ACLED account password (OAuth; tokens refresh automatically). |
| `OLLAMA_API_URL` | worldmonitor | - | Optional. Base URL of your own Ollama server for AI features without a cloud key, e.g. http://ollama.railway.internal:11434 (a private URL is trusted automatically). |
| `FINNHUB_API_KEY` | worldmonitor | (secret) | Optional. Finnhub key (free tier) for equity quotes, symbol search and the earnings calendar. Yahoo-based market data works without it. |
| `AISSTREAM_API_KEY` | worldmonitor | (secret) | Optional. aisstream.io key (free signup) for the live ship-tracking layer. The relay opens an outbound websocket; no inbound port is needed. |
| `AVIATIONSTACK_API` | worldmonitor | - | Optional. AviationStack key (free tier) for airport delays and flight data. |
| `OPENSKY_CLIENT_ID` | worldmonitor | - | Optional. OpenSky Network API client id (free account) for higher aircraft-tracking rate limits. |
| `UCDP_ACCESS_TOKEN` | worldmonitor | (secret) | Optional. UCDP API token for armed-conflict event data. |
| `WM_SESSION_SECRET` | worldmonitor | (secret) | Signs the anonymous browser session (wms_). Required, at least 32 characters; generated at deploy. |
| `NASA_FIRMS_API_KEY` | worldmonitor | (secret) | Optional. NASA FIRMS key (free) for the wildfire / thermal hotspot layer. |
| `OPENROUTER_API_KEY` | worldmonitor | (secret) | Optional. OpenRouter key (openrouter.ai, free models available): AI briefs and summaries, news threat classification on ais-relay, and the scheduled LLM seed jobs (insights, forecasts, regional briefs). Leave empty to keep server-side LLM calls off. |
| `RELAY_SHARED_SECRET` | worldmonitor | (secret) | Shared secret sent as x-relay-key to ais-relay. References the value generated on ais-relay. |
| `CLOUDFLARE_API_TOKEN` | worldmonitor | (secret) | Optional. Cloudflare Radar token for internet outage data. |
| `ALPHA_VANTAGE_API_KEY` | worldmonitor | (secret) | Optional. Alpha Vantage key (free) used as an equity and commodity quote fallback. |
| `OPENSKY_CLIENT_SECRET` | worldmonitor | (secret) | Optional. OpenSky Network API client secret. |
| `UPSTASH_REDIS_REST_URL` | worldmonitor | - | Upstash-compatible REST endpoint of redis-rest over the private network (World Monitor never speaks raw Redis). |
| `WM_TRUSTED_PROXY_CIDRS` | worldmonitor | 10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,100.64.0.0/10,fc00::/7 | Private ranges whose X-Forwarded-For nginx trusts (the gateway), so per-IP limits count real clients. Only private ranges: public clients reach this service through the gateway. |
| `WORLDMONITOR_RELAY_KEY` | worldmonitor | - | Dedicated relay/seeder secret for cache warm-pings and the news digest read (upstream #7437). Generated; ais-relay and the seed services reference it. |
| `WORLDMONITOR_VALID_KEYS` | worldmonitor | - | Operator API key(s), comma separated, for X-WorldMonitor-Key: REST API, detailed /api/health and the MCP server at /api/mcp. One key is generated at deploy. |
| `UPSTASH_REDIS_REST_TOKEN` | worldmonitor | (secret) | Bearer token for redis-rest. |
| `WORLDMONITOR_SEED_REFRESH_KEY` | worldmonitor | - | Secret that lets seed-bundles force the resilience ranking recompute. Generated; seed-bundles references it. |
| `PORT` | redis-rest | 8079 | Listen port of the Upstash-compatible REST proxy (dual-stack). Railway health-checks /healthz on it. |
| `SRH_TOKEN` | redis-rest | (secret) | Bearer token every caller must send. Generated; the other services reference it as UPSTASH_REDIS_REST_TOKEN. |
| `SRH_CONNECTION_STRING` | redis-rest | - | Private connection string of the Redis service (password auth). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis. |
| `REDIS_MAXMEMORY` | Redis | 512mb | Memory cap with allkeys-lru eviction (upstream compose: 256mb). Raise it with the service memory if INFO shows evicted_keys. |
| `PORT` | gateway | 8080 | Port Caddy listens on; the public domain and Railway's healthcheck use it. |
| `WM_UI_PASSWORD` | gateway | (secret) | Dashboard password, generated at deploy (at least 12 characters). Change it here and redeploy the gateway. |
| `WM_UI_USERNAME` | gateway | (secret) | Login name for the dashboard (HTTP basic auth). Letters, digits and . _ @ - only. |
| `WM_APP_UPSTREAM` | gateway | - | Private host:port of the worldmonitor service (nginx). |
| `WM_PUBLIC_DASHBOARD` | gateway | false | true removes the login. Only do this if you accept that anyone with the URL can trigger LLM briefs and keyed API calls on your keys. |
| `LLM_MODEL` | seed-live | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `ACLED_EMAIL` | seed-live | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `EIA_API_KEY` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_KEY` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_URL` | seed-live | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `API_BASE_URL` | seed-live | - | This install's API for seeders that read or warm it (insights, China signals, resilience scores). |
| `FRED_API_KEY` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_MODEL` | seed-live | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `SEEDERS_SKIP` | seed-live | - | Optional. Seeders to leave out of this tier, comma separated. |
| `WS_RELAY_URL` | seed-live | - | Private relay URL (military CII reads vessels and AIS disruptions from it). |
| `SEEDERS_EXTRA` | seed-live | - | Optional. Extra seeders for this tier, comma separated names from upstream scripts/seed-{name}.mjs. |
| `ACLED_PASSWORD` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_API_URL` | seed-live | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `FINNHUB_API_KEY` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `WM_API_BASE_URL` | seed-live | - | Same API base for the forecast seeder's chokepoint warm-ping. |
| `AISSTREAM_API_KEY` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `AVIATIONSTACK_API` | seed-live | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_ID` | seed-live | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `UCDP_ACCESS_TOKEN` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `NASA_FIRMS_API_KEY` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENROUTER_API_KEY` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `RELAY_SHARED_SECRET` | seed-live | (secret) | Relay secret (x-relay-key). |
| `CLOUDFLARE_API_TOKEN` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `ALPHA_VANTAGE_API_KEY` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_SECRET` | seed-live | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `UPSTASH_REDIS_REST_URL` | seed-live | - | redis-rest over the private network; seeders publish datasets here. |
| `WORLDMONITOR_RELAY_KEY` | seed-live | - | Relay secret for warm-pings and the news digest read. |
| `UPSTASH_REDIS_REST_TOKEN` | seed-live | (secret) | Bearer token for redis-rest. |
| `LLM_MODEL` | seed-bundles | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `ACLED_EMAIL` | seed-bundles | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `EIA_API_KEY` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_KEY` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_URL` | seed-bundles | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `API_BASE_URL` | seed-bundles | - | This install's API for seeders that read or warm it (insights, China signals, resilience scores). |
| `FRED_API_KEY` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_MODEL` | seed-bundles | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `SEEDERS_SKIP` | seed-bundles | - | Optional. Seeders to leave out of this tier, comma separated. |
| `SEEDERS_EXTRA` | seed-bundles | - | Optional. Extra seeders for this tier, comma separated names from upstream scripts/seed-{name}.mjs. |
| `ACLED_PASSWORD` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_API_URL` | seed-bundles | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `FINNHUB_API_KEY` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `WM_API_BASE_URL` | seed-bundles | - | Same API base for the forecast seeder's chokepoint warm-ping. |
| `AISSTREAM_API_KEY` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `AVIATIONSTACK_API` | seed-bundles | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_ID` | seed-bundles | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `UCDP_ACCESS_TOKEN` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `NASA_FIRMS_API_KEY` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENROUTER_API_KEY` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `CLOUDFLARE_API_TOKEN` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `ALPHA_VANTAGE_API_KEY` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_SECRET` | seed-bundles | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `UPSTASH_REDIS_REST_URL` | seed-bundles | - | redis-rest over the private network; seeders publish datasets here. |
| `WORLDMONITOR_RELAY_KEY` | seed-bundles | - | Relay secret for warm-pings and the news digest read. |
| `WORLDMONITOR_VALID_KEYS` | seed-bundles | - | Operator key; the resilience scores seeder reads premium routes on this install with the first key. |
| `UPSTASH_REDIS_REST_TOKEN` | seed-bundles | (secret) | Bearer token for redis-rest. |
| `WORLDMONITOR_SEED_REFRESH_KEY` | seed-bundles | - | Lets the resilience seeder force the ranking recompute. |
| `LLM_MODEL` | seed-daily | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `ACLED_EMAIL` | seed-daily | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `EIA_API_KEY` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_KEY` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_URL` | seed-daily | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `API_BASE_URL` | seed-daily | - | This install's API for seeders that read or warm it (insights, China signals, resilience scores). |
| `FRED_API_KEY` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_MODEL` | seed-daily | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `SEEDERS_SKIP` | seed-daily | - | Optional. Seeders to leave out of this tier, comma separated. |
| `SEEDERS_EXTRA` | seed-daily | - | Optional. Extra seeders for this tier, comma separated names from upstream scripts/seed-{name}.mjs. |
| `ACLED_PASSWORD` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_API_URL` | seed-daily | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `FINNHUB_API_KEY` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `WM_API_BASE_URL` | seed-daily | - | Same API base for the forecast seeder's chokepoint warm-ping. |
| `AISSTREAM_API_KEY` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `AVIATIONSTACK_API` | seed-daily | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_ID` | seed-daily | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `UCDP_ACCESS_TOKEN` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `NASA_FIRMS_API_KEY` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENROUTER_API_KEY` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `CLOUDFLARE_API_TOKEN` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `ALPHA_VANTAGE_API_KEY` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_SECRET` | seed-daily | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `UPSTASH_REDIS_REST_URL` | seed-daily | - | redis-rest over the private network; seeders publish datasets here. |
| `WORLDMONITOR_RELAY_KEY` | seed-daily | - | Relay secret for warm-pings and the news digest read. |
| `UPSTASH_REDIS_REST_TOKEN` | seed-daily | (secret) | Bearer token for redis-rest. |
| `PORT` | ais-relay | 3004 | Relay listen port (Node, dual-stack). Railway health-checks PORT at /health. |
| `API_BASE_URL` | ais-relay | - | This install's API, read by the news classify loop and (template patch) the cache warm-pings, instead of the hosted api.worldmonitor.app. |
| `OLLAMA_MODEL` | ais-relay | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_API_URL` | ais-relay | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `FINNHUB_API_KEY` | ais-relay | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `TELEGRAM_API_ID` | ais-relay | - | Optional. Telegram API id for the OSINT channel feed (needs TELEGRAM_API_HASH and a TELEGRAM_SESSION string, see upstream scripts/telegram). |
| `TELEGRAM_SESSION` | ais-relay | - | Optional. Telegram session string. Run one relay replica only: two sessions in parallel get AUTH_KEY_DUPLICATED. |
| `AISSTREAM_API_KEY` | ais-relay | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_ID` | ais-relay | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `TELEGRAM_API_HASH` | ais-relay | - | Optional. Telegram API hash. |
| `UCDP_ACCESS_TOKEN` | ais-relay | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENROUTER_API_KEY` | ais-relay | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `RELAY_SHARED_SECRET` | ais-relay | (secret) | Required. Authenticates every non-public relay route (x-relay-key); the relay refuses to start without it. Generated; worldmonitor and seed-live reference it. |
| `OPENSKY_CLIENT_SECRET` | ais-relay | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `UPSTASH_REDIS_REST_URL` | ais-relay | - | redis-rest over the private network; the relay's in-process seed loops write here. |
| `WORLDMONITOR_RELAY_KEY` | ais-relay | - | Same relay secret as worldmonitor, sent as X-WorldMonitor-Key on warm-pings and the digest read. |
| `UPSTASH_REDIS_REST_TOKEN` | ais-relay | (secret) | Bearer token for redis-rest. |
| `UPSTASH_ALLOW_INSECURE_HTTP` | ais-relay | true | Lets the relay use the plain-http private redis-rest URL (upstream requires https otherwise and silently disables its seed loops). |
| `MARKET_YAHOO_REFRESH_INTERVAL_MS` | ais-relay | 900000 | Yahoo market refresh interval in ms (upstream compose default, 15 minutes). |
| `LLM_MODEL` | seed-4h | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `ACLED_EMAIL` | seed-4h | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `EIA_API_KEY` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_KEY` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_URL` | seed-4h | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `API_BASE_URL` | seed-4h | - | This install's API for seeders that read or warm it (insights, China signals, resilience scores). |
| `FRED_API_KEY` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_MODEL` | seed-4h | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `SEEDERS_SKIP` | seed-4h | - | Optional. Seeders to leave out of this tier, comma separated. |
| `SEEDERS_EXTRA` | seed-4h | - | Optional. Extra seeders for this tier, comma separated names from upstream scripts/seed-{name}.mjs. |
| `ACLED_PASSWORD` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_API_URL` | seed-4h | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `FINNHUB_API_KEY` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `WM_API_BASE_URL` | seed-4h | - | Same API base for the forecast seeder's chokepoint warm-ping. |
| `AISSTREAM_API_KEY` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `AVIATIONSTACK_API` | seed-4h | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_ID` | seed-4h | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `UCDP_ACCESS_TOKEN` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `NASA_FIRMS_API_KEY` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENROUTER_API_KEY` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `CLOUDFLARE_API_TOKEN` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `ALPHA_VANTAGE_API_KEY` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_SECRET` | seed-4h | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `UPSTASH_REDIS_REST_URL` | seed-4h | - | redis-rest over the private network; seeders publish datasets here. |
| `WORLDMONITOR_RELAY_KEY` | seed-4h | - | Relay secret for warm-pings and the news digest read. |
| `UPSTASH_REDIS_REST_TOKEN` | seed-4h | (secret) | Bearer token for redis-rest. |
| `LLM_MODEL` | seed-hourly | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `ACLED_EMAIL` | seed-hourly | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `EIA_API_KEY` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_KEY` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `LLM_API_URL` | seed-hourly | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `API_BASE_URL` | seed-hourly | - | This install's API for seeders that read or warm it (insights, China signals, resilience scores). |
| `FRED_API_KEY` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_MODEL` | seed-hourly | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `SEEDERS_SKIP` | seed-hourly | - | Optional. Seeders to leave out of this tier, comma separated. |
| `SEEDERS_EXTRA` | seed-hourly | - | Optional. Extra seeders for this tier, comma separated names from upstream scripts/seed-{name}.mjs. |
| `ACLED_PASSWORD` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OLLAMA_API_URL` | seed-hourly | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `FINNHUB_API_KEY` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `WM_API_BASE_URL` | seed-hourly | - | Same API base for the forecast seeder's chokepoint warm-ping. |
| `AISSTREAM_API_KEY` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `AVIATIONSTACK_API` | seed-hourly | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_ID` | seed-hourly | - | From worldmonitor (set keys there, then deploy the staged changes). |
| `UCDP_ACCESS_TOKEN` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `NASA_FIRMS_API_KEY` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENROUTER_API_KEY` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `CLOUDFLARE_API_TOKEN` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `ALPHA_VANTAGE_API_KEY` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `OPENSKY_CLIENT_SECRET` | seed-hourly | (secret) | From worldmonitor (set keys there, then deploy the staged changes). |
| `UPSTASH_REDIS_REST_URL` | seed-hourly | - | redis-rest over the private network; seeders publish datasets here. |
| `WORLDMONITOR_RELAY_KEY` | seed-hourly | - | Relay secret for warm-pings and the news digest read. |
| `UPSTASH_REDIS_REST_TOKEN` | seed-hourly | (secret) | Bearer token for redis-rest. |

## Configuration

- **Healthcheck:** `/api/sidecar-health`
- **Healthcheck:** `/healthz`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 300 1 --dir $RAILWAY_VOLUME_MOUNT_PATH --maxmemory $REDIS_MAXMEMORY --maxmemory-policy allkeys-lru"`
- **Volume:** `/data`
- **Healthcheck:** `/gateway-health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/opt/railway/run-seeders.sh live`
- **Start command:** `/opt/railway/run-seeders.sh bundles`
- **Start command:** `/opt/railway/run-seeders.sh daily`
- **Healthcheck:** `/health`
- **Start command:** `/opt/railway/run-seeders.sh 4h`
- **Start command:** `/opt/railway/run-seeders.sh hourly`

**Category:** Analytics · **Tags:** worldmonitor, osint, geopolitics, dashboard, news · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/world-monitor-v2-global-intelligence-das)
