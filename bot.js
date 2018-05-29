const TeleBot = require("telebot")
const config  = require("./config")

const bot = new TeleBot(config.telegramApiKey)

bot.on("/start", (msg) => {
	msg.reply.text(msg.text)
})

bot.on(/\w/, (msg) => {
	var number = msg.text.replace(
		/(-|\/|\s)/g, ""
	).match(
		/\d{10}/
	)

	msg.reply.text(`Número detectado: ${number}`)
})

console.log("Starting bot")
bot.start()