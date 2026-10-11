# Deploy Whapi MCP (Unofficial WhatsApp MCP) on Railway

WhatsApp automation for any number without paid Meta API  - using the Whapi

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whapi-mcp-unofficial-whatsapp-mcp)

## About

Keep your WhatsApp number. Keep using your phone. Add AI automation.

[Whapi.Cloud](https://panel.whapi.cloud/partner_registration/lava) connects your existing personal or Business WhatsApp account to AI assistants through MCP. Automate messages, work with conversations, manage groups and publish channel updates while continuing to use WhatsApp normally. This template makes the MCP server accessible remotely through an authenticated HTTPS endpoint.

**An API account is required:** Register with [Whapi.Cloud](https://panel.whapi.cloud/partner_registration/lava), connect your number and obtain your channel token. A limited free Sandbox is available. Purchase a paid [Whapi.Cloud](https://panel.whapi.cloud/partner_registration/lava) plan when you need usage beyond its limits. Railway hosting is billed separately.

Railway hosts the MCP server and an authentication proxy exposing Streamable HTTP at `/mcp`. The server uses your channel API token to connect to [Whapi.Cloud](https://panel.whapi.cloud/partner_registration/lava), which manages the linked WhatsApp session.

A separate, automatically generated secret protects remote access. No database or persistent volume is required. Keep one replica because MCP sessions and replay buffers are stored in memory. All clients using a deployment share its configured channel credentials.

Your AI client supplies the assistant and workflow logic. Event-driven automations need a separately configured webhook receiver or automation platform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whapi-mcp | [Whapi-Cloud/whapi-mcp](https://github.com/Whapi-Cloud/whapi-mcp) (branch: master) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Server timezone. UTC is the worldwide default. Optionally enter an IANA timezone such as America/New_York, Europe/London or Asia/Tokyo. The server does not automatically detect each remote client's timezone. To reuse an existing Railway shared variable, enter ${{shared.TZ}} only after that shared variable has been created. |
| `PORT` | 8080 | HTTP listening port. Set the Railway public domain target port to 8080. Clients connect to https://YOUR-RAILWAY-DOMAIN/mcp. |
| `NODE_ENV` | production | Run the MCP server and authentication proxy in production mode. |
| `API_TOKEN` | (secret) | **Required.** [Register with Whapi.Cloud](https://panel.whapi.cloud/partner_registration/lava), connect your WhatsApp number in the dashboard and copy your channel API token here. A limited free Sandbox is available. For usage beyond its limits, purchase a paid plan through your account. Railway hosting is billed separately. The registration link is a referral link. |
| `MCP_PROXY_DEBUG` | false | Disable verbose proxy debugging to reduce logging overhead. Enable temporarily when troubleshooting. |
| `MCP_PROXY_API_KEY` | (secret) | Automatically generated secret protecting the public MCP endpoint. Configure your MCP client to send the X-API-Key request header with this value. This is separate from your [Whapi.Cloud](https://panel.whapi.cloud/partner_registration/lava) channel API token. Keep both credentials private. |
| `RAILPACK_BUILD_CMD` | node --check node_modules/whapi-mcp/server.mjs && node node_modules/mcp-proxy/dist/bin/mcp-proxy.mjs --help > /dev/null && ln -sfn /dev/null node_modules/whapi-mcp/mcp-debug.log | Validate the installed server entry point and proxy CLI. Redirect the upstream debug log file to /dev/null to prevent local file growth. Railway continues collecting process stdout and stderr. |
| `RAILPACK_START_CMD` | /bin/sh -ec 'umask 077; : "${API_TOKEN:?Enter your Whapi channel API token}"; : "${MCP_PROXY_API_KEY:?MCP_PROXY_API_KEY must not be empty}"; export TZ="${TZ:-Etc/UTC}"; export PORT="${PORT:-8080}"; case "$PORT" in *[!0-9]*) echo "PORT must be an integer" >&2; exit 1;; esac; if [ "$PORT" -lt 1 ] || [ "$PORT" -gt 65535 ]; then echo "PORT must be between 1 and 65535" >&2; exit 1; fi; exec node node_modules/mcp-proxy/dist/bin/mcp-proxy.mjs --host :: --port "$PORT" --server stream --streamEndpoint /mcp --upstreamProtocol legacy --corsAddAllowedHeader X-API-Key --debug "$MCP_PROXY_DEBUG" --connectionTimeout "$MCP_PROXY_CONNECTION_TIMEOUT" --requestTimeout "$MCP_PROXY_REQUEST_TIMEOUT" --keepAliveTimeout "$MCP_PROXY_KEEP_ALIVE_TIMEOUT" --sessionIdleTimeout "$MCP_PROXY_SESSION_IDLE_TIMEOUT" --maxBodySize "$MCP_PROXY_MAX_BODY_SIZE" --eventStore "$MCP_PROXY_EVENT_STORE" --eventStoreMaxEvents "$MCP_PROXY_EVENT_STORE_MAX_EVENTS" --stateless "$MCP_PROXY_STATELESS" --gracefulShutdownTimeout "$MCP_PROXY_GRACEFUL_SHUTDOWN_TIMEOUT" -- node node_modules/whapi-mcp/server.mjs' | Validate required credentials and port, preserve the configured timezone or default to UTC, and expose the upstream stdio server through authenticated Streamable HTTP at /mcp. Keep this command unchanged and leave Railway's separate Custom Start Command empty. Use /ping for the proxy healthcheck, one replica and no persistent volume. All connected clients share the configured channel credentials. |
| `MCP_PROXY_STATELESS` | false | Use stateful MCP sessions. Keep one Railway replica because session state and event replay buffers are stored in process memory. |
| `RAILPACK_PRUNE_DEPS` | false | Prevent Railpack from pruning the MCP server and proxy installed by the custom installation command. That command already omits development dependencies. |
| `RAILPACK_INSTALL_CMD` | npm install --omit=dev --no-save --package-lock=false --no-audit --no-fund whapi-mcp@latest mcp-proxy@latest | Install the latest published npm releases of the MCP server and proxy. Requires GitHub source, the Railpack builder and Root Directory /. Running deployments do not update automatically. A new build must execute installation to resolve newer releases; cached layers can retain previously installed versions. |
| `MCP_PROXY_EVENT_STORE` | true | Enable in-memory event replay for supported Streamable HTTP clients. This is not permanent WhatsApp message history, conversation storage or a backup. |
| `RAILPACK_NODE_VERSION` | 24 | Use the Node.js 24 major version. New builds may resolve newer compatible 24.x releases without automatically switching to another major version. |
| `MCP_PROXY_MAX_BODY_SIZE` | 33554432 | Maximum incoming HTTP request body size: 32 MiB. This does not override upstream media limits or add binary upload or download capabilities that the MCP implementation does not support. |
| `MCP_PROXY_REQUEST_TIMEOUT` | 300000 | Allow up to 5 minutes for an upstream MCP request. Client, network and upstream API limits still apply. Increasing this value does not increase API throughput. |
| `MCP_PROXY_CONNECTION_TIMEOUT` | 60000 | Maximum time in milliseconds for the proxy to establish its upstream MCP connection. The default allows 60 seconds for server startup. |
| `MCP_PROXY_KEEP_ALIVE_TIMEOUT` | 300000 | HTTP keep-alive timeout in milliseconds. Allows connection reuse where supported. Client and intermediary timeouts may be shorter. |
| `MCP_PROXY_SESSION_IDLE_TIMEOUT` | 1800000 | Expire idle MCP sessions after 30 minutes. Sessions consume server memory. Clients should reconnect after expiration or a deployment restart. |
| `MCP_PROXY_EVENT_STORE_MAX_EVENTS` | 1000 | Retain up to 1000 events per session in the in-memory replay store. Events are lost when the process restarts. Larger values consume more memory. |
| `MCP_PROXY_GRACEFUL_SHUTDOWN_TIMEOUT` | 5000 | Allow up to 5 seconds for proxy shutdown. Railway's process termination deadline still applies. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8080

**Category:** AI/ML · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/whapi-mcp-unofficial-whatsapp-mcp)
