# Deploy ActiveFence Kicker on Railway

An endpoint for kicking users with the ActiveFence extension.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/piHt63)

## About

# Agora ActiveFence Kicker

The **Agora ActiveFence Kicker** is a Go package that provides a library for kicking users from Agora channels via the REST API. It is designed to work seamlessly with the ActiveFence backend, specifically expecting the same POST request format used at the "/kick" endpoint.

## Summary

This package serves as an essential component for managing user access and security within Agora channels. It integrates with the Agora platform, allowing you to enforce user removal when required, especially in conjunction with the ActiveFence extension.

## Usage

To incorporate this package into your own server, follow these steps:

1. Set the following environment variables to configure the Agora integration:

    - `APP_ID`: Your Agora app ID.
    - `CUSTOMER_KEY`: Your Agora customer key.
    - `CUSTOMER_SECRET`: Your Agora customer secret.

2. Utilize the provided methods and functionality within your server code to manage user kicks and enforce security protocols.

## Getting Started

To get started with the Agora ActiveFence Kicker, consider the following:

- **Installation:** Clone the repository and build the package according to your project's needs.
- **Configuration:** Ensure that the required environment variables are properly set for Agora integration.

For detailed usage examples and implementation guidelines, refer to the project's documentation and README.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

**Note:** This is a basic overview. Refer to the project's documentation and README for comprehensive usage instructions and additional details.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Agora ActiveFence Kicker | [AgoraIO-Community/agora-activefence-kicker.git](https://github.com/AgoraIO-Community/agora-activefence-kicker.git) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_ID` | - | App ID from https://console.agora.io |
| `CUSTOMER_KEY` | - | Agora RESTful API Customer Key |
| `CUSTOMER_SECRET` | (secret) | Agora RESTful API Customer Secret |

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/deploy/piHt63)
