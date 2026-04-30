# Deploy orkes-conductor on Railway

Self-hosted Orkes Conductor (community edition) - workflow orchestration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orkes-conductor-1)

## About

Orkes Conductor (community edition) is an open-source workflow orchestration server. Define multi-step workflows as JSON, run them as durable executions, and watch progress in the    
  bundled UI. This template deploys an all-in-one Conductor server with a managed Postgres database for persistent state.        
                                                                                                                                                                                         
  ## About Hosting orkes-conductor                                                                                               
                               
  This template builds a thin custom image on top of `orkesio/orkes-conductor-community-standalone`, which bundles the Conductor API, the web UI, and an nginx router in a single        
  service. The custom layer swaps in a `config-postgres.properties` file with environment-variable placeholders, so the database connection (URL, user, password) is supplied at runtime
  rather than hardcoded in the image. Workflow definitions, execution history, queues, and search index are all persisted to a managed Railway Postgres database — nothing is lost across
   redeploys. First boot takes ~60 seconds while Conductor creates its tables.                                                   
                               
  The service is reachable on Railway's private network only — other services in the same project can call the API at `http://${{orkes-conductor.RAILWAY_PRIVATE_DOMAIN}}:8080/api` and  
  reach the UI at port 5000. To access the UI from your browser, use `railway run` or temporarily enable a public HTTP proxy. The community edition has no built-in authentication, so
  keeping the service internal is the recommended default.                                                                                                                               
                                                                                                                                 
  ## Common Use Cases          

  - Orchestrating multi-step AI/LLM pipelines (moderation, embedding, persistence)                                                                                                       
  - Long-running async workflows with retries, timeouts, and conditional branching
  - Background job processing with full execution visibility and replay                                                                                                                  
                                                                                                                                 
  ## Dependencies for orkes-conductor Hosting                                                                                                                                            
   
  - **PostgreSQL** — stores workflow definitions, execution history, queues, and the search index. Provisioned automatically by this template and linked via `${{Postgres.*}}` references
   on the Conductor service.                                                                                                     
                                                                                                                                                                                         
  ### Deployment Dependencies                                                                                                    
                               
  - A [Railway account](https://railway.com) (Hobby plan or higher recommended — Conductor needs ~1 GB RAM)                                                                              
  - [Conductor documentation](https://orkes.io/content/) for writing workflow and task definitions
  - [Conductor SDKs](https://github.com/conductor-sdk) (Java, Python, Go, JS, C#) for writing workers in your own apps                                                                   
                                                                                                                                                                                         
  ## Why Deploy orkes-conductor on Railway?                                                                                                                                              
                                                                                                                                                                                         
  Railway provisions the Postgres database and links it to Conductor automatically — no manual DSN wiring, no separate Elasticsearch or Redis services to manage. The custom image (built
   from `conductor/docker/prod/Dockerfile`) reads its database connection from `SPRING_DATASOURCE_URL` / `SPRING_DATASOURCE_USERNAME` / `SPRING_DATASOURCE_PASSWORD` env vars, which are
  wired to the linked Postgres service via `${{Postgres.*}}` references. The private-network-only default keeps the auth-less community edition safe by construction, while still letting
   any other Railway service in the project call the Conductor API directly. Deploys, logs, redeploys, and scaling are one click each.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| orkes-conductor-community-standalone | [vova1024/orkes-conductor-community-standalone](https://github.com/vova1024/orkes-conductor-community-standalone) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JAVA_OPTS` | orkes-conductor-community-standalone | -Xmx768m -Xms256m | JVM tuning flags for the Conductor server. Default fits a 1GB Railway container; increase -Xmx if you scale memory up. |
| `LOADSAMPLE` | orkes-conductor-community-standalone | false | Skip loading sample workflows on first boot. |
| `CONFIG_PROP` | orkes-conductor-community-standalone | config-postgres.properties | Conductor config preset to load on boot. Use 'config-postgres.properties' for the bundled Postgres setup (persistence + queues + indexing all on Postgres) |
| `SPRING_DATASOURCE_URL` | orkes-conductor-community-standalone | - | JDBC URL for Conductor's Postgres (workflows, history, queues, index). |
| `SPRING_DATASOURCE_PASSWORD` | orkes-conductor-community-standalone | (secret) | Password for SPRING_DATASOURCE_USERNAME. |
| `SPRING_DATASOURCE_USERNAME` | orkes-conductor-community-standalone | (secret) | Postgres user — needs CREATE TABLE on first boot. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/orkes-conductor-1)
