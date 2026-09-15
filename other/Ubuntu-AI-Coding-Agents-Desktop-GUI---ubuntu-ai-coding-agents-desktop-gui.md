# Deploy Ubuntu AI Coding Agents Desktop (GUI) on Railway

Ubuntu desktop with Claude Code, Codex, Gemini, Copilot, OpenCode and aider

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-ai-coding-agents-desktop-gui)

## About

![Ubuntu AI Coding Agents Desktop with one launcher per agent: Claude Code, Codex, Gemini CLI, Copilot CLI, OpenCode and aider](https://vaze.up.railway.app/api/hosting/railway-templates/ubuntu-ai-coding-agents-desktop-gui/ai-agents-desktop.png)

![OpenCode opened from its desktop icon](https://vaze.up.railway.app/api/hosting/railway-templates/ubuntu-ai-coding-agents-desktop-gui/ai-agents-desktop-opencode.png)

Ubuntu AI Coding Agents Desktop is a full Ubuntu 24.04 XFCE desktop that runs
in your browser with six coding agents already installed: Claude Code, OpenAI
Codex CLI, Gemini CLI, GitHub Copilot CLI, OpenCode and aider. VS Code, Chrome
and Node.js are there too. It is one cloud dev machine for trying every agent
side by side on the same repo, with a real editor and a real browser for the
OAuth logins, and no SSH key or VNC client.

Deploying runs two services: the desktop itself, and a small Caddy proxy that
is the only public surface. The desktop image is Kasm's Ubuntu Noble workspace
(about 2.6 GB compressed), which already ships VS Code, Chrome, Chromium,
Firefox, git, tmux and Python. On first boot a background job installs Node.js
24 LTS, the six agents and the Claude Code VS Code extension into the home
directory, which lives on a Railway volume, so later boots skip the download.
The login page appears within a minute or two; the agents take about four
minutes more to finish installing, one desktop icon appearing per agent, and
`~/.provision.log` shows progress. The installed set takes about 2.3 GB of the
volume.

Cost is the thing to plan for. A graphical desktop idles near 1 GB of RAM with
a session attached, and more with Chrome and VS Code open. Enabling Railway's
app sleep is strongly recommended so the desktop suspends when you close the tab.

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
| `GH_TOKEN` | desktop | (secret) | Optional. GitHub token for Copilot CLI; leave blank to sign in with the device flow. |
| `GEMINI_API_KEY` | desktop | (secret) | Optional. Used by Gemini CLI, OpenCode and aider; leave blank to sign in with Google. |
| `OPENAI_API_KEY` | desktop | (secret) | Optional. Used by Codex, OpenCode and aider; leave blank to sign in with ChatGPT. |
| `ANTHROPIC_API_KEY` | desktop | (secret) | Optional. Used by Claude Code, OpenCode and aider; leave blank to sign in with your Claude account. |

## Configuration

- **Start command:** `sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/proxy-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bash -c 'set -e
for k in ANTHROPIC_API_KEY OPENAI_API_KEY GEMINI_API_KEY GH_TOKEN; do eval v=\$$k; [ -n "$v" ] || unset $k; done
if [ ${#VNC_PW} -lt 6 ]; then echo "FATAL: VNC_PW must be at least 6 characters (KasmVNC requirement). Set a longer password and redeploy." >&2; exit 1; fi
echo "kasm-user ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/kasm-user
chmod 0440 /etc/sudoers.d/kasm-user
chown 1000:1000 /home/kasm-user
if [ ! -f /home/kasm-user/.railway-owned ]; then chown -R 1000:1000 /home/kasm-user; touch /home/kasm-user/.railway-owned; chown 1000:1000 /home/kasm-user/.railway-owned; fi
sed -i "s|function wait_for_network_devices() {|function wait_for_network_devices() { return 0;|" /dockerstartup/vnc_startup.sh
grep -q "wait_for_network_devices() { return 0;" /dockerstartup/vnc_startup.sh || { echo FATAL: Kasm startup changed, wait_for_network_devices patch no longer applies >&2; exit 1; }
for b in claude aider; do ln -sf /home/kasm-user/.local/bin/$b /usr/local/bin/$b; done
for b in node npm npx corepack codex gemini copilot opencode; do ln -sf /home/kasm-user/.local/node/bin/$b /usr/local/bin/$b; done
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
export npm_config_cache=/tmp/npm-cache UV_CACHE_DIR=/tmp/uv-cache
if [ ! -x $HOME/.local/bin/claude ]; then
  log installing Claude Code
  curl -fsSL https://claude.ai/install.sh | bash || log Claude Code install failed
fi
npmi() { [ -x $HOME/.local/node/bin/$1 ] && return 0; log installing $2; npm install -g $2 >/dev/null 2>&1 || log $2 install failed; }
npmi codex @openai/codex
npmi gemini @google/gemini-cli
npmi copilot @github/copilot
npmi opencode opencode-ai
if [ ! -x $HOME/.local/bin/aider ]; then
  log installing aider
  curl -LsSf https://aider.chat/install.sh | sh >/dev/null 2>&1 || log aider install failed
fi
grep -q "local/node/bin" $HOME/.bashrc || echo "export PATH=\$HOME/.local/bin:\$HOME/.local/node/bin:\$PATH" >> $HOME/.bashrc
if ! ls $HOME/.vscode/extensions 2>/dev/null | grep -q anthropic.claude-code; then
  log installing the Claude Code VS Code extension
  code --no-sandbox --user-data-dir $HOME/.config/Code --install-extension anthropic.claude-code >/dev/null 2>&1 || log VS Code extension install failed
fi
rm -rf $HOME/.config/Code/CachedExtensionVSIXs $HOME/.cache/node-gyp
if [ ! -f $HOME/.config/Code/User/settings.json ]; then
  mkdir -p $HOME/.config/Code/User
  cat > $HOME/.config/Code/User/settings.json <<"JSONEOF"
{
  "workbench.startupEditor": "none",
  "telemetry.telemetryLevel": "off",
  "update.mode": "none"
}
JSONEOF
fi
mkdir -p $HOME/.local/share/icons $HOME/Desktop
geticon() { [ -s $HOME/.local/share/icons/$1.svg ] || curl -fsSL "$2" -o $HOME/.local/share/icons/$1.svg || rm -f $HOME/.local/share/icons/$1.svg; }
geticon claude https://cdn.simpleicons.org/claude/D97757
geticon codex https://devicons.railway.com/i/openai.svg
geticon gemini https://cdn.simpleicons.org/googlegemini/8E75B2
geticon copilot https://cdn.simpleicons.org/githubcopilot/FFFFFF
geticon opencode https://cdn.simpleicons.org/opencode/FFFFFF
launcher() { f=$HOME/Desktop/$1.desktop; [ -f $f ] && return 0; icon=utilities-terminal; [ -s $HOME/.local/share/icons/$4.svg ] && icon=$HOME/.local/share/icons/$4.svg
  printf "[Desktop Entry]\nType=Application\nName=%s\nExec=xfce4-terminal --title=\"%s\" --command=%s\nPath=$HOME\nIcon=%s\nTerminal=false\nCategories=Development;\n" "$2" "$2" "$3" "$icon" > $f; chmod +x $f; }
launcher claude-code "Claude Code" claude claude
launcher codex "Codex CLI" codex codex
launcher gemini-cli "Gemini CLI" gemini gemini
launcher copilot-cli "Copilot CLI" copilot copilot
launcher opencode "OpenCode" opencode opencode
launcher aider "aider" aider aider
for i in $(seq 1 120); do SESS=$(pgrep -u 1000 -x xfce4-session | head -1); [ -n "$SESS" ] && break; sleep 1; done
if [ -n "$SESS" ]; then
  export $(tr "\0" "\n" < /proc/$SESS/environ | grep ^DBUS_SESSION_BUS_ADDRESS=)
  for f in claude-code codex gemini-cli copilot-cli opencode aider; do gio set -t string $HOME/Desktop/$f.desktop metadata::xfce-exe-checksum "$(sha256sum $HOME/Desktop/$f.desktop | cut -d" " -f1)" || log could not mark $f trusted; done
fi
log done
PROVEOF
chmod 755 /dockerstartup/provision.sh
setpriv --reuid=1000 --regid=1000 --init-groups bash -c "bash /dockerstartup/provision.sh > /home/kasm-user/.provision.log 2>&1" &
exec setpriv --reuid=1000 --regid=1000 --init-groups /dockerstartup/kasm_default_profile.sh /dockerstartup/vnc_startup.sh /dockerstartup/kasm_startup.sh --tail-log'`
- **Volume:** `/home/kasm-user`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ubuntu-ai-coding-agents-desktop-gui)
