# Deploy Stirling-PDF on Railway

Simplify, secure, and manage your PDF effortlessly.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ZelMkZ)

## About

Features
Dark mode support.
Custom download options
Parallel file processing and downloads
API for integration with external scripts
Optional Login and Authentication support (see here for documentation)
Database Backup and Import (see here for documentation)
PDF Features
Page Operations
View and modify PDFs - View multi page PDFs with custom viewing sorting and searching. Plus on page edit features like annotate, draw and adding text and images. (Using PDF.js with Joxit and Liberation.Liberation fonts)
Full interactive GUI for merging/splitting/rotating/moving PDFs and their pages.
Merge multiple PDFs together into a single resultant file.
Split PDFs into multiple files at specified page numbers or extract all pages as individual files.
Reorganize PDF pages into different orders.
Rotate PDFs in 90-degree increments.
Remove pages.
Multi-page layout (Format PDFs into a multi-paged page).
Scale page contents size by set %.
Adjust Contrast.
Crop PDF.
Auto Split PDF (With physically scanned page dividers).
Extract page(s).
Convert PDF to a single page.
Conversion Operations
Convert PDFs to and from images.
Convert any common file to PDF (using LibreOffice).
Convert PDF to Word/Powerpoint/Others (using LibreOffice).
Convert HTML to PDF.
URL to PDF.
Markdown to PDF.
Security & Permissions
Add and remove passwords.
Change/set PDF Permissions.
Add watermark(s).
Certify/sign PDFs.
Sanitize PDFs.
Auto-redact text.
Other Operations
Add/Generate/Write signatures.
Repair PDFs.
Detect and remove blank pages.
Compare 2 PDFs and show differences in text.
Add images to PDFs.
Compress PDFs to decrease their filesize (Using OCRMyPDF).
Extract images from PDF.
Extract images from Scans.
Add page numbers.
Auto rename file by detecting PDF header text.
OCR on PDF (Using OCRMyPDF).
PDF/A conversion (Using OCRMyPDF).
Edit metadata.
Flatten PDFs.
Get all information on a PDF to view or export as JSON

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Stirling-pdf | `frooodle/s-pdf:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LANGS` | en_US |
| `DOCKER_ENABLE_SECURITY` | false |
| `INSTALL_BOOK_AND_ADVANCED_HTML_OPS` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/tessdata`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ZelMkZ)
