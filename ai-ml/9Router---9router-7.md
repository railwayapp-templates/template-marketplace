# Deploy 9Router on Railway

9router AI router Pro Stack: API keys, backups and persistent SQLite.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-7)

## About

9Router (also searched as **9 Router**) is a self-hosted AI gateway for connecting OpenAI-compatible clients, Claude Code, Codex, Cursor and other tools to supported model providers. This Pro Stack deploys the official 9Router application with a persistent SQLite database, generated administrator password, secure session cookies, and Railway volume backups.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9Router | `decolua/9router@sha256:5fc7020f3cf1ca6831bffe80314ecab9dde915d27ee3c479a4bb66f45dabbc27` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 20128 |
| `DATA_DIR` | /app/data |
| `HOSTNAME` | 0.0.0.0 |
| `NODE_ENV` | production |
| `JWT_SECRET` | (secret) |
| `API_KEY_SECRET` | (secret) |
| `INITIAL_PASSWORD` | (secret) |
| `AUTH_COOKIE_SECURE` | true |
| `ENABLE_REQUEST_LOGS` | false |
| `OBSERVABILITY_ENABLED` | false |
| `NEXT_TELEMETRY_DISABLED` | 1 |

## Configuration

- **Start command:** `sh -c 'node -e '"'"''"'"'"'"'"'"'"'"'use strict'"'"'"'"'"'"'"'"'; const fs = require('"'"'"'"'"'"'"'"'node:fs'"'"'"'"'"'"'"'"'); const path = require('"'"'"'"'"'"'"'"'node:path'"'"'"'"'"'"'"'"'); const root = process.env.NINEROUTER_PATCH_ROOT || '"'"'"'"'"'"'"'"'/app'"'"'"'"'"'"'"'"'; const version = JSON.parse(fs.readFileSync(path.join(root, '"'"'"'"'"'"'"'"'package.json'"'"'"'"'"'"'"'"'), '"'"'"'"'"'"'"'"'utf8'"'"'"'"'"'"'"'"')).version; if (version !== '"'"'"'"'"'"'"'"'0.5.104'"'"'"'"'"'"'"'"') throw new Error('"'"'"'"'"'"'"'"'OpenAI compatibility patch requires 9Router 0.5.104'"'"'"'"'"'"'"'"'); const bad = /((?:"?baseUrl"?)\s*:\s*["'"'"'"'"'"'"'"'"']https:\/\/api\.openai\.com\/v1\/chat\/completions["'"'"'"'"'"'"'"'"']\s*,\s*(?:"?forceStream"?)\s*:\s*)(?:true|!0)/g; const fixed = /(?:"?baseUrl"?)\s*:\s*["'"'"'"'"'"'"'"'"']https:\/\/api\.openai\.com\/v1\/chat\/completions["'"'"'"'"'"'"'"'"']\s*,\s*(?:"?forceStream"?)\s*:\s*(?:false|!1)/g; const changes = []; let compiledMatches = 0; function walk(dir, compiled) { if (!fs.existsSync(dir)) return; for (const entry of fs.readdirSync(dir, {withFileTypes:true})) { const file = path.join(dir, entry.name); if (entry.isDirectory()) { walk(file, compiled); continue; } if (!entry.isFile() || !entry.name.endsWith('"'"'"'"'"'"'"'"'.js'"'"'"'"'"'"'"'"')) continue; const source = fs.readFileSync(file, '"'"'"'"'"'"'"'"'utf8'"'"'"'"'"'"'"'"'); const matches = [...source.matchAll(bad)].length; const alreadyFixed = [...source.matchAll(fixed)].length; if (compiled) compiledMatches += matches + alreadyFixed; if (matches) changes.push({file, source: source.replace(bad, '"'"'"'"'"'"'"'"'$1false'"'"'"'"'"'"'"'"'), matches}); } } walk(path.join(root,'"'"'"'"'"'"'"'"'.next'"'"'"'"'"'"'"'"','"'"'"'"'"'"'"'"'server'"'"'"'"'"'"'"'"'),true); walk(path.join(root,'"'"'"'"'"'"'"'"'open-sse'"'"'"'"'"'"'"'"','"'"'"'"'"'"'"'"'providers'"'"'"'"'"'"'"'"','"'"'"'"'"'"'"'"'registry'"'"'"'"'"'"'"'"'),false); if (!compiledMatches) throw new Error('"'"'"'"'"'"'"'"'Expected native OpenAI compiled provider not found; refusing an unknown build'"'"'"'"'"'"'"'"'); for (const change of changes) fs.writeFileSync(change.file, change.source); console.log('"'"'"'"'"'"'"'"'[railway-openai-fix]'"'"'"'"'"'"'"'"',JSON.stringify({version,compiledMatches,changedFiles:changes.length,changedProviders:changes.reduce((n,c)=>n+c.matches,0)}));'"'"' && exec node custom-server.js'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/9router-7)
