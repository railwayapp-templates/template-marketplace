# Deploy File Server on Railway

An open-source easy to use file server. Uses the local-filesystem or S3

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rZ3A8i)

## About

# 📁 File Server

A fast, simple solution for uploading and sharing files. Works with both local file system and S3 storage.

## 📋 API Reference

### Upload a File
POST /upload
**Request Format:** multipart/form-data  
**Required Field:** file: 

### Retrieve a File
GET /files/uploads/
Where  is the unique identifier of your uploaded file.

### To use s3 set the following env variables

```bash
S3_ENDPOINT=
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
```

And update the `FILE_SERVER_STORAGE_TYPE` from **local** to **s3**

### Allow all file types
If you wanna allow all file types update the `FILE_SERVER_ALLOWED_FILE_TYPES` to *

## ✨ Features
- Quick and easy file uploads
- Simple file sharing
- Flexible storage options
- Minimalist design

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| File Server | `ghcr.io/lassejlv/file-server:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `S3_SECRET_ACCESS_KEY` | (secret) |
| `FILE_SERVER_SQLITE_PATH` | /data/sqlite.db |
| `FILE_SERVER_STORAGE_PATH` | /data/files |
| `FILE_SERVER_STORAGE_TYPE` | s3 |
| `FILE_SERVER_ALLOWED_FILE_TYPES` | image/jpg,image/jpeg,image/png,image/gif,image/webp,image/svg |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/rZ3A8i)
