# Deploy Ubuntu AI Coding Agents Terminal (Web + SSH) on Railway

Web terminal + SSH: Claude Code, Codex, Gemini, Copilot, OpenCode, aider

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-ai-coding-agents-terminal-web-ssh)

## About

![Ubuntu AI Coding Agents Terminal in the browser: the welcome banner and the versions of Claude Code, Codex CLI, Gemini CLI, Copilot CLI, OpenCode, aider and gh](https://vaze.up.railway.app/api/hosting/railway-templates/ubuntu-ai-coding-agents-terminal-web-ssh/ai-agents-terminal.png)

![Claude Code starting inside the web terminal](https://vaze.up.railway.app/api/hosting/railway-templates/ubuntu-ai-coding-agents-terminal-web-ssh/ai-agents-terminal-claude-code.png)

Ubuntu AI Coding Agents Terminal is an Ubuntu 24.04 box you reach from a
browser tab or over SSH, with six coding agents already installed: Claude Code,
OpenAI Codex CLI, Gemini CLI, GitHub Copilot CLI, OpenCode and aider, plus git,
GitHub CLI, Node.js and Python. Every terminal tab is a tmux session, so an
agent you start keeps working after you close the tab. No desktop, no VNC, and
a fraction of the memory.

Deploying runs one service from the stock `ubuntu:24.04` image; nothing is
built. At boot the start command installs nginx, ttyd, tmux and OpenSSH from
apt, which takes about 20 seconds, and the browser terminal is then live at the
service's public URL behind a password. A background job installs the dev
packages, Node.js 24 LTS, the six agents and GitHub CLI into `/home/ubuntu`,
which is a Railway volume, so the agents are ready two to four minutes after
the first deploy and every later boot finds them already there. The terminal's
banner says which agents are ready, and `~/.provision.log` shows progress.

Cost is low: the box idles under 50 MB of RAM, and a running agent adds a few
hundred MB while it works. Leave app sleeping off if you rely on sessions
staying up; sleeping stops the container and ends them. SSH is exposed through
a Railway TCP proxy, so VS Code Remote-SSH, `scp` and `ssh -L` port forwarding
work as they would against any server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| terminal | `ubuntu:24.04` | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the terminal listens on. Leave as is. |
| `GH_TOKEN` | (secret) | Optional. GitHub token for Copilot CLI and gh; leave blank to sign in with the device flow. |
| `PASSWORD` | (secret) | Login password for the browser terminal and for SSH. The username is ubuntu. |
| `GEMINI_API_KEY` | (secret) | Optional. Used by Gemini CLI, OpenCode and aider; leave blank to sign in with Google. |
| `OPENAI_API_KEY` | (secret) | Optional. Used by Codex, OpenCode and aider; leave blank to sign in with ChatGPT. |
| `AUTHORIZED_KEYS` | - | Optional. SSH public keys, one per line, for key-based login as ubuntu. Password login stays on. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Used by Claude Code, OpenCode and aider; leave blank to sign in with your Claude account. |
| `CLAUDE_CODE_OAUTH_TOKEN` | (secret) | Optional. Output of `claude setup-token` on your own machine; signs Claude Code in with a Pro/Max subscription. |

## Configuration

- **Start command:** `bash -c 'set -e
export DEBIAN_FRONTEND=noninteractive
H=/home/ubuntu
for k in ANTHROPIC_API_KEY CLAUDE_CODE_OAUTH_TOKEN OPENAI_API_KEY GEMINI_API_KEY GH_TOKEN AUTHORIZED_KEYS; do eval v=\$$k; [ -n "$v" ] || unset $k; done
if [ -z "${PASSWORD:-}" ]; then echo "FATAL: PASSWORD is empty. Set one and redeploy." >&2; exit 1; fi
echo "[boot] installing base packages"
for i in 1 2 3; do apt-get update -qq >/dev/null && break; sleep 5; done
for i in 1 2 3; do apt-get install -y -qq --no-install-recommends ca-certificates curl nginx ttyd tmux sudo openssh-server tini >/dev/null && break; sleep 5; done
command -v ttyd >/dev/null || { echo "FATAL: base packages did not install" >&2; exit 1; }
echo "ubuntu ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/ubuntu
chmod 0440 /etc/sudoers.d/ubuntu
echo "ubuntu:$PASSWORD" | chpasswd
chown 1000:1000 $H
if [ ! -f $H/.railway-owned ]; then chown -R 1000:1000 $H; touch $H/.railway-owned; chown 1000:1000 $H/.railway-owned; fi
[ -f $H/.bashrc ] || setpriv --reuid=1000 --regid=1000 --init-groups cp -rT /etc/skel $H
mkdir -p $H/.ssh-host-keys /run/sshd
chmod 700 $H/.ssh-host-keys
for t in ed25519 rsa; do [ -f $H/.ssh-host-keys/ssh_host_$t\_key ] || ssh-keygen -q -t $t -N "" -f $H/.ssh-host-keys/ssh_host_$t\_key; done
cp -f $H/.ssh-host-keys/ssh_host_* /etc/ssh/
chmod 600 /etc/ssh/ssh_host_*_key
if [ -n "${AUTHORIZED_KEYS:-}" ]; then mkdir -p $H/.ssh; printf "%s\n" "$AUTHORIZED_KEYS" > $H/.ssh/authorized_keys; chmod 700 $H/.ssh; chmod 600 $H/.ssh/authorized_keys; chown -R 1000:1000 $H/.ssh; fi
cat > /etc/ssh/sshd_config.d/railway.conf <<"SSHEOF"
PermitRootLogin no
AllowUsers ubuntu
PasswordAuthentication yes
KbdInteractiveAuthentication no
ClientAliveInterval 60
SSHEOF
echo LANG=C.UTF-8 > /etc/default/locale
chmod -x /etc/update-motd.d/* 2>/dev/null || true
/usr/sbin/sshd
echo NO_BROWSER=true >> /etc/environment
for k in ANTHROPIC_API_KEY CLAUDE_CODE_OAUTH_TOKEN OPENAI_API_KEY GEMINI_API_KEY GH_TOKEN; do eval v=\$$k; if [ -n "$v" ]; then printf "%s=\"%s\"\n" $k "$v" >> /etc/environment; fi; done
chown root:ubuntu /etc/environment; chmod 640 /etc/environment
cat > /etc/profile.d/zz-agents.sh <<"BANEOF"
[ -n "$PS1" ] || return 0
case "${TMUX_PANE:-%0}" in %0) ;; *) return 0 ;; esac
have=""; miss=""
for a in claude codex gemini copilot opencode aider; do if [ -x /usr/local/bin/$a ]; then have="$have $a"; else miss="$miss $a"; fi; done
echo
echo "  Ubuntu 24.04 | Claude Code, Codex CLI, Gemini CLI, Copilot CLI, OpenCode, aider | gh, node, python3"
[ -n "$have" ] && echo "  ready:$have"
if pgrep -f /opt/provision >/dev/null 2>&1; then echo "  installing:$miss  (tail -f ~/.provision.log)"; elif [ -n "$miss" ]; then echo "  not installed:$miss  (see ~/.provision.log)"; fi
echo "  sign in: claude (URL + code) | codex login --device-auth | gemini (URL + code) | copilot, then /login | opencode auth login"
[ -n "$RAILWAY_TCP_PROXY_DOMAIN" ] && echo "  ssh: ssh ubuntu@$RAILWAY_TCP_PROXY_DOMAIN -p $RAILWAY_TCP_PROXY_PORT"
[ -n "$TMUX" ] && echo "  This is a tmux session, so an agent keeps running after you close the tab. Ctrl-b d detaches, Ctrl-b c opens a new window."
echo
unset have miss a
BANEOF
cat > /etc/tmux.conf <<"TMUXEOF"
set -g mouse on
set -g history-limit 50000
set -g default-terminal "tmux-256color"
set -ga terminal-overrides ",xterm-256color:Tc"
set -sg escape-time 10
set -g focus-events on
set -g status-style "bg=#2b303b,fg=#c0c5ce"
set -g status-left " #S "
set -g status-left-style "bg=#e95420,fg=#ffffff,bold"
set -g status-right " Ctrl-b d detach | Ctrl-b c new window | Shift+drag to select "
set -g status-right-length 80
set -g window-status-current-style "bg=#4f5b66,fg=#ffffff"
TMUXEOF
printf "ubuntu:%s\n" "$(printf "%s" "$PASSWORD" | openssl passwd -6 -stdin)" > /etc/nginx/htpasswd
chown root:www-data /etc/nginx/htpasswd; chmod 640 /etc/nginx/htpasswd
cat > /etc/nginx/sites-enabled/default <<NGXEOF
server {
  listen $PORT default_server;
  listen [::]:$PORT default_server;
  location = /healthz { return 200 "ok"; }
  location / {
    auth_basic "Ubuntu AI Coding Agents Terminal";
    auth_basic_user_file /etc/nginx/htpasswd;
    proxy_pass http://127.0.0.1:7681;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host \$host;
    proxy_read_timeout 1d;
    proxy_send_timeout 1d;
  }
}
NGXEOF
nginx
cat > /opt/provision.sh <<"PROVEOF"
set -u
export HOME=/home/ubuntu
cd $HOME
log() { echo "[provision] $*"; }
NODE_DIR=$HOME/.local/node
if [ ! -x $NODE_DIR/bin/node ]; then
  log installing Node.js 24 LTS
  TARBALL=$(curl -fsSL https://nodejs.org/dist/latest-v24.x/SHASUMS256.txt | grep -o "node-v[0-9.]*-linux-x64.tar.gz" | head -1)
  mkdir -p $NODE_DIR
  curl -fsSL "https://nodejs.org/dist/latest-v24.x/$TARBALL" | tar -xz -C $NODE_DIR --strip-components=1 || log Node.js install failed
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
if [ ! -x $HOME/.local/bin/gh ]; then
  log installing GitHub CLI
  GH_TAG=$(curl -fsSLI -o /dev/null -w "%{url_effective}" https://github.com/cli/cli/releases/latest | grep -o "v[0-9.]*$")
  GH_VER=${GH_TAG#v}
  mkdir -p $HOME/.local/bin
  curl -fsSL "https://github.com/cli/cli/releases/download/$GH_TAG/gh_${GH_VER}_linux_amd64.tar.gz" | tar -xz -C /tmp && install -m 755 /tmp/gh_${GH_VER}_linux_amd64/bin/gh $HOME/.local/bin/gh || log GitHub CLI install failed
  rm -rf /tmp/gh_${GH_VER}_linux_amd64
fi
rm -rf $HOME/.cache/node-gyp
grep -q "local/node/bin" $HOME/.bashrc || echo "export PATH=\$HOME/.local/bin:\$HOME/.local/node/bin:\$PATH" >> $HOME/.bashrc
log done
PROVEOF
cat > /opt/provision-root.sh <<"ROOTEOF"
export DEBIAN_FRONTEND=noninteractive
echo "[provision] installing dev packages"
apt-get install -y -qq --no-install-recommends git python3 python3-venv python3-pip build-essential pkg-config rsync nano vim less jq unzip zip tree ripgrep htop iproute2 iputils-ping dnsutils wget xz-utils file tzdata gnupg >/dev/null || echo "[provision] apt install failed"
apt-get clean
exec setpriv --reuid=1000 --regid=1000 --init-groups bash /opt/provision.sh
ROOTEOF
for b in claude aider gh; do ln -sf $H/.local/bin/$b /usr/local/bin/$b; done
for b in node npm npx corepack codex gemini copilot opencode; do ln -sf $H/.local/node/bin/$b /usr/local/bin/$b; done
: > $H/.provision.log; chown 1000:1000 $H/.provision.log
bash /opt/provision-root.sh >> $H/.provision.log 2>&1 &
export HOME=$H USER=ubuntu LOGNAME=ubuntu SHELL=/bin/bash LANG=C.UTF-8 COLORTERM=truecolor NO_BROWSER=true
unset PASSWORD AUTHORIZED_KEYS DEBIAN_FRONTEND
cd $H
echo "[boot] terminal ready on port $PORT, sshd on 22"
exec tini -- setpriv --reuid=1000 --regid=1000 --init-groups ttyd -i 127.0.0.1 -p 7681 -W -t titleFixed="Ubuntu AI Coding Agents Terminal" -t fontSize=15 -t disableLeaveAlert=true tmux new-session -A -s main'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/home/ubuntu`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ubuntu-ai-coding-agents-terminal-web-ssh)
