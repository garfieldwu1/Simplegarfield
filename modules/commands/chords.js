module.exports.config = {
  name: "chords",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Joshua Sy",
  description: "Search Chords",
  usages: "[song title]",
  commandCategory: "Searching",
  cooldowns: 3
};

module.exports.run = async ({ api, event,args, Users, __GLOBAL }) => {
const tabs = require("ultimate-guitar")
 let qwerty = args.join(" ");
if (!qwerty) return api.sendMessage(`Wrong format\nUse ${global.config.PREFIX}${this.config.name} title of song`, event.threadID, event.messageID);

try{
const res = await tabs.firstData(qwerty);

var title = res.title
var chords = res.chords
var type = res.type
var key = res.key
var artist = res.artist

api.sendMessage(`𝗔𝗥𝗧𝗜𝗦𝗧: ${artist}\n𝗧𝗜𝗧𝗟𝗘: ${title}\n𝗧𝗬𝗣𝗘: ${type}\n𝗞𝗘𝗬: ${key}\n——Here’s the cords——\n\n${chords}\n\n——End——`, event.threadID, event.messageID);
} catch(err){
 console.log("[ERR] " + err);
api.sendMessage("[ERR] " + err, event.threadID, event.messageID);
}
}