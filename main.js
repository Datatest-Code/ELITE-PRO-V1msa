const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

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

// Enhanced Session Management
require('dotenv').config();
global.session = process.env.SESSION_ID || "";

// Validate session exists
if (!global.session) {
    console.error(chalk.red('⚠️ Critical Error: No SESSION_ID configured!'));
    console.log(chalk.yellow('ℹ️ Please add SESSION_ID to your .env file:'));
    console.log(chalk.green('SESSION_ID=your_session_id_here'));
    process.exit(1);
}

console.log(chalk.blue(`ℹ️ Starting with session: ${global.session.substring(0, 5)}...`));

require('./Config');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const chalk = require('chalk');
const FileType = require('file-type');
const path = require('path');
const axios = require('axios');
const PhoneNumber = require('awesome-phonenumber');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./lib/myfunc');
const { default: EliteProTechConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("baileys");
const NodeCache = require("node-cache");
const Pino = require("pino");
const readline = require("readline");
const { parsePhoneNumber } = require("libphonenumber-js");
const makeWASocket = require("baileys").default;

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
});

let phoneNumber = "2348109263390";
let owner = JSON.parse(fs.readFileSync('./database/owner.json'));

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function startEliteProTech() {
    console.log(chalk.blue(`ℹ️ Initializing session: ${global.session.substring(0, 5)}...`));
    
    let { version, isLatest } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState(`./session`);
    
    // Enhanced session validation
    if (!state.creds.registered) {
        console.log(chalk.yellow('⚠️ New session detected, registration required'));
    } else {
        console.log(chalk.green('✅ Existing session loaded'));
        console.log(chalk.blue(`ℹ️ Session ID: ${global.session.substring(0, 5)}...`));
    }

    const msgRetryCounterCache = new NodeCache();
    const EliteProTech = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        getMessage: async (key) => {
            let jid = jidNormalizedUser(key.remoteJid);
            let msg = await store.loadMessage(jid, key.id);
            return msg?.message || "";
        },
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined,
    });

    store.bind(EliteProTech.ev);

    // Enhanced connection handler with session tracking
    EliteProTech.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect } = s;
        if (connection == "open") {
            console.log(chalk.green(`✅ Session ${global.session.substring(0, 5)}... connected`));
            console.log(chalk.yellow(`✔️ Connected to => ${JSON.stringify(EliteProTech.user, null, 2)}`));
            await delay(1999);
            console.log(chalk.yellow(`\n\n                  ${chalk.bold.blue(`[ ${botname} ]`)}\n\n`));
            console.log(chalk.cyan(`< ================================================== >`));
            console.log(chalk.magenta(`╔════════════════════════════╗`));
            console.log(chalk.magenta(`║   ELITEPROTECH CONSOLE ║`));
            console.log(chalk.magenta(`╚════════════════════════════╝`));
            console.log(chalk.magenta(`${themeemoji} YT CHANNEL: EliteProTech`));
            console.log(chalk.magenta(`${themeemoji} GITHUB: EliteProTech`));
            console.log(chalk.magenta(`${themeemoji} TELEGRAM: @elite-md`));
            console.log(chalk.magenta(`${themeemoji} WA NUMBER: ${owner}`));
            console.log(chalk.magenta(`${themeemoji} CREDIT: Chinedu-xmd`));
            console.log(chalk.cyan(`< ================================================== >`));
        }
        
        if (connection === "close") {
            console.log(chalk.yellow(`⚠️ Session ${global.session.substring(0, 5)}... disconnected`));
            if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                console.log(chalk.blue('ℹ️ Attempting to reconnect...'));
                startEliteProTech();
            }
        }
    });

    // Enhanced message handler with session validation
    EliteProTech.ev.on('messages.upsert', async chatUpdate => {
        // Verify session is active
        if (!EliteProTech.authState.creds.registered) {
            console.log(chalk.yellow('⚠️ Message received but session not registered yet'));
            return;
        }

        try {
            const mek = chatUpdate.messages[0];
            if (!mek.message) return;
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
            if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
            if (!EliteProTech.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
            
            const m = smsg(EliteProTech, mek, store);
            require("./ElitePro")(EliteProTech, m, chatUpdate, store);
        } catch (err) {
            console.log(chalk.red(`❌ Error processing message: ${err}`));
        }
    });

    // Rest of your existing event handlers (autoreact, chatbot, antilink, etc.)
    // ... [Keep all your existing event handlers unchanged]

    // Enhanced session cleanup on exit
    process.on('SIGINT', async () => {
        console.log(chalk.yellow(`\n⚠️ Closing session ${global.session.substring(0, 5)}...`));
        try {
            await EliteProTech.logout();
            console.log(chalk.green('✅ Session closed cleanly'));
        } catch (err) {
            console.log(chalk.red('❌ Error closing session:', err));
        }
        process.exit(0);
    });

    EliteProTech.ev.on('creds.update', saveCreds);
}

// Start the bot with session validation
try {
    startEliteProTech();
} catch (err) {
    console.error(chalk.red(`❌ Failed to start session ${global.session.substring(0, 5)}...:`), err);
    process.exit(1);
}

// File watcher for development
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});

// Error handling
process.on('uncaughtException', function (err) {
    let e = String(err);
    if (e.includes("conflict")) return;
    if (e.includes("Socket connection timeout")) return;
    if (e.includes("not-authorized")) return;
    if (e.includes("already-exists")) return;
    if (e.includes("rate-overlimit")) return;
    if (e.includes("Connection Closed")) return;
    if (e.includes("Timed Out")) return;
    if (e.includes("Value not found")) return;
    console.log(chalk.red('❌ Uncaught exception:'), err);
});
