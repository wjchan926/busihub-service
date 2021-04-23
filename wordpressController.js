"use strict";

const short = require("short-uuid");
const fetch = require("node-fetch");

const WP_SITE_URL = "http://busihub.wchan-labs.com/index.php/wp-json/wp/v2/posts/";

const wpconfig = require("./config/wordpress.config");

module.exports = class WordPressController {
  constructor() {}

  buildFetchConfig = (requestMethod, body) => {
    const config = {
      method: requestMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + wpconfig.token,
      },
    };
    if (body) {
      config.body = body;
    }

    return config;
  };

  postMessage(params) {
    const messageObj = JSON.stringify({
      title: params.title,
      status: "publish",
      content:
        `ID:${short.generate()}\n${params.content}` ||
        `Empty content ${short.generate()}`,
    });

    return fetch(WP_SITE_URL, this.buildFetchConfig("POST", messageObj)).then(
      (resp) => resp.json()
    );   
  }
};
