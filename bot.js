var express   = require("express")
var bp        = require("body")
var app = express()

app.use(bp.json())

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

app.post("/telegramCallback", (req, res) => {
	var body = req.body
	bot.sendMessage(body.idTelegram, JSON.stringify(body))
	res.send({
		code: 200
	})
})
app.listen(8099, () => console.log("Listening port 8099"))