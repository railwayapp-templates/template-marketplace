# Deploy Fedora on Railway

[Jul'26] Fedora Linux with SSH & storage for dev, testing & diagnostics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fedora)

## About

![Railway](https://img.shields.io/badge/Railway-Supported-blue?logo=railway)

# Fedora Linux on Railway

Fedora Linux is a modern, community-driven Linux distribution known for its up-to-date packages, developer-friendly tooling, and strong open-source ecosystem. This Railway template provides a lightweight Fedora environment with persistent storage and SSH access, making it useful for diagnostics, testing, development tasks, scripts, and isolated Linux workflows.

![img](https://i.imgur.com/4H18mgD.png)

## About

This template deploys the official Fedora Docker image on Railway. Railway handles infrastructure, networking, deployment, and runtime management, so you can quickly launch a Fedora-based environment without manually provisioning a VPS.

After deployment, you can connect to the running Fedora container using Railway SSH, inspect the system, install packages, test scripts, run commands, and store persistent files in the mounted Railway Volume.

## Common Use Cases

* Running diagnostics, debugging commands, and inspecting Linux environments
* Testing scripts, packages, binaries, or Fedora-specific workflows
* Creating a lightweight development sandbox with persistent storage
* Running simple background tasks, tools, or Linux-based workflows
* Using Fedora as a cloud-hosted shell environment for experiments

## Included Components

* Official Fedora Docker image: `fedora:latest`
* Railway-managed deployment environment
* Railway SSH access
* Railway Volume for persistent storage

## How to Use This Template via Railway Console

After deploying this template, you can use the Railway Console to run commands directly inside the deployed service environment.

This is useful for setup commands, authentication commands, maintenance tasks, debugging, or running CLI tools provided by the application.

### Steps

1. Open your Railway project.
2. Select the service created from this template.
3. Open the **Console** tab.
4. Wait until the console session is ready.
5. Type or paste the command you want to run.
6. Press **Enter** to execute the command.

Example:

```bash
cat /etc/os-release
```

## How to Use This Template via Railway CLI

### 1. Install Railway CLI

To connect to your deployed Fedora container, make sure the Railway CLI is installed on your local machine or VPS.

Follow the official Railway CLI installation guide:

[https://docs.railway.com/cli](https://docs.railway.com/cli)

For example, if you use npm:

```bash
npm install -g @railway/cli
```

Verify the installation:

```bash
railway --version
```

### 2. Log In to Railway

Log in with your Railway account:

```bash
railway login
```

If you are using a headless server or VPS, use browserless login:

```bash
railway login --browserless
```

### 3. Prepare an SSH Key

Railway SSH requires an SSH key on the machine where you run the Railway CLI. If this is your first time using SSH from your local machine or VPS, generate an SSH key first:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keygen -t ed25519 -C "railway-fedora"
```

When prompted for a file location, you can press **Enter** to use the default path.

You can also press **Enter** for an empty passphrase if you are setting this up for simple testing.

After generating the key, verify that it exists:

```bash
ls -la ~/.ssh
```

You should see files similar to:

```bash
id_ed25519
id_ed25519.pub
```

If Railway asks to register or use this key when connecting, approve the prompt.

### 4. Connect to the Fedora Container via SSH

After the template is successfully deployed, you can copy the exact SSH command from the Railway dashboard.

Steps:

1. Open your project in the Railway dashboard.
2. Right-click the deployed Fedora service.
3. Select **Copy SSH Command**.
4. Paste and run the copied command in your terminal.

The command will look similar to this:

```bash
railway ssh --project= --environment= --service=
```

On the first connection, you may see a prompt similar to this:

```text
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

Type:

```text
yes
```

Once connected, you are inside the running Fedora container.

### 5. Verify the Fedora Environment

Inside the SSH session, you can verify the operating system:

```bash
cat /etc/os-release
```

You should see Fedora Linux information.

You can also inspect disk usage and mounted volumes:

```bash
df -h
```

### 6. Use Persistent Storage

This template includes persistent storage through a Railway Volume. Use the mounted volume path for files that should survive restarts and redeployments.

A common mount path is:

```bash
/data
```

Check the volume:

```bash
ls -la /data
```

Create a test file:

```bash
echo "hello from railway fedora" &gt; /data/test.txt
cat /data/test.txt
```

Files stored in the persistent volume are retained across service restarts and redeployments.

### 7. Install Packages and Run Commands

Because this is a Fedora environment, you can use `dnf` to install packages during your session or as part of your workflow.

Example:

```bash
dnf update -y
dnf install -y curl nano htop
```

Then run any command you need:

```bash
curl --version
htop
```

## Troubleshooting

### No SSH Keys Found

If you see this error:

```text
No SSH keys found in ~/.ssh/

Generate one with:
  ssh-keygen -t ed25519
```

Generate an SSH key using:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keygen -t ed25519 -C "railway-fedora"
```

Then run the Railway SSH command again.

### Container Is Not Running

If you see a message saying the container is not running, check the service status and logs from the Railway dashboard, then restart or redeploy the service.

## Notes

* Use the Railway dashboard to manage deployment, variables, volumes, and service settings.
* Use Railway CLI when you need SSH access, logs, diagnostics, or project-level commands.
* Store important files, generated artifacts, logs, and project data inside the mounted volume, such as `/data`.
* Avoid relying on the container root filesystem for important persistent files.
* Fedora uses `dnf` as its package manager, not `apt`.

## Useful Links

* Official Fedora Docker image: [https://hub.docker.com/_/fedora](https://hub.docker.com/_/fedora)
* Fedora Project: [https://fedoraproject.org](https://fedoraproject.org)
* Railway CLI: [https://docs.railway.com/cli](https://docs.railway.com/cli)
* Railway SSH guide: [https://docs.railway.com/guides/ssh](https://docs.railway.com/guides/ssh)
* Railway Volumes: [https://docs.railway.com/reference/volumes](https://docs.railway.com/reference/volumes)

## Why Deploy Fedora Linux on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway hosts your infrastructure so you do not have to manage low-level configuration manually, while still allowing you to scale and operate your services from a simple dashboard.

By deploying Fedora Linux on Railway, you get a quick cloud-hosted Linux environment that can support diagnostics, testing, development workflows, scripts, and other infrastructure tasks alongside your full-stack applications, databases, AI agents, and services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fedora | `fedora:latest` | Database |

## Configuration

- **Start command:** `bash -lc 'echo "Fedora container is running"; tail -f /dev/null'`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fedora)
