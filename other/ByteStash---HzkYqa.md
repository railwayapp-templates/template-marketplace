# Deploy ByteStash on Railway

Store, organise, and manage your code snippets efficiently

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/HzkYqa)

## About

ByteStash is open source web application designed to store, organise, and manage your code snippets efficiently. With support for creating, editing, and filtering snippets, ByteStash helps you keep track of your code in one secure place.

### Features

- **Create and Edit Snippets:** Easily add new code snippets or update existing ones with an intuitive interface.
- **Filter by Language and Content:** Quickly find the right snippet by filtering based on programming language or keywords in the content.
- **Secure Storage:** All snippets are securely stored in a sqlite database, ensuring your code remains safe and accessible only to you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ByteStash | `ghcr.io/jordan-dalby/bytestash:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/snippets`

**Category:** Other

[View on Railway →](https://railway.com/deploy/HzkYqa)
