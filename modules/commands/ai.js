const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "ai",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Blue",
  description: "Main Ai",
  commandCategory: "prompt ai",
  usages: "cmdname question ",
  cooldowns: 0,
  dependencies: {},
};

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch (error) {
    console.log(error);
    return "User";
  }
}

module.exports.run = async function ({ api, event, args, Users, Threads }) {
  api.setMessageReaction("❤️", event.messageID, (err) => {}, true);

  const greetingA = ["Hello", "Hi there", "Hey friend", "Greetings", "Howdy", "Hey", "Hi friend", "Hiya", "Hey there", "What's up", "Good day", "Hey you", "Hey buddy", "Hi stranger", "Hey pal", "Hey love", "Hello, sunshine", "Hello, gorgeous", "Hey sunshine", "Hello, beautiful", "Hey superstar", "Hey champ", "Hi hero", "Hey rockstar", "sup", "Hey bestie", "Hey amazing person", "Hi lovely", "Hello, dear friend"];

  const respondA = ["How can I brighten your day?", "I'm here to make your day better!", "What's on your mind, friend?", "Need a virtual hug or advice? I'm here!", "I'm your friendly neighborhood AI, ready to chat!", "Let's make today awesome together!", "Your friendly AI is at your service!", "Ready for a friendly chat!", "How can I assist my awesome friend today?", "You're not alone, friend. I'm here for you!", "Tell me, how can I help you, my friend?", "Just a friendly reminder: You're awesome!", "Your positivity brightens my circuits! How can I assist you?", "Friend, you can count on me!", "Let's have a friendly conversation!", "What can I do to bring a smile to your face?", "Feeling down? Let's chat and cheer you up!", "Your friendly chat buddy is here!", "Need a friend to talk to? I'm here!", "You're not just a user, you're a friend!", "How can I assist my wonderful friend today?", "Ready to spread some positivity! How can I assist you?", "You're in the company of a friendly AI! How can I assist you today?", "Need a friendly ear to listen? I'm here!", "Friendly vibes incoming! How can I assist you, friend?", "Your friendly AI companion is here for you!", "Friend, let's make today a great day!", "Ready to brighten your day! How can I assist you, friend?"];

  const randomGreeting = greetingA[Math.floor(Math.random() * greetingA.length)];
  const randomResponse = respondA[Math.floor(Math.random() * respondA.length)];

  const promptMessage = ``;

  const blank = args.join(" ");
  const data = `User: ${args.join(" ")}\nYou: `;

  if (blank.length < 2) {
    api.sendMessage(`${randomGreeting}, ${await getUserName(api, event.senderID)}! ${randomResponse}`, event.threadID, event.messageID);
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
  } else {
    api.sendMessage("🖇𝚂𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐 𝚏𝚘𝚛 𝚊𝚗 𝚊𝚗𝚜𝚠𝚎𝚛...", event.threadID, event.messageID);
    try {
      const previousConversation = [];
      const response = await axios.get(`https://test-gpt4-api.hiroshiapi.repl.co/gpt?ask=${encodeURIComponent(promptMessage + data)}`);
      const message = response.data.response;
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      const formattedResponse = `𝗚𝗔𝗥𝗙𝗜𝗘𝗟𝗗 🤖:\n\n${message}\n\ncredits: www.facebook.com/markqtypie`;
      api.sendMessage(formattedResponse, event.threadID, (error, messageInfo) => {
        if (!error) {
          //setTimeout(() => {
            //api.unsendMessage(messageInfo.messageID);
         // }, 180000);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
};