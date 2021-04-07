"use strict";

const Twitter = require("twitter");
const config = require("./config/twitter.config");
const short = require("short-uuid");

const T = new Twitter(config);

module.exports = class TwitterController {
  constructor() {}

  tweetMessage(params, callback) {
    const tweetObj = {
      status:
        `ID:${short.generate()}\n${params.statusMessage}` ||
        `Empty Message ${short.generate()}`,
    };

    let resp;

    T.post("statuses/update", tweetObj, function (err, data, response) {
      if (err) {
        console.error(`Tweet was not posted. Errorcode: ${err[0].message}`);
      } else {
        resp = response;
      }
    });

    return resp;
  }
};
