"use-strict";

const aws = require("aws-sdk");

var TwitterController = require("./twitterController");
var WordPressController = require("./wordpressController");

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

module.exports.sendEmail = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { text, subject, to, from } = requestBody;

  const ses = new aws.SES({ region: "us-east-1" });

  var params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };

  await ses.sendEmail(params).promise();

  return {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Email sent!",
      },
      null,
      2
    ),
  };
};
