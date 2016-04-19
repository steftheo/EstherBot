'use strict';

const jsonwebtoken = require('jsonwebtoken');

const jwt = jsonwebtoken.sign({
    scope: 'app'
}, process.env.SMOOCH_SECRET, {
    headers: {
        kid: process.env.SMOOCH_KEY_ID
    }
});

module.exports = jwt;

// If run directly, print JWT to cmd line
if (process.argv[1] === __filename) {
    console.log(jwt);
}

var Botkit = require('botkit');

var accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
var verifyToken = process.env.FACEBOOK_VERIFY_TOKEN;
var port = process.env.PORT;

if (!accessToken) throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is required but missing');
if (!verifyToken) throw new Error('FACEBOOK_VERIFY_TOKEN is required but missing');
if (!port) throw new Error ('PORT is required but missing');

var controller = Botkit.facebookbot({
  access_token: accessToken,
  verify_token: verifyToken
});

var bot = controller.spawn()

controller.setupWebserver(port, function (err, webserver) {
  if (err) return console.log(err);
  controller.createWebhookEndpoints(webserver, bot, function () {
    console.log('Ready Player 1');
  });
});
