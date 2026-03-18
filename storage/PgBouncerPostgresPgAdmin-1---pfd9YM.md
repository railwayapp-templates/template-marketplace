# Deploy PgBouncer+Postgres+PgAdmin : 1$ on Railway

Optimized PostgreSQL Database Stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/pfd9YM)

## About

# Optimized PostgreSQL Database Stack

## What You Get
This template provides a complete PostgreSQL database stack optimized for high performance and production-ready, with the best configuration for modern applications like n8n.

### Components:
- **PostgreSQL 17**: Main database with high-performance configuration
- **PgBouncer**: Connection pooler to reduce connection overhead and increase throughput
- **pgAdmin**: Intuitive web interface for database management

## Key Features
- ✅ **Production Ready**: Pre-configured with best practices for production deployment
- ✅ **Zero Config**: Runs automatically with synchronization between components
- ✅ **IPv6 Ready**: Full IPv6 communication support for Railway compatibility
- ✅ **Performance Optimized**: Parameters specially tuned for maximum throughput
- ✅ **Secure**: SSL/TLS enabled by default for encrypted connections
- ✅ **Resource Efficient**: Optimized scaling and caching settings

## Usage Instructions
1. **Deploy Template**: Simply click "Deploy" and Railway will set up all components
2. **Access pgAdmin**: Open the public URL to access the pgAdmin interface
3. **Application Connection**: Use Railway variables to connect to PostgreSQL through PgBouncer

## Environment Variables
- Database accessed via: `${{pgbouncer.PGBOUNCER_HOST}}:${{pgbouncer.PGBOUNCER_LISTEN_PORT}}`
- Default credentials: User=`n8n`, Password=`postgres123` (change as needed)

## Technical Specifications
- PostgreSQL 17 with persistent storage
- PgBouncer with "transaction" pool mode and connection optimization
- pgAdmin 4 for database administration through web UI
- Pre-generated SSL/TLS certificates for encrypted connections

