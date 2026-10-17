# Deploy Encryptor MCP on Railway

Your Cryptomator vaults for AI agents. You hold the keys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/encryptor-mcp)

## About

Encryptor MCP opens Cryptomator vaults for AI apps and agents like Claude, ChatGPT and Cursor, over MCP. You unlock each vault yourself on a page in your browser, so the password never goes through the chat. Keys live only in memory, vaults lock by themselves, and every change the AI makes can be undone. Free and open source (AGPL-3.0). Works with Cryptomator vaults; not made by or affiliated with Cryptomator.

This template builds Encryptor MCP from its GitHub repository and runs it as a web server with HTTPS. You choose a passphrase: it locks your control center, and AI apps ask for it once when they connect. A volume at /data keeps your vaults, settings and connected apps across restarts. Important: while a vault is open, its keys live in the memory of this Railway server, and vaults created here live on its volume (they don't sync with your other devices). If you can, run it on your own computer or a server you control instead. Full guide: https://github.com/s17sh70x2jfl031ag/Encryptor-MCP/blob/main/docs/setup-hosting.md

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Encryptor-MCP | [s17sh70x2jfl031ag/Encryptor-MCP](https://github.com/s17sh70x2jfl031ag/Encryptor-MCP) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8767 | The port Encryptor MCP listens on. Leave it at 8767. |
| `LOGIN_PASSPHRASE` | (secret) | A passphrase you make up (8+ characters). It locks your control center, and AI apps ask for it once when they connect. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, Java, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/encryptor-mcp)
