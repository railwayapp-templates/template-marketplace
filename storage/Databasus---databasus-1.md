# Deploy Databasus on Railway

Databasus 3.60 scheduled backups for Postgres, MySQL and MongoDB with a UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/databasus-1)

## About

Databasus is a database backup tool with a web UI. It schedules logical and physical backups of PostgreSQL, MySQL, MariaDB and MongoDB, keeps them with retention policies, verifies restores, and stores them locally or in S3, Google Drive, Azure, SFTP, FTP, NAS or any rclone remote, with notifications to Slack, Discord, Telegram and email.

This template deploys Databasus v3.60.0 from the official image. Its own metadata lives in an internal Postgres on a Railway volume, together with local backups. On first start the admin account is created from environment variables and external sign-up, member invitations and member workspaces are turned off, so nobody else can register. Add your Railway databases over the private network, for example `postgres.railway.internal`, and choose a schedule. For off-site copies, add an S3 or other remote storage. Watch the volume size if backups stay local on the Hobby plan. Restore verification can test backups automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| databasus | `databasus/databasus:v3.60.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4005 |
| `DATABASUS_ADMIN_EMAIL` | admin@example.com |
| `DATABASUS_ADMIN_PASSWORD` | (secret) |
| `IS_DISABLE_ANONYMOUS_TELEMETRY` | true |

## Configuration

- **Start command:** `bash -c '/app/start.sh & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; req(){ exec 3<>/dev/tcp/127.0.0.1/4005 || return 1; A=""; [ -n "$4" ] && A="Authorization: Bearer $4\r\n"; printf "%s /api/v1%s HTTP/1.0\r\nHost: localhost\r\nContent-Type: application/json\r\n%bContent-Length: %s\r\n\r\n%s" "$1" "$2" "$A" "${#3}" "$3" >&3; cat <&3; exec 3<&-; }; until req GET /system/version "" "" 2>/dev/null | grep -q " 200 "; do kill -0 $pid 2>/dev/null || exit 1; sleep 2; done; if req GET /users/is-any-user-exist "" "" | grep -q "\"isExist\":false"; then T=$(req POST /users/signup "{\"email\":\"$DATABASUS_ADMIN_EMAIL\",\"password\":\"$DATABASUS_ADMIN_PASSWORD\",\"name\":\"Admin\"}" "" | sed -n "s/.*\"token\":\"\([^\"]*\)\".*/\1/p"); if [ -n "$T" ] && req PUT /users/settings "{\"isAllowExternalRegistrations\":false,\"isAllowMemberInvitations\":false,\"isMemberAllowedToCreateWorkspaces\":false}" "$T" | grep -q " 200 "; then echo "databasus: admin $DATABASUS_ADMIN_EMAIL created, external sign-up closed"; else echo "databasus: admin bootstrap failed" >&2; fi; fi; wait $pid'`
- **Healthcheck:** `/api/v1/system/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/databasus-data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/databasus-1)
