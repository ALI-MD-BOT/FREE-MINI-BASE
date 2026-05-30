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
async(conn, mek, m, { from, args, reply }) => {
    try {
        if (!args[0]) return reply("Anbaazi select karein! Use: *.autoreact on* ya *.autoreact off*");

        let status = args[0].toLowerCase();

        if (status === "on") {
            // Yahan aap apne config ya database me status 'true' save kar sakte hain
            config.AUTO_REACT = true; 
            await reply("✅ *Auto-React successfully turned ON!*");
        } else if (status === "off") {
            // Yahan status 'false' save hoga
            config.AUTO_REACT = false; 
            await reply("❌ *Auto-React successfully turned OFF!*");
        } else {
            await reply("Galat option! Sirf *on* ya *off* likhein.");
        }
    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

