const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "Hiroshi",
    description: "This command notifies the bot when people enter or leave the group chat.",
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.run = async function({ api, event }) {
    const { threadID, logMessageData } = event;

    if (logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`𝗕𝗢𝗧 ${global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        return api.sendMessage(`${global.config.BOTNAME} "Connected successful!".\n\nHere's my prefix: ${global.config.PREFIX}\nType ${global.config.PREFIX}help to see the list of my features.`, threadID);
    } else {
        try {
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};

            let addedParticipants = logMessageData.addedParticipants;
            let nameArray = [];
            let memLength = [];

            for (let newParticipant of addedParticipants) {
                let userID = newParticipant.userFbId;
                let data = await api.getUserInfo(parseInt(userID));
                let obj = Object.keys(data);
                let userName = data[obj].name.replace("@", "");

                if (userID !== api.getCurrentUserID()) {
                    nameArray.push(userName);
                    memLength.push(participantIDs.length - memLength.length + 1);

                    let msg = (typeof threadData.customJoin === "undefined")
                        ? "Hello {YourName}\nWelcome to\n{threadName}\nyou're the {soThanhVien}th member in this group. Please enjoy."
                        : threadData.customJoin;

                    msg = msg
                        .replace(/\{YourName}/g, nameArray.join(", "))
                        .replace(/\{type}/g, (memLength.length > 1) ? "you" : "Friend")
                        .replace(/\{soThanhVien}/g, memLength.join(", "))
                        .replace(/\{threadName}/g, threadName);

                    const link = [
                        "https://i.ibb.co/C2kp7yJ/Picsart-23-06-11-11-39-07-260.jpg",
                        "https://i.ibb.co/HCcNCjC/Picsart-23-06-11-11-42-35-231.jpg",
                        "https://i.ibb.co/G935QHj/Picsart-23-06-11-11-47-03-495.jpg"
                    ];

                    const callback = () => {
                        api.sendMessage({
                            body: msg,
                            attachment: fs.createReadStream(__dirname + "/cache/join/avt.jpg"),
                            mentions: [{ tag: userName, id: userID, fromIndex: 0 }]
                        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/join/avt.jpg"));
                    };

                    request({
                        url: encodeURI(link[Math.floor(Math.random() * link.length)]),
                        encoding: null
                    }, (err, res, body) => {
                        fs.writeFile(__dirname + "/cache/join/avt.jpg", body, () => {
                            callback();
                        });
                    });
                }
            }
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }
};
