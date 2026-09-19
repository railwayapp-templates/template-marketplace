# Deploy Kali Linux (Web Desktop) on Railway

A real Kali XFCE desktop in the browser, not just a web terminal.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kali-linux-web-desktop)

## About

![Kali Linux XFCE desktop in the browser, with Wireshark open and an nmap scan running in a terminal](https://vaze.up.railway.app/api/hosting/railway-templates/kali-linux-web-desktop/kali-desktop-wireshark-nmap.png)

Kali Linux Desktop is a full Kali XFCE graphical desktop that runs in your
browser, not a terminal. You get the GUI security tools that a web shell simply
cannot run: Burp Suite, Wireshark, Ghidra, Zenmap and a real desktop browser,
reachable from any device at a URL with no VNC client or SSH key.

Deploying runs two services: the Kali desktop itself, and a small Caddy proxy
that is the only public surface. The desktop image is large (about 3.6 GB
compressed, 16 GB unpacked), but Railway pulls it quickly: a measured deploy from
this template reached a working login in about 80 seconds. The URL returns
Railway's 404 for those first moments, which is normal.

Cost is the thing to plan for. A graphical desktop is not a terminal: expect it
to idle around 1 GB of RAM with a session attached, and more with Burp or a
browser open. Enabling Railway's app sleep is strongly recommended so the
desktop suspends when you close the tab.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | `caddy:2-alpine` | Web service |
| kali | `kasmweb/kali-rolling-desktop:1.19.0-rolling-weekly` | Database |

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
| `PORT` | kali | 6901 | Port this service listens on. Leave as is. |
| `VNC_PW` | kali | - | Desktop login password, minimum 6 characters. Username is kasm_user. |

## Configuration

- **Start command:** `sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/proxy-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `bash -c 'set -e
if [ ${#VNC_PW} -lt 6 ]; then echo "FATAL: VNC_PW must be at least 6 characters (KasmVNC requirement). Set a longer password and redeploy." >&2; exit 1; fi
echo "kasm-user ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/kasm-user
chmod 0440 /etc/sudoers.d/kasm-user
chown -R 1000:1000 /home/kasm-user
setcap -r /usr/lib/nmap/nmap 2>/dev/null || true
cat > /usr/bin/nmap <<"NMAPEOF"
#!/usr/bin/env sh
exec /usr/lib/nmap/nmap --unprivileged "$@"
NMAPEOF
chmod 755 /usr/bin/nmap
XFCEDIR=/home/kasm-user/.config/xfce4/xfconf/xfce-perchannel-xml
if [ ! -f $XFCEDIR/xfce4-desktop.xml ]; then
  mkdir -p $XFCEDIR
  cat > $XFCEDIR/xfce4-desktop.xml <<"XFCEEOF"
<?xml version="1.0" encoding="UTF-8"?>
<channel name="xfce4-desktop" version="1.0">
  <property name="backdrop" type="empty">
    <property name="screen0" type="empty">
      <property name="monitorVNC-0" type="empty">
        <property name="workspace0" type="empty">
          <property name="last-image" type="string" value="/usr/share/backgrounds/kali/kali-cubes-16x9.jpg"/>
          <property name="image-style" type="int" value="5"/>
        </property>
      </property>
    </property>
  </property>
</channel>
XFCEEOF
  chown -R 1000:1000 /home/kasm-user/.config
fi
sed -i "s|function wait_for_network_devices() {|function wait_for_network_devices() { return 0;|" /dockerstartup/vnc_startup.sh
grep -q "wait_for_network_devices() { return 0;" /dockerstartup/vnc_startup.sh || { echo FATAL: Kasm startup changed, wait_for_network_devices patch no longer applies >&2; exit 1; }
exec setpriv --reuid=1000 --regid=1000 --init-groups /dockerstartup/kasm_default_profile.sh /dockerstartup/vnc_startup.sh /dockerstartup/kasm_startup.sh --tail-log'`
- **Volume:** `/home/kasm-user`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kali-linux-web-desktop)
