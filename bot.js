const TeleBot = require("telebot")
const config  = require("./config")
const utils   = require("./utils")

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

	if (number) {
		utils.rata({
			dest: number[0],
			idTelegram: msg.message_id
		}).then(data => {
			msg.reply.text(`Se ha detectado el número: ${number}`)
		})
	} else {
		msg.reply.text("No se encontró el número o es un número no valido")
	}
})

console.log("Starting bot")
bot.start()