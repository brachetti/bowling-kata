const recognizeSpareAndStrike = (state, [roll1, roll2]) => Object.create({
	score: state.score,
	doubleUp: roll1 == 10 ?
		2
		: (roll1 + roll2 == 10) ? 1 : 0
})

const increaseScore = (state, by) => Object.create({
	score: state.score + by + (state.doubleUp > 0 ? by : 0),
	doubleUp: (state.doubleUp > 0 ? state.doubleUp - 1 : 0)
})

// only count third roll in last frame
const increaseScoreForLastFrame = (state, by, lastFrame) => lastFrame ?
	increaseScore(state, by)
	: state

const calculateScore = (game) => {
	return game.frames.reduce(
		(state, [roll1, roll2 = 0, roll3 = 0], index) =>
		increaseScoreForLastFrame(
			recognizeSpareAndStrike(
				increaseScore(
					increaseScore(
						state,
						roll1),
					roll2),
				[roll1, roll2]),
			roll3,
			lastFrame = index == 9
		),
		{ score: 0, doubleUp: 0 }
	).score
}

module.exports = calculateScore
