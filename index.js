
require("./lib/global")

const func = require("./lib/place")
const readline = require("readline");
const usePairingCode = true
const question = (text) => {
  const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
  });
  return new Promise((resolve) => {
rl.question(text, resolve)
  })
};

async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
const { version, isLatest } = await fetchLatestBaileysVersion()
    console.log(chalk.red.bold('\nDikaTheGenkz\nCredit Script By Dika ID\nTelegram : @dikabot_tech\nYouTube : @dikatech_yt\n'))
const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
printQRInTerminal: !usePairingCode,
logger: pino({ level: "fatal" }),
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]   
// browser: ['Chrome (Linux)', '', '']
}
const dikabot = func.makeWASocket(connectionOptions)
if(usePairingCode && !dikabot.authState.creds.registered) {
		const phoneNumber = await question(chalk.green('MASUKKAN NOMOR DENGAN AWALAN KODE NEGARA TANPA SIMBOL +\nCONTOH : 6283841442290\n'));
		const code = await dikabot.requestPairingCode(phoneNumber.trim())
		console.log(chalk.green(`enter the code into whatsapp : ${code} `))

	}
store.bind(dikabot.ev)

dikabot.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
dikabot.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
dikabot.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `Tersambung`)
dikabot.sendMessage(`6283841442289@s.whatsapp.net`, { text: `𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗜𝗡𝗚 𝗕𝗘𝗥𝗛𝗔𝗦𝗜𝗟 ✅\n𝗪𝗔𝗥𝗡𝗜𝗡𝗚 ‼️
𝘚𝘊𝘙𝘐𝘗𝘛 𝘐𝘕𝘐 𝘋𝘐𝘉𝘜𝘈𝘛 𝘜𝘕𝘛𝘜𝘒 𝘔𝘌𝘔𝘉𝘈𝘕𝘛𝘜 𝘈𝘕𝘋𝘈, 𝘚𝘈𝘠𝘈 𝘏𝘈𝘙𝘈𝘗 𝘈𝘕𝘋𝘈 𝘉𝘐𝘚𝘈 𝘔𝘌𝘕𝘎𝘎𝘜𝘕𝘈𝘒𝘈𝘕 𝘋𝘌𝘕𝘎𝘈𝘕 𝘉𝘈𝘐𝘒!\n𝘛𝘐𝘋𝘈𝘒 𝘜𝘕𝘛𝘜𝘒 𝘔𝘌𝘕𝘎𝘈𝘕𝘎𝘎𝘜/𝘔𝘌𝘙𝘜𝘚𝘈𝘒 𝘞𝘏𝘈𝘛𝘚𝘈𝘗𝘗 𝘚𝘌𝘚𝘌𝘖𝘙𝘈𝘕𝘎`})
if (autoJoin) {
dikabot.groupAcceptInvite(codeInvite)
}
}
})

dikabot.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return dikabot.readMessages([m.key])
if (!dikabot.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = func.smsg(dikabot, m, store)
require("./dikabot")(dikabot, m, store)
} catch (err) {
console.log(err)
}
})

dikabot.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = dikabot.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

dikabot.public = true

dikabot.ev.on('creds.update', saveCreds)
return dikabot
}

startSesi()

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})