# Deploy Chatwoot - Pt_br on Railway

Template Chatwoot com descrição das variaveis em português Brasil.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chatwoot-prod-citdev-last-version)

## About

Chatwoot - Prod. CitDev - Last Version is an open-source, self-hosted customer engagement and support platform. It centralizes messages across live chat, email, WhatsApp, Telegram, and social media channels into a single unified inbox, offering real-time messaging, contact management, and workflow automation for modern customer success teams.

Hosting Chatwoot - Prod. CitDev - Last Version involves deploying a full-stack Ruby on Rails web server alongside background worker tasks (Sidekiq), a relational database, and an in-memory key-value cache. When deployed on Railway, the web application and worker process run in a containerized environment, managing real-time WebSocket connections and HTTP traffic. Data persistence for messages, users, and contacts is handled by a PostgreSQL database, while Redis or Valkey manages background job queues and real-time pub/sub events. This setup ensures high availability, automated SSL encryption, and isolated scaling for both web and background tasks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PgVector | `pgvector/pgvector:pg18` | Database |
| SideKiq | `chatwoot/chatwoot:latest` | Database |
| Chatwoot | `chatwoot/chatwoot:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | PgVector | railway | Nome do banco de dados |
| `DATABASE_URL` | PgVector | - | URL do banco de dados |
| `POSTGRES_USER` | PgVector | (secret) | Usuário administrador do banco. |
| `PGHOST_PRIVATE` | PgVector | - | Porta privada |
| `PGPORT_PRIVATE` | PgVector | 5432 | Porta interna padrão do PostgresSQL |
| `POSTGRES_PASSWORD` | PgVector | (secret) | Senha de banco |
| `DATABASE_URL_PRIVATE` | PgVector | - | URL do banco de dados |
| `LOG_LEVEL` | SideKiq | info | Nivel de log da aplicação |
| `RAILS_ENV` | SideKiq | production | Ambiente de execução |
| `REDIS_URL` | SideKiq | - | URL automatica railway |
| `FRONTEND_URL` | SideKiq | - | URL externa  |
| `POSTGRES_HOST` | SideKiq | - | Endereço do banco de dados padrão Railway |
| `POSTGRES_PORT` | SideKiq | - | Porta interna padrão do PostgresSQL |
| `SECRET_KEY_BASE` | SideKiq | (secret) | Chave automatica gerada pelo sistema. |
| `INSTALLATION_ENV` | SideKiq | docker | tipo de ambiente da instalação |
| `POSTGRES_SSLMODE` | SideKiq | require | Certificado ssl exigido |
| `POSTGRES_DATABASE` | SideKiq | - | Endereço do banco de dados |
| `POSTGRES_PASSWORD` | SideKiq | (secret) | Senha do banco de dados adm |
| `POSTGRES_USERNAME` | SideKiq | (secret) | Usuário administrador do banco. |
| `DATABASE_SSL_VERIFY` | SideKiq | false | Exige certificado SSL |
| `RAILS_LOG_TO_STDOUT` | SideKiq | true | Grava logs  |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | SideKiq | - | -- |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | SideKiq | - | -- |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | SideKiq | - | -- |
| `PORT` | Chatwoot | 3000 | Porta padrão da aplicação |
| `NODE_ENV` | Chatwoot | production | Ambiente de execução |
| `FORCE_SSL` | Chatwoot | true | Exige conexões HTTPS seguras |
| `LOG_LEVEL` | Chatwoot | info | Nivel de log da aplicação |
| `RAILS_ENV` | Chatwoot | production | Ambiente do Ruby on Rails |
| `REDIS_URL` | Chatwoot | - | URL automatica railway |
| `FRONTEND_URL` | Chatwoot | - | URL externa  |
| `POSTGRES_HOST` | Chatwoot | - | Endereço do host do banco de dados |
| `POSTGRES_PORT` | Chatwoot | - | Porta postgres |
| `DEFAULT_LOCALE` | Chatwoot | pt_BR | Linguagem padrão pt_br |
| `SECRET_KEY_BASE` | Chatwoot | (secret) | Gera chave automatica |
| `INSTALLATION_ENV` | Chatwoot | docker | tipo de ambiente da instalação |
| `POSTGRES_SSLMODE` | Chatwoot | require | Modo de conexão SSL com o banco |
| `POSTGRES_DATABASE` | Chatwoot | - | Enderço do banco de dados |
| `POSTGRES_PASSWORD` | Chatwoot | (secret) | Senha de banco |
| `POSTGRES_USERNAME` | Chatwoot | (secret) | Usuario banco de dados |
| `DATABASE_SSL_VERIFY` | Chatwoot | false | Evita erros de verificação do certificado SSL interno no PostgreSQL |
| `RAILS_LOG_TO_STDOUT` | Chatwoot | true | Garante que os logs do Chatwoot sejam exibidos no console do Railway |
| `ACTIVE_STORAGE_SERVICE` | Chatwoot | local | Define o armazenamento de arquivos local (no volume do container) |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | Chatwoot | - | chave |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | Chatwoot | - | chave |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | Chatwoot | - | chave |
| `REDISHOST` | Redis | - | Host padrão |
| `REDISPORT` | Redis | 6379 | Porta padrão da aplicação |
| `REDISUSER` | Redis | default | Usuário administrador do Redis |
| `REDIS_URL` | Redis | - | URL padrão |
| `REDISPASSWORD` | Redis | (secret) | Senha redis |
| `REDIS_PASSWORD` | Redis | (secret) | Senha resdis |
| `REDIS_PUBLIC_URL` | Redis | - | URL publica |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `bundle exec sidekiq -C config/sidekiq.yml`
- **Volume:** `/app/storage`
- **Start command:** `bundle exec rails s -p 3000 -b 0.0.0.0`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/chatwoot-prod-citdev-last-version)
