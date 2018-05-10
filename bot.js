var Bot     = require("telegram-api").default
var Message = require('telegram-api/types/Message')

var fetch   = require("node-fetch")

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

bot.command("send", (msg) => {
	console.log("Getting send callback")
	
	rata(msg.chat.id).then((data) => {
		var answer = new Message()
			.text(data)
			.to(msg.chat.id)

		bot.send(answer)
	})
})

var rata = (idTelegram) => {

	var body = {
		"to": config.tokenFront,
		"data": {
			"tipoNotificacion": "bot telegram",
			"pa_FchInicio":     "9-5-2018",
			"pa_FchFin":        "10-5-2018",
			"destinatario":     "5212461157552",
			"idTelegram":       idTelegram
		}
	}

	console.log(body)
	
	return new Promise((resolve, reject) => {
		fetch("https://fcm.googleapis.com/fcm/send", {
			method: "POST",
			headers: {
				"Content-Type":  "application/json",
				"Authorization": config.googleApiKey
			},
			body: body
		}).then(r => r.text()).then(data => resolve(data)).catch(err => reject(err))
	})
}