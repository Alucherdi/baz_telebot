var utils = {
	getActualTime: () => {
		var now = new Date()
		var today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
		var todayOneHourBefore = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours() - 1}:${now.getMinutes()}:${now.getSeconds()}`


		return {
			today: today,
			todayOHB: todayOneHourBefore
		}
	}
}

module.exports = utils