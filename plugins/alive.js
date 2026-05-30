const { cmd, commands } = require('../inconnuboy');
const config = require('../config');

// Commande Ping
cmd({
    pattern: "ping",
    desc: "Check bot latency",
    category: "general",
    react: "⚙️"
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '*_⚡️ ᴘɪɴɢɪɴɢ ᴛᴏ sᴇʀᴠᴇʀ..._*' }, { quoted: mek });
        const endTime = Date.now();
        const ping = endTime - startTime;
        await conn.sendMessage(from, { text: `🏓 *Pong!*\n⚡ Latency: ${ping}ms` }, { quoted: message });
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

// Commande Alive
cmd({
    pattern: "alive",
    desc: "Check if bot is alive",
    category: "general",
    react: "💫"
},
async(conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, { 
            image: { url: config.IMAGE_PATH },
            caption: `*INCONNU XD*\n\n> ${config.BOT_FOOTER}`
        }, { quoted: mek });
    } catch (e) {
        reply("Error: " + e.message);
    }
});
// Commande Auto-React
cmd({
    pattern: "autoreact",
    desc: "Turn on/off auto reaction to messages",
    category: "general",
    react: "🤖"
},
async(conn, mek, m, { from, args, reply, senderNumber }) => {
    try {
        if (!args[0]) return reply("Option select karein! Use: *.autoreact on* ya *.autoreact off*");

        let status = args[0].toLowerCase();
        
        // Sender ka number saaf (sanitize) karein taaki database query sahi chale
        const sanitizedNumber = senderNumber.replace(/[^0-9]/g, '');

        // Pehle se majood user config database se nikalen
        const { getUserConfigFromMongoDB, updateUserConfigInMongoDB } = require('./lib/database');
        let currentConfig = await getUserConfigFromMongoDB(sanitizedNumber) || {};

        if (status === "on") {
            // Database ke liye object update karein (String 'true' save karein)
            currentConfig.AUTO_REACT = "true";
            await updateUserConfigInMongoDB(sanitizedNumber, currentConfig);
            
            await reply("✅ *Auto-React successfully turned ON!*");
        } else if (status === "off") {
            // Database ke liye object update karein (String 'false' save karein)
            currentConfig.AUTO_REACT = "false";
            await updateUserConfigInMongoDB(sanitizedNumber, currentConfig);
            
            await reply("❌ *Auto-React successfully turned OFF!*");
        } else {
            await reply("Galat option! Sirf *on* ya *off* likhein.");
        }
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
