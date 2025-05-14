const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config(); // Add this line to load .env variables

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>ELITE-PRO-V1 BOT</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #000000, #1a1a2e);
          color: #fff;
          text-align: center;
          padding: 0;
          margin: 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .container {
          max-width: 800px;
          padding: 40px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin: 20px;
        }
        h1 {
          font-size: 3.5em;
          margin-bottom: 20px;
          background: linear-gradient(to right, #00c853, #00bfa5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .tagline {
          font-size: 1.2em;
          margin-bottom: 30px;
          color: #ddd;
        }
        .buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          margin: 30px 0;
        }
        a {
          display: inline-block;
          padding: 15px 30px;
          background: linear-gradient(45deg, #00c853, #00bfa5);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          transition: all 0.3s;
          font-weight: bold;
          box-shadow: 0 4px 15px rgba(0, 200, 83, 0.3);
          border: none;
          min-width: 180px;
        }
        a:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 200, 83, 0.4);
        }
        a.secondary {
          background: linear-gradient(45deg, #3a3a3a, #1a1a1a);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        a.secondary:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        .features {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          margin: 30px 0;
        }
        .feature {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 10px;
          width: 120px;
        }
        footer {
          margin-top: 40px;
          font-size: 0.9em;
          color: #aaa;
        }
        @media (max-width: 600px) {
          .container {
            padding: 20px;
          }
          h1 {
            font-size: 2.5em;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>ELITE-PRO-V1 BOT</h1>
        <p class="tagline">The most advanced WhatsApp automation solution by EliteProEmpire</p>
        
        <div class="buttons">
          <a href="https://elitepro-website.vercel.app/" target="_blank">🌐 Official Website</a>
          <a href="https://elitepro-repo.vercel.app/" target="_blank" class="secondary">💻 GitHub Repo</a>
          <a href="https://api-eliteproempire.vercel.app/" target="_blank" class="secondary">⚙️ API Documentation</a>
        </div>
        
        <div class="features">
          <div class="feature">🚀 Fast</div>
          <div class="feature">🔒 Secure</div>
          <div class="feature">🤖 Automated</div>
          <div class="feature">📊 Analytics</div>
        </div>
        
        <footer>
          &copy; 2025 ELITEPRO. All rights reserved. | Version 1.0.0
        </footer>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Load environment variables first
require('dotenv').config();
global.session = process.env.SESSION_ID || "";

require('./Config')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./lib/myfunc')
const { default: EliteProTechConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const makeWASocket = require("baileys").default

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

let phoneNumber = "2348109263390"
let owner = JSON.parse(fs.readFileSync('./database/owner.json'))

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
         
async function startEliteProTech() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./session`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const EliteProTech = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      browser: [ "Ubuntu", "Chrome", "20.0.04" ], // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      markOnlineOnConnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })
   
   store.bind(EliteProTech.ev)

    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !EliteProTech.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +2348109263390")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your number below 🥰.\nFor example +2348109263390: `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (phoneNumber == "rien" ){
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +2348109263390")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number. 🥰\nFor example: +2348109263390 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await EliteProTech.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }

    EliteProTech.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast' )
            if (!EliteProTech.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            const m = smsg(EliteProTech, mek, store)
            require("./ElitePro")(EliteProTech, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
    
    //autostatus view
        EliteProTech.ev.on('messages.upsert', async chatUpdate => {
        	if (global.autoswview){
            mek = chatUpdate.messages[0]
            if (mek.key && mek.key.remoteJid === 'status@broadcast') {
            	await EliteProTech.readMessages([mek.key]) }
            }
    })
//STARTING POINT FOR EXTRA CODES//
let emojiFile = './lib/autoreact.json'; // Change to

try {
    let data = fs.readFileSync(emojiFile, 'utf8');
    emojis = JSON.parse(data); // Load emojis from JSON
} catch (err) {
    console.error('Error loading emojis:', err);
}

EliteProTech.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        let mek = chatUpdate.messages[0];
        
        if (!mek || !mek.key || mek.key.fromMe) return; // Ignore bot's own messages
        
        let chatType = mek.key.remoteJid.endsWith('@g.us') ? 'Group' : 'DM';
        
        if (global.autoreact && emojis.length > 0) {
            let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            
            await EliteProTech.sendMessage(mek.key.remoteJid, {
                react: { text: randomEmoji, key: mek.key }
            }).catch(err => console.error(`Auto-react error in ${chatType}:`, err));
        }
    } catch (err) {
        console.error('Auto-react error:', err);
    }
});

////chatbot
EliteProTech.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const mek = chatUpdate.messages[0];
        if (!mek.message || mek.key.fromMe) return;
        
        // Load chatbot settings
        let chatbotData = {};
        try {
            chatbotData = JSON.parse(fs.readFileSync('./database/chatbot.json'));
        } catch (err) {
            console.error('Error loading chatbot.json:', err);
        }
        
        // Check if chatbot is globally enabled
        if (!chatbotData.global) return;
        
        // Extract message details
        const from = mek.key.remoteJid;
        const text = mek.message.conversation || mek.message.extendedTextMessage?.text || '';
        const sender = mek.key.participant || from;
        
        // Check if the message is from a group
        const isGroup = from.endsWith('@g.us');
        
        // Check if the bot is mentioned, quoted, or replied to in groups
        if (isGroup) {
            const isMentioned = mek.message.extendedTextMessage?.contextInfo?.mentionedJid?.includes(EliteProTech.user.id);
            const isQuoted = mek.message.extendedTextMessage?.contextInfo?.participant === EliteProTech.user.id;
            const isReplied = mek.message.extendedTextMessage?.contextInfo?.stanzaId && mek.message.extendedTextMessage?.contextInfo?.participant === EliteProTech.user.id;
            
            // If the bot is not mentioned, quoted, or replied to, ignore the message
            if (!isMentioned && !isQuoted && !isReplied) return;
        }
        
        // Initialize user history if not exists
        if (!global.userChats) global.userChats = {};
        if (!global.userChats[sender]) global.userChats[sender] = [];
        
        // Save user input to chat history
        global.userChats[sender].push(`User: ${text}`);
        
        // If history exceeds 15 messages, remove the oldest message
        if (global.userChats[sender].length > 15) {
            global.userChats[sender].shift(); // Remove the oldest message
        }
        
        let userHistory = global.userChats[sender].join("\n"); // Get the latest 15 messages
        
        let prompt = `
Your ElitePro, an artificial intelligence created by Chinedu. Chat naturally without asking repetitive questions, and do not ask, 'How can I assist you?'

- **Owner & Creator:** Chinedu  
- **WhatsApp:** [2347047504860](https://wa.me/2347047504860)  
 - **Telegram:** [t.me/elitepro_md/](https://t.me/elitepro_md/)  
- **Company Website:** [https://eliteprotech.vercel.app/](https://eliteprotech.vercel.app/)  
- **Personal Portfolio:** [https://eliteprotech.vercel.app/](https://eliteprotech.vercel.app/)  
- **WhatsApp Channel:** [https://whatsapp.com/channel/0029VaXaqHII1rcmdDBBsd3g](https://whatsapp.com/channel/0029VaXaqHII1rcmdDBBsd3g)  
- **GitHub Repository:** [https://eliteproverified.vercel.app/](https://eliteproverified.vercel.app/)  
- **YouTube Channel:** [https://www.youtube.com/@eliteprotech](https://www.youtube.com/@eliteprotech)  

### About ElitePro 
I'm Chinedu the founder of ElitePro. I'm a *developer* (HTML, CSS, JavaScript, Node.js), music producer, singer, and video editor*.  


### Bot Responses:  
- If someone requests a song, reply: ".play [song name]".  
- If someone requests a video, reply: ".video [video name]".  
- If someone requests a image, reply: ".img [image name]".  
#### **Conversation History:**  
${userHistory}
`;
        
        
        // Query the AI API
        let { data } = await axios.get("https://mannoffc-x.hf.space/ai/logic", {
            params: { "q": text, "logic": prompt }
        });
        
        let botResponse = data.result;
        
        // Save bot response to chat history
        global.userChats[sender].push(`Bot: ${botResponse}`);
        
        // Send the bot's response
        await EliteProTech.sendMessage(from, { text: botResponse }, { quoted: mek });
    } catch (error) {
        console.error('Error in chatbot functionality:', error);
    }
});
/// Chatbot end///
//ANTILINK DETECT
function isUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
}

