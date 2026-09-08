# Deploy Alexandrie on Railway

Self-hosted Markdown notes and knowledge base with persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alexandrie)

## About

Alexandrie is a self-hosted Markdown note-taking and knowledge-base application for personal notes, research collections, and shared documentation. This community template deploys Alexandrie v8.14.0 with persistent database and file storage, automatically generated credentials, and a Railway-provided HTTPS domain. No custom domain, separate registry account, or manual secret generation is required.

Five services run in one Railway project: the frontend, backend, MySQL, RustFS, and a Caddy gateway. Only the gateway has a public domain; the other services use private networking.

MySQL stores notes and account data, while RustFS stores uploaded files. Both have persistent volumes so their data survives service redeployments. Infrastructure passwords and signing secrets are generated separately for each installation. You create your own account after deployment, then configure administrator access or close registration if needed. Email delivery and single sign-on are optional; the default installation supports username-and-password login without them.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:8.0.46@sha256:7dcddc01f13bab2f15cde676d44d01f61fc9f99fe7785e86196dfc07d358ae2b` | Database |
| gateway | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| rustfs | `rustfs/rustfs:1.0.0-rc.5@sha256:c36b3efea3d1e503f1a2581abd0e7611e0e5820dd30e1850a52384b3fc52bda4` | Database |
| backend | `ghcr.io/smaug6739/alexandrie-backend:v8.14.0` | Worker |
| frontend | `ghcr.io/smaug6739/alexandrie-frontend:v8.14.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | MySQL | - | Internal service port. |
| `MYSQLHOST` | MySQL | - | Private hostname for the Railway Data panel. |
| `MYSQLPORT` | MySQL | 3306 | Internal MySQL port; no public TCP proxy is created. |
| `MYSQLUSER` | MySQL | root | Administrative user for the Railway Data panel only. |
| `MYSQL_URL` | MySQL | - | Private administrative connection URL for Railway database integration. |
| `MYSQL_USER` | MySQL | (secret) | Non-root application user, created on first initialization. |
| `MYSQLDATABASE` | MySQL | - | Railway Data panel database. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root credential reference for the Railway Data panel. |
| `MYSQL_DATABASE` | MySQL | alexandrie | Database created on first initialization. Changing this does not rename an existing database. |
| `MYSQL_PASSWORD` | MySQL | (secret) | Generated application-user password. Changing only this variable does not rotate an initialized MySQL user. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Independent generated root password, used by the Railway Data panel, not Alexandrie. |
| `PORT` | gateway | 8080 | HTTP port behind Railway TLS termination. |
| `CADDY_CONFIG` | gateway | {
	admin off
	auto_https off
	servers {
		trusted_proxies static private_ranges
		trusted_proxies_strict
	}
}

(forwarded_https) {
	header_up X-Forwarded-Proto {http.request.header.X-Forwarded-Proto}
	header_up X-Forwarded-Port 443
}

