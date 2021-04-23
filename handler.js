"use-strict";

var TwitterController = require("./twitterController");
var WordPressController = require("./wordpressController");

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.tweetMessage = async (event, context, callback) => {
  const ctrl = new TwitterController();
  const requestBody = JSON.parse(event.body);
  const statusMessage = requestBody.statusMessage;

  const params = {
    statusMessage,
  };

  const msgResp = ctrl.tweetMessage(params, callback);

  const response = {
    statusCode: 200,
    body: msgResp,
  };

  callback(null, response);
  return response;
};

module.exports.postToWordPress = async (event) => {
  const ctrl = new WordPressController();
  const requestBody = JSON.parse(event.body);
  const { content, title } = requestBody;

  const params = {
    content,
    title,
  };

  const msgResp = ctrl.postMessage(params);

  return msgResp;
};
