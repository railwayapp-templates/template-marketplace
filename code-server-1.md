# Deploy Code Server on Railway

Code, test and deploy without leaving your browser !

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/code-server-1)

## About

Deploy your own **VS Code Server** instance in just a few clicks on Railway.  
Once deployed, you can connect to your editor via a secure browser-based interface and start coding instantly.

### Deployment Steps
1. Click **Deploy Now** on Railway.  
2. Wait for the container to build and start.  
3. Open the generated domain URL to access VS Code in your browser.  
4. (Optional) Configure authentication by setting the `PASSWORD` environment variable.  

---

This template uses the official **linuxserver/code-server** image, providing a reliable and secure environment to host your own remote development IDE.  
All files and configurations persist between restarts, making it suitable for continuous development and experimentation.  

- 🧩 Based on Ubuntu with a minimal footprint.  
- 🔄 Automatic restart and persistent volumes supported.  
- ☁️ Ideal for cloud or private hosting environments.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Code Server | `linuxserver/code-server:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port exposed by Railway. Default to 8080. |
| `PASSWORD` | (secret) | The password used to access your code server. Leave empty to completely remove password authentication. |
| `PROXY_DOMAIN` | - | The domain used to access your service. Only edit this value if you know what you are doing ! |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/template/code-server-1)
