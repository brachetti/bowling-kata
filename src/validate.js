const validate = (frames) => {
	const onlyTenFrames = frames.length <= 10
	const noErrorsHappened = frames.reduce(
		(noErrorsSoFar, frame, index) => noErrorsSoFar  && (
			index != 9 ?
			frame.length < 3
			: frame.length <= 3 && !(
				frame[0] == 10 &&
				frame.length == 3
			)
		),
		true
	)

	return onlyTenFrames &&
		noErrorsHappened
}

module.exports = validate
