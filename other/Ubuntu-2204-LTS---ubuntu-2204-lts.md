# Deploy Ubuntu 22.04 LTS on Railway

[Jun'26] Hosted Ubuntu 22.04 workspace with SSH access & persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-2204-lts)

## About

![Railway](https://img.shields.io/badge/Railway-Supported-blue?logo=railway)

# Ubuntu 22.04 LTS on Railway

Ubuntu 22.04 LTS, also known as Noble Numbat, is a stable long-term support Linux distribution based on Debian. This Railway template provides a lightweight Ubuntu environment with persistent storage and SSH access, making it useful for diagnostics, testing, development tasks, scripts, and isolated Linux workflows.

![Imgur](https://imgur.com/3hAY84u.png)

## About

This template deploys the official Ubuntu 22.04 Docker image on Railway. Railway handles infrastructure, networking, deployment, and runtime management, so you can quickly launch an Ubuntu-based environment without manually provisioning a VPS.

After deployment, you can connect to the running Ubuntu container using Railway SSH, inspect the system, install packages, test scripts, run commands, and store persistent files in the mounted Railway Volume.

## Common Use Cases

* Running diagnostics, debugging commands, and inspecting Linux environments
* Testing scripts, packages, binaries, or Ubuntu-specific workflows
* Creating a lightweight development sandbox with persistent storage
* Running simple background tasks, tools, or Linux-based workflows
* Using Ubuntu as a cloud-hosted shell environment for experiments

## Included Components

* Official Ubuntu Docker image: `ubuntu:22.04`
* Railway-managed deployment environment
* Railway SSH access
* Railway Volume for persistent storage

## How to Use This Template (After Success Deploy)

### 1. Install Railway CLI

To connect to your deployed Ubuntu container, make sure the Railway CLI is installed on your local machine or VPS.

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

### 3. Connect to the Ubuntu Container via SSH

After the template is successfully deployed, you can copy the exact SSH command from the Railway dashboard.

Steps:

1. Open your project in the Railway dashboard.
2. Right-click the deployed Ubuntu service.
3. Select **Copy SSH Command**.
4. Paste and run the copied command in your terminal.

The command will look similar to this:

```bash
railway ssh --project= --environment= --service=
```

Once connected, you are inside the running Ubuntu 22.04 container.

### 4. Verify the Ubuntu Environment

Inside the SSH session, you can verify the operating system:

```bash
cat /etc/os-release
```

You should see Ubuntu 22.04 information.

You can also inspect disk usage and mounted volumes:

```bash
df -h
```

### 5. Use Persistent Storage

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
echo "hello from railway ubuntu" &gt; /data/test.txt
cat /data/test.txt
```

Files stored in the persistent volume are retained across service restarts and redeployments.

### 6. Install Packages and Run Commands

Because this is an Ubuntu environment, you can use `apt` to install packages during your session or as part of your workflow.

Example:

```bash
apt update
apt install -y curl nano htop
```

Then run any command you need:

```bash
curl --version
htop
```

## Notes

* Use the Railway dashboard to manage deployment, variables, volumes, and service settings.
* Use Railway CLI when you need SSH access, logs, diagnostics, or project-level commands.
* Store important files, generated artifacts, logs, and project data inside the mounted volume, such as `/data`.
* Avoid relying on the container root filesystem for important persistent files.

## Useful Links

* Official Ubuntu Docker image: [https://hub.docker.com/_/ubuntu](https://hub.docker.com/_/ubuntu)
* Railway CLI: [https://docs.railway.com/cli](https://docs.railway.com/cli)
* Railway SSH guide: [https://docs.railway.com/guides/ssh](https://docs.railway.com/guides/ssh)
* Railway Volumes: [https://docs.railway.com/reference/volumes](https://docs.railway.com/reference/volumes)

## Why Deploy Ubuntu 22.04 LTS on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway hosts your infrastructure so you do not have to manage low-level configuration manually, while still allowing you to scale and operate your services from a simple dashboard.

By deploying Ubuntu 22.04 LTS on Railway, you get a quick cloud-hosted Linux environment that can support diagnostics, testing, development workflows, scripts, and other infrastructure tasks alongside your full-stack applications, databases, AI agents, and services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu | `ubuntu:22.04` | Database |

## Configuration

- **Start command:** `bash -lc 'echo "Ubuntu 22.04 Railway container is running"; tail -f /dev/null'`
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ubuntu-2204-lts)
