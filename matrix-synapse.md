# Deploy matrix-synapse on Railway

Deploy matrix synapse server with Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/matrix-synapse)

## About

All environment variables have to be set at the beginning, otherwise you must edit the /data/homeserver.yaml via ssh or wipe all volumes. For more details please check the custom startup command.

You need:
 - SMTP server
 - S3 or S3-like storage

By default you have to fill the email settings to be able to use the registration. Check the documents for more detail.

https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| synapse | `matrixdotorg/synapse:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `POSTGRES_INITDB_ARGS` | Postgres | --encoding=UTF-8 --lc-collate=C --lc-ctype=C | - |
| `S3_BUCKET` | synapse | - | The bucket's name. |
| `PGSQL_USER` | synapse | (secret) | - |
| `EMAIL_APP_NAME` | synapse | - | Defines the default value for %(app)s in notif_from and email subjects. Defaults to "Matrix". |
| `PUBLIC_BASEURL` | synapse | - | The public-facing base URL that clients use to access this Homeserver (not including _matrix/...). If unset or null, https://<server_name>/ is used. |
| `EMAIL_FORCE_TLS` | synapse | - | Defaults to false. |
| `EMAIL_SMTP_USER` | synapse | (secret) | - |
| `MAX_AVATAR_SIZE` | synapse | 10M | Defaults to null. End with "K" "M" "G" "T". |
| `MAX_UPLOAD_SIZE` | synapse | - | Defaults to "50M". End with "K" "M" "G" "T". |
| `EMAIL_NOTIF_FROM` | synapse | - | Defines the "From" address to use when sending emails. ([name] <noreply@example.com>) |
| `ENABLE_REGISTRATION` | synapse | - | Defaults to false. Can be changed to true. |
| `SYNAPSE_CONFIG_PATH` | synapse | /data/homeserver.yaml | - |
| `SYNAPSE_SERVER_NAME` | synapse | - | This sets the public-facing domain of the server. |
| `S3_SECRET_ACCESS_KEY` | synapse | (secret) | - |
| `SYNAPSE_REPORT_STATS` | synapse | no | Defaults to no, can be changed to yes. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "[ -f /data/homeserver.yaml ] || ( /start.py generate && curl -sLo /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 && chmod +x /usr/local/bin/yq && /usr/local/bin/yq eval '.database.name=\"psycopg2\" | del(.database.args.database) | .database.args.user=strenv(PGSQL_USER) | .database.args.password=strenv(PGSQL_PASS) | .database.args.dbname=strenv(PGSQL_DATABASE) | .database.args.host=strenv(PGSQL_HOST) | .database.args.sslmode=\"disable\" | .suppress_key_server_warning=true | .public_baseurl=strenv(PUBLIC_BASEURL) | .email.smtp_host=strenv(EMAIL_SMTP_HOST) | .email.smtp_port=strenv(EMAIL_SMTP_PORT) | .email.smtp_user=strenv(EMAIL_SMTP_USER) | .email.smtp_pass=strenv(EMAIL_SMTP_PASS) | .email.force_tls=(strenv(EMAIL_FORCE_TLS)=="true") | .email.tlsname=strenv(EMAIL_SMTP_HOST) | .email.app_name=strenv(EMAIL_APP_NAME) | .email.enable_notifs=true | .email.notif_from=strenv(EMAIL_NOTIF_FROM) | .email.notif_for_new_users=false | .enable_registration=(strenv(ENABLE_REGISTRATION)=="true") | .max_avatar_size=strenv(MAX_AVATAR_SIZE) | .registrations_require_3pid=[\"email\"] | .max_pending_media_uploads=3 | .max_upload_size=strenv(MAX_UPLOAD_SIZE) | .media_storage_providers=[{\"module\":\"s3_storage_provider.S3StorageProviderBackend\",\"store_local\":true,\"store_remote\":true,\"store_synchronous\":true,\"config\":{\"bucket\":strenv(S3_BUCKET),\"endpoint_url\":strenv(S3_ENDPOINT_URL),\"access_key_id\":strenv(S3_ACCESS_KEY_ID),\"secret_access_key\":strenv(S3_SECRET_ACCESS_KEY)}}]' -i /data/homeserver.yaml ); pip install --no-cache-dir boto3 && curl -fsSL 'https://github.com/matrix-org/synapse-s3-storage-provider/raw/refs/heads/main/s3_storage_provider.py' -o \"$(python -c 'import site; p=[x for x in site.getsitepackages() if \"site-packages\" in x]; print((p[0] if p else site.getusersitepackages()) + \"/s3_storage_provider.py\")')\" && exec /start.py"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/matrix-synapse)
