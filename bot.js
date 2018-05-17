// var express = require("express")
// var app = express()

var Bot = require("telegram-api").default
var Message = require('telegram-api/types/Message')

var fetch = require("node-fetch")

var config = require("./config")
var utils = require("./utils")

var bot = new Bot({
	token: config.telegramApiKey
})

console.log("Starting telegram bot")
bot.start()

bot.command("start", (msg) => {
	var answer = new Message()
		.text("Ejecutando el comando start")
		.to(msg.chat.id)

	bot.send(answer)
})

bot.get(/\w/, (msg) => {
	var number = msg.text.replace(
		/(-|\/|\s)/g, ""
	).match(
		/\d{10}/
	)

	if (number) {
		rata({
			idTelegram: msg.chat.id,
			dest:       number

		}).then(data => {
			var answer = new Message()
				.text(`Petición enviada con el número: ${number[0]}, respuesta: ${data}`)
				.to(msg.chat.id)

			bot.send(answer)
		})
	} else {
		var answer = new Message()
			.text(`No se ha detectado ningún número telefónico en tu mensaje`)
			.to(msg.chat.id)

		bot.send(answer)
	}
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

var rata = (params) => {

	var time = utils.getActualTime()

	var body = JSON.stringify({
		"to": config.topic,
		"data": {
			"tipoNotificacion": "bot telegram",
			"pa_FchInicio": time.todayOHB,
			"pa_FchFin": time.today,
			"destinatario": params.dest,
			"idTelegram": params.idTelegram
		}
	})

	console.log(body)

	return new Promise((resolve, reject) => {
		fetch("https://fcm.googleapis.com/fcm/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": config.googleApiKey
			},
			body: body
		}).then(r => r.text()).then(data => resolve(data)).catch(err => reject(err))
	})
}

// app.post("/reset", (req, res) => {
// 	res.send("Tick")
// })

// app.listen(process.env.PORT, console.log("hi"))

// var consume = `http://localhost:${process.env.PORT}/reset`
// console.log(consume)
// setInterval(() => {
// 	fetch(consume, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/x-www-form-urlencoded"
// 		}
// 	}).then(r => r.text()).then(data => console.log(data)).catch(err => console.log(err))
// }, 5000)