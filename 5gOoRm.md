# Deploy Enclosed on Railway

Minimalistic web app designed for sending private and secure notes.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/5gOoRm)

## About

[Demo](https://enclosed.cc) - [Docs](https://docs.enclosed.cc) - [CLI](https://www.npmjs.com/package/@enclosed/cli)

Enclosed is a minimalistic web application designed for sending private and secure notes.

All notes are end-to-end encrypted, ensuring that the server and storage have zero knowledge of the content. Users can set a password, define an expiration period (TTL), and choose to have the note self-destruct after being read.

A live instance is available at [enclosed.cc](https://enclosed.cc).

Features:
- **End-to-End Encryption**: Your notes are encrypted on the client side, using AES-GCM with a 256-bit key derived using PBKDF2.
- **File Attachments**: Share files securely with your notes.
- **Zero Knowledge**: The server does not have access to the content of the notes or files.
- **Configurable Security Options**: Set a password, expiration time, and choose self-destruction after the note is read.
- **Minimalistic UI**: Simple and intuitive user interface for quick note sharing.
- **i18n Support**: Available in multiple languages.
- **Authentication**: Optional email/password authentication to create notes.
- **Dark Mode**: A dark theme for late-night note sharing.
- **Responsive Design**: Works on all devices, from desktops to mobile phones.
- **Open Source**: The source code is available under the Apache 2.0 License.
- **Self-Hostable**: Run your instance of Enclosed for private note sharing.
- **CLI**: A command-line interface for creating notes from the terminal.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| corentinth/enclosed | `corentinth/enclosed` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTHENTICATION_JWT_SECRET` | (secret) | The secret used to sign the JWT tokens when auth is enabled. |
| `STORAGE_DRIVER_FS_LITE_PATH` | /data | The path to the directory where the data will be stored. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/template/5gOoRm)
