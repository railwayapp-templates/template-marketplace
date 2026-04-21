# Deploy Mastodon | Open Source Twitter Alternative on Railway on Railway

Self-host Mastodon. Your own federated social network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastodon)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mastodon?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Mastodon is a free, open-source federated social networking platform that gives you full control over your online community. Built on the ActivityPub protocol, it connects with thousands of other Mastodon instances and Fediverse services while keeping your data under your ownership.

Deploy Mastodon on Railway to self-host your own social networking server with zero infrastructure management. This template pre-configures the Mastodon web application (Puma + Sidekiq), a dedicated Node.js streaming API for real-time WebSocket updates, PostgreSQL for persistent data, and Redis for caching and background job queues — all wired together and ready to federate. The template also auto-creates your admin account on first boot, so you can log in immediately after deploy without opening a shell.

Mastodon is a decentralized alternative to Twitter/X that puts communities in control. Each instance is independently operated but can communicate with any other ActivityPub-compatible server, forming the Fediverse — a network of interconnected social platforms.

Key features of self-hosted Mastodon include:

- **Federation** — connect with millions of users across thousands of Fediverse instances
- **Moderation tools** — full control over content policies, blocklists, and user management
- **No algorithm** — chronological timelines without engagement-driven manipulation
- **Media support** — images, videos, audio, and polls with configurable size limits
- **API-first** — comprehensive REST API powers dozens of third-party mobile and desktop clients
- **Privacy controls** — per-post visibility (public, unlisted, followers-only, direct)

The architecture uses Puma (Ruby) for the web interface, Sidekiq for background job processing (federation, email, media processing), and a Node.js streaming server for real-time WebSocket connections.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Mastodon | `ghcr.io/mastodon/mastodon:v4.5.9` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Mastodon-Streaming | `ghcr.io/mastodon/mastodon-streaming:v4.5.9` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `PORT` | Mastodon | 3000 | HTTP port Puma listens on |
| `DB_HOST` | Mastodon | - | PostgreSQL host |
| `DB_NAME` | Mastodon | - | PostgreSQL database name |
| `DB_PASS` | Mastodon | - | PostgreSQL password |
| `DB_POOL` | Mastodon | 25 | Shared pool (Puma + Sidekiq in one container) |
| `DB_PORT` | Mastodon | - | PostgreSQL port |
| `DB_USER` | Mastodon | (secret) | PostgreSQL user |
| `RAILS_ENV` | Mastodon | production | Rails environment |
| `REDIS_URL` | Mastodon | - | Redis connection URL |
| `OTP_SECRET` | Mastodon | (secret) | Two-factor auth HMAC key |
| `ADMIN_EMAIL` | Mastodon | - | Admin email — use a real domain for MX-validated flows |
| `LOCAL_DOMAIN` | Mastodon | - | Public federation domain for this instance |
| `ADMIN_PASSWORD` | Mastodon | (secret) | Admin login password |
| `ADMIN_USERNAME` | Mastodon | (secret) | Admin handle (shown as @admin) |
| `RAILS_LOG_LEVEL` | Mastodon | warn | Log verbosity |
| `SECRET_KEY_BASE` | Mastodon | (secret) | Rails session signing key |
| `MALLOC_ARENA_MAX` | Mastodon | 2 | Limit glibc memory arenas (Ruby memory tuning) |
| `SINGLE_USER_MODE` | Mastodon | true | Redirect landing page to admin profile |
| `TRUSTED_PROXY_IP` | Mastodon | 100.64.0.0/10 | Railway CGNAT proxy range (prevents IpSpoofAttackError) |
| `VAPID_PUBLIC_KEY` | Mastodon | BC0vbsfDM5JPVTEL9qUIx6mFxkgf3WA8d2PeTV4LedfAWVac57vw7mHP8iNCyAvKsvECmNggOiaFDOKvFV2G2Zo | Web Push ECDSA P-256 public key (base64url) |
| `VAPID_PRIVATE_KEY` | Mastodon | kJ2s4Bc5YiLgJGQKQ4q4ACLPKCuSbC7Gnsyx1H_CEAY | Web Push ECDSA P-256 private key (base64url) |
| `RAILS_LOG_TO_STDOUT` | Mastodon | enabled | Stream logs to Railway |
| `ADMIN_BOOTSTRAP_RUBY` | Mastodon | email=ENV["ADMIN_EMAIL"].to_s.strip;username=ENV["ADMIN_USERNAME"].to_s.strip;password=ENV["ADMIN_PASSWORD"].to_s;if email.empty?||password.empty?||username.empty?;puts "[admin-bootstrap] env vars missing; skipping";elsif User.exists?(email:email);puts "[admin-bootstrap] admin already exists: #{email}";else;begin;user=User.new(email:email,password:password,password_confirmation:password,confirmed_at:Time.now.utc,approved:true,agreement:true,account_attributes:{username:username});owner_role=UserRole.find_by(name:"Owner");user.role=owner_role if owner_role;user.save(validate:false);puts "[admin-bootstrap] created admin: #{email} (username: #{username})";rescue => e;puts "[admin-bootstrap] failed: #{e.class}: #{e.message}";end;end | # Ruby script that creates the admin user on first boot; idempotent |
| `RAILS_SERVE_STATIC_FILES` | Mastodon | true | Serve /assets from Puma (no separate Nginx) |
| `ACTIVE_RECORD_ENCRYPTION_PRIMARY_KEY` | Mastodon | - | ActiveRecord encryption primary key |
| `ACTIVE_RECORD_ENCRYPTION_DETERMINISTIC_KEY` | Mastodon | - | ActiveRecord deterministic key |
| `ACTIVE_RECORD_ENCRYPTION_KEY_DERIVATION_SALT` | Mastodon | - | ActiveRecord key derivation salt |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Mastodon-Streaming | 4000 | Streaming server port |
| `DB_HOST` | Mastodon-Streaming | - | PostgreSQL host |
| `DB_NAME` | Mastodon-Streaming | - | PostgreSQL database name |
| `DB_PASS` | Mastodon-Streaming | - | PostgreSQL password |
| `DB_PORT` | Mastodon-Streaming | - | PostgreSQL port |
| `DB_USER` | Mastodon-Streaming | (secret) | PostgreSQL username |
| `REDIS_URL` | Mastodon-Streaming | - | Redis connection URL |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'bundle exec rails db:migrate 2>&1 && bundle exec rails db:seed 2>&1 && bundle exec rails runner "$ADMIN_BOOTSTRAP_RUBY" 2>&1 && (bundle exec sidekiq &) && bundle exec puma -C config/puma.rb'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/mastodon/public/system`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node ./streaming/index.js`

**Category:** Other

[View on Railway →](https://railway.com/deploy/mastodon)
