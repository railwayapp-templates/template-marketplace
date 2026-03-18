# Deploy Smartlead MCP Server on Railway

Give your AI agents access to your Smartlead. Create campaigns and more!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/YyT1tk)

## About

# One Click Deploy Smartlead MCP Server with SSE


This is a Model Context Protocol (MCP) server, enhanced with Supergateway, that allows AI agents to interact with the Smartlead campaign management API over Server-Sent Events (SSE).

## Configuration

The server requires the following environment variables. When deploying to Railway, you will be prompted for these. For local Docker runs, pass them using the `-e` flag.

*   `SMARTLEAD_API_KEY`: Your Smartlead API key. **Required** and should be treated as a secret.
*   `SMARTLEAD_API_URL` (Optional): Custom Smartlead API URL. Defaults to `https://server.smartlead.ai/api/v1`.
*   `SMARTLEAD_RETRY_MAX_ATTEMPTS` (Optional): Maximum retry attempts for API calls. Default: `3`.
*   `SMARTLEAD_RETRY_INITIAL_DELAY` (Optional): Initial delay in milliseconds for retries. Default: `1000`.
*   `SMARTLEAD_RETRY_MAX_DELAY` (Optional): Maximum delay in milliseconds for retries. Default: `10000`.
*   `SMARTLEAD_RETRY_BACKOFF_FACTOR` (Optional): Backoff factor for retry delays. Default: `2`.
*   `DEBUG` (Optional): Set to `true` for verbose logging from the server and Supergateway, or `false` for production. Default: `false`.
*   `PORT` (Set by Railway/Container): The port Supergateway will listen on *inside the container*. The `Dockerfile` default is `8000`. When running locally with Docker, you map a host port to this container port (e.g., `-p 8001:8000`).

## Connecting to the Server (Client Integration)

Once the `smartlead-mcp-server` is running (e.g., deployed on Railway or locally in Docker), it exposes an MCP interface over Server-Sent Events (SSE).

The Supergateway instance typically makes the MCP server available at:
*   **SSE Stream:** `http://:/sse`
*   **Message Endpoint (if used):** `http://:/message`

(If deployed on Railway, `:` will be your public Railway URL, e.g., `https://my-smartlead-mcp.up.railway.app`)

1.  **Direct SSE Connection (Preferred for SSE-aware clients):**
    If your MCP client (e.g., your AI agent's framework) natively supports connecting to an MCP server via an SSE URL, configure it accordingly.

    **Example `mcp.json` configuration for direct SSE:**
    ```json
    {
      "mcpServers": {
        "smartlead_remote_sse": {
          "url": "https://YOUR_RAILWAY_DEPLOYMENT_URL/sse", // Replace with your actual Railway SSE URL
          "disabled": false,
          "alwaysAllow": [
            "smartlead_create_campaign",
            "smartlead_update_campaign_schedule",
            "smartlead_update_campaign_settings",
            "smartlead_get_campaign",
            "smartlead_list_campaigns",
            "smartlead_save_campaign_sequence",
            "smartlead_get_campaign_sequence",
            "smartlead_update_campaign_sequence",
            "smartlead_delete_campaign_sequence",
            "smartlead_add_email_account_to_campaign",
            "smartlead_update_email_account_in_campaign",
            "smartlead_delete_email_account_from_campaign",
            "smartlead_add_lead_to_campaign",
            "smartlead_update_lead_in_campaign",
            "smartlead_delete_lead_from_campaign"
          ],
          "timeout": 300
        }
      }
    }
    ```

2.  **Using Supergateway on the Client-Side (SSE-to-stdio bridge):**
    If your MCP client expects to launch a local command that communicates via stdio (standard input/output), you can use *another* Supergateway instance locally on the client's machine to bridge the remote SSE connection back to stdio.

    **Example `mcp.json` or similar client configuration for the bridge:**
    ```json
    {
      "mcpServers": {
        "smartlead_remote_via_bridge": {
          "command": "npx",
          "args": [
            "-y",
            "supergateway",
            "--sse", "https://YOUR_RAILWAY_DEPLOYMENT_URL", // Replace with your actual Railway base URL (without /sse)
            // Supergateway will append /sse by default
            "--logLevel", "info" // Optional: for debugging Supergateway on the client
          ],
          "disabled": false,
          "alwaysAllow": [ /* ... list of Smartlead tools as above ... */ ]
        }
      }
    }
    ```

## Original Features (from base Smartlead MCP Server)

- Create new campaigns
- Update campaign schedule settings
- Update campaign general settings
- Get campaign details
- List all campaigns with filtering options
- Manage campaign email sequences (save, get, update, delete)
- Manage email accounts in campaigns (add, update, delete)
- Manage leads in campaigns (add, update, delete)

## Available Tools
*(This section lists the tools provided by the server. Refer to the original README sections for detailed parameters, or use MCP introspection if available.)*

### Campaign Management
- `smartlead_create_campaign`
- `smartlead_update_campaign_schedule`
- `smartlead_update_campaign_settings`
- `smartlead_get_campaign`
- `smartlead_list_campaigns`

### Campaign Sequence Management
- `smartlead_save_campaign_sequence`
- `smartlead_get_campaign_sequence`
- `smartlead_update_campaign_sequence`
- `smartlead_delete_campaign_sequence`

### Email Account Management in Campaigns
- `smartlead_add_email_account_to_campaign`
- `smartlead_update_email_account_in_campaign`
- `smartlead_delete_email_account_from_campaign`

### Lead Management in Campaigns
- `smartlead_add_lead_to_campaign`
- `smartlead_update_lead_in_campaign`
- `smartlead_delete_lead_from_campaign`


REPO: https://github.com/jacob-dietle/smartlead-mcp-server-sse

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| smartlead-mcp-server-sse | [jacob-dietle/smartlead-mcp-server-sse](https://github.com/jacob-dietle/smartlead-mcp-server-sse) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SMARTLEAD_API_KEY` | (secret) | Optional: Custom API URL (defaults to https://server.smartlead.ai/api/v1) |
| `SMARTLEAD_RETRY_MAX_DELAY` | 10000 | - |
| `SMARTLEAD_RETRY_MAX_ATTEMPTS` | 3 | - |
| `SMARTLEAD_RETRY_INITIAL_DELAY` | 1000 | - |
| `SMARTLEAD_RETRY_BACKOFF_FACTOR` | 2 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/YyT1tk)
