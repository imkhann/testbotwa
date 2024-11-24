require("./lib/module")

// SETTING KONTAK
global.owner = "6283841442290"
global.ownername = "𝐃𝐢𝐤𝐚𝐓𝐡𝐞𝐆𝐞𝐧𝐤𝐳 🦅"
global.nomorbot = "6283841442290"
global.namaCreator = "𝐃𝐢𝐤𝐚𝐓𝐡𝐞𝐆𝐞𝐧𝐤𝐳 🦅"
global.autoJoin = false
global.antilink = false

// THUMBNAIL (BEBAS GANTI)
global.imageurl = 'https://g.top4top.io/p_323220gek0.jpg'
global.channel = 'https://whatsapp.com/channel/0029VaegLveBKfhz5g2mlg1d'

// STICKER
global.packname = "🦅"
global.author = "𝐃𝐢𝐤𝐚𝐓𝐡𝐞𝐆𝐞𝐧𝐤𝐳"
global.jumlah = "5"


















// RESPON BOT
global.onlyprem = `\`[ # ] DIKA ID\` \n*COMMAND KHUSUS PREMIUM!*`
global.onlyown = `\`[ # ] DIKA ID\` \n*COMMAND KHUSUS OWNER!*`
global.onlygroup = `\`[ # ] DIKA ID\` \n*COMMAND KHUSUS DI GRUP!*`
global.onlyadmin = `\`[ # ] DIKA ID\` \n*COMMAND KHUSUS ADMIN!*`
global.notext = `\`[ # ] DIKA ID\` \n*TEKSNYA BANG DIK!*`
global.noadmin = `\`[ # ] DIKA ID\` \n*BOT BELUM MENJADI ADMIN!*`
global.succes = `\`[ # ] DIKA ID\` \n*SUKSES BANG DIK!*`
global.invalid = `\`[ # ] DIKA ID\` \n*MASUKKAN NOMOR YANG VALID!*`
global.bugrespon = `\`[ # ] DIKA ID\` \n*TUNGGU SAMPAI PROSES SELESAI!*`

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})