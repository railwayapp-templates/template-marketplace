# Deploy Ubuntu Claude Code Desktop (GUI) on Railway

Ubuntu desktop in your browser with VS Code, Chrome and Claude Code ready.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-code-desktop)

## About

![Ubuntu Claude Code Desktop (GUI) running in the browser, with the Claude Code launcher on the desktop](https://vaze.up.railway.app/api/hosting/railway-templates/claude-code-desktop/claude-code-desktop.png)

![Claude Code opened from its desktop icon](https://vaze.up.railway.app/api/hosting/railway-templates/claude-code-desktop/claude-code-desktop-terminal.png)

Ubuntu Claude Code Desktop (GUI) is a full Ubuntu 24.04 XFCE desktop that runs in your
browser with Claude Code, VS Code, Chrome and Node.js already set up. It is the
graphical version of the "Ubuntu + Claude Code over SSH" boxes: the same cloud
dev machine, but with a real editor, a real browser for OAuth logins and
previewing what you build, and no SSH key or VNC client.

Deploying runs two services: the desktop itself, and a small Caddy proxy that
is the only public surface. The desktop image is Kasm's Ubuntu Noble workspace
(about 2.6 GB compressed), which already ships VS Code, Chrome, Chromium,
Firefox, git, tmux and Python. On first boot a background job installs Node.js
24 LTS, the Claude Code CLI and the Claude Code VS Code extension into the home
directory, which lives on a Railway volume, so later boots skip the download.
The login page appears within a minute or two; the tools finish installing
shortly after, and `~/.provision.log` shows their progress.

Cost is the thing to plan for. A graphical desktop idles near 1 GB of RAM with
a session attached, and more with Chrome and VS Code open. Enabling Railway's
app sleep is strongly recommended so the desktop suspends when you close the tab.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| desktop | `kasmweb/ubuntu-noble-desktop:1.19.0-rolling-weekly` | Database |
| proxy | `caddy:2-alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | desktop | 6901 | Port this service listens on. Leave as is. |
| `VNC_PW` | desktop | - | Desktop login password, minimum 6 characters. Username is kasm_user. |
| `ANTHROPIC_API_KEY` | desktop | (secret) | Optional. Skips the browser login; leave blank to sign in with your Claude account. |
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

## Configuration

- **Start command:** `bash -c 'set -e
[ -n "${ANTHROPIC_API_KEY:-}" ] || unset ANTHROPIC_API_KEY
if [ ${#VNC_PW} -lt 6 ]; then echo "FATAL: VNC_PW must be at least 6 characters (KasmVNC requirement). Set a longer password and redeploy." >&2; exit 1; fi
echo "kasm-user ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/kasm-user
chmod 0440 /etc/sudoers.d/kasm-user
chown 1000:1000 /home/kasm-user
if [ ! -f /home/kasm-user/.railway-owned ]; then chown -R 1000:1000 /home/kasm-user; touch /home/kasm-user/.railway-owned; chown 1000:1000 /home/kasm-user/.railway-owned; fi
sed -i "s|function wait_for_network_devices() {|function wait_for_network_devices() { return 0;|" /dockerstartup/vnc_startup.sh
grep -q "wait_for_network_devices() { return 0;" /dockerstartup/vnc_startup.sh || { echo FATAL: Kasm startup changed, wait_for_network_devices patch no longer applies >&2; exit 1; }
ln -sf /home/kasm-user/.local/bin/claude /usr/local/bin/claude
for b in node npm npx corepack; do ln -sf /home/kasm-user/.local/node/bin/$b /usr/local/bin/$b; done
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
if [ ! -x $HOME/.local/bin/claude ]; then
  log installing Claude Code
  curl -fsSL https://claude.ai/install.sh | bash || log Claude Code install failed
fi
grep -q "local/node/bin" $HOME/.bashrc || echo "export PATH=\$HOME/.local/bin:\$HOME/.local/node/bin:\$PATH" >> $HOME/.bashrc
if ! ls $HOME/.vscode/extensions 2>/dev/null | grep -q anthropic.claude-code; then
  log installing the Claude Code VS Code extension
  code --no-sandbox --user-data-dir $HOME/.config/Code --install-extension anthropic.claude-code || log VS Code extension install failed
fi
if [ ! -f $HOME/.config/Code/User/settings.json ]; then
  mkdir -p $HOME/.config/Code/User
  cat > $HOME/.config/Code/User/settings.json <<"JSONEOF"
{
  "chat.disableAIFeatures": true,
  "workbench.startupEditor": "none",
  "telemetry.telemetryLevel": "off",
  "update.mode": "none"
}
JSONEOF
fi
if [ ! -f $HOME/Desktop/claude-code.desktop ]; then
  mkdir -p $HOME/.local/share/icons $HOME/Desktop
  curl -fsSL https://cdn.simpleicons.org/claude/D97757 -o $HOME/.local/share/icons/claude.svg || true
  ICON=utilities-terminal
  [ -s $HOME/.local/share/icons/claude.svg ] && ICON=$HOME/.local/share/icons/claude.svg
  cat > $HOME/Desktop/claude-code.desktop <<DESKEOF
[Desktop Entry]
Type=Application
Name=Claude Code
Comment=Open a terminal running Claude Code
Exec=xfce4-terminal --title="Claude Code" --command=claude
Icon=$ICON
Terminal=false
Categories=Development;
DESKEOF
  chmod +x $HOME/Desktop/claude-code.desktop
fi
for i in $(seq 1 120); do SESS=$(pgrep -u 1000 -x xfce4-session | head -1); [ -n "$SESS" ] && break; sleep 1; done
if [ -n "$SESS" ]; then
  export $(tr "\0" "\n" < /proc/$SESS/environ | grep ^DBUS_SESSION_BUS_ADDRESS=)
  gio set -t string $HOME/Desktop/claude-code.desktop metadata::xfce-exe-checksum "$(sha256sum $HOME/Desktop/claude-code.desktop | cut -d" " -f1)" || log could not mark the launcher trusted
fi
log done
PROVEOF
chmod 755 /dockerstartup/provision.sh
setpriv --reuid=1000 --regid=1000 --init-groups bash -c "bash /dockerstartup/provision.sh > /home/kasm-user/.provision.log 2>&1" &
exec setpriv --reuid=1000 --regid=1000 --init-groups /dockerstartup/kasm_default_profile.sh /dockerstartup/vnc_startup.sh /dockerstartup/kasm_startup.sh --tail-log'`
- **Volume:** `/home/kasm-user`
- **Start command:** `sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/proxy-healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/claude-code-desktop)
