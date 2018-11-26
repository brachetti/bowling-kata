const calculation = require('./calculateScore')
const validate = require('./validate')

const calculateScore = (game) =>
	validate(game) && calculation(game)

module.exports = {
	calculateScore
}
