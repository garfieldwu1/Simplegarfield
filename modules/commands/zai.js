const axios = require("axios");

const config = {
  name: "mark",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jazer",
  description: "OpenAI official AI with no prefix",
  commandCategory: "no prefix",
  usages: "...",
  cooldowns: 0
};

const handleEvent = async function ({ api, event, client, __GLOBAL }) {

  if (event.body.indexOf("ai") === 0 || event.body.indexOf("Ai") === 0) {
    const { threadID, messageID } = event;
    const input = event.body;
    const message = input.split(" ");

    if (message.length < 2) {
      api.sendMessage("Please provide a question first.", event.threadID, event.messageID);
    } else {
      try {
        api.sendMessage('Please wait while I think through your request...', event.threadID, event.messageID);
        const ris = await axios.get(`https://Garfield.Garfield22.repl.co/api/gpt4?query=${message.slice(1).join(" ")}`);
        const result = ris.data.Mark;
        const a = "credits: www.facebook.com/markqtypie";
        const Mark = `${result}\n\n${a}`;
        api.sendMessage(Mark, event.threadID, event.messageID);
      } catch (err) {
        console.error(err);
        api.sendMessage("We apologize for the inconvenience, but we were unable to send your answer at this time. Please try again later.", event.threadID, event.messageID);
      }
    }
  }
};

const run = function ({ api, event, client, __GLOBAL }) {
};

module.exports = { config, handleEvent, run };