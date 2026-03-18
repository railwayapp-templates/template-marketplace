# Deploy N8N MCP Server on Railway

Give your AI Agents access to your n8n. Create workflows and more!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/se2WHK)

## About

# One Click Deploy n8n MCP Server

A Model Context Protocol (MCP) server that allows AI agents to interact with n8n workflows through natural language.

A feature complete N8N MCP server for remote usage with any MCP client. Connect Claude, Cursor and more over SSE. 

Update and create workflows and control your whole workspace from any AI agent. 

## Configuration

The server requires the following environment variables. When deploying to Railway using the button, you will be prompted for these. For local Docker runs, pass them using the `-e` flag as shown above.

*   `N8N_API_URL`: Your n8n instance API URL (e.g., `https://n8n.example.com/api/v1`). **Required.**
*   `N8N_API_KEY`: Your n8n API Key. **Required** and treated as a secret.
*   `N8N_WEBHOOK_USERNAME`: A username for basic authentication on n8n webhook nodes (if your workflows use webhook triggers secured with basic auth). Default: `anyname`.
*   `N8N_WEBHOOK_PASSWORD`: A password for basic authentication on n8n webhook nodes. Default: `somepassword`.
*   `DEBUG`: Set to `true` for verbose logging from the n8n-mcp-server and Supergateway, or `false` for production. Default: `false`.
*   `PORT`: The port the application will listen on. Railway sets this automatically. Supergateway uses this variable. The `Dockerfile` default is `8080`.

### Generating an n8n API Key

1.  Open your n8n instance in a browser.
2.  Go to Settings &gt; API (or a similar path depending on your n8n version).
3.  Create a new API key with appropriate permissions.
4.  Copy the key.

## Connecting to the Server (Client Integration)

Once the `n8n-mcp-server` is running (e.g., deployed on Railway or locally in Docker), it exposes an MCP interface over Server-Sent Events (SSE).

The Supergateway instance within the Docker container (as defined in `Dockerfile`) typically makes the MCP server available at:
*   **SSE Stream:** `http://:/sse`
*   **Message Endpoint:** `http://:/message`

(If deployed on Railway, `:` will be your public Railway URL, e.g., `https://my-n8n-mcp.up.railway.app`)

There are a couple of ways AI agents or MCP clients can connect:

1.  **Direct SSE Connection:**
    If your MCP client (e.g., your AI agent's framework) natively supports connecting to an MCP server via an SSE URL and a message endpoint, configure it with the URLs mentioned above.

    **Example `mcp.json` configuration for direct SSE:**
    ```json
    {
      "n8n_local_docker_sse": {
        "url": "https://my-n8n-mcp.up.railway.app/sse",
        "disabled": false,
        "alwaysAllow": [
          "mcp_n8n_docker_direct_list_workflows", 
          "mcp_n8n_docker_direct_get_workflow",
          "mcp_n8n_docker_direct_create_workflow",
          "mcp_n8n_docker_direct_update_workflow",
          "mcp_n8n_docker_direct_delete_workflow",
          "mcp_n8n_docker_direct_activate_workflow",
          "mcp_n8n_docker_direct_deactivate_workflow",
          "mcp_n8n_docker_direct_list_executions"
        ],
        "timeout": 300
      }
    }
    ```
    When you deploy add your variables and make sure to expose the 8080 port in railway. 

(THIS IS REALLY IMPORTANT YOU HAVE TO DO THIS MANUALLY!!! GO TO SETTINGS AND GENERATE A URL AND EXPOSE PORT 8080)

# Available Tools

The server provides the following tools (accessed via the MCP connection established above):

### Using Webhooks

This MCP server supports executing workflows through n8n webhooks. To use this functionality:

1.  Create a webhook-triggered workflow in n8n.
2.  Set up Basic Authentication on your webhook node (optional, but recommended).
3.  Use the `run_webhook` tool to trigger the workflow, passing just the workflow name.

Example (conceptual client-side code):
```javascript
// Assuming 'mcp.tools.run_webhook' is available on your connected MCP client instance
const result = await mcp.tools.run_webhook({
  workflowName: "hello-world", // Will call /webhook/hello-world
  data: {
    prompt: "Hello from AI assistant!"
  }
});
```
Webhook authentication (if used) is handled using the `N8N_WEBHOOK_USERNAME` and `N8N_WEBHOOK_PASSWORD` environment variables configured for the server.

### Workflow Management

- `workflow_list`: List all workflows
- `workflow_get`: Get details of a specific workflow
- `workflow_create`: Create a new workflow
- `workflow_update`: Update an existing workflow
- `workflow_delete`: Delete a workflow
- `workflow_activate`: Activate a workflow
- `workflow_deactivate`: Deactivate a workflow

### Execution Management

- `execution_run`: Execute a workflow via the API
// Note: run_webhook is already listed above, often preferred for triggering.
- `execution_get`: Get details of a specific execution
- `execution_list`: List executions for a workflow
// `execution_stop` might not be implemented in all n8n versions or the base server.

REPO: https://github.com/jacob-dietle/n8n-mcp-sse/tree/main

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n-mcp-sse | [jacob-dietle/n8n-mcp-sse](https://github.com/jacob-dietle/n8n-mcp-sse) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DEBUG` | false |
| `N8N_API_KEY` | (secret) |
| `N8N_API_URL` | your_url |
| `N8N_WEBHOOK_PASSWORD` | (secret) |
| `N8N_WEBHOOK_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/se2WHK)