EliteProTech.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const mek = chatUpdate.messages[0];
        if (!mek || !mek.message) return;
        
        mek.message = mek.message.ephemeralMessage?.message || mek.message;
        if (mek.message.protocolMessage) return;
        
        const from = mek.key.remoteJid;
        const sender = mek.key.participant || from;
        const text = mek.message.conversation ||
            mek.message.extendedTextMessage?.text ||
            mek.message.imageMessage?.caption || '';
        
        if (!from.endsWith('@g.us')) return; // Ensure it's a group
        
        // Load AntiLink settings from antilink.json
        let antilinkData = {};
        try {
            antilinkData = JSON.parse(fs.readFileSync('./lib/antilink.json', 'utf8'));
        } catch (err) {
            console.error('Error loading antilink.json:', err);
        }
        
        if (!antilinkData[from]?.enabled) return;
        let actionType = antilinkData[from].action || "warn";
        let warnings = antilinkData[from].warnings || {};
        
        // **Check if the sender is the bot, creator, or admin**
        const creatorNumber = '120363419911991767@s.whatsapp.net'; // Your creator number
        const isBotMessage = mek.key.fromMe;
        const isCreator = sender === creatorNumber;
        
        // ✅ Get group metadata and admin list
        const groupMetadata = await EliteProTech.groupMetadata(from);
        const groupAdmins = groupMetadata.participants
            .filter(participant => participant.admin !== null)
            .map(admin => admin.id);
        
        const isAdmin = groupAdmins.includes(sender);
        
        // ✅ Don't take action if sender is the bot, the creator, or an admin
        if (isBotMessage || isCreator || isAdmin) return;
        
        // ✅ Check if message contains a link
        if (isUrl(text)) {
            console.log(`🔗 Link detected from ${sender}: ${text}`);
            
            // **Action Handling:**
            if (actionType === 'delete') {
                await EliteProTech.sendMessage(from, { delete: mek.key });
                await EliteProTech.sendMessage(from, {
                    text: `_*⚠️@${sender.split('@')[0]} waring links not allowed in this group.‼️*_`,
                    mentions: [sender]
                });
            } else if (actionType === 'kick') {
                await EliteProTech.sendMessage(from, { delete: mek.key });
                await EliteProTech.sendMessage(from, {
                    text: `_*‼️@${sender.split('@')[0]} has been removed from this group for sending link ⿻*_`,
                    mentions: [sender]
                });
                await EliteProTech.groupParticipantsUpdate(from, [sender], "remove");
            } else if (actionType === 'warn') {
                if (!warnings[sender]) {
                    warnings[sender] = 1;
                } else {
                    warnings[sender] += 1;
                }
                
                let warnCount = warnings[sender];
                
                await EliteProTech.sendMessage(from, { delete: mek.key });
                await EliteProTech.sendMessage(from, {
                    text: `_*⚠️@${sender.split('@')[0]} waring links not allowed in this group.‼️*_`,
                    mentions: [sender]
                });
                
                if (warnCount >= 4) {
                    await EliteProTech.groupParticipantsUpdate(from, [sender], "remove");
                    await EliteProTech.sendMessage(from, {
                        text: `_*‼️@${sender.split('@')[0]} has been removed from this group.*_\n*Limit exceeded*`,
                        mentions: [sender]
                    });
                    delete warnings[sender]; // Reset after kick
                }
                
                antilinkData[from].warnings = warnings;
                fs.writeFileSync('./lib/antilink.json', JSON.stringify(antilinkData, null, 2));
            }
        }
    } catch (err) {
        console.error('❌ Error in anti-link detection:', err);
    }
});
//Stoping code for the block here//

   
    EliteProTech.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    EliteProTech.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = EliteProTech.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    EliteProTech.getName = (jid, withoutContact = false) => {
        id = EliteProTech.decodeJid(jid)
        withoutContact = EliteProTech.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = EliteProTech.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === EliteProTech.decodeJid(EliteProTech.user.id) ?
            EliteProTech.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    EliteProTech.public = true

    EliteProTech.serializeM = (m) => smsg(EliteProTech, m, store)

EliteProTech.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
        	console.log(chalk.magenta(` `))
            console.log(chalk.yellow(`✔️  Connected to => ` + JSON.stringify(EliteProTech.user, null, 2)))
			await delay(1999)
console.log(chalk.yellow(`\n\n                  ${chalk.bold.blue(`[ ${botname} ]`)}\n\n`))
console.log(chalk.cyan(`< ================================================== >`))
console.log(chalk.magenta(`╔════════════════════════════╗`));
console.log(chalk.magenta(`║   ELITEPROTECH CONSOLE ║`));
console.log(chalk.magenta(`╚════════════════════════════╝`));
console.log(chalk.magenta(`${themeemoji} YT CHANNEL: EliteProTech`));
console.log(chalk.magenta(`${themeemoji} GITHUB: EliteProTech`));
console.log(chalk.magenta(`${themeemoji} TELEGRAM: @elite-md`));
console.log(chalk.magenta(`${themeemoji} WA NUMBER: ${owner}`));
console.log(chalk.magenta(`${themeemoji} CREDIT: Chinedu-xmd`));
console.log(chalk.cyan(`< ================================================== >`))
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            startEliteProTech()
        }
    })
    EliteProTech.ev.on('creds.update', saveCreds)
    EliteProTech.ev.on("messages.upsert",  () => { })

    EliteProTech.sendText = (jid, text, quoted = '', options) => EliteProTech.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
    EliteProTech.sendTextWithMentions = async (jid, text, quoted, options = {}) => EliteProTech.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
