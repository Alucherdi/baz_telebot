var utils = {
	getActualTime: () => {
		var now = new Date()
		var today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
		var todayOneHourBefore = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours() - 1}:${now.getMinutes()}:${now.getSeconds()}`


		return {
			today: today,
			todayOHB: todayOneHourBefore
		}
	},
	rata: (params) => {
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
	
}

module.exports = utils