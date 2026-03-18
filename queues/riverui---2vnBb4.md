# Deploy riverui on Railway

Deploy River UI easily for managing background jobs in Go applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/2vnBb4)

## About

# Running the River UI

River includes a graphical user interface called River UI, which allows users to view and manage background jobs without manually querying the database or using the command line.

## Key Features

- View and manage jobs visually
- Monitor queue depth and throughput
- Control jobs and queues (cancel, retry, delete jobs; pause queues)
- Identify slow, stuck, or erroring jobs
- Faster development with real-time job status
- Open source and self-hosted
- Dark mode support

## Deployment Instructions

- Ensure you have a working River database and the `DATABASE_URL` is set in your environment.

- Access the River UI through the specified port (default is 8080)

Note: River UI does not include built-in authentication. Ensure it's deployed in a secure, private network and you can use the [Oauth2 Proxy Template](https://railway.app/template/RfKH-J) for that.

For issues with the template itself, please each out to me at youssef@reflectfy.com. For River specific questions, refer to the [River documentation](https://riverqueue.com/docs).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| riverui | `ghcr.io/riverqueue/riverui:latest` | Worker |

**Category:** Queues

[View on Railway →](https://railway.com/deploy/2vnBb4)
