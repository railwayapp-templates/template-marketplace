# Deploy pdfding on Railway

view, edit, manage your PDFs -- simplify your PDF experience

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/OII9gz)

## About

<div width="100%" align="center">
    <img alt="" width="100" src="./pdfding/static/images/logo_with_circle.svg">
</div>

# PdfDing
PdfDing is a selfhosted PDF manager, viewer and editor offering a seamless user experience on multiple devices.

[![GitHub Repo Stars](https://img.shields.io/github/stars/mrmn2/PdfDing?style=flat&amp;logo=github)](https://github.com/mrmn2/PdfDing)
[![Docker Pulls](https://img.shields.io/docker/pulls/mrmn/pdfding?style=flat&amp;logo=docker&amp;logoColor=white)](https://hub.docker.com/r/mrmn/pdfding)
[![Version](https://img.shields.io/github/v/release/mrmn2/PdfDing?style=flat&amp;label=version)](https://github.com/mrmn2/PdfDing/releases)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/mrmn2/PdfDing/tests.yaml?style=flat&amp;logo=github&amp;label=ci)](https://github.com/mrmn2/PdfDing/actions)
[![Last Commit](https://img.shields.io/github/last-commit/mrmn2/PdfDing?style=flat&amp;logo=github)](https://github.com/mrmn2/PdfDing/commits/master/)

![](https://github.com/mrmn2/PdfDing-Screenshots/blob/master/screenshots/pdf_overview_dark_green.png)

## Introduction
PdfDing is a PDF manager, viewer and editor that you can host yourself. It offers a seamless user experience on multiple
devices. It's designed be to be minimal, fast, and easy to set up using Docker.

The name is a combination of PDF and *ding*. Ding is the German word for thing. Thus, PdfDing is a thing for
your PDFs. Initially inspired by [linkding](https://github.com/sissbruecker/linkding).

## Features
* Seamless browser based PDF viewing on multiple devices. Remembers current position - continue where you stopped reading
* Stay on top of your PDF collection with multi-level tagging, starring and archiving functionalities
* Edit PDFs by adding comments, highlighting and drawings
* Manage and export PDF highlights and comments in dedicated sections
* Clean, intuitive UI with dark mode, inverted color mode, custom theme colors and multiple layouts
* SSO support via OIDC
* Share PDFs with an external audience via a link or a QR Code with optional access control
* Markdown Notes
* Progress bars show the reading progress of each PDF at a quick glance

## Guides
Guides about various aspects of PdfDing can be found in the
[guides](https://github.com/mrmn2/PdfDing/blob/master/docs/guides.md) section of the docs.

## Configuration
Information about the different configuration options can be found in the
[configuration](https://github.com/mrmn2/PdfDing/blob/master/docs/configuration.md) section of the docs.


## Comparison with Stirling PDF
While [Stirling PDF](https://github.com/Stirling-Tools/Stirling-PDF) and PdfDing are both self-hosted web
applications centered around PDF files, they still differ in their use case. Stirling PDF focuses on
performing various operations like splitting, cropping and rotating on your PDFs. PdfDing however has a
different focus, it is all about reading and organizing your PDFs. All features are added with the goal of
improving the reading experience or making the management of your PDF collection simpler. PdfDing's editing
functionalities were added with the same idea in mind. You can add annotations, highlighting and drawings to
PDFs, so that you can highlight or add information that will be beneficial to your reading experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pdfding | `mrmn/pdfding:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET_KEY` | (secret) |
| `DEFAULT_THEME` | dark |
| `CSRF_COOKIE_SECURE` | FALSE |
| `DEFAULT_THEME_COLOR` | blue |
| `SESSION_COOKIE_SECURE` | FALSE |
| `ACCOUNT_EMAIL_VERIFICATION` | FALSE |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nonroot/pdfding/media`

**Category:** Other

[View on Railway →](https://railway.com/template/OII9gz)
