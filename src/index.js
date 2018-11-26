const calculation = require('./calculateScore')
const validate = require('./validate')

class InvalidGameException extends Error {}

const calculateScore = (game) => {
	if (validate(game) == false) {
		throw new InvalidGameException('invalid game')
	}

	return calculation(game)
}


module.exports = {
	calculateScore,
	InvalidGameException
}
