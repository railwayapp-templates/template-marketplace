# Deploy Agora Node Token Server on Railway

Token server for Agora SDKs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/huuDOY)

## About

# Agora Node Token Server
This is an example of a simple Node/Express server that generates tokens for Agora applications. 

### Run the server ###
- Install the dependencies
```node
npm install
```
- Create a copy of the `.env.example` file and save it as `.env`
- Add your Agora App ID and App Certificate:
```
APP_ID=ca123xxxxxx
APP_CERTIFICATE=12za123xxxxxx
```
You can obtain these values by selecting your project in the [Agora console projects section](https://console.agora.io/projects). Optionally, you can also define a port.

- Start the service
```node
npm start
```

## Endpoints ##

### Ping ###
**endpoint structure**
```
/ping
```
response:
``` 
{"message":"pong"} 
```

### RTC Token ###
The `rtc` token endpoint requires a `channelName`, `role` ('publisher' or 'audience'), `tokentype` ('uid' || 'userAccount') and the user's `uid` (type varies based on `tokentype` (example: `1000` for uid, `ekaansh` for userAccount). 
`(optional)` Pass an integer to represent the token lifetime in seconds.

**endpoint structure** 
```
/rtc/:channelName/:role/:tokentype/:uid/?expiry=
```

response:
``` 
{"rtcToken":" "} 
```

## RTM Token ##
The `rtm` token endpoint requires the user's `uid`. 
`(optional)` Pass an integer to represent the privelege lifetime in seconds.
**endpoint structure** 
```
/rtm/:uid/?expiry=
```

response:
``` 
{"rtmToken":" "} 
```

### Both Tokens ###
The `rte` token endpoint generates both the `rtc` and `rtm` tokens with a single request.
`(optional)` Pass an integer to represent the token lifetime in seconds.

**endpoint structure** 
```
/rte/:channelName/:role/:tokentype/:uid/?expiry=
```

response:
``` 
{
  "rtcToken":" ",
  "rtmToken":" " 
} 
```
source: github.com/AgoraIO-Community/Agora-Node-TokenServer

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Agora Node Token Server | [AgoraIO-Community/Agora-Node-TokenServer](https://github.com/AgoraIO-Community/Agora-Node-TokenServer) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `APP_ID` | Agora App ID |
| `APP_CERTIFICATE` | Agora App Certificate |

## Configuration

- **Start command:** `npm start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/huuDOY)
