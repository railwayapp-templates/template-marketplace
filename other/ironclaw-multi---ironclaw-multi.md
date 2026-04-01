# Deploy ironclaw-multi on Railway

Deploy and host ironclaw with multi LLM provider and Model Tiering

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ironclaw-multi)

## About

IronClaw is a secure AI assistant with a modern web interface, persistent memory, jobs, routines, and tool-based workflows. It combines chat, automation, and long-term state in one system. 

This customized wrapper builds upon the fantastic upstream project by **nearai** and seamlessly upgrades the engine to natively support external LLM providers like **Nvidia NIM**, alongside automated failover capabilities to **OpenRouter**. We are incredibly grateful for nearai's brilliant foundation that made these workflow improvements possible.

---

Hosting IronClaw involves running the main application service together with a PostgreSQL database that supports pgvector for persistence and memory-related features. 

We have taken the base functionality from the original repository and humbly enhanced the Railway integration. This specific template ensures that:

- It runs behind a public HTTP wrapper with non-interactive startup.
- The IronClaw web node is fully stateless, safely relying entirely on the PostgreSQL volume.
- Secure keys, database URLs, and authentication tokens are automatically populated via Railway variables upon deployment.
- Out-of-the-box compatibility with Nvidia NIM endpoints is mapped perfectly without manual adjustments to the core code.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ironclaw | [algorytma/ironclaw-custom-railway](https://github.com/algorytma/ironclaw-custom-railway) | Worker |
| Postgres | `pgvector/pgvector:pg16-trixie` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | ironclaw | 8080 | Github Webhook gibi dış sinyallerin sessizce (arka planda) dinlendiği iç arka kapı portu. |
| `HTTP_HOST` | ironclaw | 0.0.0.0 | Ana uygulamanın internete açılacağı Public Port numarası. |
| `HTTP_PORT` | ironclaw | 8081 | - |
| `LLM_BACKEND` | ironclaw | openai | OpenAI standartlarını Nvidia NIM sunucularına tünelleyecek hedef adres. |
| `DATABASE_URL` | ironclaw | - | IronClaw'ın vektör belleği (memory), işleri (jobs) ve oturum verileri için kullanacağı PostgreSQL veritabanı adresi. |
| `OPENAI_API_KEY` | ironclaw | (secret) | Nvidia çökerse veya hata verirse paniğe kapılmadan otomatik geçilecek alternatif altyapı. |
| `OPENAI_API_BASE` | ironclaw | https://integrate.api.nvidia.com/v1 | Kullanmak istediğimiz ana modelin tam adı. |
| `OPENAI_MODEL_ID` | ironclaw | minimaxai/minimax-m2.5 | Nvidia hesabından alınacak gerçek API anahtarın. ${{ secret() }} Railway ekranında elle doldurulacak boş bir kutu bırakır. |
| `SANDBOX_ENABLED` | ironclaw | false | Caddy proxy'nin ve Webhook'un dinleyeceği temel Cihaz IP'si (0.0.0.0 tüm dış dünya trafiklerine açık demektir) |
| `ONBOARD_COMPLETED` | ironclaw | true | Asistanın konuşurken ve düşünürken kullanacağı dil modeli altyapı katmanı. |
| `GATEWAY_AUTH_TOKEN` | ironclaw | (secret) | Veritabanına kaydettiğin diğer API key ve şifreleri güvende tutan "Şifre Çözücü Master Kasa Anahtarı". (64 karakter önerilir) |
| `SECRETS_MASTER_KEY` | ironclaw | (secret) | Github, Jira, Slack gibi dış uygulamalardan asistanı tetiklemek için yollanan sinyallerin güvenliğini doğrulayan gizli imza. |
| `HTTP_WEBHOOK_SECRET` | ironclaw | (secret) | Python, Bash gibi scriptler çalıştırılacağı zaman sistem güvenliğini Docker izolasyonuna alıp almayacağını belirler. (Kaynak tüketmesin diye Railway'de false bırakılabilir) |
| `LLM_FAILOVER_API_KEY` | ironclaw | (secret) | Web arayüzüne (UI) girerken yazacağın panel giriş şifresi. |
| `LLM_FAILOVER_BACKEND` | ironclaw | openai | Yedek platformun (OpenRouter vb.) API şifresi. |
| `POSTGRES_DB` | Postgres | ironclaw | DB Name |
| `POSTGRES_USER` | Postgres | (secret) | DB User |
| `POSTGRES_PASSWORD` | Postgres | (secret) | DB Password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/ironclaw-multi)
