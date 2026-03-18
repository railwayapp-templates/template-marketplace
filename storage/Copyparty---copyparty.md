# Deploy Copyparty on Railway

Lightweight highly configurable extremely robust file server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/copyparty)

## About

Copyparty is a portable, single-file server offering accelerated resumable uploads, deduplication, WebDAV, FTP, media indexing, video thumbnails, audio transcoding, and write-only folders - all with zero mandatory dependencies. It's the ultimate Swiss Army knife for file sharing and media management.

Copyparty offers cross-platform compatibility spanning Linux, macOS, Windows, Android, and Raspberry Pi, with advanced features like resumable uploads, on-the-fly zip generation, and granular user permissions. Hosting Copyparty gives you complete control over your file sharing infrastructure without vendor lock-in. Unlike cloud storage services, you own your data and can customize every aspect of the sharing experience. The server handles everything from basic file uploads to complex media streaming, making it perfect for personal clouds, team collaboration, or content distribution networks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Copyparty | `copyparty/ac` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3923 | - |
| `ACCOUNTS` | - | Account list seperated by commas formatted as "username: password" (req. PERMS_VIA_VARS) |
| `LD_PRELOAD` | /usr/lib/libmimalloc-secure.so.NOPE | Enable mimalloc by replacing "NOPE" with "2" for a nice speed-boost (will use twice as much ram) |
| `EVERYONE_PERMS` | - | Default permissions for everyone, including logged out / anon users; leave empty to require login (req. PERMS_VIA_VARS) |
| `PERMS_VIA_VARS` | true | Whether to handle accounts and permissions via service variables |
| `SPEC_ACCOUNT_PERMS` | - | Specific permission overrides for individual accounts, e.g `rwmda: john, r: jane`; leave empty if all accounts should use default account perms  (req. PERMS_VIA_VARS) |
| `CONFIG_ADDON_SCRIPT` | echo "[INFO] Running account configuration addon..."

# Set default value for PERMS_VIA_VARS if not specified
if [ -z "${PERMS_VIA_VARS}" ]; then
    PERMS_VIA_VARS="true"
fi

# Set default template URL if not specified
if [ -z "${CONFIG_TEMPLATE_RAW_URL}" ]; then
    CONFIG_TEMPLATE_RAW_URL="https://raw.githubusercontent.com/FraglyG/copyparty-railway-config/main/copyparty.conf"
fi

# Paths
VOLUME_CONFIG="${RAILWAY_VOLUME_MOUNT_PATH}/copyparty.config"
RUNTIME_CONFIG="/cfg/copyparty.conf"

# Check if user config exists in volume, if not create from template
if [ ! -f "${VOLUME_CONFIG}" ]; then
    echo "[INFO] User config file not found in volume, downloading template..."
    echo "[INFO] Using template URL: ${CONFIG_TEMPLATE_RAW_URL}"
    wget -q -O "${VOLUME_CONFIG}" "${CONFIG_TEMPLATE_RAW_URL}"
    echo "[INFO] Template downloaded to ${VOLUME_CONFIG}."
    echo "[INFO] You can now edit this file in your volume to customize your configuration."
else
    echo "[INFO] Found existing user config file at ${VOLUME_CONFIG}."
fi

# Copy user config to runtime location
echo "[INFO] Copying user config to runtime location..."
cp "${VOLUME_CONFIG}" "${RUNTIME_CONFIG}"

# Only proceed with account/permission management if PERMS_VIA_VARS is true
if [ "${PERMS_VIA_VARS}" = "true" ]; then
    echo "[INFO] PERMS_VIA_VARS is enabled, managing accounts and permissions via environment variables..."
    
    if [ -z "${ACCOUNTS}" ]; then
        echo "[ERROR] The ACCOUNTS environment variable is not set or is empty." >&2
        echo "[ERROR] Please set it to one or more 'username: password' pairs, separated by commas." >&2
        exit 1
    fi

    # Process accounts for [accounts] section
    ACCOUNT_LINES=$(echo "${ACCOUNTS}" | awk -F, '{for(i=1;i<=NF;i++) {gsub(/^ */, "", $i); print "  " $i}}')

    # Process permissions for [/] section
    PERM_LINES=""

    # Add everyone permissions if specified
    if [ -n "${EVERYONE_PERMS}" ]; then
        PERM_LINES="${PERM_LINES}    ${EVERYONE_PERMS}: *"$'\n'
    fi

    # Add default account permissions
    if [ -n "${DEFAULT_ACCOUNT_PERMS}" ]; then
        ACCOUNT_NAMES=$(echo "${ACCOUNTS}" | awk -F, '{for(i=1;i<=NF;i++) {gsub(/^ */, "", $i); split($i, parts, ":"); gsub(/^ */, "", parts[1]); print "    " default_perms ": " parts[1]}}' default_perms="${DEFAULT_ACCOUNT_PERMS}")
        PERM_LINES="${PERM_LINES}${ACCOUNT_NAMES}"$'\n'
    fi

    # Add specific account permissions (these override defaults)
    if [ -n "${SPEC_ACCOUNT_PERMS}" ]; then
        SPEC_PERM_LINES=$(echo "${SPEC_ACCOUNT_PERMS}" | awk -F, '{for(i=1;i<=NF;i++) {gsub(/^ */, "", $i); print "    " $i}}')
        PERM_LINES="${PERM_LINES}${SPEC_PERM_LINES}"$'\n'
    fi

    # Remove trailing newline
    PERM_LINES=$(echo "${PERM_LINES}" | sed '$d')

    # Update runtime config file with accounts and permissions
    awk -v accounts="${ACCOUNT_LINES}" -v perms="${PERM_LINES}" '
    /^\[accounts\]/ {
        print
        if (accounts) print accounts
        next
    }
    /^\[\/\]/ {
        print
        getline  # read next line (/w)
        print
        getline  # read next line (accs:)
        print
        if (perms) print perms
        # Skip any existing permission lines until next section or EOF
        while ((getline > 0) && !/^\s*\[.*\]\s*$/) {
            # skip existing permissions
        }
        if (/^\s*\[.*\]\s*$/) print  # print the section header we just read
        next
    }
    {print}' "${RUNTIME_CONFIG}" > "${RUNTIME_CONFIG}.tmp" && mv "${RUNTIME_CONFIG}.tmp" "${RUNTIME_CONFIG}"

    echo "[INFO] Successfully configured accounts and permissions in ${RUNTIME_CONFIG}."
else
    echo "[INFO] PERMS_VIA_VARS is disabled, using configuration from ${VOLUME_CONFIG} as-is."
fi

echo "[INFO] To customize configuration, edit ${VOLUME_CONFIG} and restart the container." | Copyparty addon script for handling Railway integration and configuration sync in volume |
| `DEFAULT_ACCOUNT_PERMS` | rwmda | The default permissions for added accounts (req. PERMS_VIA_VARS) |
| `CONFIG_TEMPLATE_RAW_URL` | https://raw.githubusercontent.com/FraglyG/copyparty-railway-config/main/copyparty.conf | copyparty.conf template location; note: only a template, you can edit the generated config after boot |

## Configuration

- **Start command:** `/bin/sh -c 'if [ -n "${CONFIG_ADDON_SCRIPT}" ]; then eval "${CONFIG_ADDON_SCRIPT}"; fi; echo "[INFO] Starting application..."; exec python3 -m copyparty --no-crt --xff-src=100.64.0.0/10 --rproxy=-1 -c /z/initcfg'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/w`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/copyparty)
