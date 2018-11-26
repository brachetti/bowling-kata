const { calculateScore, InvalidGameException } = require('../src')
const { givenGame } = require('./util')

describe('can handle the happy path', () => {
	it('like a new game', () => {
		const newGame = calculateScore(givenGame([]));
		expect(newGame).toBe(0)
	})
})

describe('can handle unhappy scenarios', () => {
	test('like early three rolls', () => {
		// weirdly, expect(call()).toThrowError() didn't work as expected
		try {
			const threeEarlyRolls = calculateScore(givenGame([
				[1, 2, 3]
			]))
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidGameException)
			return
		}
		expect("this line").toBe(false) // wasn't called
	})

	test('like three rolls somewhere', () => {
		// weirdly, expect(call()).toThrowError() didn't work as expected
		try {
			const threeEarlyRolls = calculateScore(givenGame([
				[1, 1],
				[1, 1],
				[1, 1],
				[1, 1],
				[1, 1],
				[1, 1],
				[1, 2, 3],
				[1, 1],
			]))
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidGameException)
			return
		}
		expect("this line").toBe(false) // wasn't called
	})

	test('like more than 10 frames', () => {
		// weirdly, expect(call()).toThrowError() didn't work as expected
		try {
			const threeEarlyRolls = calculateScore(givenGame([
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
				[1, 1],
			]))
		} catch (error) {
			expect(error).toBeInstanceOf(InvalidGameException)
			return
		}
		expect("this line").toBe(false) // wasn't called
	})

})
