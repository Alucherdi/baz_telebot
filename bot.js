var Bot     = require('telegram-api').default
var Message = require('telegram-api/types/Message')

var bot = new Bot({
	token: '577001210:AAF1q8ZxC9kpSyFbbF7fKgfThJwAxkEi41Y'
})

bot.start()

bot.get(/Hola/, (message) => {
	var answer = new Message().text('HI DUDE').to(message.chat.id)

	bot.send(answer)
})

bot.command('start', (message) => {
	var welcome = new Message().text('Welcome to arquitectura bot').to(message.chat.id)

	bot.send(welcome)
}).catch((error) => {
	console.log(error)
})