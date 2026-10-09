# Deploy diwoos-complete-setup on Railway

Complete Setup with Chatwoot, N8N and NocoDB for DiwoOS Projects

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/diwoos-complete-setup)

## About

DiwoOS is a unified operational stack that combines Chatwoot for customer support, n8n for automation, NocoDB for no-code data management, PostgreSQL for durable storage, and Redis for queues. The services are delivered together in one Railway template while keeping each component independently deployable and scalable.

This template provides a complete support and automation foundation. Chatwoot handles customer conversations, n8n Primary provides the workflow editor and API, n8n Worker processes queued executions, and NocoDB gives operations teams a visual data interface. PostgreSQL and Redis are connected through Railway private networking, with persistent volumes for stateful services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Primary | `n8nio/n8n` | Web service |
| Chatwoot | `ghcr.io/railwayapp-templates/chatwoot:Community` | Web service |
| Redis | `railwayapp/redis` | Database |
| NocoDB | `nocodb/nocodb:2026.07.0` | Web service |
| Worker | `n8nio/n8n` | Worker |
| Postgres-DiwoOS | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Primary | 5678 | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_TYPE` | Primary | postgresdb | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `NODE_OPTIONS` | Primary | --max_old_space_size=8192 | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `EXECUTIONS_MODE` | Primary | queue | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_TRUST_PROXY` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_WEBHOOK_URL` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_HOST` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_PORT` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_USER` | Primary | (secret) | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_ENCRYPTION_KEY` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_LISTEN_ADDRESS` | Primary | :: | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_EDITOR_BASE_URL` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_HOST` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_PORT` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_DATABASE` | Primary | - | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_PASSWORD` | Primary | (secret) | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_PASSWORD` | Primary | (secret) | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_USERNAME` | Primary | (secret) | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_DUALSTACK` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Primary | true | Configuração interna do n8n Primary, pré-definida pelo template DiwoOS. |
| `NODE_ENV` | Chatwoot | production | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `RAILS_ENV` | Chatwoot | production | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `REDIS_URL` | Chatwoot | - | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `DATABASE_URL` | Chatwoot | - | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `FRONTEND_URL` | Chatwoot | - | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `DEFAULT_LOCALE` | Chatwoot | en | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `SECRET_KEY_BASE` | Chatwoot | (secret) | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `INSTALLATION_ENV` | Chatwoot | docker | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `ACTIVE_STORAGE_SERVICE` | Chatwoot | local | Configuração interna do Chatwoot, pré-definida pelo template DiwoOS. |
| `REDISHOST` | Redis | - | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDISPORT` | Redis | 6379 | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDISUSER` | Redis | default | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDIS_URL` | Redis | - | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDISPASSWORD` | Redis | (secret) | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDIS_PASSWORD` | Redis | (secret) | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `REDIS_PUBLIC_URL` | Redis | - | Configuração interna do Redis, pré-definida pelo template DiwoOS. |
| `NC_DB` | NocoDB | - | Configuração interna do NocoDB, pré-definida pelo template DiwoOS. |
| `NC_SITE_URL` | NocoDB | - | Configuração interna do NocoDB, pré-definida pelo template DiwoOS. |
| `NC_DISABLE_MUX` | NocoDB | true | Configuração interna do NocoDB, pré-definida pelo template DiwoOS. |
| `NC_AUTH_JWT_SECRET` | NocoDB | (secret) | Configuração interna do NocoDB, pré-definida pelo template DiwoOS. |
| `PORT` | Worker | 5678 | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_TYPE` | Worker | postgresdb | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `NODE_OPTIONS` | Worker | --max_old_space_size=8192 | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `EXECUTIONS_MODE` | Worker | queue | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `N8N_WEBHOOK_URL` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_HOST` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_PORT` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_USER` | Worker | (secret) | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `N8N_ENCRYPTION_KEY` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `N8N_LISTEN_ADDRESS` | Worker | :: | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_HOST` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_PORT` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_DATABASE` | Worker | - | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `DB_POSTGRESDB_PASSWORD` | Worker | (secret) | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_PASSWORD` | Worker | (secret) | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_USERNAME` | Worker | (secret) | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `QUEUE_BULL_REDIS_DUALSTACK` | Worker | true | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Worker | true | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Worker | true | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | Worker | true | Configuração interna do n8n Worker, pré-definida pelo template DiwoOS. |
| `POSTGRES_DB` | Postgres-DiwoOS | railway | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |
| `DATABASE_URL` | Postgres-DiwoOS | - | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |
| `POSTGRES_USER` | Postgres-DiwoOS | (secret) | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |
| `DIWOOS_INIT_SQL` | Postgres-DiwoOS | BEGIN;
SELECT pg_advisory_xact_lock(734981207);
SET LOCAL lock_timeout = '30s';
CREATE SCHEMA IF NOT EXISTS diwoos AUTHORIZATION postgres;




