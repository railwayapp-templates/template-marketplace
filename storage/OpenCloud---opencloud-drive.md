# Deploy OpenCloud on Railway

File sync and sharing platform with browser-based office editing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencloud-drive)

## About

OpenCloud is an open-source file sync and share platform written in Go by the Heinlein Group in Berlin, and the successor to ownCloud Infinite Scale. It gives a team its own storage: personal drives, shared project Spaces, password-protected public links, desktop and mobile sync clients, and office documents edited in the browser. Teams self-host OpenCloud when files must stay under their own control — GDPR obligations, client confidentiality, or simply not paying per seat for storage they already own.

Deploy OpenCloud on Railway and the whole stack comes up configured. The `opencloud` service runs the server and takes the public domain. The `collabora` service runs Collabora Online, so documents open in a real editor rather than a download prompt. The `tika` service runs Apache Tika on the private network for text extraction. File contents go to a Railway object storage bucket through OpenCloud's `decomposeds3` driver, so the volume holds only configuration, metadata and the search index rather than every byte your users upload.

![Diagram of the OpenCloud, Collabora and Tika services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788539316/opencloud-architecture.png)

OpenCloud is a single Go binary running around thirty internal microservices in one process — proxy, identity provider, storage, sharing, search, activity log — so it needs no PHP runtime and no relational database. Users live in a built-in LibreGraph directory; everything else is files. That is what makes it comfortable on Railway, where a LAMP-style stack would need several more moving parts.

Key features:

- Personal drives and shared project Spaces with per-member roles
- Public links with expiry dates and enforced passwords
- Desktop sync clients for macOS, Windows and Linux, plus iOS and Android apps
- Browser office editing through Collabora Online (Writer, Calc, Impress)
- WebDAV access, plus a built-in OpenID Connect provider
- File versioning, a trash bin and a per-resource activity feed

