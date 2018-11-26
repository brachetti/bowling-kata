const validate = require('../src/validate')
const { givenGame } = require('./util')

describe('validates', () => {
	it('an empty game', () => {
		const emptyGame = givenGame([])
		expect(validate(emptyGame)).toBeTruthy()
	})

	it('no score game', () => {
		const noScore = givenGame([
			[ 0, 0 ],
			[ 0, 0 ],
			[ 0, 0 ],
			[ 0, 0 ],
			[ 0, 0 ],
			[ 0, 0 ],
			[ 0, 0 ],
		])

		expect(validate(noScore)).toBeTruthy()
	})

	it('a bad player', () => {
		const badPlayer = givenGame([
			[0 ,1]
		])

		expect(validate(badPlayer)).toBeTruthy()
	})

	it('a typical long game', () => {
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

		expect(validate(noSpecialCase)).toBeTruthy()
	})

	it('a spare in the tenth frame', () => {
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

		expect(validate(spareInTenthFrame)).toBeTruthy()
	})
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
