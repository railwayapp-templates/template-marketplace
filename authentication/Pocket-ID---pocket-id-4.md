# Deploy Pocket ID on Railway

Pocket ID 2.16 passkey-only OIDC provider for single sign-on.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pocket-id-4)

## About

Pocket ID is a simple OpenID Connect provider that signs users in with passkeys instead of passwords. Apps that support OIDC, such as Grafana, Nextcloud, Immich, Portainer, Proxmox and your own services, delegate login to it, and users authenticate with Face ID, Windows Hello, a phone or a hardware security key.

This template deploys Pocket ID v2.16.0 from the official image with SQLite on a Railway volume. Instead of leaving the initial setup page open to the first visitor, the start command creates the admin account through the API with a generated static API key. While the admin has no passkey, every start prints a one-time sign-in link, valid for one hour, to the deployment logs. Open it, add your passkey, then create OIDC clients for your apps. Pocket ID trusts Railway's proxy headers and fits the Hobby plan. Users sign in with passkeys only, so there are no passwords to leak or reset.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pocketid | `ghcr.io/pocket-id/pocket-id:v2.16.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 1411 |
| `TRUST_PROXY` | true |
| `STATIC_API_KEY` | (secret) |
| `ANALYTICS_DISABLED` | true |
| `POCKET_ID_ADMIN_EMAIL` | admin@example.com |
| `POCKET_ID_ADMIN_USERNAME` | (secret) |

## Configuration

- **Start command:** `sh -c '/app/docker/entrypoint.sh /app/pocket-id & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; W="busybox wget -q"; A=http://127.0.0.1:${PORT}/api; H="X-API-Key: $STATIC_API_KEY"; J="Content-Type: application/json"; ID=00000000-0000-4000-8000-00000000ad01; until $W -O /dev/null http://127.0.0.1:${PORT}/healthz 2>/dev/null; do kill -0 $pid 2>/dev/null || exit 1; sleep 2; done; if ! $W -O /dev/null --header "$H" $A/users/$ID 2>/dev/null; then $W -O /dev/null --header "$H" --header "$J" --post-data "{\"id\":\"$ID\",\"username\":\"$POCKET_ID_ADMIN_USERNAME\",\"email\":\"$POCKET_ID_ADMIN_EMAIL\",\"emailVerified\":true,\"firstName\":\"Admin\",\"displayName\":\"Admin\",\"isAdmin\":true}" $A/users && echo "pocket-id: admin $POCKET_ID_ADMIN_USERNAME created, initial setup closed"; fi; if [ "$($W -O- --header "$H" $A/users/$ID/webauthn-credentials 2>/dev/null)" = "[]" ]; then T=$($W -O- --header "$H" --header "$J" --post-data "{}" $A/users/$ID/one-time-access-token 2>/dev/null | sed -n "s/.*\"token\":\"\([^\"]*\)\".*/\1/p"); [ -n "$T" ] && echo "pocket-id: admin has no passkey yet; open within 1 hour to sign in once and add one: $APP_URL/lc/$T"; fi; wait $pid'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/pocket-id-4)
