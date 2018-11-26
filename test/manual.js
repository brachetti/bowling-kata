const { calculateScore } = require('../src');

const givenGame = (frames) =>
	Object.create({
		"frames": frames
	})

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

const score = calculateScore(spare)
