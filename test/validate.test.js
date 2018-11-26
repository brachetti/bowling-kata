const validate = require('../src/validate')

const givenGame = (frames) =>
	Object.create({
		"frames": frames
	})

test('valid games', () => {
	const emptyGame = givenGame([])

	const noScore = givenGame([
		[ 0, 0 ],
		[ 0, 0 ],
		[ 0, 0 ],
		[ 0, 0 ],
		[ 0, 0 ],
		[ 0, 0 ],
		[ 0, 0 ],
	])

	const badPlayer = givenGame([
		[0 ,1]
	])

	const noSpecialCase = givenGame([
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1], // 5

		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1], // 10
	])

	const spareInTenthFrame = givenGame([
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1], // 5

		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[2, 8, 3], // 10
	])

	expect(validate(emptyGame)).toBeTruthy()
	expect(validate(noScore)).toBeTruthy()
	expect(validate(badPlayer)).toBeTruthy()
	expect(validate(noSpecialCase)).toBeTruthy()
	expect(validate(spareInTenthFrame)).toBeTruthy()
})

test('invalid games', () => {
	const threeRolls = givenGame([
		[1, 2, 3]
	])

	expect(validate(threeRolls)).toBeFalsy()

	const moreThanThree = givenGame([
		[1, 2, 3, 4, 5, 6]
	])

	expect(validate(moreThanThree)).toBeFalsy()

	const strikeInTenth = givenGame([
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1], // 5

		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[10, 3, 4], // 10
	])
	expect(validate(strikeInTenth)).toBeFalsy()

	const elevenFrames = givenGame([
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1], // 5

		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1], // 10
		[1, 1],
	])
	expect(validate(elevenFrames)).toBeFalsy()
})
