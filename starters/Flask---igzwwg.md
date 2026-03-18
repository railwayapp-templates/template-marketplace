# Deploy Flask on Railway

A minimal Flask web application.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/igzwwg)

## About

Flask is a lightweight web application framework written in Python. It is based on the Werkzeug WSGI toolkit and the Jinja2 template engine, and is one of the most popular Python frameworks around. It does not require specific tools or libraries, but supports a wide range of extensions for building web applications.

Hosting Flask means running a Python web application through a WSGI server that handles HTTP requests and responses using the Werkzeug toolkit and Jinja2 templating. The framework provides minimal structure requiring configuration for production concerns like WSGI server setup, static file serving, database connections, and environment variable management. Development uses Flask's built-in server while production requires WSGI servers like Gunicorn or uWSGI with proper configuration. Railway simplifies Flask deployment by automatically detecting Python applications, managing dependencies through requirements.txt, configuring WSGI servers, and handling environment variables for different deployment stages.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Server | [alphasecio/flask](https://github.com/alphasecio/flask) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, CSS, Python, Procfile

[View on Railway →](https://railway.com/deploy/igzwwg)
