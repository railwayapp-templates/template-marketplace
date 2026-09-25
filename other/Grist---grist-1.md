# Deploy Grist on Railway

Grist 1.7: relational spreadsheet with Python formulas and REST API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grist-1)

## About

Grist is a relational spreadsheet: a familiar grid with typed columns, linked tables, Python formulas, access rules, charts, forms and a REST API. It works like a lightweight database that non-developers can use, and whole documents can be exported as SQLite, Excel or CSV files at any time.

This template runs the official `gristlabs/grist:1.7.19` image behind a small Caddy gateway. The gateway asks for a username and generated password (basic auth), then signs you in to Grist as the admin email through forward-auth, so nobody can reach Grist without the password. Grist API keys still work directly for scripts. Formulas run in the Pyodide sandbox, which needs no special privileges on Railway. Documents are stored on a volume at `/persist`, so they survive redeploys. Both services fit the Hobby plan; large documents need more memory. It is a single-user setup; add an OIDC or SAML provider for teams.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grist | `gristlabs/grist:1.7.19` | Database |
| gateway | `caddy:2.11.4-alpine` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | grist | 8484 |
| `GRIST_IN_SERVICE` | grist | true |
| `GRIST_FORCE_LOGIN` | grist | (secret) |
| `GRIST_SANDBOX_FLAVOR` | grist | pyodide |
| `GRIST_SESSION_SECRET` | grist | (secret) |
| `GRIST_TELEMETRY_LEVEL` | grist | off |
| `GRIST_FORWARD_AUTH_HEADER` | grist | X-Forwarded-User |
| `PORT` | gateway | 8080 |
| `CADDYFILE` | gateway | {
	admin off
	auto_https off
}

:{$PORT} {
	handle /gateway_health {
		respond ok 200
	}

	# Grist's own health endpoint stays open.
	handle /status {
		reverse_proxy {$GRIST_UPSTREAM}
	}

	# Grist API keys go straight to Grist, which validates them itself.
	@apikey header_regexp Authorization `^Bearer .+`
	handle @apikey {
		reverse_proxy {$GRIST_UPSTREAM} {
			header_up -X-Forwarded-User
		}
	}

	handle {
		basic_auth {
			{$GRIST_ADMIN_USER} {$GRIST_ADMIN_HASH}
		}
		# Grist reads this header at /auth/login (GRIST_FORWARD_AUTH_HEADER); the gateway always sets it.
		reverse_proxy {$GRIST_UPSTREAM} {
			header_up X-Forwarded-User {$GRIST_ADMIN_EMAIL}
			header_up -Authorization
		}
	}
} |
| `GRIST_ADMIN_USER` | gateway | (secret) |
| `GRIST_ADMIN_EMAIL` | gateway | admin@example.com |
| `GRIST_ADMIN_PASSWORD` | gateway | (secret) |

## Configuration

- **Healthcheck:** `/status`
- **Volume:** `/persist`
- **Start command:** `sh -c 'export GRIST_ADMIN_HASH=$(caddy hash-password --plaintext "$GRIST_ADMIN_PASSWORD") && printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/gateway_health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/grist-1)
