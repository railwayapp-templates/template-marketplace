# Deploy Railway Shell Function on Railway

Quickly run any shell script in a Railway container.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-shell-function)

## About

# Deploy a Shell Script on Railway

Quickly execute a shall script on a Railway hosted container. 

## Hosting a Shell Scriot

Encode your script to a base64 string using any tool of your choice. I used https://www.base64encode.org/.

Take the output string and put it in the `SCRIPT` environmental variable. Deploy the container and it will run the script you provided.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-function-shell | `ghcr.io/thesamgordon/railway-function-shell` | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SCRIPT` | Base64 encoded shell script. |

## Configuration

- **Start command:** `/bin/sh -c "exec ./run.sh $SCRIPT"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/railway-shell-function)
