# Deploy Carbone on Railway

[Jun'26] Generate reports, invoices, and documents anywhere

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/carbone)

## About

Carbone is a high-performance document generation engine that turns JSON data into professional documents using templates. It can generate reports, invoices, contracts, statements, and business documents in formats such as PDF, DOCX, XLSX, ODT, PPTX, CSV, HTML, and more.

![](https://carbone.io/img/carbone-logo.svg)

Hosting Carbone gives you a self-hosted document generation service that can be integrated into your application, automation workflow, internal tool, or API backend. Instead of manually creating reports or building complex document layouts in code, you prepare a template using familiar tools such as Word, LibreOffice, Excel, or PowerPoint, then send structured JSON data to Carbone for rendering.

This Railway template helps you deploy Carbone quickly so your application can generate documents on demand. It is useful for teams that need automated invoices, reports, certificates, contracts, financial documents, operational forms, or bulk-generated files without relying on manual editing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| carbone | `carbone/carbone-ee:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4000 |
| `CARBONE_EE_STUDIO` | true |

## Configuration

- **Volume:** `/app/template`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/carbone)
