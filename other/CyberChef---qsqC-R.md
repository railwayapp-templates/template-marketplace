# Deploy CyberChef on Railway

The cyber Swiss army knife.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qsqC-R)

## About

##Template
This template deploys [CyberChef](https://github.com/gchq/CyberChef), the cyber Swiss army knife. Just wait 1-2 mins after deployment for the web interface to be available.

##Overview
[CyberChef](https://github.com/gchq/CyberChef), by GCHQ, is a simple web application for performing cryptographic operations like encoding/decoding, calculating hashes/checksums, and more, in the browser itself. It is designed for technical and non-technical professionals, and helps manipulate data in various ways without having to learn complex algorithms, install the underlying binaries, or maintain special environments for the tools. A cyber Swiss army knife if you will! CyberChef runs entirely client-side, in the browser, and does not send data to any web server.

Here are some operations that you can perform with CyberChef:
* Encode a string in base-64 format / decode a base-64 encoded string
* Automatically detect layers of nested encodings
* Encrypt/decrypt data with AES/DES/Blowfish and other ciphers
* Convert data from hexdump, and decompress the data
* Convert date/time to a different timezone, display multiple timestamps
* Decrypt and disassemble shell code
* Save, load, and share recipes i.e. sequences of repeatable steps

##Learn More
* [CyberChef: The Cyber Swiss Army Knife](https://alphasec.io/cyberchef-the-cyber-swiss-army-knife)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cyberchef | `mpepping/cyberchef` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/qsqC-R)