:{$PORT:8080} {
	@health {
		method GET
		path /_health
	}
	handle @health {
		respond "ok" 200
	}

	@api path /api /api/*
	handle @api {
		reverse_proxy {$BACKEND_UPSTREAM} {
			import forwarded_https
		}
	}

	# Backup objects stay private in S3; only valid signed requests can read them.
	# Do not use handle_path: S3 signatures require the original bucket/object path.
	@objects path /alexandrie/* /alexandrie-backups/*
	handle @objects {
		reverse_proxy {$RUSTFS_UPSTREAM} {
			import forwarded_https
		}
	}

	handle {
		reverse_proxy {$FRONTEND_UPSTREAM} {
			import forwarded_https
		}
	}
}
 | Path-preserving routing, including private signed backup downloads. |
| `RUSTFS_UPSTREAM` | gateway | - | Private S3 upstream; never the console. |
| `BACKEND_UPSTREAM` | gateway | - | Private API upstream. |
| `FRONTEND_UPSTREAM` | gateway | - | Private frontend upstream. |
| `PORT` | rustfs | 9000 | Private S3 API port. |
| `RUSTFS_ADDRESS` | rustfs | [::]:9000 | Dual-stack listener for Railway private networking. |
| `RUSTFS_VOLUMES` | rustfs | /data | Persistent object-storage directory. |
| `RUSTFS_ACCESS_KEY` | rustfs | - | Generated S3 access key, unique per installation. |
| `RUSTFS_SECRET_KEY` | rustfs | (secret) | Generated S3 secret key, unique per installation. |
| `RUSTFS_CONSOLE_ENABLE` | rustfs | false | Console disabled; no console port or public domain is created. |
| `RUSTFS_OBS_LOGGER_LEVEL` | rustfs | info | RustFS log level. |
| `RUSTFS_OBS_LOG_DIRECTORY` | rustfs | /tmp/rustfs-logs | Ephemeral logs; object data remains on the persistent volume. |
| `PORT` | backend | 8201 | Private backend API port. |
| `GIN_MODE` | backend | release | Production Gin mode. |
| `JWT_SECRET` | backend | (secret) | Generated JWT signing secret. Do not share this between installations. |
| `BACKEND_PORT` | backend | - | Alexandrie listener port. |
| `FRONTEND_URL` | backend | - | Generated HTTPS origin used by browsers and emails. |
| `MINIO_BUCKET` | backend | alexandrie | Main bucket; gateway routes are tied to this name. Backup bucket is alexandrie-backups. |
| `MINIO_SECURE` | backend | false | Internal S3 uses HTTP over Railway private networking; public URLs remain HTTPS. |
| `COOKIE_DOMAIN` | backend | - | Gateway hostname only, without a scheme. |
| `DATABASE_HOST` | backend | - | MySQL private hostname. |
| `DATABASE_NAME` | backend | - | Application database. |
| `DATABASE_PORT` | backend | - | MySQL private port. |
| `DATABASE_USER` | backend | (secret) | Dedicated non-root application user. |
| `ADMIN_ACCOUNTS` | backend | - | After signing up, enter your user ID here and redeploy to obtain admin rights. Comma-separated for multiple admins. |
| `ALLOW_UNSECURE` | backend | false | Keep Secure and HTTP-only authentication cookies enabled. |
| `MINIO_ENDPOINT` | backend | - | Private S3 API endpoint. |
| `MINIO_ACCESSKEY` | backend | - | S3 access-key reference. |
| `MINIO_SECRETKEY` | backend | (secret) | S3 secret-key reference. |
| `MINIO_PUBLIC_URL` | backend | - | HTTPS origin for image and signed backup URLs. |
| `DATABASE_PASSWORD` | backend | (secret) | Reference to the application credential, not the root credential. |
| `CONFIG_DISABLE_SIGNUP` | backend | false | Keep false for initial account creation; change to true after bootstrap if desired. |
| `CONFIG_DISABLE_NATIVE_LOGIN` | backend | (secret) | Do not disable native login before configuring and testing OIDC. |
| `HOST` | frontend | :: | Dual-stack listener. |
| `PORT` | frontend | 8200 | Private frontend port. |
| `NODE_ENV` | frontend | production | Production mode. |
| `NITRO_HOST` | frontend | :: | Nuxt/Nitro dual-stack listener. |
| `NUXT_PUBLIC_BASE_API` | frontend | - | Same-origin public API base URL. |
| `NUXT_PUBLIC_BASE_CDN` | frontend | - | Same-origin public file URL. |
| `NUXT_PUBLIC_BASE_URL` | frontend | - | Generated public application URL. |
| `NUXT_PUBLIC_CDN_ENDPOINT` | frontend | /alexandrie/ | Public object path; must match the bucket and Caddy route. |
| `NUXT_PUBLIC_CONFIG_HIDE_NATIVE_LOGIN` | frontend | (secret) | Keep native login visible for first-time setup. |
| `NUXT_PUBLIC_CONFIG_DISABLE_SIGNUP_PAGE` | frontend | - | Mirrors backend signup policy. |
| `NUXT_PUBLIC_CONFIG_DISABLE_LANDING_PAGE` | frontend | false | Optional: set true to skip the landing page. |
| `NUXT_PUBLIC_CONFIG_DISABLE_NATIVE_LOGIN` | frontend | (secret) | Mirrors backend native-login policy. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=256M`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c 'printf "%s\n" "$CADDY_CONFIG" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Healthcheck:** `/login`

**Category:** Other · **Tags:** markdown, notes, wiki, self-hosted

[View on Railway →](https://railway.com/deploy/alexandrie)
