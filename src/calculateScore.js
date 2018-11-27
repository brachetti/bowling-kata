const recognizeSpare = (state, [roll1, roll2]) => Object.create({
	score: state.score,
	doubleUp: (roll1 + roll2 == 10) ? 1 : 0
})

const increaseScore = (state, by) => Object.create({
	score: state.score + by + (state.doubleUp > 0 ? by : 0),
	doubleUp: by === 10 ?
		2 : (state.doubleUp > 0 ? state.doubleUp - 1 : 0)
})

// only count third roll in last frame
const increaseScoreForLastFrame = (state, by, lastFrame) => lastFrame ?
	increaseScore(state, by) :
	state

const calculateScore = (frames) => {
	return frames.reduce(
		(state, frame, index) => {
			const [roll1, roll2 = 0, roll3 = 0] = frame
			if (frame.length == 1) {
				// do not consider roll 2 and 3 for strikes before frame 10
				return increaseScore(state, roll1)
			}
			return increaseScoreForLastFrame(
				recognizeSpare(
					increaseScore(
						increaseScore(
							state,
							roll1),
						roll2),
					[roll1, roll2]),
				roll3,
				lastFrame = index == 9
			)

		}, {
			score: 0,
			doubleUp: 0
		}
	).score
}

module.exports = calculateScore
