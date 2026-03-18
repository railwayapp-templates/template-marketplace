# Deploy SpaceDrive on Railway

Unify files from all devices and clouds in a single, easy-to-use explorer.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/oZ13es)

## About

Spacedrive is an open source cross-platform file explorer, powered by a virtual distributed filesystem written in Rust.

Organize files across many devices in one place. From cloud services to offline hard drives, Spacedrive combines the storage capacity and processing power of your devices into one personal distributed cloud, that is both secure and intuitive to use.

For independent creatives, hoarders and those that want to own their digital footprint, Spacedrive provides a free file management experience like no other.

Documentation:
For more information, Visit [Spacedrive Docs](https://www.spacedrive.com/docs/product/getting-started/introduction)

## Features

Experience the ultimate in file management with Spacedrive. Below is a detailed list of our current features and what we're bringing to you in the near future.

- Libraries: _Create and manage Libraries._

- Explorer: _Navigate files by Locations, Tags, Spaces, Albums, or via Search._

- Locations: Designate Spacedrive's search locations. Any file detected in a Location gets incorporated into your Library database, subject to customizable filtering rules.

- Cloud Locations: Integrate cloud accounts into a Library.

- Overview Statistics: _Analyze unique file categories via the Overview screen._

- Tags: Design and attach them to files, or explore tagged files directly from the sidebar.

- Spaces: _A collaborative tool to organize and showcase files._

- Photo Albums:
  - Importing albums from Google Photos, Apple Photos.
  - Create albums from scratch.

- **Library statistics**: Gain insights into total capacity, database size, preview media space, and available storage.

- Search: Instantly look up your Library via the search bar or using CTRL+F.

- **Spacedrop**: A user-friendly method to transfer files across devices, either locally or over the internet. \*

- Themes: Light and dark modes available with an option for system synchronization.

- A collection of 48 distinct icons tailored for different file types.

- Compatible with over 250 file types, powered by "[magic byte](https://en.wikipedia.org/wiki/List_of_file_signatures)" recognition.

- Integrated update installer for seamless software upgrades.

- Optional telemetry and local logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SpaceDrive | `ghcr.io/spacedriveapp/spacedrive/server:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SD_PASSWORD` | (secret) |
| `SD_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/oZ13es)
