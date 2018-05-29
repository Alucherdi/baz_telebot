const config = require("./config")
const fetch  = require("node-fetch")

var utils = {
	rata: (params) => {
		var body = JSON.stringify({
			"to": config.topic,
			"data": {
				"tipoNotificacion": "bot telegram",
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
	
}

module.exports = utils