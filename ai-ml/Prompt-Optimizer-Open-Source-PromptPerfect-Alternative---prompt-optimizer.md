# Deploy Prompt Optimizer | Open Source PromptPerfect Alternative on Railway

AI prompt optimizer web app and MCP server, password and token protected

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/prompt-optimizer)

## About

Prompt Optimizer is an open-source workbench for writing better prompts: paste a prompt, let a model rewrite it with a built-in optimisation template, compare the original and the result side by side, and iterate. This template runs the official web app together with its MCP server, so the same optimiser is available to Claude Desktop, Cursor and any other MCP client.

The template deploys the upstream `linshen/prompt-optimizer` image, pinned to an exact release rather than `latest`, as a single service. Inside it nginx serves the web app and a Node process serves the MCP server at `/mcp`.

It ships with both entrances locked:

- **Web app behind a password.** A random password is generated for the `admin` user on every deploy. This matters more than it looks: any provider key you set on the service is delivered to the browser inside `/config.js`, so without a password that key would be readable by anyone who finds the URL. Upstream's own compose file defaults the password to `123456`.
- **MCP endpoint behind a bearer token.** Upstream deliberately exempts `/mcp` from the password (MCP clients cannot do basic auth), and the MCP server has no authentication of its own, so a stock deployment lets anyone call the optimiser on your API key. This template puts an `Authorization: Bearer` check in front of `/mcp` using the generated `MCP_AUTH_TOKEN`. An empty token rejects every request instead of opening the endpoint.

There is no database and no volume. Model settings, history and favourites live in each user's browser (with an optional S3 or WebDAV backup you can configure in the app), and the MCP server is stateless.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| prompt-optimizer | `linshen/prompt-optimizer:2.11.10` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port nginx listens on inside the container. Railway routes the public domain here; leave as is. |
| `MCP_LOG_LEVEL` | info | MCP server log level: debug, info, warn or error. |
| `MCP_AUTH_TOKEN` | (secret) | Bearer token required on /mcp. MCP clients send it as 'Authorization: Bearer' followed by this value. Letters and digits only; an empty value rejects every MCP request. |
| `ACCESS_PASSWORD` | (secret) | Password for the web app. It also protects /config.js, which carries every VITE_* key below in plain text. Change it and redeploy to rotate. |
| `ACCESS_USERNAME` | (secret) | Username for the web app's password prompt. |
| `VITE_CUSTOM_API_KEY` | (secret) | API key for any OpenAI-compatible endpoint (Ollama, vLLM, LiteLLM, Azure…). Use with the two variables below. |
| `VITE_GEMINI_API_KEY` | (secret) | Google Gemini API key. Pre-configures the web app and enables the MCP server. |
| `VITE_OPENAI_API_KEY` | (secret) | OpenAI API key. Pre-configures the web app for everyone who knows the password, and enables the MCP server. |
| `MCP_DEFAULT_LANGUAGE` | en | Language of the MCP server's built-in optimisation templates: en or zh. |
| `VITE_CUSTOM_API_MODEL` | - | Model name to use on the OpenAI-compatible endpoint. |
| `VITE_DEEPSEEK_API_KEY` | (secret) | DeepSeek API key. Pre-configures the web app and enables the MCP server. |
| `VITE_ANTHROPIC_API_KEY` | (secret) | Anthropic API key. Pre-configures the web app and enables the MCP server. |
| `VITE_OPENROUTER_API_KEY` | (secret) | OpenRouter API key. Pre-configures the web app and enables the MCP server. |
| `VITE_CUSTOM_API_BASE_URL` | - | Base URL of the OpenAI-compatible endpoint, e.g. https://api.example.com/v1. |
| `MCP_DEFAULT_MODEL_PROVIDER` | - | Which configured provider the MCP server uses when several keys are set: openai, anthropic, gemini, deepseek, openrouter or custom. Empty picks the first. |

## Configuration

- **Start command:** `sh -c 'C=/etc/nginx/http.d/default.conf; A=/etc/nginx/http.d/00-mcp-token.conf; T=$(printf %s "$MCP_AUTH_TOKEN" | tr -cd "A-Za-z0-9"); printf "%s\n" "map \$request_method:\$http_authorization \$mcp_token_denied {" "    default 1;" "    \"~^OPTIONS:\" 0;" > $A; [ -n "$T" ] && printf "    \"~^[A-Z]+:Bearer %s\$\" 0;\n" "$T" >> $A; printf "%s\n" "}" >> $A; grep -q mcp_token_denied $C || sed -i -e "s|^    location /mcp {\$|&\n        if (\$mcp_token_denied) { return 401; }|" -e "s|^    location = /healthz {\$|    location = /livez {\n        auth_basic off;\n        default_type text/plain;\n        return 200 ok;\n    }\n\n&|" $C; grep -q "if (\$mcp_token_denied)" $C && grep -q "location = /livez" $C || { echo "prompt-optimizer: nginx.conf did not match, refusing to start with /mcp unauthenticated"; exit 1; }; [ -n "$T" ] || echo "prompt-optimizer: MCP_AUTH_TOKEN is empty, /mcp will answer 401 to everything"; exec sh /start-services.sh'`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/prompt-optimizer)
