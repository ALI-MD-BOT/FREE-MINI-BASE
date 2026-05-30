const { cmd } = require('../inconnuboy');
const {
    getUserConfigFromMongoDB,
    updateUserConfigInMongoDB
} = require('../lib/database');

cmd({
    pattern: "autoreact",
    desc: "Auto React On/Off",
    category: "settings",
    react: "⚙️"
},
async(conn, mek, m, { q, senderNumber, isOwner, reply }) => {
    try {
        if (!isOwner) return reply("*❌ Owner Only Command*");

        const userConfig = await getUserConfigFromMongoDB(senderNumber);

        if (!q) {
            return reply(
                `*AUTO REACT SETTINGS*\n\n` +
                `Status: ${userConfig.AUTO_REACT === 'true' ? '✅ ON' : '❌ OFF'}\n\n` +
                `.autoreact on\n` +
                `.autoreact off`
            );
        }

        if (q.toLowerCase() === "on") {

            userConfig.AUTO_REACT = "true";

            await updateUserConfigInMongoDB(
                senderNumber,
                userConfig
            );

            return reply("*✅ Auto React Enabled*");
        }

        if (q.toLowerCase() === "off") {

            userConfig.AUTO_REACT = "false";

            await updateUserConfigInMongoDB(
                senderNumber,
                userConfig
            );

            return reply("*❌ Auto React Disabled*");
        }

        return reply("*Use:* .autoreact on/off");

    } catch (err) {
        console.log(err);
        reply(err.message);
    }
});