//welcome cmd
EliteProTech.ev.on('group-participants.update', async (update) => {
    if (!global.welcome) return;
    
    try {
        const { id, participants, action } = update;
        if (!id || !participants?.length) return;
        
        let group;
        try {
            group = await EliteProTech.groupMetadata(id);
        } catch (err) {
            console.error("Error fetching group metadata:", err.message);
            return;
        }
        
        const groupName = group.subject || "Group";
        const groupOwner = group.owner || "UnknownOwner";
        const groupDesc = group.desc || "No description available.";
        
        for (const participant of participants) {
            let ppUrl = "https://files.catbox.moe/nwvkbt.png";
            try {
                ppUrl = await EliteProTech.profilePictureUrl(participant, "image");
            } catch (err) {
                // Keep default if not found
            }
            
            const contextInfo = {
                externalAdReply: {
                    showAdAttribution: true,
                    title: groupName,
                    body: "Join our official channel for update",
                    mediaType: 1,
                    thumbnailUrl: "https://raw.githubusercontent.com/Cyrilix-XMD/ELITEPRO-URL-CLOUD/main/20250328_045427.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029VaXaqHII1rcmdDBBsd3g",
                }
            };
            
            if (action === "add") {
                let username = "User";
                try {
                    username = await EliteProTech.getName(participant) || "User";
                } catch (err) {}
                
                const welcomeMessage = `*ELITE-PRO-V1 NOTIFICATION*

> *💥Welcome* @${participant.split('@')[0]} to *${groupName}*.

*Please Read Group Description:* 
${groupDesc}

*Group owner:* @${groupOwner.split('@')[0]}
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴇʟɪᴛᴇ-ᴘʀᴏ©*`;
                
                try {
                    await EliteProTech.sendMessage(id, {
                        image: { url: ppUrl },
                        caption: welcomeMessage,
                        mentions: [participant, groupOwner],
                        contextInfo
                    });
                } catch (err) {
                    console.error("Error sending welcome message:", err.message);
                }
                
            } else if (action === "remove") {
                const farewellMessage = `*ELITE-PRO-V1 NOTIFICATION*

> 😮‍💨 *@${participant.split('@')[0]} Left ${groupName}*

*Please Read Group Description:* 
${groupDesc}

*Group owner:* @${groupOwner.split('@')[0]}
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴇʟɪᴛᴇ-ᴘʀᴏ©*`;
                
                try {
                    await EliteProTech.sendMessage(id, {
                        image: { url: ppUrl },
                        caption: farewellMessage,
                        mentions: [participant, groupOwner],
                        contextInfo
                    });
                } catch (err) {
                    console.error("Error sending farewell message:", err.message);
                }
            }
        }
    } catch (err) {
        console.error("Auto-Welcome Handler Error:", err.message);
    }
});    
//Sticker code    
    EliteProTech.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await EliteProTech.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    EliteProTech.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await EliteProTech.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    EliteProTech.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    EliteProTech.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }
    }
return startEliteProTech()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
