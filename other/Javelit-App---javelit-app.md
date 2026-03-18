# Deploy Javelit App on Railway

A template to quickly deploy Javelit apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/javelit-app)

## About

Javelit is a Java lightning fast data app development framework. Write your webapp as a simple Java class and deploy it in a minute with this railway template!  
Learn more on [GitHub](https://github.com/javelit/javelit).

This app uses the jbang docker image to launch Javelit, pointing to the app you provide via the `APP_URL`
variable. 
Your webapp is then deployed and available on the web with fully secured https and wss (secured websocket).

This app can automatically refresh if the code at the URL is changed. Enable this feature by passing a refresh interval in the `SOURCE_REFRESH_INTERVAL` variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Javelit container | `jbangdev/jbang:0.132.1-java-21` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `APP_URL` | - | A public URL pointing to the app file. You can provide a link to a github folder if the app uses other files. If a link to a folder is provided, the entrypoint should be called Main.java or App.java or there should be a unique Java class at the root of the folder. Supported values: (1) A direct link to a text/plain .java file: https://raw.githubusercontent.com/user/repo/branch/file.java.  (2) A GitHub repository URL: https://github.com/user/repo. A GitHub folder tree URL : https://github.com/user/repo/tree/branch/path/to/folder. (4)A GitHub file blob URL: https://github.com/javelit/javelit/blob/main/examples/getting_started/App.java |
| `JDK_JAVA_OPTIONS` | -Xmx512m -Xms256m -XX:MaxMetaspaceSize=128m | Java options |
| `MALLOC_ARENA_MAX` | 2 | Used to reduce memory usage. If you're not sure, do not edit. |
| `SOURCE_REFRESH_INTERVAL` | -1 | The refresh interval (in seconds) used to update the app from the source URL. A value of -1 disables automatic refresh; in that case, you must restart the service to load a new version of the app. If set, the interval must be at least 60 seconds. Javelit attempts to respect caching headers returned by the server. This may cause the actual refresh frequency to be slower than the provided interval. |

## Configuration

- **Start command:** `/bin/sh -c "jbang  javelit@javelit run ${APP_URL} --watch-remote ${SOURCE_REFRESH_INTERVAL} --port 3000"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/javelit-app)