CREATE TABLE IF NOT EXISTS diwoos.accounts (
	id int8 NOT NULL,
	"token" text NULL,
	"name" text NULL,
	webhook text NULL,
	updated_at timestamp NULL,
	account_id int8 DEFAULT 1 NULL,
	inbox_id int8 DEFAULT 1 NULL,
	dominio text NULL,
	CONSTRAINT accounts_pk PRIMARY KEY (id)
);




CREATE TABLE IF NOT EXISTS diwoos.agents (
	account_id int8 NULL,
	description text NULL,
	"name" text NULL,
	webhook text NULL,
	prompt text NULL,
	bot_active bool NULL,
	custom_info jsonb NULL,
	first_message_prompt text NULL,
	internal_prompt text NULL,
	sleep_time_bot int8 NULL,
	prompt_temperature numeric NULL,
	prompt_maximum_length int8 NULL,
	prompt_top_p numeric NULL,
	model varchar NULL,
	istrash bool NULL,
	followup_prompts jsonb NULL,
	classification_prompts jsonb NULL,
	prompt_memory_window int8 NULL,
	prompt_max_messages int8 NULL,
	receptivo bool NULL,
	aiprovider varchar NULL,
	agent_context text NULL,
	id bigserial NOT NULL,
	agent_parameters text NULL,
	CONSTRAINT agents_pk PRIMARY KEY (id)
);




CREATE TABLE IF NOT EXISTS diwoos.bot_control (
	engage_bot bool NULL,
	prompt text NULL,
	agent_id int8 NOT NULL,
	lead_data text NULL,
	conversation_status varchar NULL,
	conversation_stage varchar NULL,
	created_on timestamptz NULL,
	updated_on timestamptz NULL,
	follow_up_count int8 NULL,
	custom_info jsonb NULL,
	metadata jsonb NULL,
	last_engaged_at timestamptz NULL,
	account_id int8 NOT NULL,
	contact_id int8 NOT NULL,
	current_conversation_id text NULL,
	placeid varchar NULL,
	CONSTRAINT bot_control_pk PRIMARY KEY (account_id, contact_id)
);





CREATE TABLE IF NOT EXISTS diwoos.data_capture_processes (
	id varchar(100) NOT NULL,
	searchphrase varchar(1000) NOT NULL,
	city varchar(1000) NULL,
	allocated_memory numeric DEFAULT 8192 NOT NULL,
	status varchar(100) DEFAULT 'NOT_STARTED'::character varying NOT NULL,
	status_detail text NULL,
	created_on timestamptz DEFAULT now() NOT NULL,
	last_updated_on timestamptz DEFAULT now() NOT NULL,
	finished_on timestamptz NULL,
	record_count int8 NULL,
	runid varchar(1000) NULL,
	datasetid varchar(1000) DEFAULT ''::character varying NULL,
	country varchar(100) NULL,
	"language" varchar(100) DEFAULT 'pt-BR'::character varying NULL,
	state varchar(1000) NULL,
	latitude numeric NULL,
	longitude numeric NULL,
	CONSTRAINT data_capture_processes_pkey PRIMARY KEY (id)
);
CREATE INDEX IF NOT EXISTS data_capture_processes_category_city_idx ON diwoos.data_capture_processes USING btree (searchphrase, city);
CREATE INDEX IF NOT EXISTS data_capture_processes_category_city_idx1 ON diwoos.data_capture_processes USING btree (searchphrase, city);
CREATE INDEX IF NOT EXISTS data_capture_processes_category_status_city_allocated_memor_idx ON diwoos.data_capture_processes USING btree (searchphrase, status, city, allocated_memory, status_detail, created_on, last_updated_on, finished_on, record_count, runid, datasetid, country, language, state, latitude, longitude);
CREATE INDEX IF NOT EXISTS data_capture_processes_created_on_idx ON diwoos.data_capture_processes USING btree (created_on, searchphrase, city, allocated_memory, status, status_detail, last_updated_on, finished_on, record_count, runid, datasetid, country, language, state, latitude, longitude);
CREATE INDEX IF NOT EXISTS data_capture_processes_created_on_idx1 ON diwoos.data_capture_processes USING btree (created_on, searchphrase, city, allocated_memory, status, status_detail, last_updated_on, finished_on, record_count, runid, datasetid, country, language, state, latitude, longitude);
CREATE INDEX IF NOT EXISTS data_capture_processes_created_on_idx2 ON diwoos.data_capture_processes USING btree (created_on, searchphrase, city, allocated_memory, status, status_detail, last_updated_on, finished_on, record_count, runid, datasetid, country, language, state, latitude, longitude);
CREATE INDEX IF NOT EXISTS data_capture_processes_runid_latitude_idx ON diwoos.data_capture_processes USING btree (runid, latitude, searchphrase, city, allocated_memory, status, status_detail, created_on, last_updated_on, finished_on, record_count, datasetid, country, language, state, longitude);




