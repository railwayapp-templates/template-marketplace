# Deploy GTFS Viz on Railway

A project renders at scale GTFS files on the browser without backend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nJ-5yD)

## About

## GTFS Viz 🚉

GTFS Viz is a browser-based transit data visualization and editing tool. Process GTFS (General Transit Feed Specification) files entirely in your browser using DuckDB WASM. Visualize stations, stops, and pathways on interactive maps. Edit transit data and export back to GTFS format - no backend servers required.

![GTFS Viz Demo](https://raw.githubusercontent.com/gabrielAHN/gtfs-viz/main/images/gtfs-viz.gif)

## About GTFS Viz 🚉

GTFS Viz is a static web application built with Vite, React, and DuckDB WASM. The application runs entirely in the browser, processing GTFS data client-side without requiring any backend infrastructure. All data stays private on your device - nothing is sent to external servers. The deployment consists of serving pre-built static files through a web server with optimized caching headers and security configurations.

## Common Use Cases

- **Transit Agency Analysis**: Agencies can visualize and validate their GTFS data before publishing, identifying gaps in station connectivity and accessibility
- **Transit App Development**: Developers can explore GTFS datasets interactively to understand transit network structure before building applications
- **Accessibility Auditing**: Urban planners can identify stations lacking proper pathway definitions or accessible routes for mobility-impaired passengers
- **Data Quality Control**: Validate GTFS files by visualizing stops, stations, and pathways to catch data errors or inconsistencies
- **Transit Education**: Students and researchers can explore real-world transit data to learn about GTFS specification and transit network design

## Dependencies

- **Node.js 18+**: Required for building the application
- **Yarn**: Package manager for installing dependencies
- **Caddy**: Web server for serving static files

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GTFS Viz 🚉 | [gabrielAHN/gtfs-viz](https://github.com/gabrielAHN/gtfs-viz) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/template/nJ-5yD)
