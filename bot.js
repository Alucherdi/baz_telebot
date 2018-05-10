var Bot     = require("telegram-api").default
var Message = require('telegram-api/types/Message')

var config = require("./config")

var bot = new Bot({
	token: config.telegramApiKey
})

bot.start()

bot.command("start", (msg) => {
	var answer = new Message()
		.text("Ejecutando el comando start")
		.to(msg.chat.id)

	bot.send(answer)
})