CREATE TABLE IF NOT EXISTS diwoos.insights (
	account_id varchar NOT NULL,
	agent_id varchar NOT NULL,
	contact_id varchar NOT NULL,
	title varchar NOT NULL,
	"content" text NULL,
	created_on timestamptz NULL,
	"key" varchar NOT NULL,
	consumed bool NOT NULL,
	CONSTRAINT insights_pk PRIMARY KEY (key)
);





CREATE TABLE IF NOT EXISTS diwoos.maplead (
	id serial4 NOT NULL,
	searchphrase varchar NULL,
	epicenter varchar NULL,
	active bool DEFAULT true NULL,
	created_at timestamptz DEFAULT now() NULL,
	updated_at timestamptz DEFAULT now() NULL,
	metadata varchar NULL,
	other_filter varchar NULL,
	qtd_leads int4 NULL,
	geo_filter text DEFAULT 'and population >= 50000'::text NULL,
	CONSTRAINT maplead_pk PRIMARY KEY (id)
);





CREATE TABLE IF NOT EXISTS diwoos.messages (
	moment text NOT NULL,
	"date" date NULL,
	"time" time NULL,
	messageid text NOT NULL,
	status text NULL,
	chat_name text NULL,
	sender_name text NULL,
	"type" text NULL,
	"content" text NULL,
	from_me bool NULL,
	"role" text NULL,
	agent_id text NULL,
	airesponse varchar NULL,
	createdon timestamptz NULL,
	metadata jsonb DEFAULT '{}'::jsonb NULL,
	isdeleted bool DEFAULT false NULL,
	issentbyai bool NULL,
	account_id int8 NULL,
	inbox_id int8 NULL,
	contact_id int8 NULL,
	conversation_id int8 NULL,
	input_tokens int4 NULL,
	output_tokens int4 NULL,
	model varchar NULL,
	tool_calls text NULL,
	CONSTRAINT messages_unique UNIQUE (messageid)
);





CREATE TABLE IF NOT EXISTS diwoos.places (
	placeid text NOT NULL,
	nome text NULL,
	categoria text NULL,
	telefone text NULL,
	iswhatsapp text NULL,
	endereco text NULL,
	latitude float8 NULL,
	longitude float8 NULL,
	score float8 NULL,
	reviews int8 NULL,
	website text NULL,
	mapurl text NULL,
	searchphrase text NULL,
	cep text NULL,
	bairro text NULL,
	cidade text NULL,
	uf text NULL,
	pais text NULL,
	createdate date NULL,
	updatedate date NULL,
	runid varchar(1000) NULL,
	metadata jsonb DEFAULT '{}'::jsonb NULL,
	consumed bool DEFAULT false NULL,
	CONSTRAINT places_pkey PRIMARY KEY (placeid)
);
CREATE INDEX IF NOT EXISTS idx_places_placeid ON diwoos.places USING btree (placeid);
CREATE INDEX IF NOT EXISTS places_cidade_searchphrase_iswhatsapp_idx ON diwoos.places USING btree (cidade, searchphrase, iswhatsapp);





CREATE TABLE IF NOT EXISTS diwoos.tool_calls (
	id serial4 NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	created_by varchar NULL,
	updated_by varchar NULL,
	nc_order numeric NULL,
	tool_calls text NULL,
	account_id text NULL,
	contact_id text NULL,
	conversation_id text NULL,
	CONSTRAINT tool_calls_pkey PRIMARY KEY (id)
);
CREATE INDEX IF NOT EXISTS tool_calls_order_idx ON diwoos.tool_calls USING btree (nc_order);