Architecture on Railway: `opencloud` takes the app domain and also serves the WOPI endpoint Collabora calls back to at `/wopi`. `collabora` has its own domain because the browser loads the editor in an iframe. `tika` stays private on `tika.railway.internal`. The bucket holds file bodies; the volume at `/data` holds configuration, the identity database, thumbnails and the search index.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tika | [gridalpha/opencloud-railway](https://github.com/gridalpha/opencloud-railway) | Worker |
| collabora | [gridalpha/opencloud-railway](https://github.com/gridalpha/opencloud-railway) | Web service |
| opencloud | [gridalpha/opencloud-railway](https://github.com/gridalpha/opencloud-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | tika | 9998 | Port Railway probes |
| `PRIVATE_URL` | tika | http://tika.railway.internal:9998 | Private endpoint peers reference |
| `JAVA_TOOL_OPTIONS` | tika | -XX:MaxRAMPercentage=70 | Cap the JVM heap to the container |
| `PORT` | collabora | 9980 | Port Railway probes and routes |
| `password` | collabora | (secret) | Collabora admin console password |
| `username` | collabora | (secret) | Collabora admin console user |
| `aliasgroup1` | collabora | https://.*\.up\.railway\.app | Regex of trusted WOPI hosts |
| `server_name` | collabora | - | Public host coolwsd advertises |
| `extra_params` | collabora | --o:ssl.enable=false --o:ssl.termination=true --o:home_mode.enable=false --o:net.frame_ancestors=*.up.railway.app | coolwsd flags behind Railway's edge |
| `DONT_GEN_SSL_CERT` | collabora | true | No self-signed certificate needed |
| `PORT` | opencloud | 9200 | Port Railway probes and routes |
| `OC_URL` | opencloud | - | Public base URL and OIDC issuer |
| `PROXY_TLS` | opencloud | false | Railway's edge terminates TLS |
| `OC_INSECURE` | opencloud | false | Verify TLS; also stops init prompting |
| `OC_LOG_COLOR` | opencloud | false | No ANSI colour in logs |
| `OC_LOG_LEVEL` | opencloud | info | Log verbosity |
| `OC_LOG_PRETTY` | opencloud | false | Machine-readable log lines |
| `PROXY_HTTP_ADDR` | opencloud | 0.0.0.0:9200 | Proxy listen address |
| `COLLABORA_DOMAIN` | opencloud | - | Editor host for the CSP |
| `IDM_ADMIN_PASSWORD` | opencloud | (secret) | Built-in admin password, read on first init |
| `OC_ADD_RUN_SERVICES` | opencloud | collaboration | Run the WOPI service in-process |
| `STORAGE_USERS_DRIVER` | opencloud | decomposeds3 | User file bodies go to the bucket |
| `GRAPH_AVAILABLE_ROLES` | opencloud | b1e2218d-eef8-4d4c-b82d-0f1a1b48f3b5,a8d5fe5e-96e3-418d-825b-534dbdf22b99,fb6c3e19-e378-47e5-b277-9732f9de6e21,58c63c02-1d89-4572-916a-870abc5a1b7d,2d00ce52-1fc2-4dbc-8b95-a73b73395f5a,1c996275-f1c9-4e71-abdf-a42f6495e960,312c0871-5ef7-4b3a-85b6-0e4074c64049,aa97fe03-7980-45ac-9e50-b325749fd7e6 | Sharing roles including secure view |
| `IDM_CREATE_DEMO_USERS` | opencloud | false | Never create the public demo accounts |
| `SEARCH_EXTRACTOR_TYPE` | opencloud | tika | Extract document text with Tika |
| `STORAGE_SYSTEM_DRIVER` | opencloud | decomposed | System data stays on the volume |
| `COLLABORATION_APP_ADDR` | opencloud | - | Editor base URL |
| `COLLABORATION_APP_ICON` | opencloud | - | Editor icon |
| `COLLABORATION_APP_NAME` | opencloud | CollaboraOnline | Editor name shown in the UI |
| `COLLABORATION_WOPI_SRC` | opencloud | - | WOPI callback base URL |
| `PROXY_ENABLE_BASIC_AUTH` | opencloud | false | OIDC only, no basic auth |
| `COLLABORATION_APP_PRODUCT` | opencloud | Collabora | Editor product label |
| `COLLABORATION_APP_INSECURE` | opencloud | false | Verify the editor's certificate |
| `FRONTEND_ARCHIVER_MAX_SIZE` | opencloud | 10000000000 | Max bytes per folder download |
| `FRONTEND_CHECK_FOR_UPDATES` | opencloud | true | Show upstream release notices |
| `PROXY_CSP_CONFIG_FILE_LOCATION` | opencloud | /etc/opencloud-static/csp.yaml | Adds Collabora to the CSP |
| `SEARCH_EXTRACTOR_TIKA_TIKA_URL` | opencloud | - | Private Tika endpoint |
| `COLLABORATION_APP_PROOF_DURATION` | opencloud | 10m | WOPI proof key cache lifetime |
| `FRONTEND_FULL_TEXT_SEARCH_ENABLED` | opencloud | true | Offer content search in the UI |
| `STORAGE_USERS_DECOMPOSEDS3_BUCKET` | opencloud | - | Bucket name |
| `STORAGE_USERS_DECOMPOSEDS3_REGION` | opencloud | - | Bucket region |
| `STORAGE_USERS_EVENTS_NUM_CONSUMERS` | opencloud | 5 | Postprocessing event consumers |
| `STORAGE_USERS_DECOMPOSEDS3_ENDPOINT` | opencloud | - | Bucket endpoint |
| `STORAGE_USERS_DECOMPOSEDS3_ACCESS_KEY` | opencloud | - | Bucket access key |
| `STORAGE_USERS_DECOMPOSEDS3_SECRET_KEY` | opencloud | (secret) | Bucket secret key |
| `OC_PASSWORD_POLICY_BANNED_PASSWORDS_LIST` | opencloud | (secret) | Rejected link passwords |
| `COLLABORATION_CS3API_DATAGATEWAY_INSECURE` | opencloud | false | Verify the data gateway certificate |
| `FRONTEND_APP_HANDLER_SECURE_VIEW_APP_ADDR` | opencloud | eu.opencloud.api.collaboration | Secure-view provider |
| `OC_SHARING_PUBLIC_SHARE_MUST_HAVE_PASSWORD` | opencloud | (secret) | Force a password on public links |
| `OC_SHARING_PUBLIC_WRITEABLE_SHARE_MUST_HAVE_PASSWORD` | opencloud | (secret) | Upload links may skip the password |

## Configuration

- **Healthcheck:** `/version`
- **Healthcheck:** `/hosting/discovery`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/signin/v1/identifier`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencloud-drive)
