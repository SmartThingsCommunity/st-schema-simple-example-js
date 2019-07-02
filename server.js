"use strict";

require('dotenv').config();
const express = require('express')
const connector = require('./connector')

const PORT = process.env.PORT || 3000
const ACCESS_TOKEN_PREFIX = process.env.ACCESS_TOKEN_PREFIX;
const server = express();
server.use(express.json());

server.post('/', (req, res) => {
  if (accessTokenIsValid(req, res)) {
    connector.handleHttpCallback(req, res)
  }
});

function accessTokenIsValid(req, res) {
  // Replace with proper validation of issued access token. This version just checks for the
  // profix defined in the summy OAuth server
  if (req.body.authentication.token.startsWith(ACCESS_TOKEN_PREFIX)) {
    return true;
  }
  console.log('Unauthorized request')
  res.status(401).send('Unauthorized')
  return false;
}

server.listen(PORT);
console.log(`Server listening on http://127.0.0.1:${PORT}`);