Support me if you think this is good, one dollar is also very valuable to me, I'm really broke man. https://linktr.ee/givemesomehope

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/postgres) | Database |
| pgadmin | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/pgadmin) | Web service |
| pgbouncer | [antisofisme/railway](https://github.com/antisofisme/railway) (root: n8n/pgbouncer) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGSSLMODE` | postgres | prefer | Mode SSL PostgreSQL |
| `POSTGRES_DB` | postgres | n8n | Nama database |
| `POSTGRES_JIT` | postgres | on | Aktifkan Just-In-Time compilation |
| `POSTGRES_USER` | postgres | (secret) | Username database |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password database |
| `POSTGRES_WORK_MEM` | postgres | 64MB | Lebih banyak memori per operasi/koneksi |
| `POSTGRES_WAL_LEVEL` | postgres | replica | Level WAL untuk replikasi |
| `POSTGRES_AUTOVACUUM` | postgres | on | Aktifkan autovacuum |
| `POSTGRES_MAX_WAL_SIZE` | postgres | 4GB | Ukuran maksimum WAL sebelum checkpoint |
| `POSTGRES_MIN_WAL_SIZE` | postgres | 1GB | Ukuran minimum WAL yang dipertahankan |
| `POSTGRES_TEMP_BUFFERS` | postgres | 64MB | Meningkatkan buffer untuk temp tables |
| `POSTGRES_JIT_ABOVE_COST` | postgres | 100000 | Threshold lebih rendah untuk aktivasi JIT |
| `POSTGRES_LOG_LOCK_WAITS` | postgres | on | Log jika menunggu lock |
| `POSTGRES_LOG_TEMP_FILES` | postgres | -1 | Matikan logging temp files |
| `POSTGRES_SHARED_BUFFERS` | postgres | 4GB | Meningkatkan cache untuk performa lebih baik |
| `POSTGRES_LOG_CHECKPOINTS` | postgres | off | Matikan log checkpoint |
| `POSTGRES_LOG_CONNECTIONS` | postgres | off | Matikan log koneksi |
| `POSTGRES_LOG_MIN_MESSAGES` | postgres | warning | Hanya tampilkan warning dan error |
| `POSTGRES_RANDOM_PAGE_COST` | postgres | 1.1 | Optimal untuk SSD |
| `POSTGRES_WAL_KEEP_SEGMENTS` | postgres | 32 | Jumlah segment WAL untuk recovery |
| `POSTGRES_AUTOVACUUM_NAPTIME` | postgres | 5min | Interval autovacuum |
| `POSTGRES_LOG_DISCONNECTIONS` | postgres | off | Matikan log pemutusan koneksi |
| `POSTGRES_PARALLEL_SETUP_COST` | postgres | 10 | Kurangi cost untuk aktivasi paralelisme |
| `POSTGRES_PARALLEL_TUPLE_COST` | postgres | 0.01 | Kurangi cost paralelisme |
| `POSTGRES_EFFECTIVE_CACHE_SIZE` | postgres | 8GB | Asumsi OS cache yang lebih besar |
| `POSTGRES_MAINTENANCE_WORK_MEM` | postgres | 1GB | Lebih banyak memori untuk operasi pemeliharaan |
| `POSTGRES_MAX_PARALLEL_WORKERS` | postgres | 8 | Total worker paralel |
| `POSTGRES_MAX_WORKER_PROCESSES` | postgres | 8 | Total proses worker |
| `POSTGRES_AUTOVACUUM_MAX_WORKERS` | postgres | 3 | Jumlah worker autovacuum |
| `POSTGRES_LOG_MIN_ERROR_STATEMENT` | postgres | error | Log statements yang error |
| `POSTGRES_EFFECTIVE_IO_CONCURRENCY` | postgres | 300 | Lebih banyak concurrent I/O untuk SSD |
| `POSTGRES_LOG_MIN_DURATION_STATEMENT` | postgres | 2000 | Hanya log query yang sangat lambat (>2s) |
| `POSTGRES_LOG_AUTOVACUUM_MIN_DURATION` | postgres | 10000 | Hanya log autovacuum yang berjalan >10s |
| `POSTGRES_AUTOVACUUM_VACUUM_SCALE_FACTOR` | postgres | 0.1 | Threshold vacuum |
| `POSTGRES_AUTOVACUUM_ANALYZE_SCALE_FACTOR` | postgres | 0.05 | Threshold analyze |
| `POSTGRES_MAX_PARALLEL_WORKERS_PER_GATHER` | postgres | 4 | Worker per query paralel |
| `PG_SERVER_HOST` | pgadmin | - | Host PostgreSQL |
| `PG_SERVER_PORT` | pgadmin | - | Port PostgreSQL |
| `PG_SERVER_USER` | pgadmin | (secret) | User PostgreSQL |
| `PGADMIN_DEFAULT_DB` | pgadmin | - | Database default |
| `PG_SERVER_DATABASE` | pgadmin | - | Database PostgreSQL |
| `PG_SERVER_PASSWORD` | pgadmin | (secret) | Password PostgreSQL |
| `PGADMIN_LISTEN_PORT` | pgadmin | 8080 | Port untuk web interface |
| `PGADMIN_DEFAULT_HOST` | pgadmin | - | Host default |
| `PGADMIN_DEFAULT_PORT` | pgadmin | - | Port default |
| `PGADMIN_DEFAULT_USER` | pgadmin | (secret) | User default |
| `PGADMIN_DEFAULT_EMAIL` | pgadmin | admin@bantujelasin.com | Email admin |
| `PGADMIN_DEFAULT_PASSWORD` | pgadmin | (secret) | Password default |
| `PGADMIN_SERVER_JSON_FILE` | pgadmin | /pgadmin4/servers.json | File konfigurasi server |
| `PGADMIN_CONFIG_CSV_QUOTING` | pgadmin | 'all' | Mode quoting CSV |
| `PGADMIN_CONFIG_ENABLE_PSQL` | pgadmin | True | Aktifkan terminal psql |
| `PGADMIN_CONFIG_MFA_ENABLED` | pgadmin | False | Matikan MFA |
| `PGADMIN_CONFIG_SERVER_MODE` | pgadmin | True | Mode server |
| `PGADMIN_CONFIG_AUTH_SOURCES` | pgadmin | ['internal'] | Sumber autentikasi |
| `PGADMIN_CONFIG_BINARY_PATHS` | pgadmin | {'pg': '/usr/bin'} | Path utilitas PostgreSQL |
| `PGADMIN_CONFIG_EXPLAIN_COSTS` | pgadmin | True | Tampilkan biaya |
| `PGADMIN_CONFIG_CSV_QUOTE_CHAR` | pgadmin | '\"' | Karakter quote CSV |
| `PGADMIN_CONFIG_EXPLAIN_BUFFERS` | pgadmin | True | Tampilkan buffer |
| `PGADMIN_CONFIG_EXPLAIN_VERBOSE` | pgadmin | True | Explain detail |
| `PGADMIN_CONFIG_CONSOLE_LOG_LEVEL` | pgadmin | 20 | Level log INFO |
| `PGADMIN_CONFIG_ALLOW_SAVE_PASSWORD` | pgadmin | (secret) | Izinkan simpan password |
| `PGADMIN_CONFIG_CSV_FIELD_SEPARATOR` | pgadmin | ',' | Pemisah field CSV |
| `PGADMIN_CONFIG_SQL_EDITOR_TAB_SIZE` | pgadmin | 4 | Ukuran tab editor |
| `PGADMIN_CONFIG_MAX_QUERY_HIST_STORED` | pgadmin | 500 | Riwayat query |
| `PGADMIN_CONFIG_MAX_SESSION_IDLE_TIME` | pgadmin | 7200 | Waktu idle maksimum (2 jam) |
| `PGADMIN_CONFIG_UPGRADE_CHECK_ENABLED` | pgadmin | False | Matikan cek upgrade |
| `PGADMIN_CONFIG_SHARED_STORAGE_MAX_SIZE` | pgadmin | 1073741824 | Ukuran penyimpanan bersama (1GB) |
| `PGADMIN_CONFIG_CHECK_CORRUPTED_DB_ENTRY` | pgadmin | False | Matikan cek korupsi |
| `PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED` | pgadmin | (secret) | Tidak wajib master password |
| `PGADMIN_CONFIG_MAX_TRANSACTION_LOG_SIZE` | pgadmin | 104857600 | Ukuran log transaksi (100MB) |
| `PGADMIN_CONFIG_TABLE_ROWS_DISPLAY_COUNT` | pgadmin | 500 | Jumlah baris tabel |
| `PGADMIN_CONFIG_ALLOW_SAVE_TUNNEL_PASSWORD` | pgadmin | (secret) | Izinkan simpan password tunnel |
| `PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION` | pgadmin | True | Proteksi cookie |
| `PGADMIN_CONFIG_ENABLE_RUNTIME_DOWNLOAD_ASSETS` | pgadmin | True | Aktifkan download aset |
| `POSTGRES_DB` | pgbouncer | - | Duplikat untuk kompatibilitas |
| `PGBOUNCER_SSL` | pgbouncer | true | Aktifkan SSL |
| `POSTGRES_USER` | pgbouncer | (secret) | Duplikat untuk kompatibilitas |
| `PGBOUNCER_HOST` | pgbouncer | - | Integrasi dengan PostgreSQL |
| `PGBOUNCER_PKT_BUF` | pgbouncer | 16384 | Ukuran buffer paket |
| `POSTGRES_PASSWORD` | pgbouncer | (secret) | Duplikat untuk kompatibilitas |
| `PGBOUNCER_AUTH_TYPE` | pgbouncer | md5 | Metode autentikasi |
| `PGBOUNCER_LOG_STATS` | pgbouncer | 0 | Matikan log statistik |
| `PGBOUNCER_POOL_MODE` | pgbouncer | transaction | Mode pool per transaksi |
| `PGBOUNCER_LISTEN_ADDR` | pgbouncer | * | Alamat untuk mendengarkan koneksi |
| `PGBOUNCER_LISTEN_PORT` | pgbouncer | 6432 | Port untuk koneksi klien |
| `PGBOUNCER_TLS_ENABLED` | pgbouncer | true | Aktifkan SSL secara global |
| `PGBOUNCER_STATS_PERIOD` | pgbouncer | 60 | Interval statistik |
| `PGBOUNCER_TCP_KEEPIDLE` | pgbouncer | 60 | Waktu idle sebelum keepalive |
| `PGBOUNCER_MIN_POOL_SIZE` | pgbouncer | 20 | Ukuran pool minimum yang lebih besar |
| `PGBOUNCER_TCP_KEEPALIVE` | pgbouncer | 1 | Aktifkan TCP keepalive |
| `PGBOUNCER_TCP_KEEPINTVL` | pgbouncer | 30 | Interval keepalive |
| `PGBOUNCER_LOG_CONNECTIONS` | pgbouncer | 0 | Matikan log koneksi baru |
| `PGBOUNCER_MAX_PACKET_SIZE` | pgbouncer | 2147483647 | Ukuran paket maksimum |
| `PGBOUNCER_SERVER_LIFETIME` | pgbouncer | 1800 | Lifetime yang lebih pendek untuk recycle koneksi |
| `PGBOUNCER_DEFAULT_POOL_SIZE` | pgbouncer | 100 | Ukuran pool default yang lebih besar |
| `PGBOUNCER_SERVER_FAST_CLOSE` | pgbouncer | 1 | Tutup koneksi lebih cepat |
| `PGBOUNCER_CLIENT_TLS_SSLMODE` | pgbouncer | prefer | Mode SSL client (disable, allow, prefer, require, verify-ca, verify-full) |
| `PGBOUNCER_LOG_DISCONNECTIONS` | pgbouncer | 0 | Matikan log pemutusan koneksi |
| `PGBOUNCER_QUERY_WAIT_TIMEOUT` | pgbouncer | 120 | Timeout untuk query yang menunggu |
| `PGBOUNCER_SERVER_ROUND_ROBIN` | pgbouncer | 1 | Distribusi koneksi lebih merata |
| `PGBOUNCER_SERVER_TLS_SSLMODE` | pgbouncer | prefer | Mode SSL server |
| `PGBOUNCER_SERVER_IDLE_TIMEOUT` | pgbouncer | 60 | Timeout lebih pendek untuk koneksi idle |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/template/pfd9YM)
