const { cmd, commands } = require('../inconnuboy');
const config = require('../config');

cmd({
    pattern: "menu",
    desc: "Show bot menu",
    category: "main",
    react: "📜"
},
async(conn, mek, m, {
    from, pushname, reply
}) => {
    try {

        // Uptime
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        // USER CONFIG
        const userConfig = {
            AUTO_VIEW_STATUS: "true",
            ANTI_CALL: "true",
            AUTO_RECORDING: "false",
            AUTO_TYPING: "true",
            READ_MESSAGE: "true"
        };

        let menuText = `╭──────────────────────◇\n`;
        menuText += `│  *🤖 INCONNU BOY — MENU*\n`;
        menuText += `│──────────────────────\n`;
        menuText += `│ 👤 User: ${pushname || 'User'}\n`;
        menuText += `│ ⚡ Prefix: [ ${config.PREFIX} ]\n`;
        menuText += `│ 🕐 Uptime: ${hours}h ${minutes}m ${seconds}s\n`;
        menuText += `│ 🔌 Mode: ${config.WORK_TYPE || 'public'}\n`;
        menuText += `│──────────────────────\n`;
        menuText += `│ ⚙️ Settings Status\n`;
        menuText += `│ 👁️ Auto View: ${userConfig.AUTO_VIEW_STATUS === 'true' ? 'ON ✅' : 'OFF ❌'}\n`;
        menuText += `│ 📵 Anti Call: ${userConfig.ANTI_CALL === 'true' ? 'ON ✅' : 'OFF ❌'}\n`;
        menuText += `│ 🎙️ Auto Record: ${userConfig.AUTO_RECORDING === 'true' ? 'ON ✅' : 'OFF ❌'}\n`;
        menuText += `│ ⌨️ Auto Typing: ${userConfig.AUTO_TYPING === 'true' ? 'ON ✅' : 'OFF ❌'}\n`;
        menuText += `│ ✅ Auto Read: ${userConfig.READ_MESSAGE === 'true' ? 'ON ✅' : 'OFF ❌'}\n`;
        menuText += `╰──────────────────────◇\n\n`;

        // COMMANDS LIST
        menuText += `╭───❖ GENERAL COMMANDS ❖\n`;
        menuText += `│ .ping\n`;
        menuText += `│ .alive\n`;
        menuText += `│ .menu\n`;
        menuText += `│ .owner\n`;
        menuText += `╰────────────────────◇\n\n`;

        menuText += `╭───❖ DOWNLOAD COMMANDS ❖\n`;
        menuText += `│ .song\n`;
        menuText += `│ .video\n`;
        menuText += `│ .ytmp3\n`;
        menuText += `│ .ytmp4\n`;
        menuText += `╰────────────────────◇\n\n`;

        menuText += `╭───❖ GROUP COMMANDS ❖\n`;
        menuText += `│ .tagall\n`;
        menuText += `│ .kick\n`;
        menuText += `│ .add\n`;
        menuText += `│ .promote\n`;
        menuText += `│ .demote\n`;
        menuText += `╰────────────────────◇\n\n`;

        menuText += `> POWERED BY INCONNU BOY`;

        // IMAGE URL
        let imageUrl = 'https://files.catbox.moe/kir5v9.png';

        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: menuText
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
