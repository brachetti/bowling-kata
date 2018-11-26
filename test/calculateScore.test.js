const { givenGame } = require("./util")
const calculateScore = require('../src/calculateScore')

test('simple cases', () => {
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

	const badPlayer2 = givenGame([
			[0 ,1],
			[0 ,1],
		])

	const badPlayer3 = givenGame([
			[0 ,1],
			[0 ,1],
			[1 ,0],
		])

	expect(calculateScore(emptyGame)).toBe(0);
	expect(calculateScore(noScore)).toBe(0);
	expect(calculateScore(badPlayer)).toBe(1);
	expect(calculateScore(badPlayer2)).toBe(2);
	expect(calculateScore(badPlayer3)).toBe(3);
});

test('spares', () => {
	const spareLast = givenGame([
			[0 ,1],
			[2, 8]
		])
	expect(calculateScore(spareLast)).toBe(11);

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

	const spareWithBonus = givenGame([
			[0 ,1],
			[2, 8],
			[1, 0],
		])
	expect(calculateScore(spareWithBonus)).toBe(13);
})

test('strikes', () => {
	const last = givenGame([
			[0 ,1],
			[10]
		])
	expect(calculateScore(last)).toBe(11);

	const noBonus = givenGame([
			[0 ,1],
			[10],
			[0, 0],
		])
	expect(calculateScore(noBonus)).toBe(11);

	const bonus = givenGame([
			[0 ,1],
			[10],
			[1, 0],
		])
	expect(calculateScore(bonus)).toBe(13);

	const bonus2 = givenGame([
			[0 ,1],
			[10],
			[0, 1],
		])
	expect(calculateScore(bonus2)).toBe(13);

	const bonus3 = givenGame([
			[0 ,1],
			[2, 8],
			[2, 1],
		])
	expect(calculateScore(bonus3)).toBe(16);
})

test('tenth frame', () => {
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
		[2, 8, 3], // 10
	])
	expect(calculateScore(spare)).toBe(9 * 2 + 10 + 2 * 3)

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
	expect(calculateScore(spare)).toBe(9 * 2 + 10 + 2 * 3)

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
