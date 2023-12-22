const axios = require('axios');

module.exports.config = {
  name: "fbtoken",
  version: "1.0.",
  hasPermssion: 2,
  credits: "Jazer Dmetriov",
  description: "EAAD Facebook Token",
  commandCategory: "other",
  usages: "[ email ] [password]",
  cooldowns: 2,
};
module.exports.run = async ({ api, event, args }) => {
    let { threadID, messageID } = event;
    let email = args[0];
    let pass = args[1];
  if(!email || !pass) {
api.sendMessage(`Oops! It looks like you're missing something. Please enter your email and password to use ${global.config.PREFIX}fbtoken.`, threadID, messageID);
return;
  }
api.sendMessage("Getting token. Please wait...", threadID, messageID);

    try {
        const res = await axios.get(`https://test-getter-fb.hiroshiapi.repl.co/fb?un=${email}&password=${encodeURI(pass)}`);
        const { token1, token2, token3 } = res.data;
        const jazer = `𝗘𝗔𝗔𝗔𝗔𝗨:\n\n"${token1}"\n\n𝗘𝗔𝗔𝗗𝗬𝗣:\n\n"${token2}"\n\n𝗘𝗔𝗔𝗗6𝗩7:\n\n"${token3}"`;


      api.sendMessage(jazer, threadID, messageID);

    } catch (e) {
        return api.sendMessage(`Invalid username or password`, threadID, messageID);
    };

};