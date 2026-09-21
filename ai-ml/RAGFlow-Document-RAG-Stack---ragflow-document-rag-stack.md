# Deploy RAGFlow Document RAG Stack on Railway

RAGFlow document RAG with Elasticsearch, MySQL, MinIO and Valkey

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragflow-document-rag-stack)

## About

RAGFlow is an open source RAG engine built around deep document understanding. Instead of splitting PDFs on newlines, it runs OCR, layout analysis and table structure recognition over your files, chunks them with a method you choose per knowledge base, and answers questions with citations back to the exact page and block. It also ships an agent builder, a team workspace and a full HTTP API.

Self-hosting RAGFlow means running five containers, not one. The application container holds nginx, the Python API, the admin server and a document task executor. Around it sit MySQL for metadata, Elasticsearch as the document engine that stores chunks and vectors, MinIO for the uploaded files, and Valkey for the task queue. This template deploys all five, wires them over Railway's private network, generates every password, and puts the application behind a public domain with a health check that only passes when all four backing services answer.

Two upstream pieces are deliberately left out because Railway cannot host them: the code sandbox, which needs privileged Docker in Docker, and the bundled embedding server, whose default model wants about 25 GB of RAM. Bring your own model provider instead, which is the normal production setup anyway.

Budget for it: roughly 4 to 6 GB of memory at idle and 8 to 10 GB while documents are parsing, running continuously.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Elasticsearch | `elasticsearch:8.11.3` | Database |
| MySQL | `mysql:8.0.40` | Database |
| MinIO | `quay.io/minio/minio:RELEASE.2025-03-12T18-04-18Z` | Database |
| RAGFlow | `infiniflow/ragflow:v0.27.2` | Web service |
| Redis | `valkey/valkey:8.1.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms1g -Xmx1g | JVM heap. Elasticsearch sizes the heap from the visible machine memory when this is unset, which on Railway means a heap far larger than the service's limit. Keep Xms equal to Xmx; 512m works for small corpora, 2g upwards for large ones. |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Password for the built-in 'elastic' user, referenced by the RAGFlow service. It is written into the security index at first bootstrap, so changing it later does not rotate the credential. |
| `MYSQL_USER` | MySQL | (secret) | Application user referenced by the RAGFlow service. |
| `MYSQL_DATABASE` | MySQL | rag_flow | Database created on first boot and granted to MYSQL_USER. Same name as the upstream docker/init.sql. |
| `MYSQL_PASSWORD` | MySQL | (secret) | Generated application password referenced by the RAGFlow service. |
| `MYSQL_PRIVATE_URL` | MySQL | - | Convenience connection string over the private network (IPv6, includes the port). |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Generated root password. RAGFlow does not use it; it exists so the image can initialise. |
| `MINIO_ROOT_USER` | MinIO | (secret) | S3 access key. Referenced by the RAGFlow service as MINIO_USER. |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Generated S3 secret key. Referenced by the RAGFlow service as MINIO_PASSWORD. |
| `TZ` | RAGFlow | UTC | Container timezone used for log and task timestamps (upstream ships Asia/Shanghai). |
| `PORT` | RAGFlow | 80 | Port the bundled nginx listens on. Railway's healthcheck and edge proxy probe $PORT, and the start command rewrites nginx's 'listen 80' to this port (plus an IPv6 listener). Keep it equal to the public domain's target port. |
| `DB_TYPE` | RAGFlow | mysql | Metadata database dialect (users, datasets, documents, agents). Upstream default. |
| `ES_HOST` | RAGFlow | - | Private hostname of the Elasticsearch service. RAGFlow builds 'http://$ES_HOST:9200' internally, so the port is fixed at 9200 and must not be included here. |
| `ES_USER` | RAGFlow | (secret) | Elasticsearch user. The image only bootstraps the built-in 'elastic' superuser. |
| `DOC_ENGINE` | RAGFlow | elasticsearch | Search backend for chunks and vectors. 'elasticsearch' is the upstream default and the only engine this template ships; changing it without adding the matching service breaks the app. |
| `MINIO_HOST` | RAGFlow | - | Private hostname of the MinIO service. RAGFlow builds '$MINIO_HOST:9000' internally, so the port is fixed at 9000 and must not be included here. |
| `MINIO_USER` | RAGFlow | (secret) | MinIO access key (mirrors the MinIO service). |
| `MYSQL_HOST` | RAGFlow | - | Private hostname of the MySQL service. Also used by the start command to wait for MySQL before booting. |
| `MYSQL_PORT` | RAGFlow | 3306 | MySQL port on the private network. |
| `MYSQL_USER` | RAGFlow | (secret) | MySQL user. The MySQL image grants it every privilege on MYSQL_DBNAME, which is all RAGFlow's table creation and migrations need. |
| `REDIS_HOST` | RAGFlow | - | Private hostname of the Valkey (Redis) service. RAGFlow builds '$REDIS_HOST:6379' internally, so the port is fixed at 6379 and must not be included here. |
| `HF_ENDPOINT` | RAGFlow | https://huggingface.co | Hugging Face mirror used for any model download. The image hardcodes https://hf-mirror.com, which is slow or unreachable from most Railway regions. The bundled DeepDoc OCR and layout models ship inside the image, so nothing is downloaded in the default configuration. |
| `USE_DOCLING` | RAGFlow | false | Keep false. true makes the container pip-install Docling from a mirror on every boot. |
| `MYSQL_DBNAME` | RAGFlow | - | Metadata database name (created by the MySQL image on first boot). |
| `STORAGE_IMPL` | RAGFlow | MINIO | Object storage backend for uploaded files. MINIO points at the MinIO service in this template. AWS_S3, OSS, GCS and AZURE_* are also supported by RAGFlow but need their own settings. |
| `DOC_BULK_SIZE` | RAGFlow | 4 | Documents processed per batch by a task executor (upstream default). |
| `MINIO_PASSWORD` | RAGFlow | (secret) | MinIO secret key (mirrors the MinIO service). |
| `MYSQL_PASSWORD` | RAGFlow | (secret) | MySQL password (mirrors the MySQL service). |
| `REDIS_PASSWORD` | RAGFlow | (secret) | Valkey password (mirrors the Redis service). |
| `SANDBOX_ENABLED` | RAGFlow | - | Optional, leave unset. RAGFlow's code sandbox needs a privileged Docker-in-Docker executor service, which Railway does not offer. |
| `API_PROXY_SCHEME` | RAGFlow | python | Selects the pure-Python deployment: nginx proxies /v1 and /api to the Python API on 9380 and /api/v1/admin to the admin server on 9381. The 'go' and 'hybrid' schemes additionally need NATS, Kvrocks and ClickHouse services, which this template does not include. |
| `ELASTIC_PASSWORD` | RAGFlow | (secret) | Elasticsearch password (mirrors the Elasticsearch service). Changing it later has no effect: the password is stored in the Elasticsearch security index after the first boot. |
| `MYSQL_MAX_PACKET` | RAGFlow | 1073741824 | Client-side max_allowed_packet passed to the MySQL driver. Kept equal to the --max-allowed-packet the MySQL service starts with. |
| `REGISTER_ENABLED` | RAGFlow | 0 | 0 = self-service signup is closed, which is the safe default for a public URL: log in as admin@ragflow.io with ADMIN_DEFAULT_PASSWORD and invite teammates from the UI. Set it to 1 (and redeploy) to let anyone with the URL create an account. |
| `MAX_CONTENT_LENGTH` | RAGFlow | - | Optional. Maximum upload size in bytes (default 1 GB). The bundled nginx caps request bodies at 1024M, so raising this above that needs an nginx change too. |
| `RAGFLOW_SECRET_KEY` | RAGFlow | (secret) | Signing key for the session tokens the API hands out at login. Without it RAGFlow generates one and caches it in Redis, so flushing Redis would log everyone out. Rotating it invalidates all existing sessions. |
| `EMBEDDING_BATCH_SIZE` | RAGFlow | 16 | Chunks per embedding request (upstream default). Lower it if your embedding provider rate-limits you. |
| `ADMIN_DEFAULT_PASSWORD` | RAGFlow | (secret) | Password of the admin@ragflow.io superuser that the admin server creates on first boot. This is your first login for BOTH the web UI and the admin API. Copy it, then change the password in the UI. It is only read when no superuser exists yet. |
| `DISABLE_PASSWORD_LOGIN` | RAGFlow | (secret) | Keep false. Setting it true hides the password form and leaves only OAuth/OIDC, which is not configured in this template, so nobody could log in. |
| `DOTNET_SYSTEM_GLOBALIZATION_INVARIANT` | RAGFlow | 1 | Required by the .NET component used for .pptx parsing (upstream value). |
| `REDIS_URL` | Redis | - | Convenience connection string over the private network. RAGFlow uses database 1, as upstream does. |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password (passed to valkey-server --requirepass by the start command) and referenced by the RAGFlow service. |

## Configuration

- **Start command:** `sh -c 'echo IyEvdXNyL2Jpbi9lbnYgYmFzaAojIFJhaWx3YXkgc3RhcnQgY29tbWFuZCBmb3IgdGhlIEVsYXN0aWNzZWFyY2ggc2VydmljZSAoZWxhc3RpY3NlYXJjaDo4LjExLjMpLgojIFRoaXMgZmlsZSBpcyB0aGUgU09VUkNFIG9mIHRoZSBiYXNlNjQgYmxvYiBpbiBzZXJpYWxpemVkLWNvbmZpZy5qc29uIC0+CiMgc2VydmljZXMuRWxhc3RpY3NlYXJjaC5kZXBsb3kuc3RhcnRDb21tYW5kLiBBZnRlciBlZGl0aW5nLCByZWdlbmVyYXRlIHdpdGg6CiMgICBiYXNlNjQgPCByYWdmbG93LXJhaWx3YXkvc3RhcnQtZWxhc3RpY3NlYXJjaC5zaCB8IHRyIC1kICdcbicKIwojIFdoeSBhIHdyYXBwZXIgYXQgYWxsOgojICAxLiBSYWlsd2F5IG1vdW50cyB2b2x1bWVzIGFzIHJvb3QgYW5kIHRoZSBvZmZpY2lhbCBpbWFnZSBydW5zIGFzIHVpZCAxMDAwLCBzbwojICAgICB0aGUgc2VydmljZSBzZXRzIFJBSUxXQVlfUlVOX1VJRD0wIGFuZCB0aGlzIHNjcmlwdCBjaG93bnMgdGhlIGRhdGEgZGlyIGFuZAojICAgICB0aGVuIGRyb3BzIGJhY2sgdG8gMTAwMC4gRWxhc3RpY3NlYXJjaCByZWZ1c2VzIHRvIHJ1biBhcyByb290LCBzbwojICAgICBSQUlMV0FZX1JVTl9VSUQ9MCBhbG9uZSBpcyBub3QgZW5vdWdoLgojICAyLiBUaGUgaW1hZ2UncyAvdG1wIGlzIG5vdCB3cml0YWJsZSBieSB1aWQgMTAwMCAodXBzdHJlYW0gY29tcG9zZSB3b3JrcyBhcm91bmQKIyAgICAgaXQgd2l0aCBhIHRtcGZzKTsgdGhlIEpWTSBuZWVkcyBhIHdyaXRhYmxlIHRlbXAgZGlyLgojICAzLiBUaGUgc3RvY2sgY29uZmlnL2VsYXN0aWNzZWFyY2gueW1sIGhhcyAibmV0d29yay5ob3N0OiAwLjAuMC4wIiAoSVB2NCBvbmx5KQojICAgICBhbmQgbm8gZXhwbGljaXQgc2VjdXJpdHkgc2V0dGluZ3MsIHdoaWNoIG1ha2VzIEVTIDggcnVuIGl0cyBUTFMKIyAgICAgYXV0by1jb25maWd1cmF0aW9uIG9uIGZpcnN0IGJvb3QuIFJBR0Zsb3cgdGFsa3MgcGxhaW4gaHR0cDovLyBvdmVyCiMgICAgIFJhaWx3YXkncyBJUHY2IHByaXZhdGUgbmV0d29yaywgc28gYm90aCBoYXZlIHRvIGJlIHBpbm5lZCBoZXJlLiBUaGUgZmlsZSBpcwojICAgICBvdmVyd3JpdHRlbiAobm90IGFwcGVuZGVkKSBiZWNhdXNlIGEgZHVwbGljYXRlIFlBTUwga2V5IGlzIGEgcGFyc2UgZXJyb3IuCnNldCAtZQoKREFUQV9ESVI9L3Vzci9zaGFyZS9lbGFzdGljc2VhcmNoL2RhdGEKbWtkaXIgLXAgIiREQVRBX0RJUiIKY2hvd24gLVIgMTAwMDowICIkREFUQV9ESVIiCmNobW9kIDE3NzcgL3RtcCB8fCB0cnVlCgpjYXQgPiAvdXNyL3NoYXJlL2VsYXN0aWNzZWFyY2gvY29uZmlnL2VsYXN0aWNzZWFyY2gueW1sIDw8J1lNTCcKY2x1c3Rlci5uYW1lOiAiZG9ja2VyLWNsdXN0ZXIiCm5vZGUubmFtZTogInJhZ2Zsb3ctZXMwMSIKZGlzY292ZXJ5LnR5cGU6IHNpbmdsZS1ub2RlCm5ldHdvcmsuaG9zdDogIjo6IgpodHRwLnBvcnQ6IDkyMDAKcGF0aC5kYXRhOiAvdXNyL3NoYXJlL2VsYXN0aWNzZWFyY2gvZGF0YQpib290c3RyYXAubWVtb3J5X2xvY2s6IGZhbHNlCm5vZGUuc3RvcmUuYWxsb3dfbW1hcDogZmFsc2UKeHBhY2suc2VjdXJpdHkuZW5hYmxlZDogdHJ1ZQp4cGFjay5zZWN1cml0eS5lbnJvbGxtZW50LmVuYWJsZWQ6IGZhbHNlCnhwYWNrLnNlY3VyaXR5Lmh0dHAuc3NsLmVuYWJsZWQ6IGZhbHNlCnhwYWNrLnNlY3VyaXR5LnRyYW5zcG9ydC5zc2wuZW5hYmxlZDogZmFsc2UKeHBhY2subGljZW5zZS5zZWxmX2dlbmVyYXRlZC50eXBlOiBiYXNpYwpZTUwKCmNkIC91c3Ivc2hhcmUvZWxhc3RpY3NlYXJjaAplY2hvICJlbGFzdGljc2VhcmNoOiBzdGFydGluZyBzaW5nbGUtbm9kZSBvbiBbOjpdOjkyMDAgYXMgdWlkIDEwMDAiCmlmIGNvbW1hbmQgLXYgc2V0cHJpdiA+L2Rldi9udWxsIDI+JjE7IHRoZW4KICBleGVjIHNldHByaXYgLS1yZXVpZD0xMDAwIC0tcmVnaWQ9MCAtLWNsZWFyLWdyb3VwcyAvYmluL3RpbmkgLS0gL3Vzci9sb2NhbC9iaW4vZG9ja2VyLWVudHJ5cG9pbnQuc2ggZXN3cmFwcGVyCmVsc2UKICBleGVjIGNocm9vdCAtLXVzZXJzcGVjPTEwMDA6MCAtLXNraXAtY2hkaXIgLyAvYmluL3RpbmkgLS0gL3Vzci9sb2NhbC9iaW4vZG9ja2VyLWVudHJ5cG9pbnQuc2ggZXN3cmFwcGVyCmZpCg== | base64 -d > /tmp/railway-start.sh && exec bash /tmp/railway-start.sh'`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `docker-entrypoint.sh mysqld --datadir=/var/lib/mysql/data --bind-address=:: --max_connections=1000 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password --max-allowed-packet=1073741824 --binlog_expire_logs_seconds=604800 --innodb-buffer-pool-size=256M --innodb-redo-log-capacity=268435456`
- **Volume:** `/var/lib/mysql`
- **Start command:** `sh -c "exec minio server /data --address :9000 --console-address :9001"`
- **Volume:** `/data`
- **Start command:** `sh -c 'echo IyEvdXNyL2Jpbi9lbnYgYmFzaAojIFJhaWx3YXkgc3RhcnQgY29tbWFuZCBmb3IgdGhlIFJBR0Zsb3cgc2VydmljZSAoaW5maW5pZmxvdy9yYWdmbG93OnYwLjI3LjIpLgojIFRoaXMgZmlsZSBpcyB0aGUgU09VUkNFIG9mIHRoZSBiYXNlNjQgYmxvYiBpbiBzZXJpYWxpemVkLWNvbmZpZy5qc29uIC0+CiMgc2VydmljZXMuUkFHRmxvdy5kZXBsb3kuc3RhcnRDb21tYW5kLiBBZnRlciBlZGl0aW5nLCByZWdlbmVyYXRlIHdpdGg6CiMgICBiYXNlNjQgPCByYWdmbG93LXJhaWx3YXkvc3RhcnQtcmFnZmxvdy5zaCB8IHRyIC1kICdcbicKIyBhbmQgcGFzdGUgaXQgYmFjayBpbnRvIHRoZSBzdGFydENvbW1hbmQuCiMKIyBXaHkgYSB3cmFwcGVyIGF0IGFsbDoKIyAgMS4gVGhlIGltYWdlJ3Mgbmdpbnggb25seSBoYXMgImxpc3RlbiA4MDsiIChJUHY0KS4gUmFpbHdheSdzIGhlYWx0aGNoZWNrIGFuZAojICAgICBlZGdlIHByb3h5IHByb2JlICRQT1JULCBhbmQgdGhlIHByaXZhdGUgbmV0d29yayBpcyBJUHY2LCBzbyB3ZSByZXdyaXRlIHRoZQojICAgICBsaXN0ZW5lciB0byAkUE9SVCBhbmQgYWRkIGFuIFs6Ol0gbGlzdGVuZXIuCiMgIDIuIGVudHJ5cG9pbnQuc2ggY29ubmVjdHMgdG8gTXlTUUwgLyBFbGFzdGljc2VhcmNoIC8gUmVkaXMgLyBNaW5JTyBvbiB0aGUKIyAgICAgZmlyc3QgbGluZSBpdCBydW5zIChlbnN1cmVfZGJfaW5pdCkgYW5kIGhhcyBgc2V0IC1lYC4gV2l0aG91dCBhIHdhaXQgbG9vcCBhCiMgICAgIGNvbGQgc3RhcnQgcmFjZXMgdGhlIGRhdGFiYXNlcyBhbmQgdGhlIGNvbnRhaW5lciBjcmFzaC1sb29wcy4Kc2V0IC1lCgpQPSIke1BPUlQ6LTgwfSIKZm9yIGYgaW4gL2V0Yy9uZ2lueC9jb25mLmQvcmFnZmxvdy5jb25mLnB5dGhvbiAvZXRjL25naW54L2NvbmYuZC9yYWdmbG93LmNvbmYuaHlicmlkIC9ldGMvbmdpbngvY29uZi5kL3JhZ2Zsb3cuY29uZi5nb2xhbmc7IGRvCiAgaWYgWyAtZiAiJGYiIF07IHRoZW4KICAgIHNlZCAtaSAicy9eXCggKlwpbGlzdGVuIDgwOy9cMWxpc3RlbiAke1B9O1xuXDFsaXN0ZW4gWzo6XToke1B9Oy8iICIkZiIKICBmaQpkb25lCmVjaG8gInJhZ2Zsb3c6IG5naW54IHdpbGwgbGlzdGVuIG9uICR7UH0gKElQdjQgKyBJUHY2KSIKCmZvciB0IGluICIke01ZU1FMX0hPU1R9OiR7TVlTUUxfUE9SVDotMzMwNn0iICIke0VTX0hPU1R9OjkyMDAiICIke1JFRElTX0hPU1R9OjYzNzkiICIke01JTklPX0hPU1R9OjkwMDAiOyBkbwogIGg9IiR7dCU6Kn0iCiAgcD0iJHt0IyMqOn0iCiAgbj0wCiAgdW50aWwgKGV4ZWMgMzw+Ii9kZXYvdGNwLyRoLyRwIikgMj4vZGV2L251bGw7IGRvCiAgICBuPSQoKG4gKyAxKSkKICAgIGlmIFsgIiRuIiAtZ2UgMTUwIF07IHRoZW4KICAgICAgZWNobyAicmFnZmxvdzogZ2F2ZSB1cCB3YWl0aW5nIGZvciAkdCIKICAgICAgYnJlYWsKICAgIGZpCiAgICBlY2hvICJyYWdmbG93OiB3YWl0aW5nIGZvciAkdCIKICAgIHNsZWVwIDIKICBkb25lCmRvbmUKCiMgLS1lbmFibGUtYWRtaW5zZXJ2ZXIgICAgICAgICAgICBib290c3RyYXBzIHRoZSBhZG1pbkByYWdmbG93LmlvIHN1cGVydXNlciBmcm9tCiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBRE1JTl9ERUZBVUxUX1BBU1NXT1JEIGFuZCBzZXJ2ZXMgL2FwaS92MS9hZG1pbgojIC0taW5pdC1tb2RlbC1wcm92aWRlci10YWJsZXMgICAgcnVucyB0b29scy9zY3JpcHRzL3J1bl9taWdyYXRpb25zLnNoIChzYW1lIGFzCiMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgdXBzdHJlYW0gZG9ja2VyLWNvbXBvc2UgY29tbWFuZCkKZXhlYyAuL2VudHJ5cG9pbnQuc2ggLS1lbmFibGUtYWRtaW5zZXJ2ZXIgLS1pbml0LW1vZGVsLXByb3ZpZGVyLXRhYmxlcwo= | base64 -d > /tmp/railway-start.sh && exec bash /tmp/railway-start.sh'`
- **Healthcheck:** `/api/v1/system/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'docker-entrypoint.sh valkey-server --requirepass "$REDIS_PASSWORD" --save 60 1 --dir /data --bind :: 0.0.0.0 --maxmemory 512mb --maxmemory-policy volatile-lru'`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ragflow-document-rag-stack)
