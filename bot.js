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
			dest: number,
			idTelegram: msg.message_id
		}).then(data => {
			msg.reply.text(`Respuesta: ${data}`)
		})
	}
})

console.log("Starting bot")
bot.start()