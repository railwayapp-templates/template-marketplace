# Deploy ClickUp MCP (Advanced) by @taazkareem on Railway

Supercharge ClickUp with 150 MCP tools for super advanced AI automation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clickup-mcp-advanced-by-taazkareem)

## About

> **Paid license required, including for self-hosting.** Before deploying, open the [developer's GitHub repository](https://github.com/taazkareem/clickup-mcp-server) and follow the purchase instructions under **Premium Access**. Enter the license key you receive into `CLICKUP_MCP_LICENSE_KEY`. The license is not included with this template; Railway hosting is billed separately.

Give your AI agents 150 tools to get work done in ClickUp. This independently developed MCP server supports detailed workspace administration, checklists, goals, views, Chat, Docs, and time tracking. Connect compatible AI assistants and automation platforms to handle complex operations through natural-language requests, with your own deployment on Railway.

[Explore the project, features, and licensing](https://github.com/taazkareem/clickup-mcp-server)

This template runs a dedicated ClickUp MCP service on Railway with an authenticated Streamable HTTP endpoint. Supply your ClickUp API token, Workspace ID, and purchased MCP license key. A separate connection secret is generated automatically.

All tool categories are enabled. The configuration includes production logging, configurable request timeouts, and session reconnection support. Compatible clients connect through your Railway HTTPS domain using an API-key header.

You control the deployment, hosting resources, and environment variables. Connected clients share the configured ClickUp account and its permissions. Available actions and throughput remain subject to ClickUp's API limits, account plan, and the installed server version.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickup-mcp | `ghcr.io/taazkareem/clickup-mcp-server:latest` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Neutral server timezone. Bearer authentication reads the ClickUp user's account timezone for session services when available. Physical location is not detected. Use an IANA timezone if overriding; auto is not supported. |
| `HOST` | 0.0.0.0 | Listen on all container IPv4 interfaces so Railway can reach the HTTP server. |
| `PORT` | 8080 | HTTP listening port. Configure Railway public networking with target port 8080. |
| `LOG_PATH` | /dev/null | Discard the separate local log file to prevent log-file growth inside the container. Railway still collects stderr logs. |
| `NODE_ENV` | production | Run the official Docker image in production mode. |
| `LOG_LEVEL` | WARN | Log warnings and errors while reducing routine logging overhead. Supported values: TRACE, DEBUG, INFO, WARN, ERROR. |
| `ENABLE_SSE` | true | Enable the native HTTP server, including the /mcp endpoint. This setting also controls Streamable HTTP despite its name. Keep true. |
| `ENABLE_CORS` | true | Enable native cross-origin HTTP handling. Some browser MCP clients remain affected by limitations in the current image's allowed-header list. |
| `ENABLE_HTTP` | true | HTTP compatibility alias. Keep consistent with ENABLE_SSE=true because ENABLE_SSE takes precedence. |
| `ENABLE_STDIO` | false | Disable the local stdio transport. This deployment uses the HTTP server included in the official Docker image. |
| `LOG_TO_STDERR` | true | Send application logs to stderr so Railway can collect them. |
| `MCP_SERVER_URL` | - | Public HTTPS base URL without /mcp. Automatically uses the Railway-generated domain; public networking must be enabled. Connect your MCP client to this URL followed by /mcp. Send Authorization: Bearer WORKSPACE_ID:CLICKUP_API_TOKEN and X-License-Key: YOUR_LICENSE_KEY. See the [project repository](https://github.com/taazkareem/clickup-mcp-server) for licensing and setup. |
| `RATE_LIMIT_MAX` | 100 | Maximum incoming HTTP requests per IP per window when ENABLE_RATE_LIMIT=true. Ignored while disabled. This is separate from ClickUp API rate limits. |
| `ALLOWED_ORIGINS` | * | Allow browser clients from any origin. ClickUp credentials and an MCP license are supplied separately by each client. |
| `CLICKUP_API_URL` | https://api.clickup.com/api/v2 | Official ClickUp API base URL. Keep the default for normal use. |
| `CLICKUP_APP_URL` | https://app.clickup.com | Official ClickUp application URL used for generated links. |
| `MAX_REQUEST_SIZE` | 10mb | Maximum incoming HTTP request body size. Preserves the upstream default. This does not limit response history or increase ClickUp API limits. |
| `ENABLE_RATE_LIMIT` | false | Preserve the upstream default without an additional per-IP HTTP request cap. ClickUp API limits still apply. Set true to activate RATE_LIMIT_MAX and RATE_LIMIT_WINDOW_MS. |
| `RATE_LIMIT_WINDOW_MS` | 60000 | HTTP rate-limit window in milliseconds. Used only when ENABLE_RATE_LIMIT=true. |
| `ENABLE_ORIGIN_VALIDATION` | false | Keep false with ALLOWED_ORIGINS=*. The current origin-validation implementation uses exact matching and does not interpret the wildcard. |
| `ENABLE_SECURITY_FEATURES` | true | Enable the application's optional security middleware. This does not create a private endpoint password or restrict access to the deployment owner. |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 8080

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/clickup-mcp-advanced-by-taazkareem)
