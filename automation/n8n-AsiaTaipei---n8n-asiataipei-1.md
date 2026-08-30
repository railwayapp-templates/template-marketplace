# Deploy n8n-Asia/Taipei on Railway

預先設好台灣時區的n8n，使用PostgreSQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-asiataipei-1)

## About

n8n-Asia/Taipei 是一個預先設定為台灣時區的 n8n Railway 部署模板。它使用 PostgreSQL 儲存工作流程、Credentials 與執行資料，並預設 `Asia/Taipei` 時區、Webhook 公開網址，以及適合 Railway 環境的相關設定，讓使用者可以更快速建立自己的 n8n 自動化服務。

這個模板會在 Railway 上部署 n8n 與 PostgreSQL，並自動建立兩者需要的環境變數與資料庫連線。n8n 會透過 Railway Private Network 連線 PostgreSQL，並使用 Railway 提供的公開網域接收 Webhook。

模板已預先設定 `Asia/Taipei` 時區，因此 Schedule Trigger、日期時間處理等功能會直接以台灣時間運作。此外，模板也包含隨機產生的 n8n encryption key、關閉診斷資料傳送，以及允許 Community Nodes 作為 AI Tool 使用等設定，適合快速建立教學、個人或小型服務使用的 n8n 環境。

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| n8n | `n8nio/n8n` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | PostgreSQL 容器啟動時自動建立的預設資料庫 |
| `DATABASE_URL` | Postgres | - | Railway 內部服務連線 PostgreSQL 使用的完整資料庫網址 |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL 容器啟動時建立的預設使用者 |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL 使用者密碼，部署模板時自動產生 32 字元隨機密碼 |
| `DATABASE_PUBLIC_URL` | Postgres | - | 從 Railway 外部連線 PostgreSQL 的公開網址，也供 Railway Data panel 使用 |
| `PORT` | n8n | 5678 | n8n 對外使用的埠口 |
| `DB_TYPE` | n8n | postgresdb | 指定 n8n 使用 PostgreSQL 作為資料庫 |
| `WEBHOOK_URL` | n8n | - | n8n Webhook 對外公開網址，使用 Railway 提供的公開網域 |
| `N8N_PROXY_HOPS` | n8n | 1 | 告訴 n8n 前方有 1 層反向代理，適用於 Railway 的代理架構 |
| `GENERIC_TIMEZONE` | n8n | Asia/Taipei | n8n 工作流程與排程使用的時區 |
| `DB_POSTGRESDB_HOST` | n8n | - | PostgreSQL 主機位址，引用 Postgres Service 的 PGHOST |
| `DB_POSTGRESDB_PORT` | n8n | - | PostgreSQL 連線埠口 |
| `DB_POSTGRESDB_USER` | n8n | (secret) | PostgreSQL 使用者名稱 |
| `N8N_ENCRYPTION_KEY` | n8n | - | n8n 加密金鑰，用於加密 Credentials 等敏感資料 |
| `DB_POSTGRESDB_DATABASE` | n8n | - | n8n 使用的 PostgreSQL 資料庫名稱 |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | PostgreSQL 使用者密碼 |
| `N8N_DIAGNOSTICS_ENABLED` | n8n | false | 關閉 n8n 診斷與遙測資料傳送 |
| `N8N_HIRING_BANNER_ENABLED` | n8n | false | 關閉 n8n 介面中的招聘 Banner |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | 強制檢查 n8n 設定檔權限，避免設定檔權限過於寬鬆 |
| `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` | n8n | true | 允許 Community Nodes 作為 AI Tool 使用，MCP 相關流程需要開啟 |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-asiataipei-1)
