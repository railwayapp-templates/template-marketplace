# Deploy OpenClaw Desktop (GUI) on Railway

OpenClaw on an Ubuntu desktop: watch its Chrome, sign in to sites for it

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-desktop-gui)

## About

![OpenClaw Desktop: the OpenClaw Control UI and the agent's own Chrome window side by side on the Ubuntu desktop](https://vaze.up.railway.app/api/hosting/railway-templates/openclaw-desktop-gui/openclaw-desktop.png)

![The desktop on first boot, with launchers for the OpenClaw UI, the agent's Chrome, the CLI and the gateway log](https://vaze.up.railway.app/api/hosting/railway-templates/openclaw-desktop-gui/openclaw-desktop-launchers.png)

OpenClaw Desktop runs the OpenClaw personal AI assistant on an Ubuntu 24.04
XFCE desktop that lives in your browser tab. The agent's Chrome is a window on
that desktop, so you can watch it browse, take over when a site wants a login
or a captcha, and leave it signed in for next time. The Control UI, the CLI and
the gateway log are one double-click away, and Telegram, Discord and the other
channels work as they do on any OpenClaw install.

Deploying runs two services: the desktop, and a small Caddy proxy that is the
only public surface. The desktop image is Kasm's Ubuntu Noble workspace (about
2.6 GB compressed), which ships Chrome. On first boot a background job installs
Node.js 24 and OpenClaw into the home directory, which is a Railway volume,
runs OpenClaw's non-interactive onboarding with whichever model key you set,
and starts the gateway with the desktop's display attached. The login page
appears within a minute or two and OpenClaw is up about a minute later; later
boots skip the download. The gateway listens on loopback only and is restarted
by the same job if it ever exits.

Plan on 3 to 4 GB of RAM: the desktop idles near 1 GB, the gateway takes about
0.5 GB, and each Chrome window (the agent's and yours) adds a few hundred MB.
Leave app sleeping off; it would stop the gateway and its channels.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | `caddy:2-alpine` | Web service |
| desktop | `kasmweb/ubuntu-noble-desktop:1.19.0-rolling-weekly` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | proxy | 8080 | Port this service listens on. Leave as is. |
| `CADDYFILE` | proxy | {
	admin off
	auto_https off
}

:{$PORT} {
	respond /proxy-healthz 200
	reverse_proxy https://{$KASM_HOST} {
		transport http {
			tls_insecure_skip_verify
		}
	}
}
 | Proxy config written to disk at boot. Leave as is. |
| `KASM_HOST` | proxy | - | Private address of the desktop service. Leave as is. |
| `PORT` | desktop | 6901 | Port this service listens on. Leave as is. |
| `VNC_PW` | desktop | - | Desktop login password, minimum 6 characters. Username is kasm_user. |
| `GEMINI_API_KEY` | desktop | (secret) | Optional. Makes Google Gemini the model provider at first boot when no other key is set. |
| `OPENAI_API_KEY` | desktop | (secret) | Optional. Makes OpenAI the model provider at first boot when no Anthropic key is set. |
| `ANTHROPIC_API_KEY` | desktop | (secret) | Optional. Makes Anthropic the model provider at first boot; leave blank to pick a provider from the desktop. |
| `DISCORD_BOT_TOKEN` | desktop | (secret) | Optional. Discord bot token; enables the Discord channel with DM pairing. |
| `OPENROUTER_API_KEY` | desktop | (secret) | Optional. Makes OpenRouter the model provider at first boot when no Anthropic or OpenAI key is set. |
| `TELEGRAM_BOT_TOKEN` | desktop | (secret) | Optional. Bot token from @BotFather; enables the Telegram channel with DM pairing. |
| `OPENCLAW_GATEWAY_TOKEN` | desktop | (secret) | Gateway token. The desktop's OpenClaw UI launcher passes it for you. Leave as is. |

## Configuration

- **Start command:** `sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/proxy-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bash -c 'set -e
for k in ANTHROPIC_API_KEY OPENAI_API_KEY OPENROUTER_API_KEY GEMINI_API_KEY TELEGRAM_BOT_TOKEN DISCORD_BOT_TOKEN; do eval v=\$$k; [ -n "$v" ] || unset $k; done
if [ ${#VNC_PW} -lt 6 ]; then echo "FATAL: VNC_PW must be at least 6 characters (KasmVNC requirement). Set a longer password and redeploy." >&2; exit 1; fi
if [ -z "${OPENCLAW_GATEWAY_TOKEN:-}" ]; then echo "FATAL: OPENCLAW_GATEWAY_TOKEN is empty. Set one and redeploy." >&2; exit 1; fi
echo "kasm-user ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/kasm-user
chmod 0440 /etc/sudoers.d/kasm-user
chown 1000:1000 /home/kasm-user
if [ ! -f /home/kasm-user/.railway-owned ]; then chown -R 1000:1000 /home/kasm-user; touch /home/kasm-user/.railway-owned; chown 1000:1000 /home/kasm-user/.railway-owned; fi
sed -i "s|function wait_for_network_devices() {|function wait_for_network_devices() { return 0;|" /dockerstartup/vnc_startup.sh
grep -q "wait_for_network_devices() { return 0;" /dockerstartup/vnc_startup.sh || { echo FATAL: Kasm startup changed, wait_for_network_devices patch no longer applies >&2; exit 1; }
for b in node npm npx openclaw; do ln -sf /home/kasm-user/.local/node/bin/$b /usr/local/bin/$b; done
cat > /dockerstartup/provision.sh <<"PROVEOF"
set -u
export HOME=/home/kasm-user
cd $HOME
for i in $(seq 1 60); do [ -f $HOME/.bashrc ] && break; sleep 1; done
log() { echo "[provision] $*"; }
NODE_DIR=$HOME/.local/node
if [ ! -x $NODE_DIR/bin/node ]; then
  log installing Node.js 24 LTS
  TARBALL=$(curl -fsSL https://nodejs.org/dist/latest-v24.x/SHASUMS256.txt | grep -o "node-v[0-9.]*-linux-x64.tar.xz" | head -1)
  mkdir -p $NODE_DIR
  curl -fsSL "https://nodejs.org/dist/latest-v24.x/$TARBALL" | tar -xJ -C $NODE_DIR --strip-components=1 || log Node.js install failed
fi
export PATH=$HOME/.local/bin:$HOME/.local/node/bin:$PATH
export npm_config_cache=/tmp/npm-cache
if [ ! -x $NODE_DIR/bin/openclaw ]; then
  log installing OpenClaw
  npm install -g openclaw@latest >/tmp/npm-openclaw.log 2>&1 || log OpenClaw install failed, see /tmp/npm-openclaw.log
fi
grep -q "local/node/bin" $HOME/.bashrc || echo "export PATH=\$HOME/.local/bin:\$HOME/.local/node/bin:\$PATH" >> $HOME/.bashrc
OC=$HOME/.openclaw
mkdir -p $OC $HOME/.local/bin $HOME/.local/share/icons $HOME/Desktop
export DISPLAY=:1
if [ ! -f $OC/openclaw.json ]; then
  AUTH="--auth-choice skip"
  if [ -n "${ANTHROPIC_API_KEY:-}" ]; then AUTH="--auth-choice apiKey --anthropic-api-key $ANTHROPIC_API_KEY"
  elif [ -n "${OPENAI_API_KEY:-}" ]; then openclaw plugins install codex --accept-capabilities > $OC/plugin-codex.log 2>&1 || log Codex plugin install failed; AUTH="--auth-choice openai-api-key --openai-api-key $OPENAI_API_KEY"
  elif [ -n "${OPENROUTER_API_KEY:-}" ]; then AUTH="--auth-choice openrouter-api-key --openrouter-api-key $OPENROUTER_API_KEY"
  elif [ -n "${GEMINI_API_KEY:-}" ]; then AUTH="--auth-choice gemini-api-key --gemini-api-key $GEMINI_API_KEY"
  fi
  log running first-time onboarding
  openclaw onboard --non-interactive --accept-risk --skip-health --mode local --no-install-daemon --workspace $OC/workspace --gateway-bind loopback --gateway-port 18789 --gateway-auth token --gateway-token "$OPENCLAW_GATEWAY_TOKEN" --flow quickstart --json $AUTH > $OC/onboard.log 2>&1 || log onboarding failed, see ~/.openclaw/onboard.log
fi
openclaw config set --json browser.enabled true >/dev/null 2>&1
openclaw config set --json browser.headless false >/dev/null 2>&1
openclaw config set --json browser.noSandbox true >/dev/null 2>&1
openclaw config set browser.executablePath /opt/google/chrome/chrome >/dev/null 2>&1
openclaw config set --json browser.extraArgs "[\"--disable-dev-shm-usage\"]" >/dev/null 2>&1
openclaw config set gateway.auth.token "$OPENCLAW_GATEWAY_TOKEN" >/dev/null 2>&1
if [ -n "${TELEGRAM_BOT_TOKEN:-}" ]; then openclaw config set --json channels.telegram "{\"enabled\":true,\"dmPolicy\":\"pairing\",\"botToken\":\"$TELEGRAM_BOT_TOKEN\",\"groupPolicy\":\"open\"}" >/dev/null 2>&1 || log could not configure Telegram; fi
if [ -n "${DISCORD_BOT_TOKEN:-}" ]; then openclaw config set --json channels.discord "{\"enabled\":true,\"token\":\"$DISCORD_BOT_TOKEN\",\"groupPolicy\":\"open\",\"dm\":{\"policy\":\"pairing\"}}" >/dev/null 2>&1 || log could not configure Discord; fi
geticon() { [ -s $HOME/.local/share/icons/$1.svg ] || curl -fsSL "$2" -o $HOME/.local/share/icons/$1.svg || rm -f $HOME/.local/share/icons/$1.svg; }
geticon openclaw https://openclaw.ai/favicon.svg
printf "#!/bin/bash\nexec google-chrome http://127.0.0.1:18789/#token=%s\n" "$OPENCLAW_GATEWAY_TOKEN" > $HOME/.local/bin/openclaw-ui
cat > $HOME/.local/bin/openclaw-browser <<"BREOF"
#!/bin/bash
export PATH=$HOME/.local/bin:$HOME/.local/node/bin:$PATH
echo Starting the agent browser, the window opens on this desktop.
openclaw browser --browser-profile openclaw start || { echo; echo Could not start it. Is the gateway running? Check OpenClaw Logs.; sleep 8; }
BREOF
cat > $HOME/.local/bin/openclaw-shell <<"SHEOF"
#!/bin/bash
echo "OpenClaw CLI. Useful commands:"
echo "  openclaw onboard                                    set up the model provider; OAuth logins open in Chrome here"
echo "  openclaw status                                     gateway, model and channels"
echo "  openclaw channels add                               connect Telegram, Discord, WhatsApp, Slack and more"
echo "  openclaw browser --browser-profile openclaw start   open the agent browser to sign in to sites for it"
echo "  openclaw logs --follow                              gateway log"
echo
exec bash -l
SHEOF
cat > $HOME/.local/bin/openclaw-logs <<"LGEOF"
#!/bin/bash
exec tail -n 200 -f $HOME/.openclaw/gateway.out
LGEOF
chmod 755 $HOME/.local/bin/openclaw-ui $HOME/.local/bin/openclaw-browser $HOME/.local/bin/openclaw-shell $HOME/.local/bin/openclaw-logs
launcher() { f=$HOME/Desktop/$1.desktop; [ -f $f ] && return 0; icon=utilities-terminal; [ -s $HOME/.local/share/icons/$4.svg ] && icon=$HOME/.local/share/icons/$4.svg
  printf "[Desktop Entry]\nType=Application\nName=%s\nExec=%s\nPath=$HOME\nIcon=%s\nTerminal=false\nCategories=Network;\n" "$2" "$3" "$icon" > $f; chmod +x $f; }
launcher openclaw-ui "OpenClaw UI" "$HOME/.local/bin/openclaw-ui" openclaw
launcher openclaw-browser "Agent Chrome" "xfce4-terminal --title=Agent-Chrome --command=$HOME/.local/bin/openclaw-browser" openclaw
launcher openclaw-terminal "OpenClaw CLI" "xfce4-terminal --title=OpenClaw --command=$HOME/.local/bin/openclaw-shell" none
launcher openclaw-logs "Gateway Log" "xfce4-terminal --title=OpenClaw-Logs --command=$HOME/.local/bin/openclaw-logs" none
TIDIED=0
if [ ! -d "$HOME/Desktop/More apps" ]; then TIDIED=1; mkdir -p "$HOME/Desktop/More apps"; for f in slack gimp thunderbird signal-desktop firefox telegram org.remmina.Remmina sublime_text onlyoffice-desktopeditors Zoom nextcloud; do [ -f $HOME/Desktop/$f.desktop ] && mv $HOME/Desktop/$f.desktop "$HOME/Desktop/More apps/"; done; fi
for i in $(seq 1 120); do SESS=$(pgrep -u 1000 -x xfce4-session | head -1); [ -n "$SESS" ] && break; sleep 1; done
if [ -n "$SESS" ]; then
  export $(tr "\0" "\n" < /proc/$SESS/environ | grep -E "^(DBUS_SESSION_BUS_ADDRESS|SESSION_MANAGER|XDG_RUNTIME_DIR)=")
  for f in openclaw-ui openclaw-browser openclaw-terminal openclaw-logs; do gio set -t string $HOME/Desktop/$f.desktop metadata::xfce-exe-checksum "$(sha256sum $HOME/Desktop/$f.desktop | cut -d" " -f1)" || log could not mark $f trusted; done
  [ "$TIDIED" = 1 ] && { sleep 2; xfdesktop --arrange || log could not arrange desktop icons; }
fi
log setup done, starting the gateway
while true; do
  openclaw gateway run --bind loopback --port 18789 --auth token --token "$OPENCLAW_GATEWAY_TOKEN" --allow-unconfigured >> $OC/gateway.out 2>&1
  log gateway exited with status $?, restarting in 5s
  sleep 5
done
PROVEOF
chmod 755 /dockerstartup/provision.sh
setpriv --reuid=1000 --regid=1000 --init-groups bash -c "bash /dockerstartup/provision.sh > /home/kasm-user/.provision.log 2>&1" &
exec setpriv --reuid=1000 --regid=1000 --init-groups /dockerstartup/kasm_default_profile.sh /dockerstartup/vnc_startup.sh /dockerstartup/kasm_startup.sh --tail-log'`
- **Volume:** `/home/kasm-user`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openclaw-desktop-gui)
