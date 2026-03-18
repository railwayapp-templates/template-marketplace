# Deploy filestash on Railway

The Enterprise File Management Solution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/uIibtY)

## About

Here's a markdown version tailored for developers:

---

# Filestash: A Versatile Web-Based File Manager

Filestash is a powerful and flexible web application designed to function as a comprehensive file manager, allowing users to manage their data across multiple protocols and services. It provides a unified, intuitive interface for accessing and organizing files, making it a suitable tool for developers, teams, and enterprises looking to streamline their file management workflows.

## Key Features and Supported Protocols

Filestash supports a wide range of protocols and services, allowing for seamless integration with various storage solutions:

- **FTP, FTPS, SFTP**: Manage and transfer files securely over traditional file transfer protocols, ideal for accessing files on remote servers.
- **WebDAV**: Extend HTTP for direct file editing and management on remote servers.
- **Git**: Manage Git repositories, providing an easy interface for version control and collaboration on projects.
- **Amazon S3, Backblaze B2, Minio**: Integrate with cloud storage solutions, enabling management of cloud-based files from a single location.
- **Dropbox, Google Drive**: Access and organize files stored in popular cloud services without switching between multiple applications.
- **LDAP**: Utilize Lightweight Directory Access Protocol for managing user authentication and permissions, enhancing security in enterprise environments.
- **MySQL**: Manage database files and perform backup operations easily through an integrated interface.
- **CardDAV, CalDAV**: Support for contact and calendar data management, adding to Filestash’s versatility beyond just file handling.

## Why Use Filestash?

- **Centralized Management**: Filestash consolidates access to multiple storage systems, making it a one-stop solution for managing files across different platforms.
- **Ease of Use**: Its web-based interface provides drag-and-drop functionality, file previews, and search capabilities, simplifying navigation and organization of files.
- **Enhanced Productivity**: Developers and teams can manage version control, file transfers, cloud storage, and even personal productivity data (like contacts and calendars) from one interface.
- **Security and Integration**: With support for secure protocols like FTPS and SFTP, along with LDAP for user management, Filestash offers robust security features suitable for enterprise use.

## Getting Started

Filestash can be easily deployed in various environments, and it is customizable to fit specific needs. You can run it as a standalone application or integrate it into your existing infrastructure using Docker or other deployment methods.

### Example Deployment Using Docker

```bash
docker run -d \
  --name filestash \
  -p 8334:8334 \
  machines/filestash
```

For more detailed installation instructions and customization options, visit the [Filestash GitHub repository](https://github.com/mickael-kerjean/filestash).

---

Filestash is an excellent tool for developers who need a versatile, secure, and easy-to-use file management solution that integrates with a wide range of protocols and services. Whether you're managing code repositories, server files, cloud storage, or personal data, Filestash provides the flexibility and functionality needed to streamline your workflow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| machines/filestash | `machines/filestash` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8334 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/template/uIibtY)
