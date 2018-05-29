// var test = "asdfs343adf asdf735-3 asdfasdf 3124124 sdaf/// / / / /asdf1234---412asdf"
// console.log(test.length)
// console.log(
// 	test.replace(
// 		/(-|\/|\s)/g, ""
// 	).match(
// 		/\d{10}/
// 	)
// )

// var getActualTime = () => {
// 	var now = new Date()
// 	var today = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
// 	var todayOneHourBefore = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours() - 1}:${now.getMinutes()}:${now.getSeconds()}`


// 	return {
// 		today: today,
// 		todayOHB: todayOneHourBefore
// 	}
// }

var m = [
	"a", "b", "c", "d"
]

console.log(
	m.findIndex(r => {
		return r == "c"
	})
)