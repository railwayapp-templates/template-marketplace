# Deploy Google Drive MCP on Railway

MCP server for Google Docs, Sheets, Drive, Gmail, Calender

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/google-drive-mcp)

## About

Google Drive MCP (specifically the `google-docs-mcp` package) is an open-source Model Context Protocol server that grants AI assistants full read, write, and administrative access to your Google Suite. It natively connects AI agents to Google Docs, Sheets, Drive, Gmail, and Calendar to automate cross-workspace workflows.

Deploying the Google Drive MCP server on a cloud platform like Railway enables seamless, remote AI integration without requiring local installations or token management for every user. The process involves creating a Google Cloud OAuth Client, configuring the necessary API scopes across your Google Workspace, and passing those credentials to your Railway instance. By running the server in the cloud, it utilizes an HTTP stream (`streamableHttp`) transport protocol rather than standard local I/O. This setup delegates the authentication flow directly to the remote server, meaning the MCP client will automatically trigger a Google sign-in prompt on the user's first connection, making it ideal for team-wide AI deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| google-drive-mcp | [iqbalexperience/google-drive-mcp](https://github.com/iqbalexperience/google-drive-mcp) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MCP_TRANSPORT` | httpStream | - |
| `GOOGLE_CLIENT_ID` | - | Get from https://console.cloud.google.com/apis/credentials with web application. Enable all drive apis in google cloud also. |
| `GOOGLE_CLIENT_SECRET` | (secret) | Get from https://console.cloud.google.com/apis/credentials with web application. Enable all drive apis in google cloud also. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/google-drive-mcp)
