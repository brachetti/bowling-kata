const { givenGame } = require("./util")
const calculateScore = require('../src/calculateScore')

describe('calculation works for', () => {
	describe('simple cases like', () => {
		test('an empty game', () => {
			const emptyGame = givenGame([])
			expect(calculateScore(emptyGame)).toBe(0);
		})

		test('a game without a score', () => {
			const noScore = givenGame([
				[ 0, 0 ],
				[ 0, 0 ],
				[ 0, 0 ],
				[ 0, 0 ],
				[ 0, 0 ],
				[ 0, 0 ],
				[ 0, 0 ],
			])

			expect(calculateScore(noScore)).toBe(0);
		})

		test('bad players', () => {
			const badPlayer = givenGame([
				[0 ,1]
			])

			const badPlayer2 = givenGame([
				[0 ,1],
				[0 ,1],
			])

			const badPlayer3 = givenGame([
				[0 ,1],
				[0 ,1],
				[1 ,0],
			])

			expect(calculateScore(badPlayer)).toBe(1);
			expect(calculateScore(badPlayer2)).toBe(2);
			expect(calculateScore(badPlayer3)).toBe(3);
		})
	})

	describe('spares situations where', () => {
		test('the spare was last', () => {
			const spareLast = givenGame([
				[0 ,1],
				[2, 8]
			])
			expect(calculateScore(spareLast)).toBe(11);
		})

		test('the spare means no bonus', () => {
			const spareNoBonus = givenGame([
				[0 ,1],
				[2, 8],
				[0, 0],
			])
			expect(calculateScore(spareNoBonus)).toBe(11);

			const spareNoBonus2 = givenGame([
				[0 ,1],
				[2, 8],
				[0, 1],
			])
			expect(calculateScore(spareNoBonus2)).toBe(12);
		})

		test('the spare means a bonus', () => {
			const spareWithBonus = givenGame([
				[0 ,1],
				[2, 8],
				[1, 0],
			])
			expect(calculateScore(spareWithBonus)).toBe(13);
		})
	})

	describe('strikes situations where', () => {
		test('the strike was last', () => {
			const last = givenGame([
				[0 ,1],
				[10]
			])
			expect(calculateScore(last)).toBe(11);
		})

		test('the bonus is lost', () => {
			const noBonus = givenGame([
				[0 ,1],
				[10],
				[0, 0],
			])
			expect(calculateScore(noBonus)).toBe(11);
		})

		test('there is a bonus', () => {
			const bonus = givenGame([
				[0 ,1],
				[10],
				[1, 0],
			])
			expect(calculateScore(bonus)).toBe(13);
		})

		test('there is a delayed bonus', () => {
			const bonus2 = givenGame([
					[0 ,1],
					[10],
					[0, 1],
				])
			expect(calculateScore(bonus2)).toBe(13);
		})

		test('there is a partly bonus in the next frame', () => {
			const bonus3 = givenGame([
					[0 ,1],
					[2, 8],
					[2, 1],
				])
			expect(calculateScore(bonus3)).toBe(16);
		})

	})

	describe('tenth frame edge cases where', () => {
		test('a spare happened', () => {
			const spare = givenGame([
				[1, 1],
				[1, 1],
				[1, 1],
				[1, 1],
				[1, 1], // 5

				[1, 1],
				[1, 1],
				[1, 1],
				[1, 1],
				[2, 8, 2], // 10
			])
			expect(calculateScore(spare)).toBe(9 * 2 + 10 + 2 * 2)
		})

		test('a strike happened', () => {
			const strike = givenGame([
				[1, 1],
				[1, 1],
				[1, 1],
				[1, 1],
				[1, 1], // 5

				[1, 1],
				[1, 1],
				[1, 1],
				[1, 1],
				[10, 3], // 10
			])
			expect(calculateScore(strike)).toBe(9 * 2 + 10 + 2 * 3)
		})

		test('nothing happened', () => {
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
			expect(calculateScore(noSpecialCase)).toBe(10 * 2)
		})
	})
});


