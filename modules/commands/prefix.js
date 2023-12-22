const fs = require("fs");

module.exports.config = {
  name: "prefix",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Blue",
  description: "no prefix",
  commandCategory: "No command marks needed",
  usePrefix: false,
  usages: "...",
  cooldowns: 1,
};

module.exports.handleEvent = function ({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (
    event.body.indexOf("prefix") == 0 ||
    event.body.indexOf("Prefix") == 0 ||
    event.body.indexOf("Ano prefix") == 0 ||
    event.body.indexOf("ano prefix") == 0
  ) {
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");
    var msg = {
      body: `╭┈ ❒ [ + ] : PREFIX\n╰┈➤ ${global.config.PREFIX}\n╭┈ ❒ Type this for educ.\n╰┈➤ [ /ai ] - [ /garfield ]`,
    };
    api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.run = function ({ api, event, client, __GLOBAL }) {};