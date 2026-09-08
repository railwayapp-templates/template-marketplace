# Deploy Firebase Emulator Suite on Railway

A self-hosted Firebase emulator suite with core services and web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firebase-emulator)

## About

Firebase Emulator Suite provides local emulators for core Firebase services, allowing applications to be developed and tested without connecting to production Firebase resources.

This deployment includes Authentication, Cloud Firestore, Realtime Database, Cloud Storage, and the Firebase Emulator Suite web UI.

Firebase Emulator Suite runs as a single Railway service with the following emulators:

* Authentication
* Cloud Firestore
* Realtime Database
* Cloud Storage
* Emulator Suite UI

The emulators use their standard Firebase Emulator Suite ports and are available through Railway networking.

Persistent storage can be used to retain emulator snapshots across supported restarts and redeployments.

No PostgreSQL, Redis, MySQL, MongoDB, or real Firebase account is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| firebase-emulator-suite | [codestorm-official/firebase-emulator-suite](https://github.com/codestorm-official/firebase-emulator-suite) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4000 | Railway HTTP target port for Emulator Suite UI |
| `JAVA_TOOL_OPTIONS` | -Xms256m -Xmx1024m | JVM heap allocation for Java-based emulators |
| `FIREBASE_PROJECT_ID` | demo-railway | Firebase project ID used by the local emulators |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/firebase-emulator)