CREATE TABLE IF NOT EXISTS diwoos."usage" (
	placeid text NOT NULL,
	customer text NULL,
	"data" date NULL,
	placecaptured int8 NULL,
	hasphone int8 NULL,
	messagesent int8 NULL,
	telefone text NULL,
	subscriptionid text NOT NULL,
	scenario text NOT NULL,
	channel varchar NULL,
	"domain" varchar NULL,
	CONSTRAINT usage_pkey PRIMARY KEY (placeid, subscriptionid, scenario)
);
CREATE INDEX IF NOT EXISTS usage_customer_idx1 ON diwoos.usage USING btree (customer);
CREATE INDEX IF NOT EXISTS usage_customer_idx2 ON diwoos.usage USING btree (customer);
CREATE INDEX IF NOT EXISTS usage_customer_idx3 ON diwoos.usage USING btree (customer);
CREATE INDEX IF NOT EXISTS usage_customer_idx4 ON diwoos.usage USING btree (customer, telefone);
CREATE INDEX IF NOT EXISTS usage_data_idx ON diwoos.usage USING btree (data, messagesent);
CREATE UNIQUE INDEX IF NOT EXISTS usage_pk ON diwoos.usage USING btree (placeid, subscriptionid, scenario);
CREATE INDEX IF NOT EXISTS usage_subscriptionid_idx ON diwoos.usage USING btree (subscriptionid, placecaptured, hasphone, messagesent);
CREATE INDEX IF NOT EXISTS usage_subscriptionid_idx1 ON diwoos.usage USING btree (subscriptionid, placecaptured, hasphone, messagesent);





CREATE TABLE IF NOT EXISTS diwoos.worldcities (
	id int8 NOT NULL,
	city text NULL,
	city_ascii text NULL,
	lat numeric NULL,
	lng numeric NULL,
	country text NULL,
	iso2 text NULL,
	iso3 text NULL,
	admin_name text NULL,
	capital text NULL,
	population int8 NULL
);
COMMIT;
 | Cria o schema diwoos e 11 tabelas somente se ausentes. Não apaga, altera ou sobrescreve registros. Executado em transação a cada início. |
| `POSTGRES_PASSWORD` | Postgres-DiwoOS | (secret) | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |
| `DATABASE_PUBLIC_URL` | Postgres-DiwoOS | - | Configuração interna do PostgreSQL, pré-definida pelo template DiwoOS. |

## Configuration

- **Start command:** `n8n start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api`
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c "redis-server --requirepass "$REDIS_PASSWORD" --save 60 1 --dir "$RAILWAY_VOLUME_MOUNT_PATH" --appendonly yes"`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Healthcheck:** `/api/v1/health`
- **Volume:** `/usr/app/data/`
- **Start command:** `n8n worker`
- **Start command:** `/usr/bin/tini -g -- /bin/bash -c 'set -euo pipefail; : "${DIWOOS_INIT_SQL:?DIWOOS_INIT_SQL ausente}"; printf "%s\n" "$DIWOOS_INIT_SQL" > /docker-entrypoint-initdb.d/50-diwoos.sql; ( export PGPASSWORD="$POSTGRES_PASSWORD" PGCONNECT_TIMEOUT=5; ready=0; for i in {1..300}; do if pg_isready -q -h 127.0.0.1 -p 5432 -U "$POSTGRES_USER" -d "$POSTGRES_DB"; then ready=1; break; fi; sleep 2; done; if [ "$ready" != 1 ]; then echo "DIWOOS_INIT_ERRO: Postgres indisponivel" >&2; exit 1; fi; if printf "%s\n" "$DIWOOS_INIT_SQL" | psql -X -h 127.0.0.1 -p 5432 -U "$POSTGRES_USER" -d "$POSTGRES_DB" -v ON_ERROR_STOP=1; then echo "DIWOOS_INIT_OK: schema e 11 tabelas verificados sem apagar dados"; else echo "DIWOOS_INIT_ERRO: transacao revertida; dados existentes preservados" >&2; exit 1; fi ) & /usr/local/bin/wrapper.sh postgres -p 5432 -c "listen_addresses=*"'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/diwoos-complete-setup)
