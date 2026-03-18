# Deploy Simple ExpressJS Template on Railway

Express template with examples for middleware & separated routers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Q4mMOs)

## About

This expressjs template is a good starter for anyone. It comes pre-built with good examples for middleware, logging and code-splitting into multiple .js files using express's router object. Comes with thorough documentation in the form of comments that explains what everything in the app does. Have fun with this example and thanks for choosing mine!

Check out src/index.js for some good info about how to start out with express, then checkout src/routes/router_example.js to see how you can make your code neat and tidy by splitting it into multiple files.

Routes:
GET "/": returns a nice welcome message
GET "/json": returns json welcome message
POST "/post": returns a welcome message and any body you pass through the post request
GET "/example/router": example nested router spawned in a separate file. Returns a help message.

Files:
- `src` contains the source code for the server
- `src/routes` contains the routes for the server
- `src/routes/router_example.js` contains examples pertaining to expressjs routers

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| express | [alexng353/railway-expressjs-template](https://github.com/alexng353/railway-expressjs-template) | Worker |

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/Q4mMOs)
