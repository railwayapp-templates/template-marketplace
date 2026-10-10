# Deploy n8n + LinkedIn MCP on Railway

n8n workflow automation with Postgres and a LinkedIn MCP server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/n8n-linkedin-mcp)

## About

n8n is a fair-code workflow automation platform. It lets you connect apps and APIs through a visual editor, trigger workflows from webhooks or schedules, and add custom code or AI steps. This template pairs n8n with a LinkedIn MCP server so your workflows and AI agents can reach LinkedIn through MCP.

This template deploys three services on Railway: n8n, a Postgres database, and a linkedin-mcp service. n8n stores its workflows, execution history and encrypted credentials in Postgres, which keeps its data on a persistent volume so it survives redeploys. The linkedin-mcp service runs a headless Chrome browser and exposes an MCP server over HTTP, with optional VNC settings for remote desktop access. The services share Railway's private network, and the database variables are linked for you. On deploy, Railway generates the n8n encryption key, the Postgres password and the VNC password, and sets the webhook URL from your n8n public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| linkedin-mcp | `stickerdaniel/linkedin-mcp-server:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n | 5678 | Port the n8n service listens on. Leave at 5678. |
| `DB_TYPE` | n8n | postgresdb | Database type n8n uses. Leave as postgresdb. |
| `N8N_PORT` | n8n | 5678 | Port n8n binds to internally. Leave at 5678. |
| `WEBHOOK_URL` | n8n | - | Public URL n8n uses to build webhook links. Defaults to this service's Railway domain. |
| `N8N_PROXY_HOPS` | n8n | 1 | Number of reverse proxies in front of n8n. Leave at 1 on Railway. |
| `N8N_WEBHOOK_URL` | n8n | - | Public URL n8n uses for webhook endpoints. Defaults to this service's Railway domain. |
| `DB_POSTGRESDB_HOST` | n8n | - | Postgres host. Linked automatically to the Postgres service. |
| `DB_POSTGRESDB_PORT` | n8n | - | Postgres port. Linked automatically to the Postgres service. |
| `DB_POSTGRESDB_USER` | n8n | (secret) | Postgres user. Linked automatically to the Postgres service. |
| `N8N_ENCRYPTION_KEY` | n8n | - | Auto-generated key that encrypts saved credentials. Back it up, because if it's lost, saved credentials can't be decrypted. |
| `DB_POSTGRESDB_DATABASE` | n8n | - | Postgres database name n8n uses. Linked automatically to the Postgres service. |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | Postgres password. Linked automatically to the Postgres service. |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first start. Leave as railway. |
| `DATABASE_URL` | Postgres | - | Private connection string for services in this project. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first start. Leave as postgres. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated password for the Postgres user. Unique per deploy. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string. Only works if you enable a TCP proxy. Not needed for n8n. |
| `VNC` | linkedin-mcp | false | Turns on a VNC remote desktop so you can sign in to LinkedIn by hand. Leave as false unless you need it. |
| `HOST` | linkedin-mcp | 0.0.0.0 | Network address the server binds to. Leave as 0.0.0.0 on Railway. |
| `MODE` | linkedin-mcp | auth | Default mode |
| `PORT` | linkedin-mcp | 8000 | Port the MCP server listens on. Must match the port Railway routes to. |
| `DEBUG` | linkedin-mcp | pw:api | Extra debug output. Leave as false in production. |
| `TIMEOUT` | linkedin-mcp | 30000 | Timeout for browser actions, in milliseconds. Leave as default. |
| `HEADLESS` | linkedin-mcp | true | Runs Chrome without a visible window. Leave as true on a server. |
| `VIEWPORT` | linkedin-mcp | 1280x720 | Browser window size. Leave as default. |
| `XVFB_RES` | linkedin-mcp | 1280x720x24 | Virtual screen resolution. Leave as default. |
| `LOG_LEVEL` | linkedin-mcp | INFO | Log detail. Use DEBUG when troubleshooting. |
| `TRANSPORT` | linkedin-mcp | streamable-http | Protocol the MCP server speaks. Leave as streamable-http for remote access. |
| `VNC_PASSWORD` | linkedin-mcp | (secret) | Auto-generated password for the VNC desktop. Unique per deploy. |
| `CHROME_EXTRA_FLAGS` | linkedin-mcp | --no-first-run --no-sandbox --disable-dev-shm-usage --no-default-browser-check --disable-search-engine-choice-screen --password-store=basic --disable-gpu --disable-software-rasterizer --disable-site-isolation-trials --disable-features=IsolateOrigins,site-per-process,Translate,MediaRouter,OptimizationHints --disable-back-forward-cache --disable-background-networking --disable-component-update --disable-sync --disable-extensions --disable-component-extensions-with-background-pages --disable-default-apps --disable-client-side-phishing-detection --disable-domain-reliability --disable-breakpad --disable-crash-reporter --no-pings --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-renderer-backgrounding --disable-ipc-flooding-protection --disable-hang-monitor --disable-popup-blocking --disable-prompt-on-repost --disable-blink-features=AutomationControlled | chrome flags |
| `LINKEDIN_MCP_CONTAINER` | linkedin-mcp | true | Tells the app it's running inside a container. Leave as true. |
| `FASTMCP_HTTP_ALLOWED_HOSTS` | linkedin-mcp | - | Hostnames allowed to reach the server. Defaults to this service's Railway domain. |
| `FASTMCP_HTTP_ALLOWED_ORIGINS` | linkedin-mcp | - | Browser origins allowed to call the server. Defaults to this service's Railway domain. |
| `FASTMCP_HTTP_HOST_ORIGIN_PROTECTION` | linkedin-mcp | true | Checks the host and origin of incoming requests. Leave as true. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash -c 'rm -f /home/pwuser/.linkedin-mcp/profile/SingletonLock /tmp/.X99-lock /tmp/.X11-unix/X99; MODE="${MODE:-prod}"; if [ "$MODE" = "auth" ]; then VNC=1; fi; if [ "${VNC:-1}" != "0" ]; then VNC=1; HEADLESS=false; else VNC=0; HEADLESS=true; fi; export MODE VNC HEADLESS; echo "launch: MODE=$MODE VNC=$VNC HEADLESS=$HEADLESS"; if [ "$VNC" = "1" ]; then mkdir -p /tmp/.X11-unix; Xvfb :99 -screen 0 "${XVFB_RES:-1024x600x24}" -nolisten tcp >/tmp/xvfb.log 2>&1 & for i in $(seq 1 50); do [ -S /tmp/.X11-unix/X99 ] && break; sleep 0.2; done; export DISPLAY=:99; echo "xvfb ready: $(ls /tmp/.X11-unix 2>&1 | tr "\n" " ")"; cat /tmp/xvfb.log; fi; if [ "$MODE" = "auth" ]; then echo "starting login viewer"; exec python -m linkedin_mcp_server --log-level DEBUG --login --login-viewer --user-data-dir /home/pwuser/.linkedin-mcp/profile --claim-profile-root; fi; if [ "$VNC" = "1" ]; then for wm in openbox fluxbox icewm twm; do if command -v $wm >/dev/null 2>&1; then echo "starting WM: $wm"; $wm >/tmp/wm.log 2>&1 & break; fi; done; (umask 077; printf %s "$VNC_PASSWORD" > /tmp/vncpw); x11vnc -display :99 -forever -shared -rfbport 5900 -localhost -passwdfile /tmp/vncpw -quiet -noxdamage -noxrecord -noxfixes & websockify --web /usr/share/novnc 6080 localhost:5900 & fi; sed -i "/window_placement/,/}/c\"window_placement\": { }" /home/pwuser/.linkedin-mcp/profile/Default/Preferences 2>/dev/null || true; rm -rf /home/pwuser/.linkedin-mcp/profile/Default/Service\ Worker/ /home/pwuser/.linkedin-mcp/profile/Default/Cache/; echo IyEvYmluL3NoCmV4ZWMgIiRDSFJPTUVfUkVBTCIgIiRAIiBcCiAgLS1kaXNhYmxlLWRldi1zaG0tdXNhZ2UgXAogIC0tZGlzYWJsZS1ncHUgXAogIC0tZW5hYmxlLWxvdy1lbmQtZGV2aWNlLW1vZGUgXAogIC0tcmVuZGVyZXItcHJvY2Vzcy1saW1pdD0yIFwKICAtLWpzLWZsYWdzPS0tbWF4LW9sZC1zcGFjZS1zaXplPTUxMiBcCiAgLS1kaXNhYmxlLWV4dGVuc2lvbnMgXAogIC0tZGlzYWJsZS1iYWNrZ3JvdW5kLW5ldHdvcmtpbmcgXAogIC0tZGlzYWJsZS1jb21wb25lbnQtdXBkYXRlIFwKICAtLWRpc2FibGUtc3luYyBcCiAgLS1kaXNhYmxlLWJyZWFrcGFkIFwKICAtLWRpc2FibGUtY3Jhc2gtcmVwb3J0ZXIgXAogIC0tZGlzay1jYWNoZS1zaXplPTEgXAogICRDSFJPTUVfRVhUUkFfRkxBR1MK | base64 -d > /tmp/chrome-wrap.sh; chmod +x /tmp/chrome-wrap.sh; CHROME_REAL=$(find / -xdev -type f -name chrome -perm -u+x 2>/dev/null | grep -v -e headless -e chrome-wrap | head -1); echo "chrome real binary: $CHROME_REAL"; if [ -n "$CHROME_REAL" ]; then export CHROME_REAL CHROME_PATH=/tmp/chrome-wrap.sh; echo "chrome wrapper enabled"; fi; exec python -m linkedin_mcp_server --log-level DEBUG --transport streamable-http --host 0.0.0.0 --port 8765 --user-data-dir /home/pwuser/.linkedin-mcp/profile'`
- **Volume:** `/home/pwuser/.linkedin-mcp`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/n8n-linkedin-mcp)
