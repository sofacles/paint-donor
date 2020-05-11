// Copyright 2018 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const path = require('path');
const {google} = require('googleapis');
const {authenticate} = require('@google-cloud/local-auth');
const { Logger } = require("../logger");

const gmail = google.gmail('v1');

async function runSample() {
  // Obtain user credentials to use for the request
  Logger.info("at top of runSample");
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '../../lesscanproject1-37f3797dd45e.json'),
    scopes: [
      'https://mail.google.com/',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/gmail.send',
    ],
  });
  Logger.info("check 2");
  google.options({auth});

  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const messageParts = [
    'From: The 1LessCan Mailbot <mailbot.1lesscan@gmail.com>',
    'To: The 1LessCan Mailbot <mailbot.1lesscan@gmail.com>',
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: test`,
    '',
    'This is a message just to say:',
    'Victory is mine!',
  ];
  const message = messageParts.join('\n');

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
    console.log("at top of runSample");
  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });
  Logger.info(JSON.stringify(res.data));
  Logger.info("check 3");
  console.info(res.data)
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;