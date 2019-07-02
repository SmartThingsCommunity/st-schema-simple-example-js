# ST Schema Simple Example

This application is about the simplest possible implementation of an ST Schema
cloud-to-cloud device integration. It creates a single simualtated dimmer device
named _Test Dimmer_. The state of the dimmer is saved in memory to keep the
implementation as simple as possible, so restarting the server will reset it's
switch status to 'off' and switch dimmer level to 100%.

Note that ST Schema requires your cloud application to support [OAuth 2](https://oauth.net/2/) for authentication.
This example does not include an OAuth server, but it does include instructions for
remixing a [Glitch dummy OAuth server](https://glitch.com/~st-dummy-oauth-server) to handle that part of the login process

## Files

- connector.js -- The ST Schema connector app built with the [st-schema](https://www.npmjs.com/package/st-schema) SDK
- server.js -- An [express](https://www.npmjs.com/package/express) web server that hosts the connector

## Getting Started

### Running locally

#### Prerequisites

- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed
- [ngrok](https://ngrok.com/) or similar tool to create a secure tunnel to a publically available URL
- A [Samsung Developer Workspace account](https://smartthings.developer.samsung.com/workspace/)
- The SmartThings mobile app (available from the App Store or Google Play Store)

#### Instructions

1. Clone [this project](https://github.com/SmartThingsCommunity/st-schema-simple-example)
2. CD into the project directory and start the server with `node server.js`
3. Start ngrok to tunnel traffic to your server URL and port (`localhost:3000`).
4. Register the webhook url in Samsung developer workspace and deploy it
5. On the SmartThings mobile app (on App Store or Google play store) you can add the smart device and control it.

### Running in [Glitch

#### Prerequisites

- A [Glitch](https://glitch.com/about/) account
- A [Samsung Developer Workspace account](https://smartthings.developer.samsung.com/workspace/)
- The SmartThings mobile app (available from the App Store or Google Play Store)

#### Instructions

1. Remix the [st-schema-simple-example](https://glitch.com/~st-schema-simple-example) project.
2. Once the remixed app is up and running copy its URL.
4. Register the webhook url in Samsung developer workspace and deploy it
5. On the SmartThings mobile app (on App Store or Google play store) you can add the smart device and control it.

## Configuring the Dummy OAuth Server

1. Remix the [st-dummy-oauth-server](https://glitch.com/~st-dummy-oauth-server) project
2. Edit the `.env` file to set your own client ID and secret, for example:
`EXPECTED_CLIENT_ID="somerandomvalueyouchoose"`
`EXPECTED_CLIENT_SECRET="anotherrandomvalueyouchoose"`
`AUTH_REQUEST_PATH="/oauth/login"`
`ACCESS_TOKEN_REQUEST_PATH="/oauth/token"`

## Next Steps

Check out the st-schema-callback-example so see how to add proactive state
callbacks to your connector using the `st-schema` SDK.
