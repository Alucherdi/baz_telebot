var test = "asdfs343adf asdf735-3 asdfasdf 3124124 sdaf/// / / / /asdf1234---412asdf"
console.log(test.length)
console.log(
	test.replace(
		/(-|\/|\s)/g, ""
	).match(
		/\d{10}/
	)
)
